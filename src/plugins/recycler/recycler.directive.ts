import angular from 'angular'

export default function ($document, $compile) {
  'ngInject'
  // Provides customization for corner area

  return {
    restrict: 'E',
    require: '^gantt',
    scope: {
    },
    link: function (scope, element, attrs, ganttCtrl) {
      let api = ganttCtrl.gantt.api

      api.directives.on.new(scope, function (directiveName, sideContentScope, sideContentElement) {
        if (directiveName === 'ganttSideContent') {
          let tableScope = sideContentScope.$new()
          tableScope.pluginScope = scope

          let ifElement = $document[0].createElement('div')
          // angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled')
          angular.element(ifElement).addClass('side-element')

          let tableElement = $document[0].createElement('grid-side')
          angular.element(ifElement).append(tableElement)

          sideContentElement.append($compile(ifElement)(tableScope))
          console.log(sideContentElement)
        }
      })
    }
  }
}
