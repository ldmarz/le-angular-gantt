import angular from 'angular'
import _ from 'lodash'
import sortRows from './helpers/sortRows'
let firstRender = true
import rowService from './row.service'
const promise = require('bluebird')

export default function ($document, $compile, $timeout) {
  'ngInject'

  return {
    restrict: 'E',
    require: '^gantt',
    scope: {
      templateRows: '<?'
    },
    link: function (scope, element, attrs, ganttCtrl) {
      let api = ganttCtrl.gantt.api
      scope.ganttCtrl = ganttCtrl
      scope.rowService = new rowService(api)
      scope.lastInitialized = ''

      scope.$watch(() => checkIfNewRow(), intializeRows, true)

      function checkIfNewRow () {
        const obj = _.find(scope.rowService.allRows, o => !o.isInitialized)
        return _.get(obj, 'model.id', false)
      }

      function intializeRows (results) {
        if (!results) {
          const rowsNotInitialized = _.filter(scope.rowService.allRows, o => !(o.isInitialized))
          _.each(rowsNotInitialized, row => {
            if (_.get(row, 'model.parent')) {
              const parent = scope.rowService.findRowById(row.model.parent)

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
      }

      const filter = function (rows) {
        return _.filter(rows, o => {
          return (o.model.isCollapsed !== true && o.model.render !== false)
        })
      }

      function collapseAll () {
        const rootRows = _.filter(this.gantt.rowsManager.visibleRows, o => !(o.model.parent))
        return promise.map(rootRows, rootRow => {
          rootRow.model.childreenCollapsed = true
          return scope.rowService.collapseChildreen(rootRow)
        })
          .then(() => {
            this.gantt.api.rows.refresh()
            scope.$apply()
          })
      }

      function expandAll () {
        return promise.map(this.gantt.rowsManager.visibleRows, async rootRow => {
          await scope.rowService.expandChildreen(rootRow)
          rootRow.model.childreenCollapsed = false
        })
          .then(() => {
            this.gantt.api.rows.refresh()
            scope.$apply()
          })
      }

      function expand (id) {
        scope.rowService.addTreeLoading(id)
        const row = scope.rowService.findRowById(id)

        if (row) {
          $timeout(async () => {
            row.model.childreenCollapsed = false
            await scope.rowService.expandChildreen(row)
            this.gantt.api.rows.refresh()
            scope.$apply()
          })
        } else {
          console.log('Row not found!')
        }
      }

      async function collapse (id) {
        scope.rowService.addTreeLoading(id)
        const row = scope.rowService.findRowById(id)

        if (row) {
          $timeout(async () => {
            row.model.childreenCollapsed = true
            await scope.rowService.collapseChildreen(row)
            this.gantt.api.rows.refresh()
            scope.$apply()
          })
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
