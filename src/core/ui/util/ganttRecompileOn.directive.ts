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
          console.log('create event', eventName)
          scope.$on(eventName, function (e) {
            console.log('execute event', eventName)
            console.log('listener',scope.removeListener)
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
