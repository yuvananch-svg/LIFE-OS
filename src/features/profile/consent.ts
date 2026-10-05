export const AI_CONSENT_COPY = {
  global: 'อนุญาตให้ AI อ่านข้อมูลในส่วนที่เปิดสิทธิ์ไว้ เพื่อสรุปและตอบคำถาม',
  transcription: 'การส่งเสียงไปยังผู้ให้บริการถอดเสียง (ยังไม่เปิดใช้)',
} as const;

export type SectionPermission = { user_id: string; section_id: string; can_read: boolean; can_write: boolean };
export type AiScopeRequest = { userId: string; sectionId: string; purpose: 'read' | 'write' };

/** Request generation prevents late async data from restoring a cleared account context. */
export class ProfileRequestEpoch {
  private value = 0;
  begin() { return ++this.value; }
  invalidate() { this.value += 1; }
  isCurrent(request: number) { return request === this.value; }
}

/** AI scope is default-deny and intersects consent with the existing CRUD permission row. */
export function allowsAiScope(aiConsent: boolean, permissions: SectionPermission[] | null, request: AiScopeRequest) {
  if (!aiConsent || !permissions) return false;
  const permission = permissions.find((item) => item.user_id === request.userId && item.section_id === request.sectionId);
  if (!permission) return false;
  return request.purpose === 'read' ? permission.can_read : permission.can_read && permission.can_write;
}

export function permissionUpdate(userId: string, sectionId: string, canRead: boolean, canWrite: boolean) {
  return { user_id: userId, section_id: sectionId, can_read: canRead, can_write: canWrite };
}
