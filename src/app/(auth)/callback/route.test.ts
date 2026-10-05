import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mock = vi.hoisted(() => ({ configured: true, exchange: vi.fn(), create: vi.fn() }));
vi.mock('@/lib/supabase-config', () => ({ hasSupabaseConfig: () => mock.configured, SUPABASE_URL: 'https://test.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' }));
vi.mock('@supabase/ssr', () => ({ createServerClient: mock.create }));
import { GET } from './route';

describe('Magic Link callback', () => {
  beforeEach(() => {
    mock.configured = true;
    mock.exchange.mockReset().mockResolvedValue({ error: null });
    mock.create.mockReset().mockReturnValue({ auth: { exchangeCodeForSession: mock.exchange } });
  });

  it('rejects a missing code without contacting Auth', async () => {
    const response = await GET(new NextRequest('https://life.test/callback'));
    expect(response.headers.get('location')).toBe('https://life.test/login?error=missing_code');
    expect(mock.create).not.toHaveBeenCalled();
  });

  it('fails safely when deployment configuration is absent', async () => {
    mock.configured = false;
    const response = await GET(new NextRequest('https://life.test/callback?code=test'));
    expect(response.headers.get('location')).toBe('https://life.test/login?error=config');
    expect(mock.exchange).not.toHaveBeenCalled();
  });

  it('rejects expired or reused codes', async () => {
    mock.exchange.mockResolvedValue({ error: new Error('expired') });
    const response = await GET(new NextRequest('https://life.test/callback?code=test'));
    expect(response.headers.get('location')).toBe('https://life.test/login?error=auth');
  });

  it('carries exchanged session cookies and rejects an external redirect', async () => {
    mock.create.mockImplementation((_url, _key, options) => {
      mock.exchange.mockImplementation(async () => {
        options.cookies.setAll([{ name: 'session', value: 'test-token', options: { httpOnly: true, secure: true, path: '/', sameSite: 'lax' } }]);
        return { error: null };
      });
      return { auth: { exchangeCodeForSession: mock.exchange } };
    });
    const response = await GET(new NextRequest('https://life.test/callback?code=test&next=https%3A%2F%2Fevil.test'));
    expect(response.headers.get('location')).toBe('https://life.test/today');
    expect(mock.exchange).toHaveBeenCalledWith('test');
    expect(response.cookies.get('session')).toMatchObject({ value: 'test-token', httpOnly: true, secure: true, path: '/', sameSite: 'lax' });
  });
});
