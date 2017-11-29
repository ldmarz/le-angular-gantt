import {get} from 'lodash'
import {levels} from '../../constant'

export default function ($scope,$rootScope) {
  'ngInject'
  $scope.levels = levels
  $scope.$parent.nodeScopes[$scope.row.model.id] = $scope
  $scope.$on('$destroy', function () {
    delete $scope.$parent.nodeScopes[$scope.row.model.id]
  })

  $scope.watchChildren = $scope.$watch('children(row)', function (newValue) {
    $scope.appendChildreen(newValue)
  })

  $scope.appendChildreen = function (newValue) {
    if (newValue) {
      // Children rows may have been filtered out
      // So we need to filter the raw hierarchy before displaying children in tree.
      let visibleRows = $scope.row.rowsManager.filteredRows

      let filteredChildrenRows = []
      for (let childRow of newValue) {
        if (visibleRows.indexOf(childRow) > -1) {
          filteredChildrenRows.push(childRow)
        }
      }

      $scope.$parent.childrenRows = filteredChildrenRows
    } else {
      $scope.$parent.childrenRows = newValue
    }
    if (get($scope, 'row.model.level', null) !== levels.TASK) {
      // this functions going to remove this watcher if the row not are a TASK
      $scope.watchChildren()
    }
  }

  $scope.isCollapseDisabled = function () {
    return !$scope.$parent.childrenRows || $scope.$parent.childrenRows.length === 0
  }

  $scope.getValue = function () {
    return $scope.row.model.name
  }

  $scope.getRowContent = function () {
    if ($scope.row.model.content !== undefined) {
      return $scope.row.model.content
    }
    if ($scope.pluginScope.content !== undefined) {
      return $scope.pluginScope.content
    }

    let content = $scope.row.rowsManager.gantt.options.value('rowContent')
    if (content === undefined) {
      content = '{{row.model.name}}'
    }
    return content
  }

  $scope.$on('angular-ui-tree:collapse-all', () => {
    $scope.reportCollapsed($scope.collapsed)
  })

  $scope.$on('angular-ui-tree:expand-all', () => {
    $scope.reportCollapsed($scope.collapsed)
  })

  $scope.reportCollapsed = function (newValue) {
    if ($scope.$modelValue._collapsed !== newValue) {
      let oldValue = $scope.$modelValue._collapsed
      $scope.$modelValue._collapsed = newValue // $modelValue contains the Row object
      if (oldValue !== undefined && newValue !== oldValue) {
        $scope.gantt.api.tree.raise.collapsed($scope, $scope.$modelValue, newValue)
        $scope.gantt.api.rows.refresh()
      }
    }
    $rootScope.$broadcast('gantt-table-content:recompile')
  }
}
