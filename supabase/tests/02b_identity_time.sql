BEGIN;
INSERT INTO auth.users(id,aud,role,email) VALUES
 ('22000000-0000-0000-0000-0000000000a1','authenticated','authenticated','lifeos-c2b-a@example.invalid');
INSERT INTO public.sections(id,key,name) VALUES
 ('22000000-0000-0000-0000-0000000000c5','test_wrong_b','Wrong');
INSERT INTO public.entity_records(id,user_id,section_id,entity_type,source_id) VALUES
 ('22000000-0000-0000-0000-0000000000d4','22000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='tasks'),'task','c2b-task'),
 ('22000000-0000-0000-0000-0000000000d5','22000000-0000-0000-0000-0000000000a1','22000000-0000-0000-0000-0000000000c5','task','c2b-wrong');
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','22000000-0000-0000-0000-0000000000a1',true);
DO $$ BEGIN
  BEGIN
    INSERT INTO public.tasks(user_id,entity_id) VALUES
      ('22000000-0000-0000-0000-0000000000a1','22000000-0000-0000-0000-0000000000d5');
    RAISE EXCEPTION 'wrong section accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;
  BEGIN
    UPDATE public.entity_records SET entity_type='event'
      WHERE id='22000000-0000-0000-0000-0000000000d4';
    RAISE EXCEPTION 'identity mutation accepted';
  EXCEPTION WHEN check_violation THEN
    IF SQLERRM<>'canonical entity identity is immutable' THEN RAISE; END IF;
  END;
  BEGIN
    INSERT INTO public.time_blocks(user_id,starts_at,ends_at) VALUES
      ('22000000-0000-0000-0000-0000000000a1','2026-09-22 11:00+00','2026-09-22 10:00+00');
    RAISE EXCEPTION 'invalid interval accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;
  BEGIN
    INSERT INTO public.time_blocks(user_id,starts_at,ends_at,status) VALUES
      ('22000000-0000-0000-0000-0000000000a1','2026-09-22 10:00+00','2026-09-22 11:00+00','unknown');
    RAISE EXCEPTION 'invalid status accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
RESET ROLE;
ROLLBACK;
SELECT '02b_identity_time passed' AS result;
