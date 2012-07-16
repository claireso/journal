class HomeController < ApplicationController
  caches_page :index
  def index
    @photos = Photo.find(:all, :order => "created_at DESC");
  end
end
