class AddCameraToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :camera, :string
  end
end
