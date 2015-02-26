class TicketController < ApplicationController
  # Users have the ability to create, update, and destroy tickets.
  # An authenticated session is required to perform these actions.
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  # Return all tickets associated with the current user
  def index
    respond_with Ticket.find(user: current_user.username)
  end

  # Return all tickets
  def index_all
    respond_with Ticket.all
  end

  # Create a new ticket and send it back to the client
  def create
    respond_with Ticket.create(ticket_params.merge(user: current_user.username))
  end

  # Update a ticket with params sent from the client
  def update
    ticket = Ticket.find(params[:user_username])
    # add updating here

    respond_with ticket
  end

  # Destroy a ticket
  def destroy
    ticket = Ticket.find(params[:user_username])
    ticket.destroy

    respond_with Ticket.find(user: current_user.username)
  end

  private

  # Define ticket parameters that can be accepted from the client
  def ticket_params
    params.require(:ticket).permit(:title, :description, :lat, :long, :is_active)
  end
end
