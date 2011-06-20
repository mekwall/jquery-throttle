(function(window) {

    var $ = window.jQuery || window.me || (window.me = {}),
        t = $.throttle = function(fn, timeout, delayed, debounce, callback) {
            timeout || (timeout = 100);
            var timer = false,
                hasCallback = (typeof callback === "function"),
                startTimer = function(wrapper, args) {
                    return setTimeout(function(){
                        timer = false;
                        if (delayed) { fn.apply(wrapper, args); }
                        if (hasCallback) { callback.apply(wrapper, args); }
                    }, timeout);
                },
                wrapper = debounce ?
                    function(){
                        if (!timer && !delayed) { fn.apply(this, arguments); }
                        clearTimeout(timer);
                        timer = startTimer(this, arguments);
                    }:
                    function(){
                        if (timer) { return; }
                        if (!delayed) { fn.apply(this, arguments); }
                        timer = startTimer(this, arguments);
                    };
            wrapper.stop = function(){ clearTimeout(timer); console.log(timer); };
            if ($.guid) { wrapper.guid = fn.guid = fn.guid || $.guid++; }
            return wrapper;
        };
    
    $.debounce = function(fn, timeout, delayed, callback) {
        return t(fn, timeout, delayed, true, callback);
    };
    
    if (window.jQuery) {
        $.fn.throttledBind = function(){
            var args = [].slice.call(arguments),
                an = (typeof args[1] === "function") ? 1 : 2;
            if (typeof args[0] === "object") {
                $.each(args[0], function(event, fn){
                    args[0][event] = $.throttle.apply(null, [fn].concat([].splice.call(args, 1, 4)));
                });
            } else {
                args[an] = $.throttle.apply(null, [].splice.call(args, an, 5));
            }
            args.slice(0, an);
            return this.bind.apply(this, args);
        };
    }
	
})(this);