import $ from 'jquery'

export default function () {
  'ngInject'
  // The element with this attribute will scroll at the same time as the scrollSender element

  return {
    restrict: 'A',
    require: '^ganttScrollManager',
    scope: {
      opts: '=ganttVerticalScrollListenerOptions'
    },
    link: function (scope, element, attrs, ganttScrollManagerCtrl) {
      const el = (scope.opts.selector)
        ? $(scope.opts.selector)
        : element

      const verticalSender = $(ganttScrollManagerCtrl.getVerticalSender())

      function updateListeners () {
        if (scope.opts.enable) {
          verticalSender.scrollTop(el[0].scrollTop)
        }
      }

      el.bind('scroll', updateListeners)

    }
  }
}
