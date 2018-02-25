import angular from 'angular'
import _ from 'lodash'

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

      const filter = function (rows) {
        console.log('filtering...')
        const result = _.filter(rows, o => {
          return (!o.isCollapsed)
        })
        return result
      }

      const sortRowsFunction = function (rows) {
        let sortedRows = []
        let rootRows = []

        let hasParent = false

        for (let row of rows) {
          let rowParent = _.find(rows, o => {
            return (o.model.id === row.model.parent)
          })
          if (rowParent === undefined) {
            rootRows.push(row)
          } else {
            hasParent = true
          }
        }

        let handleChildren = function (row) {
          sortedRows.push(row)
          let children = _.filter(rows, o => {
            return (o.model.parent === row.model.id)
          })

          if (children !== undefined && children.length > 0) {
            let sortedChildren = children.sort(function (a, b) {
              return rows.indexOf(a) - rows.indexOf(b)
            })

            for (let sortedChild of sortedChildren) {
              handleChildren(sortedChild)
            }
          }
        }

        for (let rootRow of rootRows) {
          handleChildren(rootRow)
        }
        return sortedRows
      }
      api.rows.addRowSorter(sortRowsFunction)
      api.rows.addRowFilter(filter)

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
