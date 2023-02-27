$(function(){
  // モーダル
  $('.js-modal-open').click(function () {
    $('#js-modal-area').toggleClass('is-show');
  });
  $('#js-modal-close').click(function () {
    $('#js-modal-area').toggleClass('is-show');
  });
  $('#js-modal-bg').click(function () {
    $('#js-modal-area').toggleClass('is-show');
  });

  // select
  $('.js-select').change(function() {
    if($(this).val() == '') {
      $(this).css({color: '#797878'});
    } else {
      $(this).css({color: '#000000'});
    }
  });

  // ドロワー
  $('#js-hamburger').click(function() {
    $('body').toggleClass('is-drawer-active');

    if($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', 'true');
      $('#js-drawer').attr('aria-hidden', 'false')
    } else {
      $(this).attr('aria-expanded', 'false');
      $('#js-drawer').attr('aria-hidden', 'true')
    }
  })
});

flatpickr('.js-datepicker', {
  locale: 'ja',
  minDate: 'today',
  mode: 'range',
  dateFormat: 'Y/m/d',
});

AOS.init();