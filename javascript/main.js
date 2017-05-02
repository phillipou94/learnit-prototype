var Request = new Request();
$( document ).ready(function(){
    Handlebars.partials = Handlebars.templates;

    Request.GET('home', function(response){
        if (response && !response.error){

            var completedExercises = response.exercises.filter(
                function(curr){
                    return (curr.completed_problems == curr.total_problems);
                }
            );

            var inProgressExercises = response.exercises.filter(
                function(curr){
                    return (curr.completed_problems > 0 &&
                            curr.completed_problems != curr.total_problems);
                }
            );


            var todoExercises =  response.exercises.filter(
                function(curr){
                    return (curr.completed_problems == 0);
                }
            );


            var subheaderHTML = Handlebars.templates['main_subheader_text']({
                name:response.name,
                completed_exercises: completedExercises.length,
            });
            $('.subheader > .subheader-text').html(subheaderHTML);

            var progressPercent = Math.floor((completedExercises.length / response.exercises.length) * 100.0);
            var progressData = {
                percent: progressPercent,
                value: progressPercent / 100.0
            };
            var exerciseTabelHTML = Handlebars.templates['main_exercise_table']({
                exercises: response.exercises,
                progress: progressData
            });
            $('.exercise-table').html(exerciseTabelHTML);

        } else {
            if (response.status == 401 && response.error){
                console.log(response);
                location.href='./login.html';
            }
        }
    });
});
