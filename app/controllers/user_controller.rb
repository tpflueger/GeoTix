class UserController < ApplicationController
  # Update a user's profile
  def update
    @user = User.where("user_id = ?", current_user.id)
    if @user.update(user_params)
      respond_to do |format|
        format.json { render :json => @user }
      end
    end
  end

  def destroy
    @user = User.where("user_id = ?", current_user.id)
    respond_with @ticket.destroy(params[:id])
  end
end
