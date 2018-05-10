import _ from 'lodash'
import { levels } from '../../constant'
import angular from 'angular'

export default function ($scope, $rootScope, $timeout) {
  'ngInject'
  $scope.levels = levels
  $scope.$timeout = $timeout

  $scope.getValue = function () {
    return $scope.row.model.name
  }

  $scope.collapse = async function () {
    $scope.pluginScope.rowService.addTreeLoading($scope.row.model.id)
    $scope.$timeout($scope.applyCollapse)
  }

  $scope.applyCollapse = async function () {
    if (!$scope.row.model.childreenCollapsed) {
      $scope.row.model.childreenCollapsed = true
      await $scope.pluginScope.rowService.collapseChildreen($scope.row)
    } else {
      $scope.row.model.childreenCollapsed = false
      await $scope.pluginScope.rowService.expandChildreen($scope.row)
    }
    $scope.gantt.api.rows.refresh()
    $scope.$apply()
  }

  $scope.getClassByLevel = function () {
    if ($scope.row) {
      return 'row-level-' + $scope.row.rowLevel
    }
  }

  $scope.hasChildreen = function () {
    if ($scope.row) {
      return angular.isDefined($scope.pluginScope.rowService.hasChildreen($scope.row.model.id))
    }
  }

  $scope.getRowContent = function (rowTemplate) {
    if ($scope.row) {
      if (rowTemplate.content !== undefined) {
        return rowTemplate.content
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
  }

  $scope.getClass = function (rowTemplate) {
    return rowTemplate.classes
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
