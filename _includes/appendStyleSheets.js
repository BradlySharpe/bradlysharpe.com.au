<script type="text/javascript">
	var BSStyleSheets = {
    stored: "_stored",
	  raleway: "{{ "/css/raleway.css" | prepend: site.assets_url }}",
    style: "{{ "/css/style.css" | prepend: site.assets_url }}",
  {% if page.btf != nil %} 
  {% assign stylesheetName = page.btf | prepend: "/css/" %}
    styleBTF: "{{ stylesheetName | prepend: site.assets_url }}",
    styleBTFKey : "{{ page.url | replace:'/','_' }}",
  {% endif %}
    head: document.getElementsByTagName("head")[0],
    _localStorageSupported: function() {
			try {
				return localStorage.setItem("test", "test"), localStorage.removeItem("test"), !0
			} catch (e) {
				return !1
			}
    },
    _getToday: function() {
      var today = new Date();
      return new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    },
    _fetchAndSet: function(key, href) {
			var xhr = new XMLHttpRequest;
      console.log("Fetching and Setting: " + key), xhr.open("GET", href, !0), xhr.onreadystatechange = function() {
				4 === xhr.readyState && (BSStyleSheets._injectStyle(xhr.responseText), localStorage.setItem(key, xhr.responseText), localStorage.setItem(key+BSStyleSheets.stored, BSStyleSheets._getToday().toJSON()))
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
      console.log("Async Fallback"), link.rel = "stylesheet", link.media = "only x", link.href = href, this.head.appendChild(link), this._checkStyleLoaded(function() {
        link.media = "all"
      }, href)
    },
    _load: function(key, href) {
      console.log("Loading: " + key);
      if (this._localStorageSupported()) {
        if (localStorage[key] && ("" != localStorage[key])) {
          if (localStorage[key+"_stored"] && ("" != localStorage[key])) {
            try {
              var stored = new Date(localStorage[key+"_stored"]);
              if ((this._getToday() - stored) < 1) {
                console.log("Cache Hit: " + key);
                this._injectStyle(localStorage.getItem(key));
                return !0;
              }
              console.log("Cache expired: " + key, stored);
            } catch (e) { console.log("Error checking cache", e)}
          }
        }
        this._fetchAndSet(key, href);
      } else {
        var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame,
          callback = function() {
            BSStyleSheets._fetchStyle(href)
        	};
        raf ? raf(callback) : window.addEventListener("load", callback)
      }
    },
    appendStyles: function() {
      this._load("raleway", this.raleway), this._load("style", this.style){% if page.btf != nil %}, this._load(this.styleBTFKey, this.styleBTF){% endif %}
    }
  };
  BSStyleSheets.appendStyles();
  var resetStyles = function() { try { localStorage.clear(); window.location.reload(); } catch (e) {} }
</script>