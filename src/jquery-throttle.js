(function($) {
    $.throttle = function(fn, delay, cb) {
        delay || (delay = 100);
        var throttle = false,
            callback = (typeof cb === "function");
        return function(){
            if (throttle) { return; }
            throttle = setTimeout(function(){
                throttle = false;
                if (callback) cb.apply(this, arguments);
            }, delay);
            fn.apply(this, arguments);
        };
    };
    
    $.fn.throttledBind = function(){
        var args = [].slice.call(arguments);
        if (typeof args[0] === "object") {
            $.each(args[0], function(event,fn){
                args[0][event] = $.throttle(fn, args[1] || 100, args[2]);
            });
            args = args.splice(0,1);
        } else {
            if (typeof args[1] === "function") {
                var an = 1;
            } else if (typeof args[2] === "function") {
                var an = 2;
            }
            args[an] = $.throttle(args[an], args[an+1] || 100, args[an+2]);
            args = args.splice(0,an+1);
        }
        this.bind.apply(this, args);
    };
})(jQuery);