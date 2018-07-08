import $ from 'jquery'
import { remove, throttle, debounce, includes } from 'lodash'
import { ScrollManager } from './scrollManager.directive'

export default function () {
  'ngInject'
  return {
    restrict: 'A',
    require: '^ganttScrollManager',
    link: function (scope, element, attrs, ganttScrollManagerCtrl: ScrollManager) {
      const el = (attrs.selector)
        ? $(element).find(attrs.selector)
        : $(element)

      let me = {
        element: el,
        lastScrollTop: el.scrollTop()
      }

      ganttScrollManagerCtrl.verticalScrollDuplexReceivers.push(me)

      me.element.on('scroll', scrollHandler)

      function scrollHandler () {

        const receivers = ganttScrollManagerCtrl.verticalScrollDuplexReceivers
        me.lastScrollTop = me.element.scrollTop()

        receivers.forEach(receiver => {
          if (!receiver.element.is(me.element)) {
            const itNeedsUpdate = me.lastScrollTop - receiver.lastScrollTop

            if (itNeedsUpdate) {
              receiver.element.scrollTop(me.element.scrollTop())
            }
          }
        })
      }
    }
  }
}
