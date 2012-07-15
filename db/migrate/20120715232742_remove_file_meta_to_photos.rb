class RemoveFileMetaToPhotos < ActiveRecord::Migration
  def up
    remove_column :photos, :file_meta
  end

  def down
    add_column :photos, :file_meta, :text
  end
end
