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
}
