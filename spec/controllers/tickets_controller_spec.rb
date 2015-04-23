require 'rails_helper'

RSpec.describe TicketsController, type: :controller do
  let(:valid_ticket_attributes) { {
    "title" => "Concert Ticket",
    "description" => "ticket to an awesome concert",
    "lat" => "42",
    "long" => "69",
    "is_active" => true
  } }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET #index" do
    login_user

    it "assigns all user tickets as @tickets", :focus do
      expect(subject.current_user).not_to be_nil

      ticket = Ticket.create! valid_ticket_attributes
      get :index, {}
      expect(assigns(:tickets)).to eq([ticket])
    end
  end

  describe "GET #index_all" do
    it "assigns all tickets as @tickets" do
      ticket = Ticket.create! valid_ticket_attributes
      get :index, {}
      expect(assigns(:tickets)).to eq([ticket])
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Ticket" do
        expect {
          post :create, {:ticket => valid_ticket_attributes}
        }.to change(Ticket, :count).by(1)
      end

      it "assigns a newly created ticket as @ticket" do
        post :create, {:ticket => valid_ticket_attributes}
        expect(assigns(:ticket)).to be_a(Ticket)
        expect(assigns(:ticket)).to be_persisted
      end

      it "redirects to the created ticket" do
        post :create, {:ticket => valid_ticket_attributes}
        expect(response).to redirect_to(Ticket.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved ticket as @ticket" do
        post :create, {:ticket => invalid_attributes}
        expect(assigns(:ticket)).to be_a_new(Ticket)
      end

      it "re-renders the 'new' template" do
        post :create, {:ticket => invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested ticket" do
        ticket = Ticket.create! valid_ticket_attributes
        put :update, {:id => ticket.to_param, :ticket => new_attributes}
        ticket.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested ticket as @ticket" do
        ticket = Ticket.create! valid_ticket_attributes
        put :update, {:id => ticket.to_param, :ticket => valid_ticket_attributes}
        expect(assigns(:ticket)).to eq(ticket)
      end

      it "redirects to the ticket" do
        ticket = Ticket.create! valid_ticket_attributes
        put :update, {:id => ticket.to_param, :ticket => valid_ticket_attributes}
        expect(response).to redirect_to(ticket)
      end
    end

    context "with invalid params" do
      it "assigns the ticket as @ticket" do
        ticket = Ticket.create! valid_ticket_attributes
        put :update, {:id => ticket.to_param, :ticket => invalid_attributes}
        expect(assigns(:ticket)).to eq(ticket)
      end

      it "re-renders the 'edit' template" do
        ticket = Ticket.create! valid_ticket_attributes
        put :update, {:id => ticket.to_param, :ticket => invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested ticket" do
      ticket = Ticket.create! valid_ticket_attributes
      expect {
        delete :destroy, {:id => ticket.to_param}
      }.to change(Ticket, :count).by(-1)
    end

    it "redirects to the tickets list" do
      ticket = Ticket.create! valid_ticket_attributes
      delete :destroy, {:id => ticket.to_param}
      expect(response).to redirect_to(tickets_url)
    end
  end

  # Clear the testing db of all entries to avoid conflicting with future testing
  tickets = Ticket.all
  for ticket in tickets do
    ticket.destroy
  end

  users = User.all
  for user in users do
    user.destroy
  end

end
