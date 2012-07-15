class HomeController < ApplicationController
  def index
    @photos = Photo.find(:all, :order => "created_at DESC");
  end
end
