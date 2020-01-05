/*
 * content page 和 inject content page window.postMessage 的对象都是同一个 window
 * 这里需要一个标识区分不同页面
 */
const HASH = Date.now() + Math.random().toString(36).substr(2)

const HANDLER_MAP = {}

// const noop = () => {}

window.addEventListener('message', e => {
    const {
        origin,
        data: { event, data }
    } = e
    if (
        origin !== window.location.origin ||
        (data && data._hash === HASH) ||
        !HANDLER_MAP[event]
    ) return
    const fn = HANDLER_MAP[event]
    const {
        params = {}, _needCb
    } = data
    fn(params, res => {
        if (_needCb) {
            $post(`resolve-${event}`, res, HASH, false)
        }
    })
})

function $post(event, params, hash, needCb = false) {
    window.postMessage({
        event,
        data: {
            params,
            _hash: hash,
            _needCb: needCb
        }
    }, window.location.origin)
}

function $emit(event, params) {
    return new Promise(resolve => {
        $on(`resolve-${event}`, resolve)
        $post(event, params, HASH, true)
    })
}

function $on(event, fn) {
    HANDLER_MAP[event] = fn
}

export default {
    $emit,
    $on
}
