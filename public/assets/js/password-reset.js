$('#modpassForm').on('submit', function () {
  let usermodify = $(this).serialize()
  $.ajax({
    type: "put",
    url: "/users/password",
    data: usermodify,
    success: function (response) {
      location.href = '/admin/login.html'
    },
    error: function(){
      alert('修改失败')
    }
  });
  return false
})