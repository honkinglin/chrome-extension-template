import 'crx-hotreload'
import EVENT from '@/common/event'
console.log('This is BACKGROUND page!')

/**
 * 页面的图标与 popup 页面默认是不可用的
 * 在可用的页面中插入 content 脚本后通知背景页面改变图标与 popup 页面
 */
EVENT.$on('content-page-init', (_, __, sender) => {
  chrome.browserAction.setIcon({
    tabId: sender.tab.id,
    path: {
      16: 'icons/icon-128-active.png',
      48: 'icons/icon-128-active.png',
      128: 'icons/icon-128-active.png'
    }
  })

  chrome.browserAction.setPopup({
    tabId: sender.tab.id,
    popup: 'pages/popup.html'
  })
})
