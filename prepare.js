const path = require('path')
const { writeJSON } = require('./lib/utils')
const { scrap } = require('./library')

scrap().then(data => writeJSON(path.resolve(__dirname, '../dataset.json'), data))