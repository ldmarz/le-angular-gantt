import moment from 'moment'

export default function ($scope) {
  'ngInject'
  $scope.data = [
    {name: 'row1', id: '1', level: 1, tasks: [
        {name: 'task1', from: moment(), to: moment().add(60, 'minutes')}
    ]},
    {
      id: '2', name: 'row2', parent: 1, level: 2, tasks: [
        { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      id: '3', name: 'row2', parent: 2, level: 3, tasks: [
        { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
      ]
    }
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
