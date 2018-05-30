import angular from 'angular'

import ganttModule from '../../index'
import ngMaterial from 'angular-material'

import recyclerPlugin from './recycler.plugin'
import recycler from './recycler.directive'
import rowController from './row.controller'

const pluginModule = 'gantt.recycler'

require('./recycler.css')
require('angular-material/angular-material.min.css')
require('angular-viewport-watch/angular-viewport-watch')

angular.module(pluginModule, [ganttModule, ngMaterial, 'angularViewportWatch'])
  .directive('ganttRecycler', recyclerPlugin)
  .directive('recycler', recycler)
  .controller('rowController', rowController)

export default pluginModule
