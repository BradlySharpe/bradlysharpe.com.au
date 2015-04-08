<script type="text/javascript">
  {% if page.btf != nil %} 
    {% assign stylesheetName = page.btf | prepend: "/css/" %}
  {% else %}
    {% assign stylesheetName = "/css/style.css" %}
  {% endif %}

	var BSStyleSheets = {
	  raleway: "{{ "/css/raleway.css" | prepend: site.assets_url }}",
	  style: "{{ stylesheetName | prepend: site.assets_url }}",
	  styleKey : "{{ page.url | replace:'/','_' }}",
	  head: document.getElementsByTagName('head')[0],
	  _localStorageSupported : function() {
	    try {
	      localStorage.setItem('test', 'test');
	      localStorage.removeItem('test');
	      return true;
	    } 
	    catch(e) { return false; }
	  },
	  _stateChange : function() {
	  	console.log(arguments);
	  	/*
	  	if (xhr.readyState === 4) {
				BSStyleSheets._injectStyle(xhr.responseText);
				localStorage.setItem(key, xhr.responseText);
			}
			*/
	  },
	  _fetchAndSet : function(key, href) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', href, true);
	    xhr.keyName = key;
	    xhr.onreadystatechange = BSStyleSheets._stateChange;
	    xhr.send();
	  },
	  _injectStyle: function(text) {
	    var style = document.createElement('style');
	    style.innerHTML = text;
	    this.head.appendChild(style);
	  },
	  _checkStyleLoaded : function(callback, href) {
	    var defined,
	      sheets = window.document.styleSheets;
	    for(var i = 0, j = sheets.length; i < j; i++)
	      defined = defined || (sheets[i].href && sheets[i].href.indexOf(href) > -1);
	    if(defined) callback();
	    else setTimeout(function() { BSStyleSheets._checkStyleLoaded(callback, href); });
	  },
	  _fetchStyle : function(href) {
	    var l = document.createElement('link'); 
	    l.rel = 'stylesheet';
	    l.media = "only x";
	    l.href = href;
	    this.head.appendChild(l);
	    this._checkStyleLoaded(function() { l.media = "all"; }, href)
	  },
	  _load : function(key, href) {
			if (this._localStorageSupported()) {
				if (localStorage[key]) this._injectStyle(localStorage.getItem(key));
				else this._fetchAndSet(key, href);
			} else {
	      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
	        webkitRequestAnimationFrame || msRequestAnimationFrame;
	      var callback = function() { BSStyleSheets._fetchStyle(href); };
	      if (raf) raf(callback);
	      else window.addEventListener('load', callback);
	    }
	  },
	  appendStyles : function() {
	    this._load("raleway", this.raleway);
	    this._load(this.styleKey, this.style);
	  }
	}

	BSStyleSheets.appendStyles();
</script>