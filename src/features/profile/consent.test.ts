import { describe, expect, it } from 'vitest';
import { allowsAiScope, permissionUpdate, ProfileRequestEpoch } from './consent';

describe('AI consent scope contract', () => {
  const ownRead = [{ user_id: 'u1', section_id: 's1', can_read: true, can_write: false }];
  it('requires global consent and a matching user-owned section row', () => {
    expect(allowsAiScope(false, ownRead, { userId: 'u1', sectionId: 's1', purpose: 'read' })).toBe(false);
    expect(allowsAiScope(true, null, { userId: 'u1', sectionId: 's1', purpose: 'read' })).toBe(false);
    expect(allowsAiScope(true, [], { userId: 'u1', sectionId: 's1', purpose: 'read' })).toBe(false);
    expect(allowsAiScope(true, ownRead, { userId: 'u2', sectionId: 's1', purpose: 'read' })).toBe(false);
    expect(allowsAiScope(true, ownRead, { userId: 'u1', sectionId: 's1', purpose: 'read' })).toBe(true);
  });
  it('requires both read and write permission for a write scope', () => {
    expect(allowsAiScope(true, ownRead, { userId: 'u1', sectionId: 's1', purpose: 'write' })).toBe(false);
    const both = [{ user_id: 'u1', section_id: 's1', can_read: true, can_write: true }];
    expect(allowsAiScope(true, both, { userId: 'u1', sectionId: 's1', purpose: 'write' })).toBe(true);
  });
  it('writes explicit ownership and permission values for a new section grant', () => {
    expect(permissionUpdate('u1', 's1', true, false)).toEqual({ user_id: 'u1', section_id: 's1', can_read: true, can_write: false });
  });
  it('ignores an in-flight profile result after account invalidation or a newer request', () => {
    const epoch = new ProfileRequestEpoch();
    const oldAccountLoad = epoch.begin();
    epoch.invalidate();
    const newAccountLoad = epoch.begin();
    expect(epoch.isCurrent(oldAccountLoad)).toBe(false);
    expect(epoch.isCurrent(newAccountLoad)).toBe(true);
  });
});
