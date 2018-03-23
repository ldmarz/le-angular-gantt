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

    if (!$scope.row.childreenCollapsed) {
      $scope.row.childreenCollapsed = true
      collapseChildreen($scope.row)
    } else {
      $scope.row.childreenCollapsed = false
      expandChildreen($scope.row)
    }

    $scope.gantt.api.rows.refresh()
  }

  function collapseChildreen (row) {
    _.each(rowService.getChildreens(row.model.id), row => {
      if (row.model.parent) {
        collapseChildreen(row)
      }
      row.isCollapsed = true
    })
  }

  function expandChildreen (row) {
    _.each(rowService.getChildreens(row.model.id), row => {
      if (row.model.parent) {
        row.childreenCollapsed = true
      }
      row.isCollapsed = false
    })
  }

  $scope.getClassByLevel = function () {
    return 'row-level-' + $scope.row.rowLevel
  }

  $scope.hasChildreen = function () {
    return rowService.getChildreens($scope.row.model.id).length > 0
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
