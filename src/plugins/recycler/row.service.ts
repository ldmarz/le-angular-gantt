import _ from 'lodash'
import angular from 'angular'
const promise = require('bluebird')

export default class RowService {
  firstRow: boolean
  allRows: Array<object> // binding to gantt.rowsManager.visibleRows
  api: any
  treeLoadingClass= 'tree-loading'

  constructor (api) {
    'ngInject'
    this.api = api
  }

  getChildreens (id) {
    return _.filter(this.allRows, o => {
      return (o.model.parent === id)
    })
  }

  collapseChildreen (row) {
    if (this.hasChildreen(row.model.id)) {
      this.addTreeLoading(row.model.id)
    }

    return promise.map(this.getChildreens(row.model.id), row => {
      row.model.isCollapsed = true
      if (row.model.parent) {
        return this.collapseChildreen(row)
      }
    })
      .delay(0)
      .then(() => {
        this.removeTreeLoading(row.model.id)
      })
  }

  expandChildreen (row) {
    this.addTreeLoading(row.model.id)

    return promise.map(this.getChildreens(row.model.id), row => {
      row.model.isCollapsed = false

      if (row.model.parent) {
        row.model.childreenCollapsed = true
      }
    })
      .delay(0)
      .then(() => {
        this.removeTreeLoading(row.model.id)
      })
  }

  findRowById (id) {
    return _.find(this.allRows, row => {
      return row.model.id === id
    })
  }

  hasChildreen (id) {
    return _.find(this.allRows, o => {
      return (o.model.parent === id)
    })
  }

  getArrowDom (rowId) {
    const arrowDom = document.querySelector(`.row-repeated[row-id="${rowId}"] a.gantt-tree-handle-button`)
    return angular.element(arrowDom)
  }

  getRefreshDom (rowId) {
    const refreshDom = document.querySelector(`.row-repeated[row-id="${rowId}"] .glyphicon-refresh.glyphicon-refresh-animate`)
    return angular.element(refreshDom)
  }

  addTreeLoading (rowId) {
    // This function only add a loading on the tree button, can be removed without issues
    const element = this.getArrowDom(rowId)
    const refresh = this.getRefreshDom(rowId)
    if (element && refresh.length === 0) {
      element.addClass(this.treeLoadingClass)
      element.append('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>')
    }
  }

  removeTreeLoading (rowId) {
    const element = this.getArrowDom(rowId)
    const refresh = this.getRefreshDom(rowId)
    if (refresh) {
      refresh.remove()
    }

    element.removeClass(this.treeLoadingClass)
  }

}
