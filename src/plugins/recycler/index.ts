import angular from 'angular'

import ganttModule from '../../index'
import ngMaterial from 'angular-material'

import recycleDirecitve from './recycler.directive'
import gridSide from './gridSide.directive'
import rowController from './row.controller'
import rowService from './row.service'

const pluginModule = 'gantt.recycler'

require('./recycler.css')
require('angular-material/angular-material.min.css')

angular.module(pluginModule, [ganttModule, ngMaterial])
  .directive('ganttRecycler', recycleDirecitve)
  .directive('gridSide', gridSide)
  .service('rowService', rowService)
  .controller('rowController', rowController)

export default pluginModule
