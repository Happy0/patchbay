const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')

const context = require('patch-context')
const git = require('patch-git')
const horcrux = require('ssb-horcrux')
const gatherings = require('patch-gatherings')
const bayGatherings = require('patchbay-gatherings')
const patchbay = require('./')
const patchcore = require('patchcore')

// polyfills
require('setimmediate')

// from more specialized to more general
const sockets = combine(
  context,
  git,
  bayGatherings, //adds menu items
  gatherings,
  horcrux,
  patchbay,
  patchcore
)

const api = entry(sockets, nest('app.html.app', 'first'))

const app = api.app.html.app()
document.body.appendChild(app)

