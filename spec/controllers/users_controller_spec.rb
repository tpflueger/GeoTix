require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  login_user

  let(:new_attributes) {{
    "username"  => "userTwo",
    "email"     => "user.two@new.domain.com"
  }}

  describe "PUT #update" do
    context "with valid params" do
      let(:params) {{
        format: :json,
        :user_id => subject.current_user.id,
        :user => new_attributes
      }}

      it "assigns updated user to @user" do
        expect(subject.current_user).not_to be_nil
        put :update, params
        user = User.where("id = ?", subject.current_user.id)
        expect(assigns(:user)).to eq(user)
      end

      it "returns updated user as json" do
        expect(subject.current_user).not_to be_nil
        put :update, params
        expect(response.body).to include_json(new_attributes.to_json)
      end
    end
  end
end
