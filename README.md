#jQuery Throttle#
A minimalistic function throttler and debouncer for jQuery (but works without it!).

Check out the [performance test](http://jsperf.com/jquery-throttle-methods) of the method used in this plugin.

##Usage##

Download the [latest version](https://raw.github.com/mekwall/jquery-throttle/master/src/jquery-throttle.min.js) and include it in your page.

The most basic way to create a throttled function, pass it to $.throttle like this:

    var fn = $.throttle(fn, [timeout], [callback], [delayed], [trailing]);
	
The same way goes when creating a debounced function:

    var fn = $.debounce(fn, [timeout], [callback], [delayed], [trailing]);
	
By default there will be a 100 ms. timeout on the throttling/debouncing, and both delayed execution and trailing is disabled.

###Example: Reduce hammering on your server by debouncing ajax lookups###

The below example will throttle the keyup event handler to only trigger every 250ms. It will have delayed execution enabled which means the event handler will trigger 250ms after the first keystroke, and not one more time until there's been a pause of at least 250ms.

    $("#searchbox").keyup($.debounce(function(){
	    // Add your ajax code here
    }, 250, null, true));

###Example: Add a throttle-enabled bind method to jQuery###

To show you one of the usecases  powerful when you add this small plugin to jQuery. It will enable you to directly bind a throttled or debounced function to any event just as easy as a normal bind.

    $.fn.throttledBind = function(){
        var args = [].slice.call(arguments),
            an = (typeof args[1] === "function") ? 1 : 2;
        if (typeof args[0] === "object") {
            $.each(args[0], function(event, fn){
                args[0][event] = $.throttle.apply(null, [fn].concat([].splice.call(args, 1, 5)));
            });
        } else {
            args[an] = $.throttle.apply(null, [].splice.call(args, an, 6));
        }
        args.slice(0, an);
        return this.bind.apply(this, args);
    };
	
The above plugin works like the original [`.bind`](http://api.jquery.com/bind/) but with the extra arguments passed to `.throttle`.

    $(window).throttledBind("scroll", function(){ console("Can only trigger every 2 seconds"); }, 2000);
	
###Test case###

See [test case on jsFiddle](http://jsfiddle.net/mekwall/2geJ9/) to see the above in action!

##Licensing##
All code is open source and dual licensed under GPL and MIT. Check the individual licenses for more information.

##Credits##
Additional credits to [Balázs Galambosi](https://github.com/galambalazs) who came up with the throttle closure which mine is based upon and [Addy Osmani](https://github.com/addyosmani) for helping out with testing and pushing me to put this on Github!

And a big thanks to John Resig for his blog post [Learning from twitter](http://ejohn.org/blog/learning-from-twitter)