import $ from 'jquery'

export default function () {
  'ngInject'
  // Updates the element which are registered for the horizontal scroll event

  return {
    restrict: 'A',
    require: ['^gantt', '^ganttScrollManager'],
    link: function (scope, element, attrs, controllers) {
      let el = element[0]

      let updateListeners = function (e) {

        let i
        let l

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

    }
  }
}
