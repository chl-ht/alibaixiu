$('#logo').on('change', function () {
  let file = this.files[0]
  let formData = new FormData()
  formData.append('logo', file)
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#site_logo').val(response[0].logo)
      $('#ima').attr('src', response[0].logo)
    }
  });
})
$('#addForm').on('submit', function () {
  let formData = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/settings",
    data: formData,
    success: function (response) {
      location.reload()
    }
  });
  return false
})
$.ajax({
  type: "get",
  url: "/settings",
  success: function (response) {
    $('#site_name').val(response.title)
    // $('#site_description').val(response.description)
    // $('#site_keywords').val(response.keywords)
    $('#comment_status').prop('checked', response.comment)
    $('#comment_reviewed').prop('checked', response.review)
    $('#ima').attr('src', response.logo)
  }
});