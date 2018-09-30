# EarthView

Sets a random satellite image from [Earth View with Google](http://earthview.withgoogle.com) as a wallpaper.

The dataset of the satellite images are scrapped beforehand using a script (see `install.js`) by calling multiple network requests. Feel free to fetch those images again.

## Usage
### As CLI
```
npm install -g earthview
earthview
```

### As library
```js
import {
  scrap,      // fetch newest images
  wallpapers, // cached list of wallpapers
  random,     // get random image
} from 'earthview'

const randomImage = random() 

scrap().then(wallpapers => { /* ... */ })
```