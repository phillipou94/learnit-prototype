$(document).ready(function() {

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

    function shakeDiv(divSelector) {

        var l = 10;
        for (var i = 0; i <= 10; i++) {
            $(divSelector).animate({
                'margin-left': '+=' + (l = -l) + 'px',
                'margin-right': '-=' + l + 'px'
            }, 30, function() {
                $(divSelector).css('margin-left', '');
                $(divSelector).css('margin-right', '');
            });
        }

    }

    $(".answer-submit").click(function(event) {

        var selected = this.id;
        var num = selected[selected.length - 1];
        var selectedId = "#" + num;

        var answerId = "#answer-box" + num;
        var answer = $(answerId).val();

        var index = parseInt(num) - 1;
        var correctAnswers = [8, 13, 3, -11, 47, 22, 3, 69];

        if (parseInt(answer) == correctAnswers[index]) {
            const previouslyCompleted = parseInt($('text#completed-count')[0].innerHTML);
            const nowCompleted = previouslyCompleted + 1;
            $('text#completed-count')[0].innerHTML = nowCompleted;
            $(selectedId).animate({ opacity: 0 }, { duration: "slow" });

            //when finished with all of them
            if (nowCompleted == correctAnswers.length) {
                setTimeout(function() {
                    $('.exercise-modal > .modal-contents').addClass('success');
                    $('.exercise-modal').addClass('active');
                    $('.exercise-modal > .modal-contents').empty();
                    $('.exercise-modal > .modal-contents').append("<h1>Congrats, you're finished!</h1>");
                    $('.exercise-modal > .modal-contents').append("<h3>What next?</h3>");
                    $('.exercise-modal > .modal-contents').append("<div class='next'><a class='close-modal'>View Image</a><span>  |  <a href='./collections.html'>My Collection</a><span>  |  </span><a href='./exercise.html'>Next Exercise</a></div>");
                    $('.next a.close-modal').on('click', function() {
                        $('.exercise-modal > .modal-contents').removeClass('success');
                        $('.exercise-modal').removeClass('active');
                        $('.exercise-modal > .modal-contents').empty();
                    });
                }, 1000);
            };
        } else {
            var answerBoxId = "#answer-box" + num;
            var answerBox = $(answerBoxId)[0];
            answerBox.style.borderStyle = "none";
            answerBox.style.border = "1px solid #E52F4F";
            $(answerBoxId).effect("shake", { distance: 5, times: 3 }, 500)
        }

        event.preventDefault();

    });

    $(".answer-box").focus(function(event) {
        var id = event.target.offsetParent.id;
        console.log($("#check-button" + id))
        $("#check-button" + id)[0].style.visibility = "visible";
    });
    $(".answer-box").blur(function(event) {
        var id = event.target.offsetParent.id;
        $("#check-button" + id)[0].style.visibility = "hidden";
    });

    $(".logout-button").click(function() {
        Request.DELETE("signin", function() {
            window.location.href = "login.html";
        });
    });




});