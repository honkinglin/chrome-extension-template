import EVENT from '@/common/event'
import injectPage from './inject'

console.log('This is CONTENT page!')

EVENT.$emit('content-page-init', { test: 1 })

injectPage().then(() => {
    console.log('12')
    // 同步一些页面信息给 popup 页面
    EVENT.$on('sync-page', (_, cb) => {
        console.log('sync-page')
        cb()
    })
})
