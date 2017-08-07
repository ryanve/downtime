const downtime = typeof module != "undefined" ? require("./") : window.downtime

let id = downtime.do(function(deadline) {
  if (deadline.didTimeout !== false) throw new Error("Missing .didTimeout")
  if (typeof deadline.timeRemaining !== "function") throw new Error("Invalid .timeRemaining type: " + typeof deadline.timeRemaining)
  var remaining = deadline.timeRemaining()
  if (typeof remaining !== "number") throw new Error("Invalid .timeRemaining() return: " + remaining)
  if (remaining < 0 || remaining > 50) throw new RangeError("Invalid remaining time: " + remaining)
  console.log("remaining ms: ", remaining)
  console.log("Basic tests passed")
})

if (null == id) throw new Error("Calling downtime.do should return number")
