BEGIN;

INSERT INTO auth.users (id,aud,role,email) VALUES
 ('30000000-0000-0000-0000-0000000000a1','authenticated','authenticated','lifeos-c3-a@example.invalid'),
 ('30000000-0000-0000-0000-0000000000b2','authenticated','authenticated','lifeos-c3-b@example.invalid');

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','30000000-0000-0000-0000-0000000000a1',true);
DO $$ DECLARE ent uuid; tx uuid; n integer; BEGIN
  INSERT INTO public.entity_records(user_id,section_id,entity_type,source_id)
    VALUES ('30000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='finance'),'finance_transaction','c3-balanced') RETURNING id INTO ent;
  INSERT INTO public.finance_transactions(user_id,entity_id,occurred_at)
    VALUES ('30000000-0000-0000-0000-0000000000a1',ent,now()) RETURNING id INTO tx;
  INSERT INTO public.finance_entries(user_id,transaction_id,account,amount) VALUES
    ('30000000-0000-0000-0000-0000000000a1',tx,'cash',100),
    ('30000000-0000-0000-0000-0000000000a1',tx,'income',-100);
  SELECT count(*) INTO n FROM public.finance_entries WHERE transaction_id=tx;
  IF n<>2 THEN RAISE EXCEPTION 'owner cannot read finance entries'; END IF;
  BEGIN
    INSERT INTO public.finance_entries(user_id,transaction_id,account,amount)
      VALUES ('30000000-0000-0000-0000-0000000000b2',tx,'foreign',25);
    RAISE EXCEPTION 'cross-owner finance entry accepted';
  EXCEPTION WHEN foreign_key_violation OR insufficient_privilege OR check_violation THEN NULL; END;
END $$;
SET CONSTRAINTS finance_transaction_balanced, finance_entries_balanced IMMEDIATE;

RESET ROLE;
SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub','',true);
DO $$ BEGIN
  BEGIN PERFORM 1 FROM public.finance_transactions;
    RAISE EXCEPTION 'anon read finance';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;

RESET ROLE;
ROLLBACK;
SELECT '03_finance_access passed' AS result;
