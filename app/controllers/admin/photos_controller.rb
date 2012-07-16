class Admin::PhotosController < ApplicationController
  require './config/protect'
  http_basic_authenticate_with :name => NAME, :password => PASSWORD
  
  layout "admin"

  before_filter :update_projects_cache , :only => [:create, :update, :destroy]

  #custom function
  def update_projects_cache
    expire_page :controller => "/home", :action => "index"
  end


  def index
    @photos = Photo.all
  end

  def show
  end

  def new
    @photo = Photo.new
    respond_to do |format|
      format.html # new.html.erb
    end
  end

  def create
    @photo = Photo.new(params[:photo])

    respond_to do |format|
      if @photo.save
        format.html { redirect_to admin_photos_url, notice: 'Photo was successfully created.' }
      else
        format.html { render action: "new" }
      end
    end
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = Photo.find(params[:id])

    respond_to do |format|
      if @photo.update_attributes(params[:photo])
        format.html { redirect_to admin_photos_url, notice: 'Photo was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    
    respond_to do |format|
      format.html { redirect_to admin_photos_url }
    end
  end

end