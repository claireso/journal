class Photo < ActiveRecord::Base
  #attr_accessible :title, :file, :camera, :file_meta
  attr_accessible :title, :file, :camera
  has_attached_file :file, :styles => { :optim => "1800x1200>",:thumb => "300x300>"}
end
