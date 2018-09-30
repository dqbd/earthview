const scrap = require('./lib/scrap')
const wallpapers = require('./dataset.json')

const random = () => wallpapers[Math.floor(Math.random() * wallpapers.length)]

module.exports = { scrap, wallpapers, random }