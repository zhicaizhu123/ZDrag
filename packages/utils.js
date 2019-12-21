// 节流
export const throttle = (func, interval, leading) => {
  let previous = 0
  let timer = null
  const handler = function(context, args) {
    func.apply(context, args)
  }
  return function() {
    const now = Date.now()
    if (!previous && leading === false) {
      previous = now
    }
    const remaining = interval - (now - previous)
    timer && clearTimeout(timer)
    if (remaining <= 0) {
      previous = now
      handler(this, arguments)
    } else {
      timer = setTimeout(handler, remaining, this, arguments)
    }
  }
}
