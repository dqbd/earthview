#!/usr/bin/env node
const wallpaper = require('wallpaper')
const path = require('path')

const { downloadImage } = require('./lib/utils')
const { random } = require('./library')

const targetPath = path.resolve(__dirname, 'wallpaper.jpg')

downloadImage(targetPath, random()).then(wallpaper.set)