import moment from 'moment'

export default function ($scope) {
  'ngInject'
  $scope.data = [
    {
      name: 'row1',
      mec: 'mec1',
      avic: 'avic',
      id: '1',
      level: 1,
      tasks: [
        {name: 'task1', mec: 'mec', avic: 'avic1', from: moment(), to: moment().add(60, 'minutes')}
      ]
    },
    {
      id: '2', mec: 'mec', avic: 'avic2', name: 'row2', parent: 1, level: 2, tasks: [
        { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      id: '3', mec: 'mec3', avic: 'avic3', name: 'row2', parent: 2, level: 3, tasks: [
        { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
      ]
    }
  ]

  // for(let i = 0; i < 100; i++) {
  //   $scope.data.push({
  //     name: 'row',
  //     mec: 'mec',
  //     avic: 'avic',
  //     level: 1,
  //     tasks: [
  //       {name: 'task1', mec: 'mec', avic: 'avic', from: moment(), to: moment().add(60, 'minutes')}
  //     ]
  //   })
  // }

  $scope.registerApi = function (api) {
    $scope.api = api
  }

  $scope.collapse = function () {
    $scope.api.tree.collapseAll()
  }

  $scope.expand = function () {
    $scope.api.tree.expandAll()
  }

  $scope.columns = ['model.mec', 'model.avic']
  $scope.columnsHeaders = {
    'model.mec': 'MECH',
    'model.avic': 'AVIC'
  }
  $scope.headerContents = {
    'model.mec': 'MECH',
    'model.avic': 'AVIC'
  }
  $scope.columnsClasses = {
    'model.mec': 'column-input',
    'model.avic': 'column-input'
  }
  $scope.contents = {
    'model.mec': '<span>{{getValue()}}</span>',
    'model.avic': '<span>{{getValue()}}</span>'
  }
}
