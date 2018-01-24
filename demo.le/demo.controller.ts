import moment from 'moment'

export default function ($scope) {
  'ngInject'
  $scope.data = [
    {name: 'row1', mec: 'mec1', id: '1', level: 1, tasks: [
      { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes')}
    ]}
  ]

  $scope.registerApi = function (api) {
    $scope.api = api
  }


  $scope.collapse = function () {
    $scope.api.tree.collapseAll()
  }

  $scope.expand = function () {
    $scope.api.tree.expandAll()
  }
}
