const fetch = require('node-fetch')
const assert = require('assert')

const range = (length) => Object.keys(Array(length).fill(0))
const chunk = (array, size) => Array.from({ length: Math.ceil(array.length / size )}, (_, i) => array.slice(i * size, i * size + size))

const check = async (id) => {
  try {
    const data = await fetch(`https://earthview.withgoogle.com/_api/${id}.json`)
    assert(data.status === 200)

    const response = await data.json()
    assert(!!(response && response.photoUrl))

    // delete nextUrl etc.
    delete response.nextUrl
    delete response.prevUrl
    delete response.nextApi
    delete response.prevApi

    return response
  } catch (err) {
    // empty
  }
  return null
}

const retrieve = (size = 9999) => chunk(range(size), 100).map(ids => async list => {
  const res = await Promise.all(ids.map(check))
  return [...list, ...res.filter(Boolean)]
}).reduce((acc, func) => acc.then(func), Promise.resolve([]))

module.exports = retrieve