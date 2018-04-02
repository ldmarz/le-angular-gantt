import moment from 'moment'
import _ from 'lodash'
import randomName from 'random-name'
import uuid from 'uuid'

export default function ($scope, $timeout) {
  'ngInject'
  $scope.data = [
    {
      name: 'wp1', mec: 'mec1', id: 1, level: 1, childreenCollapsed: true, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      name: 'wp2', mec: 'mec1', id: 2, level: 1, childreenCollapsed: true, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      name: 'wp3', mec: 'mec1', id: 3, level: 1, childreenCollapsed: true, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    }
  ]

  _.each($scope.data, value => {
    appendChilds(1, value.id)
  })

  const tasks = _.filter($scope.data, o => {
    return (o.parent)
  })

  _.each(tasks, value => {
    appendChilds(2, value.id)
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

  $scope.expand = function (id) {
    $scope.api.recycler.expand(id)
  }

  $scope.collapse = function (id) {
    $scope.api.recycler.collapse(id)
  }

  $scope.getColumnWidth = function (widthEnabled, scale, zoom) {
    return 140 * zoom
  }

  $scope.collapseAll = function () {
    $scope.api.recycler.collapseAll()
  }

  $scope.registerApi = function (api) {
    $scope.api = api
  }

  $scope.expandAll = function () {
    $scope.api.recycler.expandAll()
  }

  function appendChilds (limit = 1, parent = undefined) {
    for (let index = 0; index < limit; index++) {
      const name = randomName()
      $scope.data.push(
        {
          id: uuid(),
          name: name, mec: 'mec1', level: 1, parent: parent,
          isCollapsed: true,
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
