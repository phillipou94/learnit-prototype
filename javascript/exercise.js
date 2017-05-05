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
    if ( !exerciseId ){location.href = '/main.html';}

    Request.GET('exercises/' + exerciseId.toString(), function(response){
        if (response && !response.error){
            var completedCount = response.problems.reduce(function(accum, curr){
                if (curr.completed){ return accum + 1;}
                else { return accum; }
            }, 0)
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
