import $ from 'jquery';
import axios from '../commons/axios';

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden');
  } else {
    $('.inactive-heart').removeClass('hidden');
  }
};

export const setupLikeHandlers = (articleId) => {
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
};
