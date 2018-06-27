export default function () {
  'ngInject'
  // The element with this attribute will scroll at the same time as the scrollSender element

  return {
    restrict: 'A',
    scope: {},
    controller: function ($scope) {
      'ngInject'
      $scope.horizontal = []
      $scope.vertical = []
      $scope.verticalSender = undefined
      $scope.registerAsVerticalScrollDuplexSender = undefined
      $scope.registerAsVerticalScrollDuplexReceiver = []
      $scope.verticalScrollDuplexIsSending = false

      this.registerVerticalReceiver = function (element) {
        element.css('position', 'relative')
        $scope.vertical.push(element[0])
      }

      this.registerHorizontalReceiver = function (element) {
        element.css('position', 'relative')
        $scope.horizontal.push(element[0])
      }

      this.getHorizontalRecievers = function () {
        return $scope.horizontal
      }

      this.getVerticalRecievers = function () {
        return $scope.vertical
      }

      this.registerScrollSender = function (element) {
        $scope.verticalSender = element
      }

      this.getVerticalSender = function () {
        return $scope.verticalSender
      }

      this.registerAsVerticalScrollDuplexSender = function (element) {
        $scope.registerAsVerticalScrollDuplexSender = element
      }

      this.registerAsVerticalScrollDuplexReceiver = function (element) {
        $scope.registerAsVerticalScrollDuplexReceiver.push(element)
      }

      this.getVerticalScrollDuplexSender = function (element) {
        return $scope.registerAsVerticalScrollDuplexSender
      }

      this.getVerticalScrollDuplexReceivers = function (element) {
        return $scope.registerAsVerticalScrollDuplexReceiver
      }

      this.isVerticalScrollDuplexSending = function () {
        return $scope.verticalScrollDuplexIsSending
      }

      this.setVerticalScrollDuplexSending = function (val) {
        $scope.verticalScrollDuplexIsSending = val
      }

    }
  }
}
