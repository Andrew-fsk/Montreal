$(document).ready(function () {
    $('.nav').PopupSlider({
        effect: 'right',
        button: '.menu',
        closeButton: '.closed',
        container: '.header',
        breakpoint: 501,
        onMenuOpen: false,
        onMenuClose: false
    });
});

$(document).on('click touchend', '.to-anchor1', function (event) {
    event.preventDefault();
    if ($('html').innerWidth() < 501) {
        $('body').css({'overflow': 'auto', 'margin-right': 0});
        $('.nav').removeClass('menu-open');
        $('.menu').removeClass('menu-open');
    }
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 300);
    return false;
})

$(document).on('click touchend', '.to-top', function (event) {
    event.preventDefault();
    if ($('html').innerWidth() < 501) {
        $('body').css({'overflow': 'auto', 'margin-right': 0});
    $('.nav').removeClass('menu-open');
    $('.menu').removeClass('menu-open');
    }
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 300);
    return false;
})
