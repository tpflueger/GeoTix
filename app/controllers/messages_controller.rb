class MessagesController < ApplicationController
  before_filter :authenticate_user!

  layout false

  def create
    if params[:user_id] == current_user.id
      @conversation = Conversation.find(params[:conversation_id])
      @message = @conversation.messages.build(message_params)
      @message.user_id = current_user.id
      @message.save!

      respond_to do |format|
          format.json { render :json => @message }
      end
    end
  end


  def index
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.messages.all

    respond_to do |format|
      format.json { render :json => @message }
    end
  end

  def update
    @conversation = Conversation.where('(sender_id = ? OR recipient_id = ?) AND id = ?', current_user.id, current_user.id, params[:conversation_id]).first
    @message = @conversation.messages.where("id = ?", params[:id])
    if @message.update(params[:id], message_params)
      respond_to do |format|
        format.json { render :json => @message }
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :user_id,:conversation_id)
  end
end
