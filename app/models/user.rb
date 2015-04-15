class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # has-a relationship with ticket model
  has_many :tickets
  has_many :conversations, :foreign_key => :sender_id
end
