BEGIN;

INSERT INTO auth.users (id,aud,role,email) VALUES
 ('40000000-0000-0000-0000-0000000000a1','authenticated','authenticated','lifeos-c4-a@example.invalid');
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','40000000-0000-0000-0000-0000000000a1',true);

DO $$ DECLARE ent uuid; BEGIN
  INSERT INTO public.entity_records(user_id,section_id,entity_type,source_id)
    VALUES ('40000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='finance'),'finance_transaction','c4-empty') RETURNING id INTO ent;
  INSERT INTO public.finance_transactions(user_id,entity_id,occurred_at)
    VALUES ('40000000-0000-0000-0000-0000000000a1',ent,now());
  BEGIN
    EXECUTE 'SET CONSTRAINTS finance_transaction_balanced IMMEDIATE';
    RAISE EXCEPTION 'empty finance header accepted';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM NOT LIKE 'finance transaction % requires at least two entries' THEN RAISE; END IF;
  END;
END $$;

DO $$ DECLARE ent uuid; tx uuid; BEGIN
  INSERT INTO public.entity_records(user_id,section_id,entity_type,source_id)
    VALUES ('40000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='finance'),'finance_transaction','c4-unbalanced') RETURNING id INTO ent;
  INSERT INTO public.finance_transactions(user_id,entity_id,occurred_at)
    VALUES ('40000000-0000-0000-0000-0000000000a1',ent,now()) RETURNING id INTO tx;
  INSERT INTO public.finance_entries(user_id,transaction_id,account,amount) VALUES
    ('40000000-0000-0000-0000-0000000000a1',tx,'cash',100),
    ('40000000-0000-0000-0000-0000000000a1',tx,'income',-50);
  BEGIN
    EXECUTE 'SET CONSTRAINTS finance_entries_balanced IMMEDIATE';
    RAISE EXCEPTION 'unbalanced finance accepted';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM NOT LIKE 'finance transaction % is unbalanced%' THEN RAISE; END IF;
  END;
END $$;

RESET ROLE;
ROLLBACK;
SELECT '04_finance_invariants passed' AS result;
