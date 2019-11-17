$.ajax({
  type: "get",
  url: "/comments",
  success: function (response) {
    let html = template('commentstpl', response)
    $('#commentsBox').html(html)
    let pageHtml = template('pagetpl', response)
    $('#pagepage').html(pageHtml)
  }
});
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      page
    },
    success: function (response) {
      let html = template('commentstpl', response)
      $('#commentsBox').html(html)
      let pageHtml = template('pagetpl', response)
      $('#pagepage').html(pageHtml)
    }
  });
}
$('#commentsBox').on('click', '.status', function () {
  let status = $(this).attr('data-status')
  let id = $(this).attr('data-id')
  $.ajax({
    type: "put",
    url: `/comments/${id}`,
    data: {
      state: status == 0 ? 1 : 0
    },
    success: function (response) {
      location.reload()
    }
  });
})
$('#commentsBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id')
  if (confirm('确定删除吗')) {
    $.ajax({
      type: "delete",
      url: `/comments/${id}`,
      success: function (response) {
        location.reload()
      }
    });
  }
})