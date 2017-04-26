$(document).ready(function() {

    // jQuery methods go here...

    $('.scroll-to-about').click(function() {
        var nextSection = $('#about');
        $('html, body').animate({
            scrollTop: $(nextSection).offset().top
        }, 2000);
    });

    $('.scroll-to-skills').click(function() {
        var nextSection = $('#skills');
        $('html, body').animate({
            scrollTop: $(nextSection).offset().top
        }, 2000);
    });

    $('.scroll-to-portfolio').click(function() {
        var nextSection = $('#portfolio');
        $('html, body').animate({
            scrollTop: $(nextSection).offset().top
        }, 2000);
    });

    $('.scroll-to-experience').click(function() {
        var nextSection = $('#experience');
        $('html, body').animate({
            scrollTop: $(nextSection).offset().top
        }, 2000);
    });

    $(".project").hover(function() {

        $(this).css("border", "8px solid #ff3d2b");
        $(this).css("border-width", "0 0 0 2px");

    }, function() {
        $(this).find(".project-logo").css("border", "2px solid rgba(245,245,245,1)");
        $(this).css("border-style", "none");
    });



    $(".answer-submit").click(function(event) {
        var selected = this.id;
        var num = selected[selected.length - 1];
        var selectedId = "#" + num;

        var answerId = "#answer-box" + num;
        var answer = $(answerId).val();

        if (answer == 17) { //hard coded for now
            $(selectedId).animate({ opacity: 0 }, { duration: "slow" });
        } else {
            var answerBoxId = "#answer-box" + num;
            var answerBox = $(answerBoxId)[0];
            answerBox.style.borderStyle = "none";
            answerBox.style.border = "1px solid #E52F4F";
            $(answerBoxId).effect("shake", { distance: 5, times: 3 }, 500)


        }

        event.preventDefault();

    });


});