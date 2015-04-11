module Jekyll
  module ServiceExcerpt
    def service_excerpt(content, sep=nil)
      if sep == nil
      	sep = "\n"
      end
      content.slice(0, content.index(sep))
    end
  end
end

Liquid::Template.register_filter(Jekyll::ServiceExcerpt)