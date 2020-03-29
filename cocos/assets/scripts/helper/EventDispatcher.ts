/*
 * @Author: pqs
 * @Date: 2020/3/26
 */
/**
 *Listener
 *
 * @interface Listener
 */
interface Listener {
  (message?: any): void
}
/**
 *Events
 *
 * @interface Events
 */
interface Events {
  name: string
  listener: Listener
}
/**
 *EventDispatcher
 *
 * @export
 * @class EventDispatcher
 */
class EventDispatcher {
  private constructor() {
    this.EventList = new Array<Events>()
  }
  private static instance: EventDispatcher
  /**
   *EventDispatcher
   *
   * @static
   * @returns {EventDispatcher}
   * @memberof EventDispatcher
   */
  static getInstance(): EventDispatcher {
    this.instance = this.instance || new EventDispatcher()
    return this.instance
  }
  /**
   *EventList
   *
   * @private
   * @type {Events[]}
   * @memberof EventDispatcher
   */
  private EventList: Events[]
  /**
   *addEventListener
   *
   * @param {string} name
   * @param {Listener} listener
   * @memberof EventDispatcher
   */
  public on(name: string, listener: Listener): void {
    this.EventList.push({
      name: name,
      listener: listener
    })
  }
  /**
   *removeEventListener
   *
   * @param {string} name
   * @memberof EventDispatcher
   */
  public off(name: string, listener: Listener): void {
    this.EventList = this.EventList.filter(event => !(event.name === name && event.listener === listener))
  }
  /**
   *dispatchEvent
   *
   * @param {string} name
   * @param {*} [message]
   * @memberof EventDispatcher
   */
  public dispatch(name: string, ...args:any): void {
    this.EventList.filter(event => event.name === name)
      .map(event => event.listener)
      .forEach(listener => listener(...args))
  }
}


const events = EventDispatcher.getInstance()
const fn = () => {
  console.log('1111')
}
events.on('click', fn)

events.dispatch('click')

events.off('click', fn)

events.dispatch('click')

module.exports = EventDispatcher