import _ from 'lodash'
import { IScope } from 'angular'

export default class RowService {
  firstRow: boolean
  allRows: Array<object> // binding to gantt.rowsManager.visibleRows
  $rootScope: IScope

  constructor () {
    'ngInject'
  }

  getChildreens (id) {
    return _.filter(this.allRows, o => {
      return (o.model.parent === id)
    })
  }

  collapseChildreen (row) {
    _.each(this.getChildreens(row.model.id), row => {
      if (row.model.parent) {
        this.collapseChildreen(row)
      }
      row.model.isCollapsed = true
    })
  }

  expandChildreen (row) {
    _.each(this.getChildreens(row.model.id), row => {
      if (row.model.parent) {
        row.model.childreenCollapsed = true
      }
      row.model.isCollapsed = false
    })
  }

  findRowById (id) {
    return _.find(this.allRows, row => {
      return row.model.id === id
    })
  }
}
