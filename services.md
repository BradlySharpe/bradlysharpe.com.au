---
layout: default
title: Services
permalink: /services/
---
{% assign page_content = content | strip_newlines | strip_html %}
{% if page_content != "" %}
<div class="servicesContent">
	{{ content }}
</div>
{% endif %}

{% assign hasFeatured = false %}
{% for service in site.services %}
  {% if service.featured and service.featured == true %}
  	{% assign hasFeatured = true %}
  {% endif %}
{% endfor %}

{% if hasFeatured %}
<div class="featuredItems">
{% for service in site.services %}
  {% if service.featured and service.featured == true %}
  <div class="featuredItem">
    <h4 class="serviceTitle"><a href="{{ BASE_PATH }}{{ service.url }}">{{ service.title }}</a></h4>
    <p class="serviceExcerpt">{{ service.excerpt | strip_html }}</p>
  </div>
  {% endif %}
{% endfor %}
</div>
{% endif %}

{% assign serviceCount = 0 %}
<div class="cetegoryItems">
{% for service in site.services %}
  {% if service.featured == nil or service.featured == false %}
  {% assign serviceCount=serviceCount | plus:1 %} 
  <div class="categoryItem">
    <h4 class="serviceTitle"><a href="{{ BASE_PATH }}{{ service.url }}">{{ service.title }}</a></h4>
    <p class="serviceExcerpt">{{ service.excerpt | strip_html }}</p>
  </div>
  {% endif %}
{% endfor %}
{% if serviceCount == 0 %}
<div class="noServices">
	<p>Services coming soon!</p>
</div>
{% endif %}
</div>