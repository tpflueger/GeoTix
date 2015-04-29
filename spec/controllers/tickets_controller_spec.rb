require 'rails_helper'

RSpec.describe TicketsController, type: :controller do
  login_user

  let(:user_tickets) {
    [
      { "user_id"     => subject.current_user.id,
        "title"       => "Concert Ticket",
        "description" => "ticket to an awesome concert",
        "lat"         => "42",
        "long"        => "69",
        "is_active"   => true },
      { "user_id"     => subject.current_user.id,
        "title"       => "Awesome Event",
        "description" => "loads of tickets for sale",
        "lat"         => "94",
        "long"        => "97",
        "is_active"   => false }
    ]
  }

  let(:other_tickets) {
    [
      { "user_id"     => 1994,
        "title"       => "Ticket for Sale",
        "description" => "ticket to some event",
        "lat"         => "20",
        "long"        => "21",
        "is_active"   => true },
      { "user_id"     => 1997,
        "title"       => "Weird Al Show",
        "description" => "got too excited, bought too many tickets, must sell",
        "lat"         => "05",
        "long"        => "04",
        "is_active"   => false }
    ]
  }

  let(:all_tickets) {
    user_tickets + other_tickets
  }

  let(:new_attributes) {{
    "user_id"     => subject.current_user.id,
    "title"       => "New Values",
    "description" => "new description, way better than before",
    "lat"         => "33",
    "long"        => "44",
    "is_active"   => false
  }}


  describe "GET #index" do
    it "responds with all user tickets as json" do
      expect(subject.current_user).not_to be_nil
      tickets = Ticket.create! user_tickets
      Ticket.create! other_tickets

      get :index, :user_id => subject.current_user.id, format: :json
      expect(response.body).to be_json_eql(tickets.to_json)
    end
  end

  describe "GET #index_all" do
    it "responds with all tickets as json" do
      tickets = Ticket.create! all_tickets
      get "index_all", format: :json
      expect(response.body).to be_json_eql(tickets.to_json)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      let(:params) {{
        format: :json,
        :user_id => subject.current_user.id,
        :ticket => new_attributes
      }}

      it "creates a new Ticket" do
        expect(subject.current_user).not_to be_nil
        expect {
          post :create, params
        }.to change(Ticket, :count).by(1)
      end

      it "assigns new ticket as @ticket and saves" do
        expect(subject.current_user).not_to be_nil
        post :create, params
        expect(assigns(:ticket)).to be_a(Ticket)
        expect(assigns(:ticket)).to be_persisted
      end

      it "responds with new ticket as json" do
        expect(subject.current_user).not_to be_nil
        post :create, params
        expect(response.body).to be_json_eql(new_attributes.to_json)
      end
    end

    # Currently unable to test with invalid params. At the moment
    # we are not performing any server-side data validation.
    context "with invalid params" do
      it "assigns a newly created but unsaved ticket as @ticket" do
        skip("no data validation to test at this time")
      end

      it "re-renders the 'new' template" do
        skip("no data validation to test at this time")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:params) {{
        format: :json,
        :user_id => subject.current_user.id,
        :ticket => new_attributes
      }}

      it "assigns updated ticket to @ticket" do
        expect(subject.current_user).not_to be_nil
        tickets = Ticket.create! user_tickets
        params.store(:id, tickets[0].id)
        put :update, params
        tickets[0].reload
        expect(assigns(:ticket)).to include(tickets[0])
      end

      it "returns updated ticket as json" do
        expect(subject.current_user).not_to be_nil
        tickets = Ticket.create! user_tickets
        params.store(:id, tickets[0].id)
        put :update, params
        expect(response.body).to include_json(new_attributes.to_json)
      end
    end

    # Currently unable to test with invalid params. At the moment
    # we are not performing any server-side data validation.
    context "with invalid params" do
      it "assigns the ticket as @ticket" do
        skip("no data validation to test at this time")
      end

      it "re-renders the 'edit' template" do
        skip("no data validation to test at this time")
      end
    end
  end

  describe "DELETE #destroy" do

    let(:params) {{
      format: :json,
      :user_id => subject.current_user.id
    }}

    it "destroys the requested ticket" do
      expect(subject.current_user).not_to be_nil
      tickets = Ticket.create! user_tickets
      params.store(:id, tickets[0].id)
      expect {
        delete :destroy, params
      }.to change(Ticket, :count).by(-1)
    end

    it "returns all but destroyed ticket" do
      expect(subject.current_user).not_to be_nil
      tickets = Ticket.create! user_tickets
      params.store(:id, tickets[0].id)
      delete :destroy, params
      expect(response.body).not_to include_json(user_tickets[0].to_json)
    end
  end
end
