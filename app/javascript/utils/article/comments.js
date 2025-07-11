import $ from 'jquery';
import axios from '../commons/axios';

// コメントをコンテナに追加して表示する
export const appendNewComment = (comment) => {
  $('.comments-container').append(
    `<div class="article_comment"><p>${comment.content}</p></div>`
  );
};

export const setupCommentHandlers = (articleId) => {
  // 既存コメント読み込み
  axios.get(`/api/articles/${articleId}/comments`).then((response) => {
    const comments = response.data;
    comments.forEach((comment) => {
      appendNewComment(comment);
    });
  });

  // フォーム表示
  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden');
    $('.comment-text-area').removeClass('hidden');
  });

  // コメント投稿
  $('.add-comment-btn').on('click', () => {
    const content = $('#comment_content').val();
    // comment: content がない時に alert を表示
    if (!content) {
      window.alert('コメントを入力してください');
    } else {
      axios
        .post(`/api/articles/${articleId}/comments`, {
          comment: { content: content },
        })
        // 成功したら、レスポンスをcomment表示に追加
        .then((res) => {
          const comment = res.data;
          appendNewComment(comment);
          // 送信後は textarea を空にする
          $('#comment_content').val('');
        });
    }
  });
};
