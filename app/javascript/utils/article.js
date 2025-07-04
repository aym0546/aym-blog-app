import $ from 'jquery';
import axios from 'axios';

const csrfToken = document
  .querySelector('meta[name=csrf-token]')
  ?.getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden');
  } else {
    $('.inactive-heart').removeClass('hidden');
  }
};

document.addEventListener('turbo:load', () => {
  const dataset = $(`#article-show`).data();
  const articleId = dataset.articleId;

  // comment を取得して表示する
  axios.get(`/articles/${articleId}/comments`).then((response) => {
    const comments = response.data;
    comments.forEach((comment) => {
      $('.comments-container').append(
        `<div class="article_comment"><p>${comment.content}</p></div>`
      );
    });
  });

  // ボタンを押したら comment-form を表示する
  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden');
    $('.comment-text-area').removeClass('hidden');
  });

  // like の状況を判定してハートを出し分ける、like を変更する
  axios.get(`/articles/${articleId}/like`).then((response) => {
    const hasLiked = response.data.hasLiked;
    handleHeartDisplay(hasLiked);
  });

  $('.inactive-heart').on('click', () => {
    axios
      .post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden');
          $('.inactive-heart').addClass('hidden');
        }
      })
      .catch((e) => {
        window.alert('Error');
        console.log(e);
      });
  });

  $('.active-heart').on('click', () => {
    axios
      .delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.inactive-heart').removeClass('hidden');
          $('.active-heart').addClass('hidden');
        }
      })
      .catch((e) => {
        window.alert('Error');
        console.log(e);
      });
  });
});
