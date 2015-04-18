---
layout: default
title: Blog
permalink: /blog/
atf: atf_blog.scss
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
<h3 class="sectionTitle">Featured Posts:</h3>
<div class="featuredItems u-border-bottom">
	{% assign postIndex = 1 %}
	{% assign rowOpen = 0 %}
	{% for post in site.posts %}
		{% if postIndex == 1 %}
			{% assign rowOpen = 1 %}
			<div class="row">
		{% endif %}
	  {% if post.featured and post.featured == true %}
		  <div class="featuredItem four columns">
		    <h4 class="postTitle"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h4>
		    {% if post.featuredImage != nil and post.featuredImage != "" %}
		    <img class="postImage" src="{{ post.featuredImage | prepend: site.images_url }}" alt="{{ post.featuredImageText }}" />
		   	{% endif %}
		    <p class="postDetails">Posted in <a href="/blog/{{ post.categories | first }}">{{ post.categories | first | capitalize_category }}</a> on {{ post.date | date_to_string }}</p>
		    <p class="postExcerpt">{{ post.excerpt | strip_html }}</p>
		  </div>
	  {% endif %}
	  {% assign postIndex=postIndex | plus:1 %} 
	  {% if postIndex == 3 %}
	  	{% assign postIndex = 1 %}
	  {% endif %}
	  {% if postIndex == 1 %}
			{% assign rowOpen = 0 %}
			</div>
		{% endif %}
	{% endfor %}
	{% if rowOpen == 1 %}
		</div>
	{% endif %}
</div>
{% endif %}

{% assign postIndex = 1 %}
{% assign rowOpen = 0 %}
{% assign postCount = 0 %}
<h3 class="sectionTitle">Recent Posts:</h3>
<div class="categoryItems">
{% for post in site.posts %}
	{% if postIndex == 1 %}
		{% assign rowOpen = 1 %}
		<div class="row">
	{% endif %}
  {% if post.featured == nil or post.featured == false %}
	  {% assign postCount=postCount | plus:1 %} 
	  <div class="categoryItem four columns">
	    <h4 class="postTitle"><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h4>
	    {% if post.featuredImage != nil and post.featuredImage != "" %}
	    <img class="postImage" src="{{ site.images_url }}post.featuredImage" alt="{{ post.featuredImageText }}" />
	   	{% endif %}
	    <p class="postDetails">Posted in <a href="/blog/{{ post.categories | first }}">{{ post.categories | first | capitalize_category }}</a> on {{ post.date | date_to_string }}</p>
	    <p class="postExcerpt">{{ post.excerpt | strip_html }}</p>
	  </div>
  {% endif %}
  {% assign postIndex=postIndex | plus:1 %} 
  {% if postIndex == 3 %}
  	{% assign postIndex = 1 %}
  {% endif %}
  {% if postIndex == 1 %}
		{% assign rowOpen = 0 %}
		</div>
	{% endif %}
{% endfor %}
{% if rowOpen == 1 %}
	</div>
{% endif %}
{% if postCount == 0 %}
<div class="noPosts">
	<p>Blog posts coming soon!</p>
</div>
{% endif %}
</div>