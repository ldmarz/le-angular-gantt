import _ from 'lodash'
import { levels } from '../../constant'

export default function ($scope, $rootScope, rowService) {
  'ngInject'
  $scope.levels = levels

  // $scope.$parent.nodeScopes[$scope.row.model.id] = $scope
  // if (get($scope, 'row.model.level', null) === levels.TASK) {
  //   $scope.toggle()
  //   $scope.collapsed = true
  // }

  $scope.getValue = function () {
    return $scope.row.model.name
  }

  $scope.collapse = function () {

    if (!$scope.row.model.childreenCollapsed) {
      $scope.row.model.childreenCollapsed = true
      rowService.collapseChildreen($scope.row)
    } else {
      $scope.row.model.childreenCollapsed = false
      rowService.expandChildreen($scope.row)
    }

    $scope.gantt.api.rows.refresh()
  }

  $scope.getClassByLevel = function () {
    return 'row-level-' + $scope.row.rowLevel
  }

  $scope.hasChildreen = function () {
    return rowService.getChildreens($scope.row.model.id).length > 0
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

  // $scope.$watch('collapsed', function (newValue) {
  //   if ($scope.$modelValue._collapsed !== newValue) {
  //     let oldValue = $scope.$modelValue._collapsed
  //     $scope.$modelValue._collapsed = newValue // $modelValue contains the Row object
  //     if (oldValue !== undefined && newValue !== oldValue) {
  //       $scope.gantt.api.tree.raise.collapsed($scope, $scope.$modelValue, newValue)
  //       $scope.gantt.api.rows.refresh()
  //     }
  //   }
  // })
}
