<script type="application/ld+json">
{ 
	"@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "{{ site.title }}",
  "description" : "{{ site.description }}",
  "telephone" : "{{ site.localNumber }}",
  "url" : "{{ site.baseurl | prepend: site.url }}",
  "logo" : "{{ site.images_url }}bradly-sharpe-logo.png",
  "founder" : {
  	"@type" : "Person",
  	"givenName" : "Bradly",
  	"additionalName" : "Warren",
  	"familyName" : "Sharpe",
  	"birthDate" : "1989-12-02",
  	"@id" : "http://plus.google.com/{{ site.googlePlusName }}"
  },
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
      "telephone" : "{{ site.internationalNumber }}",
      "contactType" : "customer service",
      "areaServed" : "AU"
    } 
  ] 
}
</script>

<script type="application/ld+json">
{
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "{{ site.baseurl | prepend: site.url }}",
    "name": "{{ site.title }}",
    "author" : {
      "@type" : "Person",
      "givenName" : "Bradly",
      "additionalName" : "Warren",
      "familyName" : "Sharpe",
      "birthDate" : "1989-12-02",
      "@id" : "http://bradlysharpe.com.au"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{{ site.baseurl | prepend: site.url }}/search/?&q={query}",
      "query-input": "required name=query"
    }
}
</script>