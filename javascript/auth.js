var Request = new Request();
$(document).ready(function() {

    $('#login-form').submit(function(event) {
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;
        var req = { username: username, password: password };
        var loginButton = document.getElementById("login-button");
        var loader = document.createElement('div');
        loader.className = "loader-container";
        loader.innerHTML = '<div class="loader"></div>'
        document.getElementById("login-form").removeChild(loginButton)
        $("#login-form").append(loader);

        Request.POST(req, "signin", function(response) {
            if (response && response.id) {
                window.location.href = "main.html";
            } else {
                var $newdiv = document.createElement('div')
                $newdiv.className = "error-message";
                $newdiv.innerHTML = '<p> Invalid Login </p>';
                $("body").append($newdiv)
            }
            document.getElementById("login-form").removeChild(loader)
            $("#login-form").append(loginButton);
        })


    });
})