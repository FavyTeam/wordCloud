/**
 * Fixed Header
 */
function fixedHeader() {

    var setHeader = function() {
        if ($(window).scrollTop() > 10) {
            $('#top-nav').addClass('fixed-header');
            $('#logo').attr('src', 'assets/images/worldCloud-logo-active.png');
        } else {
            $('#top-nav').removeClass('fixed-header')
            $('#logo').attr('src', 'assets/images/worldCloud-logo.png');
        }
        
        
        if  ($(window).width() <= 762) {
            $('#logo').attr('src', 'assets/images/worldCloud-logo-active.png');
        }
        
    }
    try {
        $(window).scroll(setHeader).resize(setHeader);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Menu Hightlight
 */
function menuHightlight() {
    try {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        /**
         * This part handles the highlighting functionality.
         * We use the scroll functionality again, some array creation and 
         * manipulation, class adding and class removing, and conditional testing
         */
        var aChildren = $("#menu-main-top-navigation a"); // find the a children of the list items
        var aArray = []; // create the empty aArray
        for (var i = 0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            if (2 > ahref.length) {
                continue;
            }
            aArray.push(ahref);
        } // this for loop fills the aArray with attribute href values

        $(window).scroll(function() {
            var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
            var windowHeight = $(window).height(); // get the height of the window
            var docHeight = $(document).height();

            for (var i = 0; i < aArray.length; i++) {
                var theID = aArray[i];
                var div = $(theID).offset();
                if (typeof div === 'undefined') {
                    continue;
                }
                var divPos = $(theID).offset().top; // get the offset of the div from the top of page
                var divHeight = $(theID).height(); // get the height of the div in question
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $("a[href='" + theID + "']").addClass("nav-active");
                } else {
                    $("a[href='" + theID + "']").removeClass("nav-active");
                }
            }

            if (windowPos + windowHeight == docHeight) {
                if (!$("nav li:last-child a").hasClass("nav-active")) {
                    var navActiveCurrent = $(".nav-active").attr("href");
                    $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                    $("nav li:last-child a").addClass("nav-active");
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

jQuery(document).ready(function($) {
    fixedHeader();
    menuHightlight()
});