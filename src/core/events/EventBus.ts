export type EventHandler<TPayload> = (payload: TPayload) => void;

/**
 * Minimal typed publish/subscribe bus.
 *
 * Systems communicate through events rather than direct references
 * (see ARCHITECTURE.md, "Communication"). The event map generic gives
 * compile-time safety for event names and payload shapes.
 *
 * The bus is owned by `GameEngine` and passed to systems that need it —
 * it is intentionally not a global singleton.
 */
export class EventBus<TEvents extends Record<string, unknown>> {
  private readonly handlers = new Map<keyof TEvents, Set<EventHandler<never>>>();

  /**
   * Subscribe to an event. Returns an unsubscribe function so callers
   * can clean up without keeping a reference to the handler.
   */
  on<K extends keyof TEvents>(event: K, handler: EventHandler<TEvents[K]>): () => void {
    let set = this.handlers.get(event);
    if (!set) {
      set = new Set();
      this.handlers.set(event, set);
    }
    set.add(handler as EventHandler<never>);
    return () => this.off(event, handler);
  }

  off<K extends keyof TEvents>(event: K, handler: EventHandler<TEvents[K]>): void {
    this.handlers.get(event)?.delete(handler as EventHandler<never>);
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    const set = this.handlers.get(event);
    if (!set) {
      return;
    }
    for (const handler of set) {
      try {
        (handler as EventHandler<TEvents[K]>)(payload);
      } catch (error) {
        // One faulty listener must not break the others or the frame loop.
        console.error(`[EventBus] handler for "${String(event)}" threw:`, error);
      }
    }
  }

  /** Remove every subscription. Called when the engine shuts down. */
  clear(): void {
    this.handlers.clear();
  }
}
