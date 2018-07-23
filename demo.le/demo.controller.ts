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
    appendChilds(10, value.id)
  })

  const tasks = _.filter($scope.data, o => {
    return (o.parent)
  })

  _.each(tasks, value => {
    appendChilds(2, value.id)
  })

  console.log($scope.data.length)

  $scope.autoExpand = 'both'
  $scope.taskOutOfRange = 'resize'
  $scope.expandToFit = true
  $scope.shrinkToFit = false
  $scope.width = true
  $scope.scale = 'day'
  $scope.algo = 'aksks'
  $scope.selectedRow = undefined
  $scope.watchRowTasks = false

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

  $scope.setWidth = function () {
    $scope.api.columns.setColumnWidth(100)
  }

  $scope.setWidth2 = function () {
    $scope.api.columns.setColumnWidth(200)
  }
  $scope.setScale = function () {
    const headers = ['day', 'hour']
    const headersFormats = {
      day: 'DD-MMM-YYYY',
      hour: 'HH'
    }
    $scope.api.columns.setScale('3 hours', headers, headersFormats)
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
    $scope.api.scroll.toDateSoftly(moment())
  }
  $scope.zoomSlider = 0
  $scope.zoomSliderIsChange = function () {
    const zoom = calcZoom($scope.zoomSlider)
    const width = getColumnWidth(true, zoom)
    $scope.api.columns.setColumnWidth(width)
  }

  function calcZoom (indexZoomScale) {
    return 0.25 + ((indexZoomScale) * 0.05)
  }

  function getColumnWidth (widthEnabled, zoom) {
    if (!widthEnabled) {
      return undefined
    }
    return (140 * zoom)
  }

  function appendChilds (limit = 1, parent = undefined) {
    for (let index = 0; index < limit; index++) {
      const name = randomName()
      $scope.data.push(
        {
          id: uuid(),
          name: name, mec: 'mec1', level: 1, parent: parent, isCollapsed: false,
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
