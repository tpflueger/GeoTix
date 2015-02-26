Rails.application.routes.draw do
#  devise_for :users
  root to: 'application#angular'

  resources :users, only: [:create, :update] do
    resources :tickets, only: [:create, :index, :destroy, :update]
  end
end
