const fetch = require('node-fetch')
const fs = require('fs')

const writeJSON = (target, data) => new Promise((resolve, reject) => {
  fs.writeFile(
    target,
    JSON.stringify(data, null, 4),
    { encoding: 'UTF-8' },
    err => err ? reject(err) : resolve(target),
  )
})

const downloadImage = (target, { photoUrl }) =>
  fetch(photoUrl)
    .then(res => res.buffer())
    .then(buffer => new Promise((resolve, reject) => {
      fs.writeFile(target, buffer, (err) => err ? reject(err) : resolve(target))
    }))

module.exports = {
  writeJSON, downloadImage
}