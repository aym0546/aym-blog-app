class AccountsController < ApplicationController
  def show
    @user = User.find(params[:id])
    # user が自分の場合、account ではなく profile を表示
    if @user == current_user
      redirect_to profile_path
    end
  end
end
