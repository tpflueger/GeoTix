class Ticket < ActiveRecord::Base
  # belongs-to relationship with user model
  belongs_to :user
end
