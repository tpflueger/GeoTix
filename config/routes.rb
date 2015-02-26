Rails.application.routes.draw do
  # leaving out devise's user routes so we can nest ticket routes below users
  #devise_for :users
  root to: 'application#angular'

  resources :users, only: [:create, :update] do
    resources :tickets, only: [:create, :index, :destroy, :update]
  end

  resources :tickets, only: [:index]
end
