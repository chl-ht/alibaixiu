$.ajax({
  type: "get",
  url: "/posts",
  success: function (response) {
    let html = template('posttpl', response)
    $('#postForm').html(html)
    let pageHtml = template('pagetpl', response)
    $('#page').html(pageHtml)
  }
});
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page
    },
    success: function (response) {
      let html = template('posttpl', response)
      $('#postForm').html(html)
      let pageHtml = template('pagetpl', response)
      $('#page').html(pageHtml)
    }
  });
}
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    let html = template('categorytpl', { data: response })
    $('#cate').html(html)
  }
});
$('#filterForm').on('submit', function () {
  let filterData = $(this).serialize()
  $.ajax({
    type: "get",
    url: "/posts",
    data: filterData,
    success: function (response) {
      let html = template('posttpl', response)
      $('#postForm').html(html)
      let pageHtml = template('pagetpl', response)
      $('#page').html(pageHtml)
    }
  });
  return false
})
$('#postForm').on('click', '.delete', function () {
  let id = $(this).attr('data-id')
  if (confirm('确定删除吗')) {
    $.ajax({
      type: "delete",
      url: `/posts/${id}`,
      success: function (response) {
        location.reload()
      }
    });
  }
})

var id, userId;
$('#postForm').on('click', ".postCom", function () {
  id = $(this).data('id')
  console.log(id, 678);
  userId = JSON.parse(localStorage.getItem('user'))._id
  console.log(userId, 444);
  $('#exampleModal').modal('show')
})

/* 点击发布 */
$('.addCom').on('click', function () {
  var content = $('#message-text').val()
  console.log(content, 1111);
  $.ajax({
    type: 'post',
    url: '/comments',
    data: {
      author: userId,
      content: content,
      post: id
    },
    success: function (res) {
      console.log(res, 543);
      $('#exampleModal').modal('hide')
    }
  })
})

