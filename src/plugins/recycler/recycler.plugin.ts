import angular from 'angular'
import _ from 'lodash'
import sortRows from './helpers/sortRows'

export default function ($document, $compile, rowService) {
  'ngInject'

  return {
    restrict: 'E',
    require: '^gantt',
    scope: {
      templateRows: '<?'
    },
    link: function (scope, element, attrs, ganttCtrl) {
      let api = ganttCtrl.gantt.api

      const filter = function (rows) {
        return _.filter(rows, o => {
          return (!o.isCollapsed && o.model.render !== false)
        })
      }

      function collapseAll () {
        const rootRows = _.filter(this.gantt.rowsManager.visibleRows, o => !(o.model.parent))
        _.each(rootRows, rootRow => {
          rootRow.childreenCollapsed = true
          rowService.collapseChildreen(rootRow)
        })

        this.gantt.api.rows.refresh()
      }

      function expandAll () {
        _.each(this.gantt.rowsManager.visibleRows, rootRow => {
          rowService.expandChildreen(rootRow)
        })

        this.gantt.api.rows.refresh()
      }

      api.registerMethod('recycler', 'collapseAll', collapseAll, ganttCtrl)
      api.registerMethod('recycler', 'expandAll', expandAll, ganttCtrl)

      api.rows.addRowSorter(sortRows)
      api.rows.addRowFilter(filter)

      api.directives.on.new(scope, function (directiveName, sideContentScope, sideContentElement) {
        if (directiveName === 'ganttSideContent') {
          let tableScope = sideContentScope.$new()
          tableScope.pluginScope = scope

          let ifElement = $document[0].createElement('div')
          // angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled')
          angular.element(ifElement).addClass('side-element')

          let tableElement = $document[0].createElement('recycler')
          angular.element(ifElement).append(tableElement)

          sideContentElement.append($compile(ifElement)(tableScope))
          console.log(sideContentElement)
        }
      })
    }
  }
}
