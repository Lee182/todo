w.ipc = electron.ipcRenderer

module.exports = function({data, methods, watch}) {
  data.tasks = []
  data.task_input = ''

  methods.add_task = function() {
    if (vm.task_input.length === 0) {return}
    // send task_string to main.js
    ipc.send('add_task', vm.task_input)
    vm.task_input = ''
  }
  ipc.on('add_task', function(e, task){
    vm.tasks.unshift(task)
  })
  watch.tasks = function(e){
    console.log('change', e)
    console.log(JSON.stringify(vm.tasks))
  }

}
