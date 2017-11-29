export default function ($compile) {
  'ngInject'
  return {
	  restrict: 'A',
	  require: '^gantt',
	  link: function (scope, element, attrs, ganttCtrl) {
	    scope.scope = ganttCtrl.gantt.$scope.$parent
		  const result = scope.$eval(attrs.ganttBindCompileHtmlOneTime)
		  element.html(result)
		  $compile(element.contents())(scope)
	  }
  }
}
