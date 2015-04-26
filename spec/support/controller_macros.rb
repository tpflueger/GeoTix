module ControllerMacros
  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      test_user = User.create! email: "user.one@domain.com", username: "userone", password: "password"
      sign_in test_user
    end
  end
end
