class Photo < ActiveRecord::Base
  #attr_accessible :title, :file, :camera, :file_meta
  attr_accessible :title, :file, :camera
  has_attached_file :file, :styles => { :optim => "900x600>",:thumb => "150x150>"}
end
