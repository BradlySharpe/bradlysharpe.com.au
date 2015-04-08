<script type="text/javascript">
  {% if page.btf != nil %} 
    {% assign stylesheetName = page.btf | prepend: "/css/" %}
  {% else %}
    {% assign stylesheetName = "/css/style.css" %}
  {% endif %}

	var stylesheets = {
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
	  _fetchAndSet : function(key, href) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', href, true);
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState === 4) {
	        this._injectStyle(xhr.responseText);
	        localStorage.setItem(key, xhr.responseText);
	      }
	    }
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
	    else setTimeout(function() { this._checkStyleLoaded(callback, href); });
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
	    if (this._localStorageSupported() && localStorage[key]) {
	      this._injectStyle(localStorage.getItem(key));
	    } else {
	      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
	        webkitRequestAnimationFrame || msRequestAnimationFrame;
	      if (raf) raf(function() { this._fetchStyle(href); });
	      else window.addEventListener('load', function() { this._fetchStyle(href); });
	    }
	  },
	  append : function() {
	    this._load("raleway", this.raleway);
	    this._load(this.styleKey, this.style);
	  }
	}

	stylesheets.append();
</script>