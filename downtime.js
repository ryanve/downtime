!function(root, name, make) {
  if (typeof module != "undefined" && module.exports) module.exports = make()
  else root[name] = make()
}(this, "downtime", function() {

  var didTimeout = "didTimeout"
  var timeRemaining = "timeRemaining"
  var win = typeof window != "undefined" && window
  var ric = win && win.requestIdleCallback
  var cic = win && win.cancelIdleCallback
  var had = !!cic && !!ric
  var now = Date.now || function() {
    return (new Date).getTime()
  }

  function request(cb, ops) {
    return ric.apply(win, arguments)
  }

  function cancel(id) {
    return cic.call(id)
  }

  function Deadline() {
    var start = now()
    this[didTimeout] = false
    this[timeRemaining] = function() {
      var cap = 50
      var spent = now() - start
      var remaining = cap - spent
      return remaining < 0 ? 0 : remaining
    }
  }

  function set(cb) {
    return setTimeout(function() {
      cb(new Deadline)
    }, 1)
  }

  function clear(id) {
    clearTimeout(id)
  }

  return {
    "Deadline": Deadline,
    "do": had ? request : set,
    "dont": had ? cancel : clear
  }
});
