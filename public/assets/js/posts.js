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
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
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