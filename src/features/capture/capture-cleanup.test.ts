import { describe, expect, it } from 'vitest';
import { CaptureCleanupRegistry } from './capture-controller';

describe('CaptureCleanupRegistry', () => {
  it('unregisters callbacks and runs remaining callbacks once', async () => {
    const registry = new CaptureCleanupRegistry();
    let removedCalls = 0;
    let activeCalls = 0;
    const unregister = registry.register(() => { removedCalls += 1; });
    registry.register(() => { activeCalls += 1; });
    unregister();

    await registry.disposeAll();
    await registry.disposeAll();

    expect(removedCalls).toBe(0);
    expect(activeCalls).toBe(1);
  });

  it('continues cleanup after a callback throws', async () => {
    const registry = new CaptureCleanupRegistry();
    let followingCalls = 0;
    registry.register(() => { throw new Error('cleanup failed'); });
    registry.register(() => { followingCalls += 1; });

    await expect(registry.disposeAll()).resolves.toBeUndefined();
    expect(followingCalls).toBe(1);
  });
});
