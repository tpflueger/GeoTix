class ConversationsController < ApplicationController
  before_filter :authenticate_user!

  layout false

  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end

    render json: { conversation_id: @conversation.id }
  end

  def index
    @conversation = Conversation.where('sender_id = ? OR recipient_id = ?', current_user.id, current_user.id).all

    respond_to do |format|
      format.json { render :json => @conversation }
    end
  end

  private
  def conversation_params
    params.permit(:sender_id, :recipient_id, :sender_name, :recipient_name)
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end
end
