require "rails_helper"

RSpec.describe UsersController, type: :routing do
  describe "routing" do

    it "routes to #update" do
      expect(:put => "/users/1/update").to route_to("users#update", :user_id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/users/1/destroy").to route_to("users#destroy", :user_id => "1")
    end

  end
end
