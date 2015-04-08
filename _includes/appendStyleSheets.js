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
    head: document.getElementsByTagName("head")[0],
    _localStorageSupported: function() {
			try {
				return localStorage.setItem("test", "test"), localStorage.removeItem("test"), !0
			} catch (e) {
				return !1
			}
    },
    _fetchAndSet: function(key, href) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", href, !0), xhr.onreadystatechange = function() {
				4 === xhr.readyState && (BSStyleSheets._injectStyle(xhr.responseText), localStorage.setItem(key, xhr.responseText))
			}, xhr.send()
    },
    _injectStyle: function(text) {
      var style = document.createElement("style");
      style.innerHTML = text, this.head.appendChild(style)
    },
    _checkStyleLoaded: function(callback, href) {
      for (var defined, stylesheets = window.document.styleSheets, o = 0, l = stylesheetslength; l > o; o++) 
        defined = defined || stylesheets[o].href && stylesheets[o].href.indexOf(t) > -1;
      defined ? callback() : setTimeout(function() {
        BSStyleSheets._checkStyleLoaded(callback, href)
      })
    },
    _fetchStyle: function(href) {
      var link = document.createElement("link");
      link.rel = "stylesheet", link.media = "only x", link.href = href, this.head.appendChild(link), this._checkStyleLoaded(function() {
        link.media = "all"
      }, href)
    },
    _load: function(key, href) {
      if (this._localStorageSupported()) localStorage[key] ? this._injectStyle(localStorage.getItem(key)) : this._fetchAndSet(key, href);
      else {
        var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame,
          callback = function() {
            BSStyleSheets._fetchStyle(href)
        	};
        raf ? raf(callback) : window.addEventListener("load", callback)
      }
    },
    appendStyles: function() {
      this._load("raleway", this.raleway), this._load(this.styleKey, this.style)
    }
  };
  BSStyleSheets.appendStyles();
</script>