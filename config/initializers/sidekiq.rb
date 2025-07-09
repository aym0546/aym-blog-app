Sidekiq.configure_server do |config|
  config.redis = {
    url: ENV.fetch('REDIS_URL', 'redis://localhost:6379'),
    ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE} # SSL検証を無効化
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: ENV.fetch('REDIS_URL', 'redis://localhost:6379'),
    ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } # SSL検証を無効化
  }
end