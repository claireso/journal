class AddAttachmentFileToPhotos < ActiveRecord::Migration
  def self.up
    change_table :photos do |t|
      t.has_attached_file :file
    end
  end

  def self.down
    drop_attached_file :photos, :file
  end
end
