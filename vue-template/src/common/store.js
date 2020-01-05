export default {
  get (query) {
    return new Promise(resolve => {
      chrome.storage.local.get(query, resolve)
    })
  },

  set (value) {
    return new Promise(resolve => {
      chrome.storage.local.set(value, resolve)
    })
  },

  remove(query) {
    return new Promise(resolve => {
      chrome.storage.local.remove(query, resolve)
    })
  },

  clear () {
    return new Promise(resolve => {
      chrome.storage.local.clear(resolve)
    })
  },

  sync (query, fn) {
    chrome.storage.local.get(query, res => {
      fn(res[query])
    })
    chrome.storage.onChanged.addListener(data => {
      if (data[query]) {
        fn(data[query].newValue)
      }
    })
  }
}
