$(function(){
  // Swiper 制作実績
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    slidesPerView: 2,
    spaceBetween: 15,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
    },
    // Responsive breakpoints
  breakpoints: {
    // when window width is >= 855px
    855: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    // when window width is >= 1022px
    1022: {
      slidesPerView: 4,
      spaceBetween: 56
    },
  },
  });

  // アコーディオン　FAQ
  $('.faq__q').on('click', function(e){
    e.preventDefault();
    $(this).next().slideToggle();

    return false;

  });

  // AOS
  AOS.init({
    duration: 1200
  });

  // スムーススクロール
  $(window).on('scroll', function(){
    if($(this).scrollTop() > 80){ 
      $('#scroll-top').fadeIn(300); 
    } else {
      $('#scroll-top').fadeOut(300); 
    }

  });
  //スムーススクロール設定
  $('a[href^="#"]').on("click",function () {
    let header = $(".header__inner").innerHeight();
    // 移動速度（ミリ秒）
    let speed = 500;
    // hrefで指定されたidを取得
    let id = $(this).attr("href");
    let target = $( id == "#" ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得 
    let position = $(target).offset().top - header;
    // ターゲットの位置までspeedの速度で移動
    $("html, body").animate({scrollTop: position},speed,);
    return false;
  });

  //フォームの誤送信制御
  let $submitBtn = $('#js-submit')
  $('input, textarea').on('change', function () {
    if (  
      $('input[type="text"]').val() !== "" &&
      $('input[type="email"]').val() !== "" &&
      $('input[type="checkbox"]').val() !== "" &&
      $('#confirm').prop('checked') === true   //プライバシーポリシーの部分にcheckedがついているか確認
    ) {
      $submitBtn.prop('disabled', false);  //上記が満たされるのであれば、submitBtnからdisabledを外し、

    } else {
      $submitBtn.prop('disabled', true);  //空欄が存在するのであれば、disabledはfalseとなる
    }
  });

  //フォームお問い合わせ完了メッセージ
  $('#contact__form').on("submit", function (event) {
    var formData = $('#contact__form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfUF_-He_nBq_n-9w3BtuWyhdO-TBI5k5oag4qsGz9-t1iE9Q/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end-message").slideDown();
          $(".submit__btn").fadeOut();
        },
        200: function () {
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

  //ハンバーガーメニュー
  $('.sp-nav__items__item a').click(function(){
    let $checkbox = $('#nav-btn-check');
    $checkbox.removeAttr("checked").prop("checked", false).change();
  });

});