$(document).ready(function() {

    $(".answer-submit").click(function(event) {
        event.preventDefault();
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
            $(selectedId + " .image-snippet").css("visibility", "hidden");
            $(selectedId + " .curl").css("width", "240px");
            $(selectedId + " .curl").css("height", "240px");
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
            $(answerBoxId).focus();
            $("#check-button" + num)[0].style.visibility = "visible";
        }



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
