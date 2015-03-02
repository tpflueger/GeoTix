class TicketsController < ApplicationController
  # Users have the ability to create, update, and destroy tickets.
  # An authenticated session is required to perform these actions.
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  # Return all tickets associated with the current user
  def index
    respond_with Ticket.where(user_id: params[:user_id])
  end

  # Return all tickets
  def index_all
    respond_with Ticket.all
  end

  def create
    @ticket = Ticket.new(ticket_params.merge(user_id: current_user.id))
    if @ticket.save
      respond_to do |format|
        format.json { render :json => @ticket }
      end
    end
  end

  # Update a ticket with params sent from the client
  def update
    @ticket = Ticket.where("user_id = ?", current_user.id).where("id = ?", params[:id])
    if @ticket.update(ticket_params)
      respond_to do |format|
        format.json { render :json => @ticket }
      end
    end
  end

  # Destroy a ticket
  def destroy
    @ticket = Ticket.where("user_id = ?", current_user.id)
    respond_with @ticket.destroy(params[:id])
  end

  private

  # Define ticket parameters that can be accepted from the client
  def ticket_params
    params.require(:ticket).permit(:title, :description, :lat, :long, :is_active)
  end
end
