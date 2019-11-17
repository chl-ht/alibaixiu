$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    let html = template('categorytpl', { data: response })
    $('#category').html(html)
  }
});
$('#feature').on('change', function () {
  let file = this.files[0]
  let formData = new FormData()
  formData.append('cover', file)
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#thumbnail').val(response[0].cover)
    }
  });
})
$('#addForm').on('submit', function () {
  let formData = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/posts",
    data: formData,
    success: function (response) {
      location.href = '/admin/posts.html'
    }
  });
  return false
})
function getUrlParams(name) {  //查询获取到的参数，通过split方法将字符串转化为数组
  let arr = location.search.substr(1).split('&')
  for (let index = 0; index < arr.length; index++) {
    let tmp = arr[index].split('=')
    if (name == tmp[0]) {
      return tmp[1]
    }
  }
  return false
}
let id = getUrlParams('id')
if (id != false) {
  $.ajax({
    type: "get",
    url: `/posts/${id}`,
    success: function (response) {
      $.ajax({
        type: "get",
        url: "/categories",
        success: function (categories) {
          response.categories = categories
          // console.log(categories)
          // console.log(response)
          let html = template('modifytpl', response)
          $('#parentBox').html(html)
        }
      });
    }
  });
}
$('#parentBox').on('submit', '#modifyForm', function () {
  let id = $(this).attr('data-id')
  let modifyData = $(this).serialize()
  $.ajax({
    type: "put",
    url: `/posts/${id}`,
    data: modifyData,
    success: function (response) {
      location.href = '/admin/posts.html'
    }
  });
  return false
})
