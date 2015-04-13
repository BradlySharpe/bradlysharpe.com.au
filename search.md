---
layout: default
title: Search
permalink: /search/
---


<script type="text/javascript">
{% include lunr.min.js %}

var searchIndex = lunr(function () {
    this.field('title', {boost: 20}), this.field('categories', {boost: 10}), this.field('body'), this.field('date'), this.ref('id');
});

var entries = [
{% assign firstPost = 1 %}
{% for post in site.posts %}
  {% if firstPost == 1 %}
    "{ id: '{{ post.id }}', title: '{{ post.title }}', categories: '{{ post.categories }}', date: '{{ post.date }}', body: '{{ post.content | strip_html }}', excerpt: '{{ post.excerpt | strip_html }}'}"  
  {% else %}
    ", { id: '{{ post.id }}', title: '{{ post.title }}', categories: '{{ post.categories }}', date: '{{ post.date }}', body: '{{ post.content | strip_html }}', excerpt: '{{ post.excerpt | strip_html }}'}" 
    {% assign firstPost = 0 %}
  {% endif %}
{% endfor %}
];

entries.forEach(function (entry) {
    searchIndex.add(entry);
});

</script>