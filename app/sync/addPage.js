const nest = require('depnest')

exports.gives = nest({ 'app.sync.addPage': true })

exports.needs = nest({
  'app.html.tabs': 'first',
  'router.sync.router': 'map'
})

exports.create = function (api) {
  return nest({
    'app.sync': { addPage }
  })

  // TODO : make it so error catching doesn't need this, move it into goTo
  function addPage (path, change, split) {
    const tabs = api.app.html.tabs()

    const page = api.router.sync.router(path)
    if (!page) return

    page.id = page.id || path
    tabs.add(page, change, split)
  }
}

