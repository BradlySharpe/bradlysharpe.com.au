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

var xhr = new XMLHttpRequest;
xhr.open("GET", "/searchEntries.json", !0), xhr.onreadystatechange = function() {
    4 === xhr.readyState && 200 == xhr.status && ("undefined" !== typeof JSON, console.log(JSON.parse(xhr.responseText)))
}, xhr.send()

/*
entries.forEach(function (entry) {
    searchIndex.add(entry);
});
*/

/*
http://29a.ch/2014/12/03/full-text-search-example-lunrjs
jQuery(function($) {
    var index,
        store,
        data = $.getJSON(searchIndexUrl);

    data.then(function(data){
        store = data.store,
        // create index
        index = lunr.Index.load(data.index)
    });

    $('.search-field').keyup(function() {
        var query = $(this).val();
        if(query === ''){
            jQuery('.search-results').empty();
        }
        else {
            // perform search
            var results = index.search(query);
            data.then(function(data) {
                $('.search-results').empty().append(
                    results.length ?
                    results.map(function(result){
                        var el = $('<p>')
                            .append($('<a>')
                                .attr('href', result.ref)
                                .text(store[result.ref].title)
                            );
                        if(store[result.ref].abstract){
                            el.after($('<p>').text(store[result.ref].abstract));
                        }
                        return el;
                    }) : $('<p><strong>No results found</strong></p>')
                );
            }); 
        }
    }); 
});
 */

</script>