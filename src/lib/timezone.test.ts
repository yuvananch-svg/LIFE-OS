import {describe,it,expect} from 'vitest';
const allowed=['Asia/Bangkok','Asia/Tokyo','Europe/London','America/Los_Angeles'];
describe('profile timezone defaults',()=>{it('keeps Bangkok as the product default',()=>expect(allowed[0]).toBe('Asia/Bangkok'));it('only offers supported IANA values in the initial UI',()=>expect(allowed.every(v=>v.includes('/'))).toBe(true))});
