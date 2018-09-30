#!/usr/bin/env node
const wallpaper = require('wallpaper')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const list = require('./parsed.json')

const randomImage = list[Math.floor(Math.random() * list.length)]
const targetPath = path.resolve(__dirname, 'wallpaper.jpg')

const downloadImage = (target, { photoUrl }) => fetch(photoUrl).then(res => res.buffer()).then(buffer => new Promise((resolve, reject) => {
  fs.writeFile(target, buffer, (err) => err ? reject(err) : resolve(target))
}))

const main = async () => {
  const target = await downloadImage(targetPath, randomImage)
  return wallpaper.set(target)
}

main()