import $ from 'jquery';
import axios from '../commons/axios';

import { setupCommentHandlers } from './comments';
import { setupLikeHandlers } from './likes';

document.addEventListener('turbo:load', () => {
  const dataset = $(`#article-show`).data();
  const articleId = dataset.articleId;

  setupCommentHandlers(articleId);
  setupLikeHandlers(articleId);
});
