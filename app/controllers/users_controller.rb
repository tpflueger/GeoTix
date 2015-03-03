class UsersController < ApplicationController
  # Update a user's profile
  def update
    @user = User.where("id = ?", current_user.id)
    if @user.update(current_user.id, user_params)
      respond_to do |format|
        format.json { render :json => @user }
      end
    end
  end

  # Destroy the current user
  def destroy
    # All tickets associated with the current user must be destroyed first
    @tickets = Ticket.where("user_id = ?", current_user.id)
    @tickets.each do |ticket|
      ticket.destroy
    end

    respond_with User.destroy(current_user.id)
  end

  # Define user parameters that can be accepted from the client
  private
  def user_params
    params.require(:user).permit(:username, :email, :encyrpted_password)
  end
end
