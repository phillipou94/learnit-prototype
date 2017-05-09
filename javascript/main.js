var Request = new Request();
$(document).ready(function() {
    Handlebars.partials = Handlebars.templates;
    var loader = document.createElement('div');
    loader.className = "loader-container";
    loader.innerHTML = '<div class="loader"></div>'
    $(".main-body").append(loader)

    Request.GET('home', function(response) {
        response.exercises = [{
                "id": 1,
                "name": "Exercise 1",
                "total_problems": 8,
                "completed_problems": 8,
                "due_date": "May 10, 2017"
            }, {
                "id": 2,
                "name": "Exercise 1",
                "total_problems": 8,
                "completed_problems": 0,
                "due_date": "May 11, 2017"
            },
            {
                "id": 3,
                "name": "Exercise 1",
                "total_problems": 8,
                "completed_problems": 1,
                "due_date": "May 2, 2017"
            },
            {
                "id": 4,
                "name": "Exercise 4",
                "total_problems": 8,
                "completed_problems": 1,
                "due_date": "May 12, 2017"
            },
        ]

        if (response && !response.error) {
            $(".loader-container").remove();
            var completedExercises = response.exercises.filter(
                function(curr) {
                    return (curr.completed_problems == curr.total_problems);
                }
            );

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

        } else {
            $(".loader-container").remove();
            if (response.status == 401 && response.error) {
                console.log(response);
                location.href = './login.html';
            }
        }

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
    });


});