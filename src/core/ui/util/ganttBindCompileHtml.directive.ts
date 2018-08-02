export default function ($compile) {
  'ngInject'

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.thisWatcher = scope.$watch(function () {
        return scope.$eval(attrs.ganttBindCompileHtml)
      }, function (value) {
        element.html(value)
        $compile(element.contents())(scope)
        scope.thisWatcher()
      })
    }
  }
}
