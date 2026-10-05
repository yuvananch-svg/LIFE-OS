'use client';

import {AppFrame} from '@/components/navigation';
import {useProfileContext} from '@/features/profile/profile-context';
import {profileDayLabels} from '@/lib/timezone';

export default function Page(){
  const {profile,ready}=useProfileContext();
  const labels=ready&&profile?profileDayLabels(new Date(),profile):null;
  const todayLabel=labels?new Intl.DateTimeFormat(profile!.locale,{timeZone:profile!.timezone,dateStyle:'full'}).format(new Date()):'กำลังโหลดเขตเวลา';
  return <AppFrame active="Today"><section><p className="eyebrow">{todayLabel}</p><h1 className="title">Your day, at a glance</h1><p className="subtitle">Today is ready when you are.</p>{labels&&<p className="subtitle">วันนี้ {labels.today} · พรุ่งนี้ {labels.tomorrow}</p>}<div className="grid" style={{marginTop:32}}><article className="card"><h2>เริ่มต้นอย่างเบาๆ</h2><p className="subtitle">Schedule, tasks, and small wins will appear here.</p></article><article className="card"><h2>พร้อมเมื่อคุณพร้อม</h2><p className="subtitle">ข้อมูลของคุณจะถูกแยกตามบัญชีและเวลาในโปรไฟล์</p></article></div></section></AppFrame>
}
