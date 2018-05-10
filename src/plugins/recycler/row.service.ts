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
    return promise.map(this.getChildreens(row.model.id), row => {
      row.model.isCollapsed = true
      if (row.model.parent) {
        return this.collapseChildreen(row)
      }
    })
      .then(() => {
        this.removeTreeLoading(row.model.id)
      })
  }

  expandChildreen (row) {
    return promise.map(this.getChildreens(row.model.id), row => {
      row.model.isCollapsed = false

      if (row.model.parent) {
        row.model.childreenCollapsed = true
      }
    })
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

  addTreeLoading (rowId) {
    // This function only add a loading on the tree button, can be removed without issues
    const row = this.findRowById(rowId)
    row.model.isLoading = true
  }

  removeTreeLoading (rowId) {
    const row = this.findRowById(rowId)
    row.model.isLoading = false
  }
}
