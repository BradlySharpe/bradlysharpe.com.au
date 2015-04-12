---
layout: default
title: Blog
permalink: /blog/
---
{% assign page_content = content | strip_newlines | strip_html %}
{% if page_content != "" %}
	<div class="categoryContent">
		{{ content }}
	</div>
{% endif %}

{% assign hasFeatured = false %}
{% for post in site.posts %}
  {% if post.featured and post.featured == true %}
  	{% assign hasFeatured = true %}
  {% endif %}
{% endfor %}

{% if hasFeatured %}
	<div class="featuredItems">
	{% for post in site.posts %}
	  {% if post.featured and post.featured == true %}
	  <div class="featuredItem">
	    <h4 class="postTitle"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h4>
	    <span class="postDetails">Posted in {{ post.categories | first }} on {{ post.date | date_to_string }}</span>
	    <p class="postExcerpt">{{ post.excerpt | strip_html }}</p>
	  </div>
	  {% endif %}
	{% endfor %}
	</div>
{% endif %}

{% assign post_count = 0 %}
<div class="cetegoryItems">
{% for post in site.posts %}
  {% assign post_count=post_count | plus:1 %} 
  <div class="categoryItem">
    <h4 class="postTitle"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h4>
    <span class="postDetails">Posted in {{ post.categories | first }} on {{ post.date | date_to_string }}</span>
    <p class="postExcerpt">{{ post.excerpt | strip_html }}</p>
  </div>
{% endfor %}
{% if post_count == 0 %}
	<div class="noPosts">
		<p>Blog posts coming soon!</p>
	</div>
{% endif %}
</div>