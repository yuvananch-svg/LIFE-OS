BEGIN;

INSERT INTO auth.users (id,aud,role,email) VALUES
 ('10000000-0000-0000-0000-0000000000a1','authenticated','authenticated','lifeos-c1-a@example.invalid'),
 ('10000000-0000-0000-0000-0000000000b2','authenticated','authenticated','lifeos-c1-b@example.invalid');
INSERT INTO public.entity_records(id,user_id,section_id,entity_type,source_id,title) VALUES
 ('10000000-0000-0000-0000-0000000000d4','10000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='tasks'),'task','c1-a','A'),
 ('10000000-0000-0000-0000-0000000000e5','10000000-0000-0000-0000-0000000000b2',(SELECT id FROM public.sections WHERE key='tasks'),'task','c1-b','B');

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','10000000-0000-0000-0000-0000000000a1',true);
DO $$ DECLARE n integer; BEGIN
  SELECT count(*) INTO n FROM public.entity_records WHERE id='10000000-0000-0000-0000-0000000000d4';
  IF n<>1 THEN RAISE EXCEPTION 'A cannot read own row'; END IF;
  SELECT count(*) INTO n FROM public.entity_records WHERE id='10000000-0000-0000-0000-0000000000e5';
  IF n<>0 THEN RAISE EXCEPTION 'A can read B row'; END IF;
  INSERT INTO public.entity_records(user_id,section_id,entity_type,source_id)
    VALUES ('10000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='tasks'),'task','c1-crud');
  UPDATE public.entity_records SET title='updated' WHERE source_id='c1-crud';
  IF NOT FOUND THEN RAISE EXCEPTION 'A update failed'; END IF;
  DELETE FROM public.entity_records WHERE source_id='c1-crud';
  IF NOT FOUND THEN RAISE EXCEPTION 'A delete failed'; END IF;
  UPDATE public.entity_records SET title='blocked' WHERE id='10000000-0000-0000-0000-0000000000e5';
  IF FOUND THEN RAISE EXCEPTION 'A updated B row'; END IF;
  BEGIN
    INSERT INTO public.entity_records(user_id,section_id,entity_type,source_id)
      VALUES ('10000000-0000-0000-0000-0000000000b2',(SELECT id FROM public.sections WHERE key='tasks'),'task','c1-foreign');
    RAISE EXCEPTION 'A inserted B row';
  EXCEPTION WHEN insufficient_privilege OR check_violation THEN NULL; END;
END $$;

SELECT set_config('request.jwt.claim.sub','10000000-0000-0000-0000-0000000000b2',true);
DO $$ DECLARE n integer; BEGIN
  SELECT count(*) INTO n FROM public.entity_records WHERE id='10000000-0000-0000-0000-0000000000e5';
  IF n<>1 THEN RAISE EXCEPTION 'B cannot read own row'; END IF;
  SELECT count(*) INTO n FROM public.entity_records WHERE id='10000000-0000-0000-0000-0000000000d4';
  IF n<>0 THEN RAISE EXCEPTION 'B can read A row'; END IF;
END $$;

RESET ROLE;
ROLLBACK;
SELECT '01_rls_crud passed' AS result;
