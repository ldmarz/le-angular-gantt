import rows from './rows.test.json'
import { expect } from 'chai'
import _ from 'lodash'
import sortRows from 'plugins/recycler/helpers/sortRows'

describe('Testing function to sort rows by Hierarchy', () => {
  it('Should order', () => {
    const rowsOrdered = sortRows(rows)
    const expectedResult = [
      'row1',
      'Elle Magavern',
      'Margalit Arand',
      'Melisande Mechling',
      'Ania Garris'
    ]
    expect(_.map(rowsOrdered, 'model.name')).to.eql(expectedResult)
  })

  it.only('Should order', () => {
    const rowsOrdered = sortRows(rows)
    const expectedResult = [
      1,
      2,
      3,
      2,
      3
    ]
    console.log(_.map(rowsOrdered, 'rowLevel'))
    expect(_.map(rowsOrdered, 'rowLevel')).to.eql(expectedResult)
  })
})
