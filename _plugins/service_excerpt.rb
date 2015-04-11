module Jekyll
  class ServiceExcerpt < Liquid::Tag

  	include Liquid::StandardFilters
    Syntax = /(#{Liquid::QuotedFragment}+)?/ 

    def initialize(tag_name, text, tokens)
    	@attributes = {}
      
      if markup =~ Syntax
        markup.scan(Liquid::TagAttributes) do |key, value|
          @attributes[key] = value
        end
      end

      @sep = @attributes.has_key?('sep') ? @attributes['sep'] : "\n"
      @excerpt = text
      super
    end

    def render(context)
      @excerpt.slice(0, @excerpt.index(@sep))
    end
  end
end

Liquid::Template.register_tag('service_excerpt', Jekyll::ServiceExcerpt)