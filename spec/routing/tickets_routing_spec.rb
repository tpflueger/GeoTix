require "rails_helper"

RSpec.describe TicketsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/users/1/tickets").to route_to("tickets#index", :user_id => "1")
    end

    it "routes to #index_all" do
      expect(:get => "/tickets").to route_to("tickets#index_all")
    end

    it "routes to #create" do
      expect(:post => "/users/1/tickets").to route_to("tickets#create", :user_id => "1")
    end

    it "routes to #update on put" do
      expect(:put => "/users/1/tickets/2").to route_to("tickets#update", :user_id => "1", :id => "2")
    end

    it "routes to #update on patch" do
      expect(:patch => "/users/1/tickets/2").to route_to("tickets#update", :user_id => "1", :id => "2")
    end

    it "routes to #destroy" do
      expect(:delete => "/users/1/tickets/2").to route_to("tickets#destroy", :user_id => "1", :id => "2")
    end

  end
end
