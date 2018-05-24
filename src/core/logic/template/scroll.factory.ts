import {IAugmentedJQuery} from 'angular'
import {Gantt} from '../gantt.factory'

export class GanttScroll {
  $element: IAugmentedJQuery
  gantt: Gantt

  cachedScrollLeft: number

  constructor (gantt: Gantt) {
    this.gantt = gantt

    this.gantt.api.registerEvent('scroll', 'scroll')

    this.gantt.api.registerMethod('scroll', 'to', this.scrollTo, this)
    this.gantt.api.registerMethod('scroll', 'toDate', this.scrollToDate, this)
    this.gantt.api.registerMethod('scroll', 'toDateSoftly', this.scrollToDateSoftly, this)
    this.gantt.api.registerMethod('scroll', 'left', this.scrollToLeft, this)
    this.gantt.api.registerMethod('scroll', 'right', this.scrollToRight, this)

    this.gantt.api.registerMethod('scroll', 'setWidth', this.setWidth, this)
  }

  getScrollLeft () {
    if (this.$element === undefined) {
      return undefined
    } else {
      if (this.cachedScrollLeft === undefined) {
        this.cachedScrollLeft = this.$element[0].scrollLeft
      }

      return this.cachedScrollLeft
    }
  }

  getScrollWidth () {
    return this.$element === undefined ? undefined : this.$element[0].scrollWidth
  }

  getWidth () {
    return this.$element === undefined ? undefined : this.$element[0].offsetWidth
  }

  setWidth (width) {
    if (this.$element[0]) {
      // TODO: Implement this properly
      // this.$element[0].offsetWidth = width;
    }
  }

  getBordersWidth () {
    if (this.$element === undefined) {
      return undefined
    }

    if (this.$element[0].clientWidth) {
      return this.$element[0].offsetWidth - this.$element[0].clientWidth
    } else {
      // fix for IE11
      let borderLeft = window.getComputedStyle(this.$element[0]).getPropertyValue('border-left-width') ? window.getComputedStyle(this.$element[0]).getPropertyValue('border-left-width').match(/\d+/)[0] : '0'
      let borderRight = window.getComputedStyle(this.$element[0]).getPropertyValue('border-right-width') ? window.getComputedStyle(this.$element[0]).getPropertyValue('border-right-width').match(/\d+/)[0] : '0'

      return parseInt(borderLeft, 10) + parseInt(borderRight, 10)
    }
  }

  getBordersHeight () {
    return this.$element === undefined ? undefined : (this.$element[0].offsetHeight - this.$element[0].clientHeight)
  }

  isVScrollbarVisible () {
    if (this.$element !== undefined) {
      return this.$element[0].scrollHeight > this.$element[0].offsetHeight
    }
  }

  isHScrollbarVisible () {
    if (this.$element !== undefined) {
      return this.$element[0].scrollWidth > this.$element[0].offsetWidth
    }
  }

  /**
   * Scroll to a position
   *
   * @param {number} position Position to scroll to.
   */
  scrollTo (position) {
    this.$element[0].scrollLeft = position
    this.$element.triggerHandler('scroll')
  }

  /**
   * Scroll to the left side
   *
   * @param {number} offset Offset to scroll.
   */
  scrollToLeft (offset) {
    this.$element[0].scrollLeft -= offset
    this.$element.triggerHandler('scroll')
  }

  /**
   * Scroll to the right side
   *
   * @param {number} offset Offset to scroll.
   */
  scrollToRight (offset) {
    this.$element[0].scrollLeft += offset
    this.$element.triggerHandler('scroll')
  }

  /**
   * Scroll to a date
   *
   * @param {moment} date moment to scroll to.
   */
  scrollToDate (date) {
    const position = this.gantt.getPositionByDate(date)

    if (position !== undefined) {
      this.$element[0].scrollLeft = position - this.$element[0].offsetWidth / 2
    }
  }

  /**
   * Scroll to a date
   *
   * @param {moment} date moment to scroll to.
   * @param {integer} duration rate time of the animation.
   */
  scrollToDateSoftly (date, duration = 200) {
    const position = this.gantt.getPositionByDate(date)
    const element = this.$element[0]
    if (position !== undefined) {
      const change = (position - element.offsetWidth / 2) - element.scrollLeft
      this.scrollToPositionAsEaseInOutQuad(change, duration)
    }
  }

  /**
   * ease in out quad
   *
   * @param {float} change is the change between the beginning and destination value of the property.
   * @param {integer} duration is the total time of the tween.
   */
  scrollToPositionAsEaseInOutQuad (change, duration) {
    const increment = 20
    const element = this.$element[0]
    const from = element.scrollLeft
    let currentTime = 0
    const animateScroll = () => {
      currentTime += increment
      element.scrollLeft = this.easeInOutQuad(currentTime, from, change, duration)
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }
    animateScroll()
  }

  /**
   * ease in out quad
   *
   * @param {integer} time is the current time (or position) of the tween.
   * @param {integer} from is the beginning value of the property.
   * @param {float} change is the change between the beginning and destination value of the property.
   * @param {integer} duration is the total time of the tween.
   */
  easeInOutQuad = function (time, from, change, duration) {
    console.log(time, from, change, duration)
    time /= duration / 2
    if (time < 1) return change / 2 * time * time + from
    time--
    return -change / 2 * (time * (time - 2) - 1) + from
  }

}

export default function () {
  'ngInject'

  return GanttScroll
}
