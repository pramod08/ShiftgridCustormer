import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';

/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * @example <caption>Map every every click to the string 'Hi'</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {any} value The value to map each source value to.
 * @return {Observable} An Observable that emits the given `value` every time
 * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 */
export function mapTo<T, R>(value: R): Observable<R> {
  return this.lift(new MapToOperator(value));
}

export interface MapToSignature<T> {
  <R>(value: R): Observable<R>;
}

class MapToOperator<T, R> implements Operator<T, R> {

  value: R;

  constructor(value: R) {
    this.value = value;
  }

  call(subscriber: Subscriber<R>, source: any): any {
    return source._subscribe(new MapToSubscriber(subscriber, this.value));
  }
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class MapToSubscriber<T, R> extends Subscriber<T> {

  value: R;

  constructor(destination: Subscriber<R>, value: R) {
    super(destination);
    this.value = value;
  }

  protected _next(x: T) {
    this.destination.next(this.value);
  }
}
