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

	{% if page.btf != nil %} 
		{% assign stylesheetName = page.btf | prepend: "/css/" %}
	{% else %}
		{% assign stylesheetName = "/css/style.css" %}
	{% endif %}

  /* Add callback to add styling for below the fold content */
	var cssFile = "{{ stylesheetName | prepend: site.assets_url }}",
		fontFile = "{{ "/css/raleway.css" | prepend: site.assets_url }}",
  	head = document.getElementsByTagName('head')[0]; 

  var load = function() {
  	cb(fontFile);
  	cb(cssFile);
  };

  var cb = function(href) {
    /* Load async
      https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js*/
    var l = document.createElement('link'); 
    l.rel = 'stylesheet';
    l.media = "only x";
    l.href = href;
    head.appendChild(l);

    l.onloadcssdefined = function(cb, href){
      var defined,
        sheets = window.document.styleSheets;
      for(var i = 0, j = sheets.length; i < j; i++)
        defined = defined || (sheets[i].href && sheets[i].href.indexOf(href) > -1);
      if(defined)
        cb();
      else
        setTimeout(function() { l.onloadcssdefined(cb, href); });
    };
    l.onloadcssdefined(function() { l.media = "all"; }, href);
  };

  var localStorageSupported = function() {
    try {
      localStorage.setItem('BS-test', 'true');
      localStorage.removeItem('BS-test');
      return true;
    } catch(e) { return false; }
  };
  /* Page ID = {{ page.id }} */
  /* Page ID Replaced = {{ page.id | replace:'/','-' }} */
  /* Page URL = {{ page.url }} */
  /* Page URL Replaced = {{ page.url | replace:'/','-' }} */
  item = "{{ page.id | replace:'/','-' }}"
  if (localStorageSupported() && localStorage[item]) {
    injectRawStyle(localStorage.getItem(item));
  } else {
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
      webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(load);
    else window.addEventListener('load', load);
  }

  function injectFontsStylesheet() {
    var xhr = new XMLHttpRequest();
      xhr.open('GET', cssFile, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          injectRawStyle(xhr.responseText);
          localStorage.setItem(item, xhr.responseText);
        }
      }
    xhr.send();
  }

  function injectRawStyle(text) {
    var style = document.createElement('style');
    style.innerHTML = text;
    head.appendChild(style);
  }
</script>