require('./recycler.html')

export default function (GanttDirectiveBuilder, ganttLayout) {
  'ngInject'
  let builder = new GanttDirectiveBuilder('gridSide', 'plugins/recycler/recycler.html')
  builder.controller = function ($scope) {
    console.log('asd')
  }
  return builder.build()
}
