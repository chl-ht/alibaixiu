let id = getUrlParams('id')
let review
$.ajax({
  type: "get",
  url: `/posts/${id}`,
  success: function (response) {
    let html = template('postTpl', response)
    $('#article').html(html)
  }
});
$('#article').on('click', '#like', function () {
  $.ajax({
    type: "post",
    url: `/posts/fabulous/${id}`,
    success: function (response) {
      alert('点赞成功')
    }
  });
})
$('.search form').on('submit', function () {
  let key = $(this).find('.keys').val()
  location.href = `/search.html?key=${key}`
  return false
})
$.ajax({
  type: "get",
  url: "/settings",
  success: function (response) {
    review = response.review
    if (response.comment) {
      let html = template('commentTpl')
      $('#comment').html(html)
    }
  }
});
// $('#comment').on('submit', 'form', function () {
//   let content = $(this).find('textarea').val()
//   if (rereview) {  //这个值为true的话
//     state = 0  //需要经过人工审核
//   } else {
//     state = 1  //不需要经过人工审核
//   }
//   $.ajax({
//     type: "get",
//     url: "/comments",
//     data: {
//       content,
//       post: id,
//       state
//     },
//     success: function (response) {
//       alert('评论成功 ')
//       location.reload()
//     },
//     error: function () {
//       alert('失败')
//     }
//   });
// })