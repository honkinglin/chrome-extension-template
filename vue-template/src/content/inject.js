import MSG from './utils/msg'

function injectPage () {
  return new Promise(resolve => {
    const id = '__chrome-extension__'
    if (document.getElementById(id)) {
      return resolve()
    }
    const page = chrome.extension.getURL('js/page.js')
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('id', id)
    script.setAttribute('src', page)
    document.body.appendChild(script)
    MSG.$on('init-page', resolve)
  })
}

export default injectPage
