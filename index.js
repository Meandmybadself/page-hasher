'use strict'

const fsp = require('fs-promise')
const rp = require('request-promise')
const md5 = require('md5')
var pages = {}
var urls

fsp.readFile('urls.txt')
  .then((data) => {
    urls = data.toString().split("\n")
    loadNextURL()
  })

function loadNextURL() {
  if (urls.length) {
    var u = urls.shift()
    u = u.replace(/\.\.\//g, '')
    rp(u)
      .then((htmlStr) => {
        let hash = md5(htmlStr)
        if (!pages[hash]) {
          pages[hash] = {urls:[], count:0}
        }
        pages[hash].urls.push(u)
        pages[hash].count = pages[hash].count + 1
        loadNextURL()
      })
      .catch((e) => {
        pages[u] = 'error'
        loadNextURL()
      })
  } else {
    fsp.writeFile('output.txt', JSON.stringify(pages), 'utf8')
  }
}
