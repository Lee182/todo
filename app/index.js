require('./lib/jonoShortcuts.js')
w.electron = require('electron')
w.Vue = require('./lib-external/vue.js')
w.wait = require('./lib/wait.js')
w.req = require('./lib/request.js')
w._ = require('lodash')

var sample_task = {
  words: 'get started installing wordpress #webdev #wordpress',
  tags: ['webdev', 'wordpess'],
  todo: new Date(),
  done: false, // or date
  time_spent: [
    // {start: 2017-01-01, end: false}
    // to
    // {start: 2017-01-01, end: 2017-01-01}
  ],
  recur: false, // or date
  deadline: false, // or date
  flagged: false // or true
}


w.modules = {
  tasks: require('./modules/tasks.js'),
  header: require('./modules/input.js')
}

vueobj = {
  el: '#app',
  data: {},
  computed: {},
  watch: {},
  methods: {},
  filters: {},

  // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  beforeCreate: function(){},
  created: function(){
    let vm = this
    console.log('created')
  },
  beforeMount: function(){},
  mounted: function(){},
  beforeUpdate: function(){},
  updated: function(){},
  beforeDestroy: function(){},
  destroyed: function(){}
}

Object.keys(modules).forEach(function(name){
  if (typeof modules[name] !== 'function') {return}
  modules[name](vueobj)
})

w.vm = new Vue(vueobj)
