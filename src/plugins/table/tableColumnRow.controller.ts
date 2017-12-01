export default function ($scope) {
  'ngInject'
  $scope.getValue = function () {
    let value = $scope.$eval($scope.column, $scope.row)

    let formatter = $scope.pluginScope.formatters[$scope.column]
    if (formatter !== undefined) {
      value = formatter(value, $scope.column, $scope.row)
    }

    return value
  }

  $scope.getRowContent = function () {
    $scope.column = $scope.$$childHead.column
    let content

    if ($scope.row.model.columnContents) {
      content = $scope.row.model.columnContents[$scope.column]
    }
    if (content === undefined && $scope.column === 'model.name') {
      content = $scope.row.model.content
    }
    if (content === undefined) {
      content = $scope.pluginScope.contents[$scope.column]
    }
    if (content === undefined && $scope.column === 'model.name') {
      content = $scope.row.rowsManager.gantt.options.value('rowContent')
    }
    if (content === undefined && $scope.pluginScope.content !== undefined) {
      content = $scope.pluginScope.content
    }
    if (content === undefined) {
      return '{{::getValue()}}'
    }
    return content
  }

  $scope.getHeight = function () {
    return {'height': $scope.row.model.height, 'width': '100px'}
  }

  $scope.getClasses = function () {
    if ($scope.row.model.classes) {
      return $scope.row.model.classes
    } else {
      return []
    }
  }

  $scope.getClass = function (column) {
    return $scope.pluginScope.classes[column]
  }
}
