require 'less'

module Jekyll
  class LessConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /less/i
    end 

    def output_ext(ext)
      ".css"
    end

    def convert(content)
      begin
        parser = Less::Parser.new
        parser.parse(content).to_css
      rescue => e
        puts "Less Exception: #{e.message}"
      end
    end
  end
end
