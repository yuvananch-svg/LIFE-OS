BEGIN;
INSERT INTO auth.users(id,aud,role,email) VALUES
 ('21000000-0000-0000-0000-0000000000a1','authenticated','authenticated','lifeos-c2a-a@example.invalid'),
 ('21000000-0000-0000-0000-0000000000b2','authenticated','authenticated','lifeos-c2a-b@example.invalid');
INSERT INTO public.entity_records(id,user_id,section_id,entity_type,source_id) VALUES
 ('21000000-0000-0000-0000-0000000000d4','21000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='tasks'),'task','c2a-a'),
 ('21000000-0000-0000-0000-0000000000d5','21000000-0000-0000-0000-0000000000a1',(SELECT id FROM public.sections WHERE key='tasks'),'task','c2a-a2'),
 ('21000000-0000-0000-0000-0000000000e5','21000000-0000-0000-0000-0000000000b2',(SELECT id FROM public.sections WHERE key='tasks'),'task','c2a-b');
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','21000000-0000-0000-0000-0000000000a1',true);
INSERT INTO public.tasks(user_id,entity_id) VALUES
 ('21000000-0000-0000-0000-0000000000a1','21000000-0000-0000-0000-0000000000d4');
INSERT INTO public.entity_links(user_id,source_entity_id,target_entity_id,relation_type) VALUES
 ('21000000-0000-0000-0000-0000000000a1','21000000-0000-0000-0000-0000000000d4','21000000-0000-0000-0000-0000000000d5','supports');
DO $$ BEGIN
  BEGIN
    INSERT INTO public.tasks(user_id,entity_id) VALUES
      ('21000000-0000-0000-0000-0000000000a1','21000000-0000-0000-0000-0000000000e5');
    RAISE EXCEPTION 'cross-owner typed row accepted';
  EXCEPTION WHEN foreign_key_violation OR insufficient_privilege OR check_violation THEN NULL; END;
  BEGIN
    INSERT INTO public.entity_links(user_id,source_entity_id,target_entity_id,relation_type) VALUES
      ('21000000-0000-0000-0000-0000000000a1','21000000-0000-0000-0000-0000000000d4','21000000-0000-0000-0000-0000000000e5','supports');
    RAISE EXCEPTION 'cross-owner link accepted';
  EXCEPTION WHEN foreign_key_violation THEN NULL; END;
END $$;
RESET ROLE;
ROLLBACK;
SELECT '02a_links_typed passed' AS result;
