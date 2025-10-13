(function ($) {
  "use strict";

  /* ===============================
     0) 유틸: 히어로(배너) 존재 확인
     =============================== */
  function hasHero() {
    return document.querySelector(".page-title, .page-title-alt");
  }

  /* ==========================================
     1) 헤더 높이를 CSS 변수(--navbar-height)에 동기화
     ========================================== */
  function syncNavHeight() {
    var nav = document.querySelector("header.navigation");
    if (!nav) return;
    var h = nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--navbar-height", h + "px");
  }

  // 로드/리사이즈/글꼴로 인한 리플로우까지 최대한 반영
  window.addEventListener("load", syncNavHeight);
  window.addEventListener("resize", syncNavHeight);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(syncNavHeight);
    var navForRO = document.querySelector("header.navigation");
    if (navForRO) ro.observe(navForRO);
  }

  /* ==========================================
     2) Sticky Menu (스크롤 기준 nav-bg 토글 - 견고 버전)
     ========================================== */
  function toggleNavBg() {
    var $nav = $(".navigation");
    if (!$nav.length) return;

    // 스크롤 100px 이상이면 진하게, 그 외엔:
    // - 히어로가 있으면 반투명 상태 유지(= nav-bg 제거)
    // - 히어로가 없으면 진입부터 nav-bg 적용
    if ($(window).scrollTop() > 100) {
      $nav.addClass("nav-bg");
    } else {
      if (hasHero()) $nav.removeClass("nav-bg");
      else $nav.addClass("nav-bg");
    }
    // nav 높이 변화가 생길 수 있으므로 동기화
    syncNavHeight();
  }

  // 초기 상태 반영 + 스크롤 이벤트 바인딩
  $(window).on("load", toggleNavBg);
  $(window).on("scroll", toggleNavBg);

  // (참고) 기존 코드: offset().top은 fixed 요소에선 0이어서 불안정
  // $(window).scroll(function () {
  //   if ($(".navigation").offset().top > 100) {
  //     $(".navigation").addClass("nav-bg");
  //   } else {
  //     $(".navigation").removeClass("nav-bg");
  //   }
  // });

  /* ===============================
     3) Background-images / color / progress
     =============================== */
  $("[data-background]").each(function () {
    $(this).css({
      "background-image": "url(" + $(this).data("background") + ")",
    });
  });

  $("[data-color]").each(function () {
    $(this).css({
      "background-color": $(this).data("color"),
    });
  });

  $("[data-progress]").each(function () {
    $(this).css({
      bottom: $(this).data("progress"),
    });
  });

  /* ###########################################
     4) Hero Parallax (원본 유지)
     ############################################## */
  window.onload = function () {
    var parallaxBox = document.getElementById("parallax");
    if (!parallaxBox) return;

    var /* c1left = document.getElementById('l1').offsetLeft,
           c1top = document.getElementById('l1').offsetTop, */
      c2left = document.getElementById("l2")?.offsetLeft || 0,
      c2top = document.getElementById("l2")?.offsetTop || 0,
      c3left = document.getElementById("l3")?.offsetLeft || 0,
      c3top = document.getElementById("l3")?.offsetTop || 0,
      c4left = document.getElementById("l4")?.offsetLeft || 0,
      c4top = document.getElementById("l4")?.offsetTop || 0,
      c5left = document.getElementById("l5")?.offsetLeft || 0,
      c5top = document.getElementById("l5")?.offsetTop || 0,
      c6left = document.getElementById("l6")?.offsetLeft || 0,
      c6top = document.getElementById("l6")?.offsetTop || 0,
      c7left = document.getElementById("l7")?.offsetLeft || 0,
      c7top = document.getElementById("l7")?.offsetTop || 0,
      c8left = document.getElementById("l8")?.offsetLeft || 0,
      c8top = document.getElementById("l8")?.offsetTop || 0,
      c9left = document.getElementById("l9")?.offsetLeft || 0,
      c9top = document.getElementById("l9")?.offsetTop || 0;

    parallaxBox.onmousemove = function (event) {
      event = event || window.event;
      var x = event.clientX - parallaxBox.offsetLeft,
        y = event.clientY - parallaxBox.offsetTop;

      /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
      mouseParallax("l2", c2left, c2top, x, y, 25);
      mouseParallax("l3", c3left, c3top, x, y, 20);
      mouseParallax("l4", c4left, c4top, x, y, 35);
      mouseParallax("l5", c5left, c5top, x, y, 30);
      mouseParallax("l6", c6left, c6top, x, y, 45);
      mouseParallax("l7", c7left, c7top, x, y, 30);
      mouseParallax("l8", c8left, c8top, x, y, 25);
      mouseParallax("l9", c9left, c9top, x, y, 40);
    };
  };

  function mouseParallax(id, left, top, mouseX, mouseY, speed) {
    var obj = document.getElementById(id);
    if (!obj || !obj.parentNode) return;
    var parentObj = obj.parentNode,
      containerWidth = parseInt(parentObj.offsetWidth),
      containerHeight = parseInt(parentObj.offsetHeight);
    obj.style.left =
      left -
      ((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) *
        speed +
      "px";
    obj.style.top =
      top -
      ((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) *
        speed +
      "px";
  }

  /* ===============================
     5) Sliders (원본 유지)
     =============================== */
  $(".testimonial-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: false,
    adaptiveHeight: true,
  });

  $(".client-logo-slider").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  });

  /* ===============================
     6) Shuffle js (원본 유지)
     =============================== */
  var Shuffle = window.Shuffle;
  var jQuery = window.jQuery;

  var wrapper = document.querySelector(".shuffle-wrapper");
  if (wrapper && Shuffle) {
    var myShuffle = new Shuffle(wrapper, { itemSelector: ".shuffle-item", buffer: 1 });
    jQuery('input[name="shuffle-filter"]').on("change", function (evt) {
      var input = evt.currentTarget;
      if (input && input.checked) myShuffle.filter(input.value);
    });
  }
})(jQuery);
