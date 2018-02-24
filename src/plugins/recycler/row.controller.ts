import { get } from 'lodash'
import { levels } from '../../constant'

export default function ($scope, $rootScope) {
  'ngInject'
  $scope.levels = levels
  console.log($scope.row)
  // $scope.$parent.nodeScopes[$scope.row.model.id] = $scope
  // if (get($scope, 'row.model.level', null) === levels.TASK) {
  //   $scope.toggle()
  //   $scope.collapsed = true
  // }

  $scope.getValue = function () {
    return $scope.row.model.name
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
