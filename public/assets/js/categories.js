$('#addCategory').on('submit', function () {
  let categoryData = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/categories",
    data: categoryData,
    success: function (response) {
      location.reload()
    }
  });
})
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    let html = template('categorytpl', { data: response })
    $('#categoryBox').html(html)
  }
});
$('#categoryBox').on('click', '.edit', function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type: "get",
    url: `/categories/${id}`,
    success: function (response) {
      let html = template('modifycategorytpl', response)
      $('#formBox').html(html)
    }
  });
})
$('#formBox').on('submit', '#modifyCategory', function () {
  let modifyCategoryData = $(this).serialize()
  let id = $(this).attr('data-id')
  $.ajax({
    type: "put",
    url: `/categories/${id}`,
    data: modifyCategoryData,
    success: function (response) {
      location.reload()
    }
  });
  return false
})
$('#categoryBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id')
  if (confirm('确定删除吗')) {
    $.ajax({
      type: "delete",
      url: `/categories/${id}`,
      success: function (response) {
        location.reload()
      }
    });
  }
})