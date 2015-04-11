module Jekyll
  module CustomTagFilter
    def capitalize_category(category)
      case category
        when "seo", "dns"
          category.upcase
        else
          category.capitalize
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomTagFilter)