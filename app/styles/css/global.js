const nest = require('depnest')
const { assign } = Object

exports.gives = nest('styles.css')

exports.create = function (api) {
  return nest('styles.css', (sofar = {}) => {
    return assign(sofar, { globalStyles })
  })
}

const globalStyles = `
body {
  font-family: helvetica, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #222;
}

blockquote {
  border-left: 2px #ccc solid;
  color: #666;
  padding-left: .6rem;
  margin-left: .6rem;
  font-size: .85rem;
}

blockquote p:last-child {
  margin-bottom: .35ex;
}

pre {
  background-color: #f5f5f5;
  padding: .3rem;
  color: #444;
}

.emoji {
  height: 1em;
  width: 1em;
  margin-bottom: .2rem;
  vertical-align: middle;
}

p, ul, ol {
  margin-top: .35em;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
h1, h2 {
  margin-bottom: .5em
}
h1 { font-size: 1.4rem; }
h2 { font-size: 1.2em; }
h3 { font-size: 1.15rem; }
h4 { font-size: 1.12rem; }
h5 { font-size: 1.1rem; }
h6 { font-size: 1rem; }

* {
  word-break: break-word;
}

a:link, a:visited, a:active {
  color: #0088cc;
  text-decoration: none;
}

a:hover,
a:focus {
  color: #005580;
  text-decoration: underline;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

p {
  margin-top: .35ex;
}

hr {
  border: solid #eee;
  clear: both;
  border-width: 1px 0 0;
  height: 0;
  margin-bottom: .9em;
}

input, textarea {
  border: none;
  border-radius: .2em;
  font-family: sans-serif;
}

input:focus, .compose:focus, button:focus {
  outline: none;
  border-color: #0088cc; 
  box-shadow: 0 0 4px #0088cc;
}

textarea {
  padding: .5em;
  font-size: 1em;
}

textarea:focus {
  outline: none;
  border-color: none;
}

button {
  background: #fff;
  color: #666;
  border: 1px solid #bbb;
  border-radius: .5em;
  padding: .7em;
  margin: .5em;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: .7em;
}

button:hover {
  background: #ccc;
  border: 1px solid #bbb;
}

/* TextNodeSearcher highlights */

highlight {
  background: #ff8;
}

/* lightbox - used in message-confirm */

div.lightbox {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 50px;
  overflow: auto;
  width: 780px;
  max-width: 100%;
  padding: 25px;
  margin: auto;
  z-index: 2;
  background: #f5f5f5;
  border: 1px solid #eee;
  border-radius: .2em;
}
`

