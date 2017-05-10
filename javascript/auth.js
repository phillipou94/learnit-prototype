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

        var postSinginCallback = function(response) {
            if (response && response.id) {
                document.getElementById("login-form").removeChild(loader)
                $("#login-form").append(loginButton);
                location.href = "./main.html";
            } else {
                if (response.status == 500 && (retryCount <= retryMax)){
                    retryCount += 1;
                    console.log('Retried POST /signin/' + retryCount.toString() + ' times.');
                    Request.POST(req, "signin", postSinginCallback);
                } else {
                    document.getElementById("login-form").removeChild(loader)
                    $("#login-form").append(loginButton);
                    var $newdiv = document.createElement('div')
                    $newdiv.className = "error-message";
                    $newdiv.innerHTML = '<p> Invalid Login </p>';
                    $("body").append($newdiv)
                }
            }
        }

        var retryMax = 10;
        var retryCount = 0;
        Request.POST(req, "signin", postSinginCallback);
    });

    $('#signup-form').submit(function(event) {
        event.preventDefault();
        var username = event.target.username.value;
        var name = event.target.name.value;
        var password = event.target.password.value;
        var req = { username: username, password: password, name: name };
        var signUpButton = document.getElementById("signup-button");
        var loader = document.createElement('div');
        loader.className = "loader-container";
        loader.innerHTML = '<div class="loader"></div>'
        document.getElementById("signup-form").removeChild(signUpButton)
        $("#signup-form").append(loader);
        var postSingupCallback = function(response) {
            if (response && response.id) {
                location.href = "./main.html";
            } else {
                if (response.status == 500 && (retryCount <= retryMax)){
                    retryCount += 1;
                    console.log('Retried POST /signup/' + retryCount.toString() + ' times.');
                    Request.POST(req, "signup", postSingupCallback);
                } else {
                    document.getElementById("signup-form").removeChild(loader)
                    $("#signup-form").append(signUpButton);
                    var $newdiv = document.createElement('div');
                    $newdiv.className = "error-message";
                    $newdiv.innerHTML = '<p> This username has already been taken </p>';
                    $("body").append($newdiv);
                }
            }
        }
        var retryMax = 10;
        var retryCount = 0;
        Request.POST(req, "signup", postSingupCallback);

    });

})
