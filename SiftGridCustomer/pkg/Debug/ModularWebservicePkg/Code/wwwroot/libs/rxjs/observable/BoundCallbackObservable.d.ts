import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Scheduler } from '../Scheduler';
import { AsyncSubject } from '../AsyncSubject';
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
export declare class BoundCallbackObservable<T> extends Observable<T> {
    private callbackFunc;
    private selector;
    private args;
    private scheduler;
    subject: AsyncSubject<T>;
    static create<R>(callbackFunc: (callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<R>(callbackFunc: (callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): () => Observable<R>;
    static create<T, R>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T) => Observable<R>;
    static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
    static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
    static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
    static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
    static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
    static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
    constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
    protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
    static dispatch<T>(state: {
        source: BoundCallbackObservable<T>;
        subscriber: Subscriber<T>;
    }): void;
}
