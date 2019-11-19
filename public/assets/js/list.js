let id = getUrlParams('categoryId')
$.ajax({
  type: "get",
  url: `/posts/category/${id}`,
  success: function (response) {
    let html = template('listTpl', { data: response })
    $('#artForm').html(html)
  }
});
$.ajax({
  type: "get",
  url: `/categories/${id}`,
  success: function (response) {
    $('#categoryTitle').html(response.title)
  }
});
$('.search form').on('submit',function () {
  let key = $(this).find('.keys').val()
  location.href = `/search.html?key=${key}`
  return false
})