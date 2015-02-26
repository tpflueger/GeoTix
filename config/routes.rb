Rails.application.routes.draw do
  # Disabling devise routes in order to define nested user & ticket routes
  #devise_for :users
  root to: 'application#angular'

  # Define the routes we will need for creating and updating user accounts, and
  # nest routes for ticket creation, deletion, etc. below specific user routes.
  resources :users, param: :username, only: [:create, :update] do
    resources :tickets, only: [:create, :index, :destroy, :update]
  end

  # A separate route used to retrieve all tickets, because our previously
  # defined route for tickets:index is user-specific.
  get 'tickets', to: 'ticket#index_all'
end
