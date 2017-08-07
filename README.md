# downtime

[Do background work during browser idle time](https://www.w3.org/TR/requestidlecallback/).

```js
const downtime = require("downtime")
```

## API

### `downtime.do(callback)`

- Schedule `callback` to run during next idle period
- Return an `id` for cancellation purposes
- Callback is invoked with an `IdleDeadline` object

```js
downtime.do(function(deadline) {
  // Do background work
})
```

### `downtime.dont(id)`

- Cancel callback represented by `id`

```
var id = downtime.do(doBackgroundWork)
downtime.dont(id)
```

## Notes

- Downtime uses `requestIdleCallback` and `cancelIdleCallback` where available
- Fallback technique is based on [this gist](https://gist.github.com/paullewis/55efe5d6f05434a)
- For [best performance](https://developers.google.com/web/updates/2015/08/using-requestidlecallback), avoid DOM manipulation during idle time

## Compatibility

- Native: [caniuse: requestIdleCallback](https://caniuse.com/#feat=requestidlecallback)
- Fallback: any JavaScript environment
