import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';

import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';

/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * @example <caption>On every click, emit array of most recent interval events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window}
 *
 * @param {Observable<any>} closingNotifier An Observable that signals the
 * buffer to be emitted on the output Observable.
 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
 * values.
 * @method buffer
 * @owner Observable
 */
export function buffer<T>(closingNotifier: Observable<any>): Observable<T[]> {
  return this.lift(new BufferOperator<T>(closingNotifier));
}

export interface BufferSignature<T> {
  (closingNotifier: Observable<any>): Observable<T[]>;
}

class BufferOperator<T> implements Operator<T, T[]> {

  constructor(private closingNotifier: Observable<any>) {
  }

  call(subscriber: Subscriber<T[]>, source: any): any {
    return source._subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
  }
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class BufferSubscriber<T> extends OuterSubscriber<T, any> {
  private buffer: T[] = [];

  constructor(destination: Subscriber<T[]>, closingNotifier: Observable<any>) {
    super(destination);
    this.add(subscribeToResult(this, closingNotifier));
  }

  protected _next(value: T) {
    this.buffer.push(value);
  }

  notifyNext(outerValue: T, innerValue: any,
             outerIndex: number, innerIndex: number,
             innerSub: InnerSubscriber<T, any>): void {
    const buffer = this.buffer;
    this.buffer = [];
    this.destination.next(buffer);
  }
}
