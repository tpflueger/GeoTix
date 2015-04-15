Rails.application.routes.draw do
  # Routing for our user accounts is managed by devise
  devise_for :users
  root to: 'application#angular'

  # Define the routes we will need for creating and updating user accounts, and
  # nest routes for ticket creation, deletion, etc. below specific user routes.
  resources :users, defaults: {format: :json}, only: [] do
    resources :tickets, defaults: {format: :json}, only: [:create, :index, :destroy, :update]
  end

  resources :conversations, defaults: {format: :json} do
    resources :messages, defaults: {format: :json}
  end

  # A separate route used to retrieve all tickets, because our previously
  # defined route for tickets:index is user-specific.
  get '/tickets', to: 'tickets#index_all', defaults: {format: :json}

  # Update and destroy users
  put '/users/:user_id/update', to: 'users#update', defaults: {format: :json}
  delete '/users/:user_id/destroy', to: 'users#destroy', defaults: {format: :json}
end
