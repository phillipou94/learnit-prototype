var Request = new Request();

var numDaysBetween = function(d1, d2) {
    var diff = d2.getTime() - d1.getTime();
    return diff / (1000 * 60 * 60 * 24);
};

$(document).ready(function() {
    Handlebars.partials = Handlebars.templates;
    var loader = document.createElement('div');
    loader.className = "loader-container";
    loader.innerHTML = '<div class="loader"></div>'
    $(".main-body").append(loader)

    Request.GET('home', function(response) {

        if (response && !response.error) {
            $(".loader-container").remove();
            var completedExercises = response.exercises.filter(
                function(curr) {
                    return (curr.completed_problems == curr.total_problems);
                }
            );

            response.exercises.forEach(function(exercise) {
                var today = new Date();
                var exercise_due = new Date(exercise.due_date)
                var days_till_due = numDaysBetween(today, exercise_due);
                var late = days_till_due < 0;
                var due_tomorrow = days_till_due > 0 && days_till_due < 1;
                exercise.late = late;
                exercise.due_tomorrow = due_tomorrow;

            })

            var subheaderHTML = Handlebars.templates['main_subheader_text']({
                name: response.name,
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
                progress: progressData,
                sort_display: "Sort by Due Date"
            });
            $('.exercise-table').html(exerciseTabelHTML);

            $(document).on('click', '.dropdown-option', function(event) {
                var option = event.target.textContent;
                var optionId = event.target.id;
                var display = "Sort by " + option;

                //sort by due date
                if (optionId === "option1") {
                    response.exercises.sort(function(a, b) {
                        return new Date(a.due_date).getTime() > new Date(b.due_date).getTime();
                    });
                } else if (optionId === "option2") {
                    //sort by incomplete first then by due date
                    response.exercises.sort(function(a, b) {
                        a.incomplete = a.completed_problems !== a.total_problems;
                        b.incomplete = b.completed_problems !== b.total_problems
                        return b.incomplete - a.incomplete ||
                            new Date(a.due_date) - new Date(b.due_date);
                    });

                } else {
                    //sort by completed first, then partially completed, then due date
                    response.exercises.sort(function(a, b) {
                        a.done = a.completed_problems === a.total_problems;
                        b.done = b.completed_problems === b.total_problems
                        return b.done - a.done ||
                            b.completed_problems - a.completed_problems ||
                            new Date(a.due_date) - new Date(b.due_date);
                    });
                }
                var exerciseTabelHTML = Handlebars.templates['main_exercise_table']({
                    exercises: response.exercises,
                    progress: progressData || { percent: 0, value: 0 / 100.0 },
                    sort_display: display
                });
                $('.exercise-table').html(exerciseTabelHTML);
            });

        } else {
            $(".loader-container").remove();
            if (response.status == 401 && response.error) {
                console.log(response);
                location.href = './login.html';
            }
        }

    });


});