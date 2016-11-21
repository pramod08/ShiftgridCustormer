import { Action } from './scheduler/Action';
import { Subscription } from './Subscription';
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
export declare class Scheduler {
    private SchedulerAction;
    static now: () => number;
    constructor(SchedulerAction: typeof Action, now?: () => number);
    /**
     * A getter method that returns a number representing the current time
     * (at the time this function was called) according to the scheduler's own
     * internal clock.
     * @return {number} A number that represents the current time. May or may not
     * have a relation to wall-clock time. May or may not refer to a time unit
     * (e.g. milliseconds).
     */
    now: () => number;
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    schedule<T>(work: (state?: T) => void, delay?: number, state?: T): Subscription;
}
