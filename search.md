---
layout: default
title: Search
permalink: /search/
atf: atf_search.scss
---
<div class="row">
  <div class="four columns offset-by-three">
    <form class="inset u-cf" method="GET" name="search">
      <input type="text" name="q" id="query" value="" />
      <button class="button button-primary">Search</button>
    </form>
  </div>
</div>
<div class="row">
  <div class="twelve columns">
    <h5>Loading Search Index</h5>
  </div>
</div>

<script type="text/javascript">
{% include lunr.min.js %}

var search={
  loaded:0,
  index:lunr(function(){this.field("title",{boost:20}),this.field("categories",{boost:10}),this.field("body"),this.field("date"),this.ref("id")}),
  load:function(){
    var xhr=new XMLHttpRequest;
    xhr.open("GET","/searchEntries.json",!0),xhr.onreadystatechange=function(){4===xhr.readyState&&200==xhr.status&&search.populate(xhr.responseText)},xhr.send()
  },
  populate:function(text){
    var data=[];
    try{data=JSON.parse(text)}catch(n){return search.noJSON()}
    data.entries.forEach(function(e){search.index.add(e)}),search.loaded=!0,search.toggle()
  },
  noJSON:function(){
    console.error("No JSON support")
  },
  toggle:function() {
    /* enable search button */
  },
  run:function(){
    return this.loaded?this.index.search("dns"):0
  }
};
search.load();


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