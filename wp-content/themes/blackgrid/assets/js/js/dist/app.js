$(document).on('click', '.menu-collapse .menu-header', function (e) {
  // $(this).parent().parent().find('.menu-list').removeClass('active')
  // $(this).parent().parent().find('.menu-header').removeClass('active')
  $(this).toggleClass('active')
  $(this).parent().find('.menu-list').toggleClass('active')
})

$(document).on('click', '.menu-item', function (e) {
  $('.sidenav .menu-item').removeClass('active')
  $(this).addClass('active')
})

new SmoothScroll('a[href*="#"]', {
  speedAsDuration: true,
  speed: 600,
  offset: 24,
})

$(document).on('click', '.navbar-burger', function (e) {
  $(this).toggleClass('active')
  $('.sidenav').toggleClass('active')
})

$(document).on('click', '.add-navigation', function (e) {
  e.preventDefault()
  $(this).css('display', 'none')
  $('.navigation-submit').css('display', 'block');
  $('.form-control-site-name').focus()
})

$(document).on('click', '.navigation-submit-close', function (e) {
  e.preventDefault()
  $(this).parent().parent().css('display', 'none')
  $('.add-navigation').css('display', 'flex');
})

$(document).on('submit', '.navigation-submit', function (e) {
  e.preventDefault()
  const data = $(this).serialize() + '&action=ajaxSubmitNavigation'
  $(this).trigger('reset')
  wpieAjaxRequest(wpieAjax.ajaxUrl, 'POST', data, function (data) {
    const dom = $.parseHTML(data.msg)
    $(dom).insertBefore('.add-navigation-wrap')
    $('.navigation-submit').css('display', 'none');
    $('.add-navigation').css('display', 'flex');
  })
})

$(document).on('click', '.card-delete', function (e) {
  e.preventDefault()
  const data = 'id=' + $(this).data('id') + '&action=ajaxDeleteNavigation'
  const parent = $(this).parent().parent().parent()
  wpieAjaxRequest(wpieAjax.ajaxUrl, 'POST', data, function (data) {
    parent.remove()
  })
})

$(document).on('click', '.btn-modal', function (e) {
  e.preventDefault()
  $('.modal').removeClass('modal-active')
  let $id = $(this).data('target')
  $($id).addClass('modal-active')
})

$(document).on('click', '.modal-close, .btn-modal-close', function (e) {
  e.preventDefault()
  e.stopPropagation()
  $('.modal').removeClass('modal-active')
  // $(this).parents('.modal').removeClass('modal-active')
})

$(document).on('click', '.modal-content', function (e) {
  e.stopPropagation()
})

$(document).on('click', '.modal', function (e) {
  e.preventDefault()
  $(this).removeClass('modal-active')
})

$(document).on('click', '.menu-item', function (e) {
  if (!isHomePage) {
    window.location.href = homeURL + '/' + $(this).attr('href');
  }
})

$(document).on('click', '.card', function (e) {
  const $pid = $(this).data('pid')
  const data = 'pid=' + $pid + '&action=ajaxVisitBookmark';
  wpieAjaxRequest(wpieAjax.ajaxUrl, 'POST', data, function (data) {
    console.log(data)
  })
})

$(document).on('click', '.card-love', function (e) {
  e.preventDefault()
  const $pid = $(this).data('pid')
  if (Cookies.get('love_' + $pid)) {
    return
  }

  const data = 'pid=' + $pid + '&action=ajaxLoveBookmark';
  const $count = $(this).find('.card-love-count')
  const $this = $(this)
  wpieAjaxRequest(wpieAjax.ajaxUrl, 'POST', data, function (data) {
    $this.addClass('active')
    $this.find('.czs-heart-l').removeClass('czs-heart-l').addClass('czs-heart')
    $count.html(data.extra)
  })
})

const $noticeWrap = $(".notice-carousel-wrap");
$noticeWrap.each(function () {
  const noticeNumbers = $(this).find('.notice-item').length
  const $this = $(this)
  if (noticeNumbers > 1) {
    setInterval(function () {
      $this.stop(true, true).animate({
        'top': '-44px'
      }, 200, function () {
        $this.css('top', '-2px');
        $this.append($this.find(".notice-item:first"));
      });
    }, 6000);
  }
})

$(document).on('click', '.fighting', () => {
  $('body, html').animate({
    scrollTop: 0
  }, 600)
})

$(window).scroll(function () {
  let scrollTop = $(document).scrollTop()

  if (scrollTop > 1000) {
    $('.fighting').addClass("active")
  } else {
    $('.fighting').removeClass("active")
  }
})

window.onload = function () {
  $(window).trigger("scroll");
};

$(window).resize(function () {
  $(window).trigger("scroll");
});

const elements = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
const $btnBrief = document.getElementById('js-brief')
const $btnDark = document.getElementById('js-dark')

if (Cookies.get('brief') === 'true') {
  $btnBrief.checked = 'checked'
}

if (Cookies.get('dark') === 'true') {
  $btnDark.checked = 'checked'
  $('body').addClass('dark')
}

$btnBrief.onchange = function () {
  if ($btnBrief.checked) {
    Cookies.set('brief', true)
    $('.card').addClass('card-brief')
  } else {
    Cookies.set('brief', false)
    $('.card').removeClass('card-brief')
  }
}

$btnDark.onchange = function () {
  if ($btnDark.checked) {
    Cookies.set('dark', 'true')
    $('body').addClass('dark')
  } else {
    Cookies.set('dark', 'false')
    $('body').removeClass('dark')
  }
}

elements.forEach(function (elem) {
  new Switchery(elem, {size: 'small'});
});