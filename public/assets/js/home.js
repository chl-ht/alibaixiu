$.ajax({
  type: "get",
  url: "/slides",
  success: function (response) {
    let html = template('slidestpl', { data: response })
    $('#slidesForm').html(html)
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;

        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    })
  }
});
$.ajax({
  type: "get",
  url: "/posts/lasted",
  success: function (response) {
    let html = template('lastedTpl', { data: response })
    $('#lastedBox').html(html)
  }
});
$('.search form').on('submit',function () {
  let key = $(this).find('.keys').val()
  location.href = `/search.html?key=${key}`
  return false
})