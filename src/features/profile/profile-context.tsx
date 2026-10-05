'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { permissionUpdate, ProfileRequestEpoch, type SectionPermission } from './consent';

export type ProfilePreferences = {
  display_name: string | null;
  timezone: string;
  locale: string;
  base_currency: string;
  units: string;
  ai_consent: boolean;
};
type AvailableSection = { id: string; key: string; name: string };
type ContextValue = { userId: string; profile: ProfilePreferences | null; permissions: SectionPermission[] | null; sections: AvailableSection[] | null; ready: boolean; loadError: boolean; refresh: () => Promise<void>; setAiConsent: (enabled: boolean) => Promise<boolean>; setPermission: (sectionId: string, canRead: boolean, canWrite: boolean) => Promise<boolean> };
const Context = createContext<ContextValue | null>(null);

export function AuthenticatedProfileProvider({ userId, profile: initialProfile, permissions: initialPermissions, sections: initialSections, children }: { userId: string; profile: ProfilePreferences | null; permissions: SectionPermission[] | null; sections: AvailableSection[] | null; children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [sections, setSections] = useState(initialSections);
  const [ready, setReady] = useState(Boolean(initialProfile && initialPermissions && initialSections));
  const [loadError, setLoadError] = useState(false);

  const generation = useRef(new ProfileRequestEpoch());

  const refresh = useCallback(async () => {
    const requestGeneration = generation.current.begin();
    setReady(false);
    setLoadError(false);
    setProfile(null); setPermissions(null); setSections(null);
    try {
      const client = createClient();
      const { data: { user }, error: authError } = await client.auth.getUser();
      if (authError || !user || user.id !== userId) { if (generation.current.isCurrent(requestGeneration)) { setReady(true); router.replace('/login'); } return; }
      const [profileResult, permissionsResult, sectionResult] = await Promise.all([
        client.from('profiles').select('display_name,timezone,locale,base_currency,units,ai_consent').eq('user_id', userId).maybeSingle(),
        client.from('section_permissions').select('user_id,section_id,can_read,can_write').eq('user_id', userId),
        client.from('sections').select('id,key,name').eq('active', true),
      ]);
      if (!generation.current.isCurrent(requestGeneration)) return;
      if (profileResult.error || !profileResult.data || permissionsResult.error || sectionResult.error) { setLoadError(true); setReady(true); return; }
      setProfile(profileResult.data); setPermissions(permissionsResult.data); setSections(sectionResult.data);
      setReady(true);
    } catch { if (generation.current.isCurrent(requestGeneration)) { setProfile(null); setPermissions(null); setSections(null); setLoadError(true); setReady(true); } }
  }, [router, userId]);

  useEffect(() => {
    // Profile loading is an external async synchronization operation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!initialProfile || !initialPermissions || !initialSections) void refresh();
  }, [initialProfile, initialPermissions, initialSections, refresh]);

  useEffect(() => {
    const epoch = generation.current;
    const client = createClient();
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!session || session.user.id !== userId) { generation.current.invalidate(); setReady(false); setProfile(null); setPermissions(null); setSections(null); router.replace('/login'); }
    });
    return () => { epoch.invalidate(); subscription.unsubscribe(); };
  }, [router, userId]);

  const setAiConsent = useCallback(async (enabled: boolean) => {
    const requestGeneration = generation.current.begin();
    const client = createClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || user?.id !== userId || !profile || !generation.current.isCurrent(requestGeneration)) return false;
    const { error } = await client.from('profiles').update({ ai_consent: enabled }).eq('user_id', userId);
    if (error || !generation.current.isCurrent(requestGeneration)) return false;
    setProfile((current) => current ? { ...current, ai_consent: enabled } : null); return true;
  }, [profile, userId]);

  const setPermission = useCallback(async (sectionId: string, canRead: boolean, canWrite: boolean) => {
    const requestGeneration = generation.current.begin();
    const client = createClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || user?.id !== userId || !permissions || !sections || !generation.current.isCurrent(requestGeneration)) return false;
    const row = permissionUpdate(userId, sectionId, canRead, canWrite);
    const { error } = await client.from('section_permissions').upsert(row, { onConflict: 'user_id,section_id' });
    if (error || !generation.current.isCurrent(requestGeneration)) return false;
    setPermissions((current) => current ? [...current.filter((item) => item.section_id !== sectionId), row] : null); return true;
  }, [permissions, sections, userId]);

  const value = useMemo(() => ({ userId, profile, permissions, sections, ready, loadError, refresh, setAiConsent, setPermission }), [userId, profile, permissions, sections, ready, loadError, refresh, setAiConsent, setPermission]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProfileContext() {
  const context = useContext(Context);
  if (!context) throw new Error('useProfileContext must be used within AuthenticatedProfileProvider');
  return context;
}
