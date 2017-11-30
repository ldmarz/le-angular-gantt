export default function ($compile) {
  'ngInject'

  return {
    scope: true,
    priority: 5,
    restrict: 'A',
    compile: function (element) {
      const html = element[0].outerHTML
      let removeListener
      return function linkFn (scope, element, attrs) {

        let recompileOnEvent = function (eventName) {
          scope.$on(eventName, function (e) {
            if (scope.removeListener !== undefined) {
              scope.removeListener()
            }
            scope.$evalAsync(function () {
              let newEl = $compile(html)(scope.$parent)
              element.replaceWith(newEl)
              scope.$destroy()
            })
          })
        }
        scope.removeListener = recompileOnEvent(attrs.ganttRecompileOn)
      }
    }
  }
}
