$('#userForm').on('submit', function () {
  let userData = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/users",
    data: userData,
    success: function (response) {
      location.reload()
    },
    error: function () {
      alert('用户添加失败')
    },
  });
  return false  //阻止发生提交转态的时候默认提交
})
$('.modifyBox').on('change', '#avatar', function () {
  let formData = new FormData()
  formData.append('avatar', this.files[0])
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,  //告诉$.ajax方法不要解析参数，让参数以formdata表单对象传递
    contentType: false,  //告诉$.ajax方法不要设置请求参数的类型，因为默认表单对象参数传递
    success: function (response) {
      $('#preview').attr('src', response[0].avatar)
      $('#hiddeninp').val(response[0].avatar)
    }
  });
})
$.ajax({
  type: "get",
  url: "/users",
  success: function (response) {
    var html = template('usertpl', { data: response })
    $('#userList').html(html)
  }
});
$('#userList').on('click', '.edit', function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type: "get",
    url: `/users/${id}`,
    success: function (response) {
      var html = template('modifytpl', response)
      $('.modifyBox').html(html)
    }
  });
})
$('.modifyBox').on('submit', '#modifyForm', function () {
  let modifyData = $(this).serialize()
  let id = $(this).attr('data-id')
  $.ajax({
    type: "put",
    url: `/users/${id}`,
    data: modifyData,
    success: function (response) {
      location.reload()
    },
    error: function () {
      alert('修改失败')
    }
  });
  return false
})