import moment from 'moment'
import _ from 'lodash'
import randomName from 'random-name'
import uuid from 'uuid'

export default function ($scope, $timeout) {
  'ngInject'
  $scope.data = [
    {
      name: '<div style="background-color: lightgreen"> Titutlo HTML </div>', mec: 'mec1', id: 1, level: 1, childreenCollapsed: true, tasks: [
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
    appendChilds(2, value.id)
  })

  const tasks = _.filter($scope.data, o => {
    return (o.parent)
  })

  _.each(tasks, value => {
    appendChilds(10, value.id)
  })

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
    classes: ['input-hidden'],
    headerContent: '<div> mec </div>',
    content: '<div>otroValue</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> WIDTH20 </div>',
    content: '<div>algol</div>',
    width: '10px'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div>algol</div>'
  }
  ]

  $scope.addTask = function () {
    appendChilds(1, 1)
  }

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
