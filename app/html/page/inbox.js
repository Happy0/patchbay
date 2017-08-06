const nest = require('depnest')
const { h, Value } = require('mutant')
const pull = require('pull-stream')
const Scroller = require('pull-scroll')
const next = require('../../../junk/next-stepper')
const ref = require('ssb-ref')

exports.gives = nest({
  'app.html': {
    page: true,
    menuItem: true
  }
})

exports.needs = nest({
  'app.html': {
    filter: 'first',
    scroller: 'first'
  },
  'app.sync.goTo': 'first',
  'feed.pull.private': 'first',
  'feed.pull.rollup': 'first',
  'keys.sync.id': 'first',
  'message.html': {
    compose: 'first',
    render: 'first'
  }
})

exports.create = function (api) {
  const route = '/inbox'

  return nest({
    'app.html': {
      page: privatePage,
      menuItem: menuItem
    }
  })

  function menuItem () {
    return h('a', {
      style: { order: 2 },
      'ev-click': () => api.app.sync.goTo(route)
    }, route)
  }

  function privatePage (path) {
    if (path !== route) return

    const id = api.keys.sync.id()

    const composer = api.message.html.compose({
      meta: { type: 'post' },
      prepublish: meta => {
        meta.recps = [id, ...(meta.mentions || [])]
          .filter(m => ref.isFeed(typeof m === 'string' ? m : m.link))
        return meta
      },
      placeholder: 'Write a private message. \n\n@mention users in the first message to start a private thread.'}
    )
    const newMsgCount = Value(0)
    const newMsg = h('div', ['New Messages: ', newMsgCount])
    const { filterMenu, filterDownThrough, filterUpThrough, resetFeed } = api.app.html.filter(draw)
    const { container, content } = api.app.html.scroller({ prepend: [ newMsg, composer, filterMenu ] })

    function draw () {
      resetFeed({ container, content })

      pull(
        next(api.feed.pull.private, {old: false, limit: 100}, ['value', 'timestamp']),
        filterDownThrough(),
        pull.drain(msg => newMsgCount.set(newMsgCount() + 1))
      )

      // pull(
      //   next(api.feed.pull.private, {old: false, limit: 100}, ['value', 'timestamp']),
      //   filterDownThrough(),
      //   api.feed.pull.rollup(),
      //   Scroller(container, content, render, true, false)
      // )

      pull(
        next(api.feed.pull.private, {reverse: true, limit: 100, live: false}, ['value', 'timestamp']),
        filterUpThrough(),
        api.feed.pull.rollup(),
        Scroller(container, content, render, false, false)
      )
    }
    draw()

    function render (msgRollup) {
      return api.message.html.render(msgRollup, { layout: 'inbox' })
    }

    return container
  }
}

