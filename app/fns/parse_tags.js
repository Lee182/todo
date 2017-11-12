function parse_tags(str) {
  var type = 'plain' // current tag
  var prev_char = ''
  return str.split('').reduce(function(arr, char, i){
    if (prev_char !== '\\') {
      if (char === '#') {type = 'tag'}
      if (char === '@') {type = 'mention'}
    }
    if (char === ' ' || char === ',' || char === '.' && type !== 'plain') {
      type = 'plain'
    }
    if (arr.length === 0 || arr[arr.length-1].type !== type) {
      arr.push({
        type, text: ''
      })
    }
    arr[arr.length-1].text += char
    prev_char = char
    return arr
  }, [])
}

function toObject(arr) {
  var o = {
    words: arr,
    words_raw: arr.reduce(function(str, item){
      return str += item.text
    },''),
    tags: [],
    mentions: []
  }
  arr.filter(function(item){
    if (item.type !== 'plain') {
      const a = item.text.substr(1)
      if (a === '') {return}
      const name = item.type +'s'
      if (o[name] === undefined) {item[name] = []}
      o[name].push( a )
    }
  })
  return o
}


module.exports = {
  toArray: parse_tags,
  toObject: function(str) {
    return toObject( parse_tags(str) )
  }
}
