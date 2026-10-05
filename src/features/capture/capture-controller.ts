/**
 * Shared client-side boundary reserved for the Voice Capture implementation.
 * No controller implementation exists yet; do not wire recording behavior here
 * until the phase-4 recorder/transcription lifecycle is implemented and tested.
 */
export type CaptureAvailability = 'unavailable' | 'ready';

export interface CaptureController {
  readonly availability: CaptureAvailability;
  /** Begin one authenticated user's capture session. */
  start(): Promise<void>;
  /** Stop capture and hand the session to the processing pipeline. */
  stop(): Promise<void>;
  /** Discard the current session and release all acquired resources. */
  cancel(): Promise<void>;
  /** Release microphone and transient session resources on shell teardown. */
  dispose(): Promise<void>;
}

/** Lifecycle hook registry only; it owns callbacks, not audio or UI state. */
export class CaptureCleanupRegistry {
  private readonly cleanups = new Set<() => void | Promise<void>>();

  register(cleanup: () => void | Promise<void>): () => void {
    this.cleanups.add(cleanup);
    return () => { this.cleanups.delete(cleanup); };
  }

  async disposeAll(): Promise<void> {
    const callbacks = [...this.cleanups];
    this.cleanups.clear();
    await Promise.allSettled(callbacks.map((cleanup) => Promise.resolve().then(cleanup)));
  }
}
