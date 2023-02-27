$(function(){
  // スクロールした時のヘッダーエフェクト
  $(window).scroll(function() {
    const $header = $('#js-header');
    const $hamburger = $('#js-hamburger');
    if($(this).scrollTop() > 200 && $header.hasClass('is-fixed') == false) {
      $header.css({top: '-100px'});
      $hamburger.css({top: '-100px'})
      $('#js-header-logo').attr('src', './assets/img/sub-header-logo.png');
      $header.addClass('is-fixed');
      $hamburger.addClass('is-fixed');
      $header.animate({top: 0}, 1000);
      $hamburger.animate({top: 0}, 1000);
    }
    else if ($(this).scrollTop() <= 200 && $header.hasClass('is-fixed') == true){
      $('#js-header-logo').attr('src', './assets/img/top-header-logo.png');
      $header.removeClass('is-fixed');
      $hamburger.removeClass('is-fixed');
    }
  });

  $('.js-tab-trigger').on('click', function () {
    $('.js-tab-trigger').removeClass('is-active');
    $('.js-tab-target').removeClass('is-active');
    $(this).addClass('is-active');
    let id = $(this).data("id");
    $('#' + id).addClass('is-active')
  });
});
