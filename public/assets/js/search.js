let key = getUrlParams('key')
$.ajax({
  type: "get",
  url: `/posts/search/${key}`,
  success: function (response) {
    let html = template('listTpl', { data: response })
    $('#artForm').html(html)
  }
});
$('.search form').on('submit',function () {
  let key = $(this).find('.keys').val()
  location.href = `/search.html?key=${key}`
  return false
})
