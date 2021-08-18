function throttle(fn, wait) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  }
}
