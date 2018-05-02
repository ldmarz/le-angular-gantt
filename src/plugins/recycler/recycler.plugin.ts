import angular from 'angular'
import _ from 'lodash'
import sortRows from './helpers/sortRows'
let firstRender = true
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
      scope.$watch(() => checkIfNewRow(), () => {
        intializeRows()
      }, true)

      function checkIfNewRow () {
        const algo = _.map(rowService.allRows, 'isInitialized')
        return algo
      }

      function intializeRows () {
        const rowsNotInitialized = _.filter(rowService.allRows, o => !(o.isInitialized))
        _.each(rowsNotInitialized, row => {
          if (_.get(row, 'model.parent')) {
            const parent = rowService.findRowById(row.model.parent)

            if (parent) {
              row.model.isCollapsed = parent.model.childreenCollapsed
              row.model.childreenCollapsed = row.model.isCollapsed
            }
          }
          row.isInitialized = true
        })

        if (rowsNotInitialized) {
          api.rows.refresh()
        }
      }

      const filter = function (rows) {
        return _.filter(rows, o => {
          return (o.model.isCollapsed !== true && o.model.render !== false)
        })
      }

      function collapseAll () {
        const rootRows = _.filter(this.gantt.rowsManager.visibleRows, o => !(o.model.parent))
        _.each(rootRows, rootRow => {
          rootRow.model.childreenCollapsed = true
          rowService.collapseChildreen(rootRow)
        })

        this.gantt.api.rows.refresh()
      }

      function expandAll () {
        _.each(this.gantt.rowsManager.visibleRows, rootRow => {
          rootRow.model.childreenCollapsed = false
          rowService.expandChildreen(rootRow)
        })

        this.gantt.api.rows.refresh()
      }

      function expand (id) {
        const row = rowService.findRowById(id)

        if (row) {
          row.model.childreenCollapsed = false
          rowService.expandChildreen(row)
          this.gantt.api.rows.refresh()
        } else {
          console.log('Row not found!')
        }
      }

      function collapse (id) {
        const row = rowService.findRowById(id)

        if (row) {
          row.model.childreenCollapsed = true
          rowService.collapseChildreen(row)
          this.gantt.api.rows.refresh()
        } else {
          console.log('Row not found!')
        }
      }

      api.registerMethod('recycler', 'collapseAll', collapseAll, ganttCtrl)
      api.registerMethod('recycler', 'expandAll', expandAll, ganttCtrl)
      api.registerMethod('recycler', 'expand', expand, ganttCtrl)
      api.registerMethod('recycler', 'collapse', collapse, ganttCtrl)

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
        }
      })
    }
  }
}
