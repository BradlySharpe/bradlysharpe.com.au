<script type="application/ld+json">
{ 
	"@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "{{ site.title }}",
  "description" : "{{ site.description }}",
  "url" : "{{ site.baseurl | prepend: site.url }}",
  "logo" : "{% if site.images_url != "" %}{{ site.images_url }}{% else %}{{ site.baseurl | prepend: site.url }}{% endif %}/images/bradly-sharpe-logo.png",
  "sameAs" : 
  [ 
  	"http://www.facebook.com/{{ site.facebookName }}",
    "http://www.twitter.com/{{ site.twitterName }}",
    "http://plus.google.com/{{ site.googlePlusName }}"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Warrnambool",
    "addressRegion": "VIC",
    "postalCode": "3280",
    "streetAddress": "68 Donovans Road"
  },
  "contactPoint" : 
  [
    { 
    	"@type" : "ContactPoint",
      "telephone" : "{{ site.contactNumber }}",
      "contactType" : "customer service",
      "areaServed" : "AU"
    } 
  ] 
}
{
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "{{ site.baseurl | prepend: site.url }}",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{{ site.baseurl | prepend: site.url }}/search?&q={query}",
      "query-input": "required"
    }
}
</script>