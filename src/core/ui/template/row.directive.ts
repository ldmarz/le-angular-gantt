export default function (GanttDirectiveBuilder) {
  'ngInject'
  let builder = new GanttDirectiveBuilder('ganttRow')
  builder.controller = function ($scope, $element) {
    $scope.row.$element = $element
    $scope.row.$scope = $scope

    $scope.getHeight = function () {
      return {'height': $scope.row.model.height}
    }

    $scope.getClass = function () {
      if ($scope.row.model.classes) {
        return $scope.row.model.classes
      } else {
        return []
      }
    }
  }
  return builder.build()
}
