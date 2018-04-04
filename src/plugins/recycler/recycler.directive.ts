require('./recycler.html')

export default function (GanttDirectiveBuilder, ganttLayout, rowService) {
  'ngInject'
  let builder = new GanttDirectiveBuilder('gridSide', 'plugins/recycler/recycler.html')
  builder.controller = function ($scope) {
    let hScrollBarHeight = ganttLayout.getScrollBarHeight()
    $scope.templateRows = $scope.pluginScope.templateRows
    $scope.$watch('gantt.rowsManager.rows', newValue => {
      // This watcher is to keep updated the visible rows
      rowService.allRows = newValue
    })

    $scope.gantt.api.registerEvent('recycler', 'topIndexChanged')

    $scope.getHeaderContent = function (row) {
      return $scope.pluginScope.headerContent
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
  }
  return builder.build()
}
