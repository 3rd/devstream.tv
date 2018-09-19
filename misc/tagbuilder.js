const tags = require('../video-tags')

const tagMap = {}
// Pass 1 for matches
tags.forEach(tag => {
  tag.match.some(needle => {
    if (tagMap[needle] instanceof Set) {
      tagMap[needle].add(tag.label)
      return true
    } else {
      tagMap[needle] = new Set([tag.label])
    }
  })
})
// Pass 2 for includes
tags.forEach(tag => {
  if (!Array.isArray(tag.include)) return false
  tag.include.forEach(include => {
    if (tagMap[include] instanceof Set) {
      tagMap[include].add(tag.label)
      let needles = tagMap[include]
      Object.keys(tagMap).forEach(key => {
        if (key !== include) {
          let shouldInsert = false
          needles.forEach(needle => {
            if (tagMap[key].has(needle)) {
              shouldInsert = true
            }
          })
          if (shouldInsert) {
            tagMap[key].add(tag.label)
          }
        }
      })
      return true
    } else {
      tagMap[needle] = new Set([tag.label])
    }
  })
})

module.exports = function (text) {
  let input = text.toLowerCase().match(/\b(\w+)\b/g)
  let tags = {}
  input.forEach(word => {
    if (tagMap.hasOwnProperty(word)) {
      tagMap[word].forEach(label => {
        if (tags.hasOwnProperty(label)) {
          tags[label]++
        } else {
          tags[label] = 1
        }
      })
    }
  })
  return tags
}