$('#imagee').on('change', function () {
  let file = this.files[0]
  let formData = new FormData()
  formData.append('image', file)
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#image').val(response[0].image)
    }
  });
})
$('#addForm').on('submit', function () {
  let formData = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/slides",
    data: formData,
    success: function (response) {
      location.reload()
    }
  });
  return false
})
$.ajax({
  type: "get",
  url: "/slides",
  success: function (response) {
    let html = template('slidetpl', { data: response })
    $('#slidesForm').html(html)
  }
});
$('#slidesForm').on('click', '.delete', function () {
  let id = $(this).attr('data-id')
  if (confirm('确定?')) {
    $.ajax({
      type: "delete",
      url: `/slides/${id}`,
      success: function (response) {
        location.reload()
      }
    });
  }
})