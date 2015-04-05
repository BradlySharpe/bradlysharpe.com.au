<script type="text/javascript">
	/* Get Raleway font */
	/*
		Inline Font instead of getting it from Google
	
	WebFontConfig = {
    google: { families: [ 'Raleway:300:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
	*/

  /* Add callback to add styling for below the fold content */
	var cb = function() {
		/* Load async
			https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js*/
		var l = document.createElement('link'); 
		l.rel = 'stylesheet';
		l.media = "only x";
		{% if page.btf %} 
		l.href = "{{ page.btf | prepend: "/css/" | prepend: site.assets_url }}";
		{% else %}
		l.href = "{{ "/css/style.css" | prepend: site.assets_url }}";
		{%endif %}
		
		var h = document.getElementsByTagName('head')[0]; 
		h.appendChild(l);

		l.onloadcssdefined = function( cb ){
			var defined,
				sheets = window.document.styleSheets;
			for(var i = 0, j = sheets.length; i < j; i++)
				{% if page.btf %} 
				defined = defined || (sheets[i].href && sheets[i].href.indexOf("{{ page.btf | prepend: "/css/" | prepend: site.assets_url }}") > -1);
				{% else %}
				defined = defined || (sheets[i].href && sheets[i].href.indexOf("{{ "/css/style.css" | prepend: site.assets_url }}") > -1);
				{%endif %}
			if(defined)
				cb();
			else
				setTimeout(function() { l.onloadcssdefined(cb); });
		};
		l.onloadcssdefined(function() { l.media = "all"; });
	};

	var raf = requestAnimationFrame || mozRequestAnimationFrame ||
	    webkitRequestAnimationFrame || msRequestAnimationFrame;
	if (raf) raf(cb);
	else window.addEventListener('load', cb);
</script>