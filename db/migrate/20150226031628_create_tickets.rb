class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :title
      t.string :description
      t.string :user
      t.boolean :is_active
      
      t.string :lat
      t.string :long

      t.timestamps null: false
    end
  end
end
