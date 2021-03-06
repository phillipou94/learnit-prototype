var Request = new Request();
$(document).ready(function() {
    Handlebars.partials = Handlebars.templates;

    var loader = document.createElement('div');
    loader.className = "loader-container";
    loader.innerHTML = '<div class="loader"></div>'
    $(".main-body").append(loader)

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var submitCompletedProblem = function(problemId){
        Request.PUT('problems/' + problemId.toString(), function(response){
        })
    };

    var exerciseId = getUrlParameter('id');
    if (!exerciseId) { location.href = './main.html'; }

    Request.GET('exercises/' + exerciseId.toString(), function(response) {
        $(".loader-container").remove();
        if (response && !response.error) {

            var completedCount = response.problems.reduce(function(accum, curr) {
                if (curr.completed) { return accum + 1; } else { return accum; }
            }, 0);

            var titleHTML = Handlebars.templates['exercise_title']({
                completedCount: completedCount,
                exercise: response
            });
            $('.exercise-title').html(titleHTML);

            var problemsLeft = response.problems.slice(0, 4)
            var problemsRight = response.problems.slice(4, 8)
            var correctAnswers = response.problems.map(function(curr) { return curr.answer; });

            var exerciseGameContainerHTML = Handlebars.templates['exercise_game_container']({
                path_to_img: response.path_to_img,
                problems_left: problemsLeft,
                problems_right: problemsRight
            });

            $('.game-container').html(exerciseGameContainerHTML);

            $(".answer-submit").click(function(event) {
                event.preventDefault();
                var selected = this.id;
                var num = selected[selected.length - 1];
                var selectedId = "#" + num;

                var answerId = "#answer-box" + num;
                var answer = $(answerId).val();
                var problemId = parseInt($(answerId).data('problem-id')).toString();

                var index = parseInt(num) - 1;

                if (parseInt(answer) == correctAnswers[index]) {
                    submitCompletedProblem(problemId);
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
                            $('.exercise-modal > .modal-contents').append("<div class='next'><a class='close-modal'>View Image</a><span>  |  <a href='./collections.html'>My Collection</a><span>  |  </span><a id = 'next' href='./exercise.html'>Do More Exercises</a></div>");
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

            $(".hint").click(function(event) {
                var num = event.target.offsetParent.id;
                var id = event.target.id;
                var hint = $("#problem_hint" + num)[0].value
                $("#" + id).text("hint: " + hint)
                $("#" + id).addClass('show');
                $("#" + id).css('color', "#F26B5C");
                $("#" + id).css('text-decoration', "none");
                $("#" + id).css('cursor', "default");
            });

        } else {
            if (response.status == 401 && response.error) {
                console.log(response);
                location.href = './login.html';
            } else {
                console.log(response);
            }
        }
    })
});
