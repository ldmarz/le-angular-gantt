import $ from 'jquery'
import { remove, throttle, debounce } from 'lodash'

export default function () {
  'ngInject'
  return {
    restrict: 'A',
    require: '^ganttScrollManager',
    scope: {
      selector: '@'
    },
    link: function (scope, element, attrs, ganttScrollManagerCtrl) {
      const el = (attrs.selector)
        ? $(scope.selector)
        : $(element)

      bindings(el)
      ganttScrollManagerCtrl.registerAsVerticalScrollDuplexReceiver(el)

      function bindings (element) {
        element.scroll(scrollHandler)
      }

      function scrollHandler () {

        const isDuplexSending = ganttScrollManagerCtrl.isVerticalScrollDuplexSending()

        if (!isDuplexSending) {
          setAsSender()
          ganttScrollManagerCtrl.setVerticalScrollDuplexSending(true)

          const receivers = ganttScrollManagerCtrl.getVerticalScrollDuplexReceivers()

          receivers.forEach(receiver => {
            receiver.scrollTop(el.scrollTop())
          })

          ganttScrollManagerCtrl.setVerticalScrollDuplexSending(false)
        }
      }

      function setAsSender () {
        const sender = ganttScrollManagerCtrl.getVerticalScrollDuplexSender()
        const receivers = ganttScrollManagerCtrl.getVerticalScrollDuplexReceivers()

        if (sender === el) {
          return
        }

        if (sender) {
          unbindings(sender)
          ganttScrollManagerCtrl.registerAsVerticalScrollDuplexReceiver(sender)
        }

        remove(receivers, receiver => receiver === el)
        ganttScrollManagerCtrl.registerAsVerticalScrollDuplexSender(el)

        bindings(el)
      }

      function unbindings (element) {
        element.unbind('scroll', scrollHandler)
      }

    }
  }
}
