class RenamePhotoMetaColumn < ActiveRecord::Migration
  def up
     rename_column :photos, :photo_meta, :file_meta
  end

  def down
    rename_column :photos, :file_meta, :photo_meta
  end
end
