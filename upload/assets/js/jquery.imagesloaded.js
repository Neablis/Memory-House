(function(a){var i="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";a.fn.imagesLoaded=function(j){function k(){var c=a(g),l=a(f);b&&(f.length?b.reject(d,c,l):b.resolve(d));a.isFunction(j)&&j.call(e,d,c,l)}function m(c){c.target.src===i||-1!==a.inArray(this,h)||(h.push(this),"error"===c.type?f.push(this):g.push(this),a.data(this,"imagesLoaded",{event:c.type,src:this.src}),o&&b.notify(d.length,h.length,g.length,f.length),0>=--n&&(setTimeout(k),d.unbind(".imagesLoaded",m)))}var e=
this,b=a.isFunction(a.Deferred)?a.Deferred():0,o=a.isFunction(b.notify),d=e.find("img").add(e.filter("img")),n=d.length,h=[],g=[],f=[];n||k();d.bind("load.imagesLoaded error.imagesLoaded",m).each(function(){var c=this.src,b=a.data(this,"imagesLoaded");b&&b.src==c?a(this).triggerHandler(b.event):(this.src=i,this.src=c)});return b?b.promise(e):e}})(jQuery);