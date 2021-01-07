//$(function(){if(!window.console){window.console={};}var m=["log","info","warn","error","debug","trace","dir","group","groupCollapsed","groupEnd","time","timeEnd","profile","profileEnd","dirxml","assert","count","markTimeline","timeStamp","clear"];for(var i=0;i<m.length;i++){if(!window.console[m[i]]){window.console[m[i]]=function(){};}}$('a[href*=#]:not([href=#])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},500);return false;}}});});


$(function() {

	if (!window.console) { window.console = {}; }

	// union of Chrome, FF, IE, and Safari console methods
	var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];

	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {	window.console[m[i]] = function() {};	}
	}

	/*
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	        if (target.length) {
	            $('html,body').animate({
	                scrollTop: target.offset().top
	            }, 500);
	        	return false;
            }
        }
    });
    */
});