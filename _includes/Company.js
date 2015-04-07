<script type="application/ld+json">
{ "@context" : "http://schema.org",
  "@type" : "Organization",
  "url" : "{{ site.baseurl | prepend: site.url }}",
  "logo" : "{% if site.images_url != "" %}{{ site.images_url }}/images{% else %}{{ site.baseurl | prepend: site.url }}{% endif %}/bradly-sharpe-logo.png",
  "contactPoint" : [
    { "@type" : "ContactPoint",
      "telephone" : "{{ site.contactNumber }}",
      "contactType" : "customer service",
      "areaServed" : "AU"
    } ] }
</script>