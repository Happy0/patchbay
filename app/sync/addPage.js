const nest = require('depnest')

exports.gives = nest({ 'app.sync.addPage': true })

exports.needs = nest({
  'app.html.tabs': 'first',
  'router.sync.router': 'first',
  'router.sync.normalise': 'first'
})

exports.create = function (api) {
  return nest({
    'app.sync.addPage': addPage
  })

  // TODO : make it so error catching doesn't need this, move it into goTo
  function addPage (location, change, split) {
    const tabs = api.app.html.tabs()
    const page = api.router.sync.router(location)
    if (!page) return

    // TODO - review unique page id + naming system
    page.id = page.id || buildId(location)
    tabs.add(page, change, split)
  }

  function buildId (location) {
    return JSON.stringify(
      api.router.sync.normalise(location)
    )
  }
}
