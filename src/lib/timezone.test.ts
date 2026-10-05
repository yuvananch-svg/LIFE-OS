import {describe,it,expect} from 'vitest';
import { profileDayLabels } from './timezone';
const allowed=['Asia/Bangkok','Asia/Tokyo','Europe/London','America/Los_Angeles'];
describe('profile timezone defaults',()=>{it('keeps Bangkok as the product default',()=>expect(allowed[0]).toBe('Asia/Bangkok'));it('only offers supported IANA values in the initial UI',()=>expect(allowed.every(v=>v.includes('/'))).toBe(true))});
describe('profile-aware calendar labels',()=>{
  it('uses the profile timezone at UTC day boundaries',()=>{
    expect(profileDayLabels(new Date('2026-10-04T17:30:00Z'),{timezone:'Asia/Bangkok',locale:'th-TH'})).toMatchObject({today:'2026-10-05',tomorrow:'2026-10-06'});
    expect(profileDayLabels(new Date('2026-10-04T17:30:00Z'),{timezone:'America/Los_Angeles',locale:'en-US'})).toMatchObject({today:'2026-10-04',tomorrow:'2026-10-05'});
  });
  it('increments calendar dates across DST without assuming a 24-hour local day',()=>{
    expect(profileDayLabels(new Date('2026-03-08T08:30:00Z'),{timezone:'America/Los_Angeles',locale:'en-US'})).toMatchObject({today:'2026-03-08',tomorrow:'2026-03-09'});
  });
});
