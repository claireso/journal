class AdminController < ApplicationController
    require './config/protect'
    http_basic_authenticate_with :name => NAME, :password => PASSWORD
    
    layout "admin"
  def index
  end
end
