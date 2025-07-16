require 'rails_helper'

RSpec.describe 'Profile', type: :system do
  let!(:user) { create(:user, :with_profile) }

  context 'ログインしている場合' do
    before do
      # sign_in user が使えないため
      visit new_user_session_path
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'

      # ログイン成功を確認
      expect(page).to have_content('ログインしました').or have_current_path(root_path)
    end

    it '自分のプロフィールを確認できる' do
      visit profile_path
      expect(page).to have_css('.profilePage_user_displayName', text: user.profile.nickname, wait: 5)
    end
  end
end
