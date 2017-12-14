import moment from 'moment'
import _ from 'lodash'

export default function ($scope) {
  'ngInject'
  $scope.data = [
    {name: 'row1', id: '1', level: 1, tasks: [
        {name: 'task1', from: moment(), to: moment().add(60, 'minutes')}
    ]}
  ]

  $scope.backup = [{
    id: '2', name: ' uandsnad sadas', parent: '1', level: 2, tasks: [
      { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
    ]
  },
  {
    id: '3', name: 'row2', parent: '2', level: 3, tasks: [
      { name: 'task2', from: moment(), to: moment().add(60, 'minutes') }
    ]
  }]

  $scope.registerApi = function (api) {
    $scope.api = api
    const _this = $scope
    api.core.on.ready($scope, (api) => {
      window.setTimeout(() => {
        api.tree.on.collapsed(this, (row, collapsed) => {
          if (!collapsed._collapsed) {
            _.each($scope.backup, value => {
              const aux = _.find($scope.data, {id: value.id})
              if (value.parent === collapsed.model.id && !aux) {
                $scope.data.push(value)
              }
            })
            console.log($scope.data)
          }
        })
      })
    })
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
    'model.avic': 'column-avic'
  }
  $scope.contents = {
    'model.mec': '<span>{{getValue()}}</span>',
    'model.avic': '<span>{{getValue()}}</span>'
  }
}
