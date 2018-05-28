import $ from 'jquery'
require('./recycler.html')
import _ from 'lodash'

export default function (GanttDirectiveBuilder, ganttLayout, $timeout) {
  'ngInject'
  let builder = new GanttDirectiveBuilder('gridSide', 'plugins/recycler/recycler.html')
  builder.controller = function ($scope, element) {
    $scope.verticalScrollOpts = {
      selector: '.md-virtual-repeat-scroller',
      enable: false
    }
    let hScrollBarHeight = ganttLayout.getScrollBarHeight()
    $scope.templateRows = $scope.pluginScope.templateRows
    $scope.pluginScope.noCollapsible = $scope.pluginScope.noCollapsible ? $scope.pluginScope.noCollapsible : []

    $scope.$watch('gantt.rowsManager.rows', newValue => {
      // This watcher is to keep updated the visible rows
      $scope.pluginScope.rowService.allRows = newValue
    })

    $scope.gantt.api.registerEvent('recycler', 'topIndexChanged')

    $scope.getHeaderContent = function (row) {
      return $scope.pluginScope.headerContent
    }

    $scope.getTemplateWidth = function () {
      let width = []
      _.each($scope.templateRows, templateRow => {
        width.push(templateRow.width || '100px')
      })

      return width.join(' ')
    }

    $scope.getLabelsCss = function () {
      let css = {}

      let maxHeight = $scope.maxHeight
      if (!maxHeight) {
        maxHeight = $scope.gantt.getContainerHeight()
      }

      let bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0
      css['max-height'] = maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px'
      css['height'] = css['max-height']

      return css
    }

    $scope.getClassHeaderByType = function (row) {
      let classes = []
      switch (row.type) {
        case 'tree':
          classes = ['tree-header']
          break
        case 'column':
          classes = ['tree-header']
      }
      return classes
    }

    $scope.$watch(() => {
      const rowRepeated = document.querySelector('.row-repeated') as HTMLElement
      if (rowRepeated) {
        return rowRepeated.offsetWidth
      }
      return undefined
    }, width => {
      if (width) {
        const recyclerElements = document.querySelectorAll('#vertical-container, .md-virtual-repeat-scroller, .md-virtual-repeat-offsetter') as NodeListOf<HTMLElement>
        recyclerElements.forEach(element => {
          element.style.width = width + 'px'
        })
      }
    })

    // allRows contains the rows to be recycled
    $scope.allRows = {
      value: 1,
      getItemAtIndex: (index) => {
        return $scope.gantt.rowsManager.visibleRows[index]
      },
      getLength: () => {
        return $scope.gantt.rowsManager.visibleRows.length
      }
    }

    $scope.topIndex = 0

    $scope.$watch('topIndex', newValue => {
      $scope.gantt.api.recycler.raise.topIndexChanged(newValue)
    })

    function goToRow (predicate) {

      const index = _.findIndex($scope.gantt.rowsManager.visibleRows, predicate)

      if (!index) { return new Error('Row not found') }

      $scope.topIndex = index
      $scope.verticalScrollOpts.enable = true
      $scope.gantt.api.rows.refresh()

      $timeout(function () {
        $scope.verticalScrollOpts.enable = false
      })
    }

    $scope.isEven = (row, pool) => {
      return _.indexOf(pool,row) % 2
    }

    function SyncRows () {
      const $element = $(element[0])
      const $ganttSide = $element.parents('.gantt-side')

      const $recyclerScroll = $element.find('.md-virtual-repeat-scroller')
      const $gridSideBackground = $ganttSide.find('.gantt-side-background-body')
      const $ganttSideScroll = $ganttSide.siblings('.gantt-scrollable')

      let listen = false

      function callee () {
        if (listen) {
          $gridSideBackground.scrollTop($recyclerScroll.scrollTop())
          $ganttSideScroll.scrollTop($recyclerScroll.scrollTop())
        }
      }

      $recyclerScroll.mouseenter(() => {
        listen = true,
        $scope.gantt.api.scroll.disableSender(true)

      })

      $recyclerScroll.mouseleave(() => {
        listen = false
        $scope.gantt.api.scroll.disableSender(false)
      })
      $recyclerScroll.scroll(callee)
    }

    SyncRows()

    $scope.gantt.api.registerMethod('recycler', 'goToRow', goToRow, $scope.gantt.api)

  }
  return builder.build()
}
