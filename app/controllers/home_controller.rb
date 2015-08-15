class HomeController < ApplicationController
  caches_page :index

  def index
    @limit  = 2;
    @page   = params[:page] ? params[:page].to_i : 1;
    @offset = @limit * (@page -1);
    @total  = (Photo.find(:all, :order => "created_at DESC").count() / @limit.to_f).ceil;

    if @page > @total || @page < 1
        redirect_to '/'
    end

    #logger.debug { @total }

    @photos = Photo.find(:all, :order => "created_at DESC", :limit => @limit, :offset => @offset);

  end

end
