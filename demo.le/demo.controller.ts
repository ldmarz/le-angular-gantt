import moment from 'moment'
import _ from 'lodash'
import randomName from 'random-name'
import uuid from 'uuid'
import angular from 'angular'

export default function ($scope, $timeout) {
  'ngInject'
  $scope.data = [
    {
      name: 'wp1', unaVar: true, mec: 'mec1', id: 1, level: 1, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      name: 'wp2', unaVar: true, mec: 'mec1', id: 2, level: 1, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    },
    {
      name: 'wp3', unaVar: true, mec: 'mec1', id: 3, level: 1, tasks: [
        { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>', from: moment(), to: moment().add(60, 'minutes') }
      ]
    }
  ]

  _.each($scope.data, value => {
    appendChilds(40, value.id)
  })

  const tasks = _.filter($scope.data, o => {
    return (o.parent)
  })

  _.each(tasks, value => {
    appendChilds(10, value.id)
  })

  console.log($scope.data.length)

  $scope.autoExpand = 'both'
  $scope.taskOutOfRange = 'resize'
  $scope.expandToFit = true
  $scope.shrinkToFit = false
  $scope.width = true
  $scope.scale = 'day'
  $scope.algo = 'aksks'
  $scope.selectedRow = undefined;

  $scope.templateRows = [{
    type: 'tree',
    headerContent: '<div> title </div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> mec </div>',
    content: '<div> <div ng-if="row.model.unaVar">otroValue</div> </div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> WIDTH20 </div>',
    content: '<div> <div ng-if="row.model.unaVar">algol</div> </div>' ,
    width: '10px'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div> <div ng-if="row.model.unaVar">algol</div> </div>'
  }, {
    type: 'column',
    classes: ['input-hidden'],
    headerContent: '<div> avic </div>',
    content: '<div> <div ng-if="row.model.unaVar">algol</div> </div>'
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

  $scope.goToRow = function (id) {
    $scope.api.recycler.goToRow((row) => row.model.id === id)
  }

  $scope.addTask = function () {
    appendChilds(1, 1)
  }

  $scope.expand = function (id) {
    $scope.api.recycler.expand(id)
  }

  $scope.collapse = function (id) {
    $scope.api.recycler.collapse(id)
  }

  $scope.getColumnWidth = function (zoom = 0.666) {
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

  $scope.scrollToDate = function () {
    $scope.api.scroll.toDate(moment())
  }

  $scope.easeScrollToDate = function () {
    $scope.api.scroll.toDate(moment(), 200)
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
              from: moment().subtract(_.random(1, 10), 'days'),
              to: moment().add(_.random(30, 40), 'days')
            }
          ]
        }
      )
    }
  }
}
