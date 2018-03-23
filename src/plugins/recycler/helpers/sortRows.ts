import _ from 'lodash'

export default function sortRows (poolRows) {
  const rootRows = _.filter(poolRows, o => !(o.model.parent))
  const rowLevel = 1
  const orderedRows = []

  _.each(rootRows, rootRow => {
    handleChildren(rootRow, rowLevel)
  })

  function handleChildren (row, rowLevel) {
    row.rowLevel = rowLevel++
    orderedRows.push(row)
    const childreens = _.filter(poolRows, o => o.model.parent === row.model.id)

    _.each(childreens, childreen => {
      handleChildren(childreen, rowLevel)
    })
  }

  return orderedRows
}
