require('./recycler.html')

export default function (GanttDirectiveBuilder, ganttLayout, rowService) {
  'ngInject'
  let builder = new GanttDirectiveBuilder('gridSide', 'plugins/recycler/recycler.html')
  builder.controller = function ($scope) {
    let hScrollBarHeight = ganttLayout.getScrollBarHeight()

    $scope.$watch('gantt.rowsManager.rows', newValue => {
      rowService.allRows = newValue
    })

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
  }
  return builder.build()
}
