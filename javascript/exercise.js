var Request = new Request();
$( document ).ready(function(){
    Handlebars.partials = Handlebars.templates;

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

    var exerciseId = getUrlParameter('id');
    console.log(exerciseId);
    if ( !exerciseId ){location.href = './main.html';}

    Request.GET('exercises/' + exerciseId.toString(), function(response){
        if (response && !response.error){

            var completedCount = response.problems.reduce(function(accum, curr){
                if (curr.completed){ return accum + 1;}
                else { return accum; }
            }, 0);

            var titleHTML = Handlebars.templates['exercise_title']({
                completedCount: completedCount,
                exercise: response
            });
            $('.exercise-title').html(titleHTML);

            var problemsLeft = response.problems.slice(0,4)
            var problemsRight = response.problems.slice(4,8)

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

                var index = parseInt(num) - 1;
                var correctAnswers = response.problems.map(function(curr){return curr.answer;});

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

        } else {
            if (response.status == 401 && response.error){
                console.log(response);
                location.href='./login.html';
            } else {
                console.log(response);
            }
        }
    })
});
