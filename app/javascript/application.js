// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';

// RailsのUJS（Unobtrusive JavaScript）を有効化
// これにより link_to の data-method="delete" などが機能する
import Rails from '@rails/ujs';
Rails.start();

import 'trix';
import '@rails/actiontext';

import './utils/article';
