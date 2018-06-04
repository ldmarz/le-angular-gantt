import $ from 'jquery'

export default function () {
  'ngInject'
  // Updates the element which are registered for the horizontal or vertical scroll event

  return {
    restrict: 'A',
    require: ['^gantt', '^ganttScrollManager'],
    link: function (scope, element, attrs, controllers) {
      let el = element[0]
      let disableVerticalScroll = false
      let lastTopScroll
      let isVerticalScroll = false
      let updateListeners = function (e) {
        let i
        let l

        if (el.scrollTop === lastTopScroll) {
          isVerticalScroll = false
        } else {
          isVerticalScroll = true
          lastTopScroll = el.scrollTop
        }

        if (!disableVerticalScroll && isVerticalScroll) {
          let vertical = controllers[1].getVerticalRecievers()
          for (i = 0, l = vertical.length; i < l; i++) {
            let vElement = vertical[i]
            if (vElement.id === 'vertical-container') {
              vElement = $(vElement).children('.md-virtual-repeat-scroller')
              $(vElement).scrollTop(el.scrollTop)
            } else if (vElement.parentNode.scrollTop !== el.scrollTop) {
              vElement.parentNode.scrollTop = el.scrollTop
            }
          }
        }

        let horizontal = controllers[1].getHorizontalRecievers()
        for (i = 0, l = horizontal.length; i < l; i++) {
          let hElement = horizontal[i]
          if (hElement.parentNode.scrollLeft !== el.scrollLeft) {
            hElement.parentNode.scrollLeft = el.scrollLeft
          }
        }
      }

      element.bind('scroll', updateListeners)

      scope.$watch(function () {
        return controllers[0].gantt.width
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          let horizontal = controllers[1].getHorizontalRecievers()
          // tslint:disable:one-variable-per-declaration
          for (let i = 0, l = horizontal.length; i < l; i++) {
            let hElement = horizontal[i]
            hElement.style.width = newValue + 'px'
          }
        }
      })

      controllers[1].registerScrollSender(el)

      function disableSender (val: boolean) {
        disableVerticalScroll = val
      }

      controllers[0].gantt.api.registerMethod('scroll', 'disableSender', disableSender, this)

    }
  }
}
