const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')
const bulk = require('bulk-require')

// polyfills
require('setimmediate')

const patchbay = { 
  patchbay: {
    about: bulk(__dirname, [ 'about/**/*.js' ]),
    app: bulk(__dirname, [ 'app/**/*.js' ]),
    blob: bulk(__dirname, [ 'blob/**/*.js' ]),
    channel: bulk(__dirname, [ 'channel/**/*.js' ]),
    contact: bulk(__dirname, [ 'contact/**/*.js' ]),
    message: bulk(__dirname, [ 'message/**/*.js' ]),
    router: bulk(__dirname, [ 'router/**/*.js' ]),
    styles: bulk(__dirname, [ 'styles/**/*.js' ]),
    config: require('./config'), // shouldn't be in here ?
    contextMenu: require('patch-context'),
  }
}


// from more specialized to more general
const sockets = combine(
  // require('ssb-horcrux'),
  // require('ssb-chess'),
  // require('patch-hub'),
  // require('patch-gatherings'),
  // require('patchbay-gatherings'), // TODO collect gatherings into this
  patchbay,
  require('patchcore')
)

const api = entry(sockets, nest('app.html.app', 'first'))
const app = api.app.html.app

console.log('LOADING modules')
const yes = app()
document.body.appendChild(yes)

// function start (electron) {
//   document.body.appendChild(app(electron))
// }

// // for electro
// if (typeof window !== 'undefined') {
//   start() 
// }

// // for people building with patchbay
// start.modules = patchbay

// // for electron
// module.exports = start 

