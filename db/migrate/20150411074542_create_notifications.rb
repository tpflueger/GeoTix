class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.boolean :view
      t.string :user
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
