Rails.application.routes.draw do
  # Routing for our user accounts is managed by devise
  devise_for :users
  root to: 'application#angular'

  # Define the routes we will need for creating and updating user accounts, and
  # nest routes for ticket creation, deletion, etc. below specific user routes.
  resources :users, only: [] do
    resources :tickets, only: [:create, :index, :destroy, :update]
    resources :notifications, only: [:create, :index, :destroy, :update]
  end

  # A separate route used to retrieve all tickets, because our previously
  # defined route for tickets:index is user-specific.
  get '/tickets', to: 'tickets#index_all'

  # Update and destroy users
  put '/users/:user_id/update', to: 'users#update'
  delete '/users/:user_id/destroy', to: 'users#destroy'
end
