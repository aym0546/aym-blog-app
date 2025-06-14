class HomeController < ApplicationController
    def index
        # render 'home/index'
        @title = 'デイトラ'
    end
    
    def about
        render 'home/about'
    end
end