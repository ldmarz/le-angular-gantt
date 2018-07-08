export default function () {
  'ngInject'
  // The element with this attribute will scroll at the same time as the scrollSender element

  return {
    restrict: 'A',
    scope: {},
    controller: ScrollManager
  }
}

export class ScrollManager {
  $scope: any

  verticalScrollDuplexReceivers: ScrollRecord[] = []

  constructor ($scope) {
    'ngInject'
    this.$scope = $scope
    this.$scope.horizontal = []
    this.$scope.vertical = []
    this.$scope.verticalSender = undefined
  }

  registerVerticalReceiver (element) {
    element.css('position', 'relative')
    this.$scope.vertical.push(element[0])
  }

  registerHorizontalReceiver (element) {
    element.css('position', 'relative')
    this.$scope.horizontal.push(element[0])
  }

  getHorizontalRecievers () {
    return this.$scope.horizontal
  }

  getVerticalRecievers () {
    return this.$scope.vertical
  }

  registerScrollSender (element) {
    this.$scope.verticalSender = element
  }

  getVerticalSender () {
    return this.$scope.verticalSender
  }

}
