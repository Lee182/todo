const electron = require('electron')
const path = require('path')
const url = require('url')
const _ = require('lodash')
const fs = require('fs')
const parse_tags = require('./app/fns/parse_tags')

var w = null
const ipc = electron.ipcMain


var tasks = []
var tasks__file_path = path.join(__dirname, 'tasks.json')
var save__tasks = _.debounce(function(){
  fs.writeFile(tasks__file_path, JSON.stringify(tasks, null, 2), 'utf8', function(err, done){
    console.log('fs', err, done)
  })
}, 5000)
var read__tasks_firstread = false
var read__tasks = function() {return new Promise(function(resolve, reject){
  fs.readFile(tasks__file_path, 'utf8', function(err, buf){
    if (err) {return reject(err)}
    resolve(JSON.parse(buf.toString()))
    read__tasks_firstread = true
  })
})}

var init = function() {
  read__tasks().then(function(data){
    tasks = data
    // if window open, then send tasks
    // if window closed, then on window open request read tasks
  })
}

ipc.on('add_task', function(e, task_string) {
  var task = parse_tags.toObject(task_string)
  task.time_stamp = new Date()
  task.completed = false
  task.recur = false
  task.deadline = false
  task.time_spent = []

  console.log(task)
  tasks.unshift(task)
  e.sender.send('add_task', task)
  save__tasks()
  // TODO send all windows from the render process
})

ipc.on('all_tasks', function(e){
  e.sender.send
})

electron.app.once('ready', function () {
  w = new electron.BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#e0e1e4",
    show: false,
    titleBarStyle: 'hidden'
    // bgc and show options help prevent flickering
  })

  w.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  w.once('ready-to-show', function () {
    w.show()
  })
})
