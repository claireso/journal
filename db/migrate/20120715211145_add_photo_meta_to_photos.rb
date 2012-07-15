class AddPhotoMetaToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :photo_meta, :text
  end
end
