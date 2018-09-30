const fetch = require('node-fetch')
const assert = require('assert')
const path = require('path')
const fs = require('fs')

const range = (length) => Object.keys(Array(length).fill(0))
const chunk = (array, size) => Array.from({ length: Math.ceil(array.length / size )}, (_, i) => array.slice(i * size, i * size + size))

const check = async (id) => {
  try {
    const data = await fetch(`https://earthview.withgoogle.com/_api/${id}.json`)
    assert(data.status === 200)

    const response = await data.json()
    assert(!!(response && response.photoUrl))

    return response
  } catch (err) {
    // empty
  }
  return null
}

const retrieve = (size) => chunk(range(size), 100).map(ids => async list => {
    console.log('fetching range:', `${ids[0]} - ${ids[ids.length - 1]}`)
    const res = await Promise.all(ids.map(check))
    return [...list, ...res.filter(Boolean)]
  }).reduce((acc, func) => acc.then(func), Promise.resolve([]))

const writeJSON = (target, data) => new Promise((resolve, reject) => {
  fs.writeFile(
    target,
    JSON.stringify(data, null, 4),
    { encoding: 'UTF-8' },
    err => err ? reject(err) : resolve(),
  )
})

const main = async () => {
  const data = await retrieve(9999)
  await writeJSON(path.resolve(__dirname, 'parsed.json'), data)
}

main()