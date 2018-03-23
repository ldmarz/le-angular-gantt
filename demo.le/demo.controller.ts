import moment from 'moment'
import _ from 'lodash'
import randomName from 'random-name'
import uuid from 'uuid'

export default function ($scope, $timeout) {
  'ngInject'
  $scope.data = [
    {name: 'row1', mec: 'mec1', id: 1, level: 1, tasks: [
      { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes')}
    ]}
  ]

  appendChilds(5)
  _.each($scope.data, value => {
    appendChilds(20, value.id)
  })

  const tasks = _.filter($scope.data, o => {
    return (o.parent)
  })

  _.each(tasks, value => {
    appendChilds(25, value.id)
  })

  console.log($scope.data)

  $scope.autoExpand = 'both'
  $scope.taskOutOfRange = 'resize'
  $scope.expandToFit = true
  $scope.shrinkToFit = false
  $scope.width = true
  $scope.scale = 'day'
  $scope.algo = 'aksks'

  $scope.templateRows = [{
    type: 'tree',
    headerContent: '<div> title </div>'
  }, {
    type: 'column',
    headerContent: '<div> mec </div>'
  }
  ]

  $scope.getColumnWidth = function (widthEnabled, scale, zoom) {
    return 140 * zoom
  }

  $scope.collapse = function () {
    $scope.api.tree.collapseAll()
  }

  $scope.expand = function () {
    $scope.api.tree.expandAll()
  }

  function appendChilds (limit = 1, parent = undefined) {
    for (let index = 0; index < limit; index++) {
      const name = randomName()
      $scope.data.push(
        {
          id: uuid(),
          name: name, mec: 'mec1', level: 1, parent: parent,
          tasks: [
            {
              name: name,
              from: moment().subtract(_.random(1, 10), 'hours'),
              to: moment().add(_.random(1, 10), 'hours')
            }
          ]
        }
      )
    }
  }
}
