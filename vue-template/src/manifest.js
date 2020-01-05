module.exports = {
  name: 'Vue Chrome Extension',
  version: '1.0.0',
  description: 'Vue.js Chrome Extension Template',
  author: '',
  manifest_version: 2,
  icons: {
    16: 'icons/logo.png',
    48: 'icons/logo.png',
    128: 'icons/logo.png'
  },
  permissions: [
    '*://*/',
    'storage',
    'contextMenus',
    'clipboardWrite',
    'clipboardRead'
  ],
  browser_action: {
    default_icon: {
      19: 'icons/logo.png',
      38: 'icons/logo.png',
      128: 'icons/logo.png'
    },
    default_title: 'default title',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    scripts: ['js/background.js']
  },
  // devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [
    {
      js: ['js/content.js'],
      run_at: 'document_end',
      matches: ['<all_urls>'],
      all_frames: false
    }
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: ['js/page.js', 'js/content.js']
}
