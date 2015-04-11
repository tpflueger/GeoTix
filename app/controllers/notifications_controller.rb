class NotificationsController < ApplicationController
  # Users have the ability to create, update, and destroy tickets.
  # An authenticated session is required to perform these actions.
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  # Return all tickets associated with the current user
  def index
    respond_with Notification.where(user_id: params[:user_id])
  end

  def create
    @notification = Notification.new(notification_params.merge(user_id: params[:user_id]))
    if @notification.save
      respond_to do |format|
        format.json { render :json => @notification }
      end
    end
  end

  # Update a ticket with params sent from the client
  def update
    @notification = Notification.where("user_id = ?", current_user.id).where("id = ?", params[:id])
    if @notification.update(params[:id], notification_params)
      respond_to do |format|
        format.json { render :json => @notification }
      end
    end
  end

  # Destroy a ticket
  def destroy
    @notification = Notification.where("user_id = ?", current_user.id)
    respond_with @notification.destroy(params[:id])
  end

  # Define ticket parameters that can be accepted from the client
  private
  def notification_params
    params.require(:notification).permit(:user, :user_id, :view)
  end
end