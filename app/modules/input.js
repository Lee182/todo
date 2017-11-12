_ = require('lodash')
parse_tags = require('../fns/parse_tags.js')
module.exports = function({data, methods, watch}) {
  data.jtask_input = {
    words_raw: '',
    words: [],
    focus: false,
    typing: false,
    cursor: {
      show: false,
      position: 0
    }
  }
  watch['jtask_input.cursor.position'] = function(a) {
    var el = d.qs('.jtask_input .task-text')
    console.log('cursor', a, el)
  }

  methods.jtask__focus = function(){
    let vm = this
    vm.jtask_input.focus = true
  }
  methods.jtask__resume_blink = _.debounce(function(){
    let vm = this
    vm.jtask_input.typing = false
  }, 400)
}


w.on('click', function(e){
  var is_input = e.target.matches('.jtask_input')
  || e.target.qsP('.jtask_input') !== null

  if (is_input) {
    vm.jtask_input.focus = true
  } else {
    vm.jtask_input.focus = false
  }
})

w.on('keydown', function(e){
  if (vm.jtask_input.focus) {
    vm.jtask_input.typing = true
    vm.jtask__resume_blink()
    if (e.key.length >  1) {
      // special char
      if (e.key === 'Backspace') {
        var a = vm.jtask_input.words_raw.length - 1
        vm.jtask_input.words_raw = vm.jtask_input.words_raw.substr(0,a)
        var b = vm.jtask_input.cursor.position
        if (b > 0){
          vm.jtask_input.cursor.position--
        }
      }
      if (e.key === ' ') {
        e.preventDefault()
      }
      if (e.key.toLowerCase() === 'enter') {
        vm.task__add(vm.jtask_input.words_raw.trim())
        vm.jtask_input.words_raw = ''
      }
      if (e.key === 'ArrowRight') {
        if (vm.jtask_input.cursor.position <= vm.jtask_input.words_raw.length) {
          vm.jtask_input.cursor.position++
        }
      }
      if (e.key === 'ArrowLeft') {
        vm.jtask_input.cursor.position--
      }
    } else {
      vm.jtask_input.words_raw += e.key
      vm.jtask_input.cursor.position++
    }
    vm.jtask_input.words = parse_tags.toArray(vm.jtask_input.words_raw)
  }
})

w.on('keyup', function(e){})
