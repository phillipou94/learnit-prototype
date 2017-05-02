Request = function() {
    var that = Object.create(Request.prototype);
    var BASE_URL = "http://vendnue.com/learnit/";

    $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        }
    });

    that.POST = function(req, path, completion) {
        var url = BASE_URL + path + "/"
        $.post(BASE_URL + path + "/", req, function(res) {
                completion(res)
            })
            .fail(function(error) {
                console.log(error)
                completion(error)
            })
    };

    that.GET = function(path, completion) {
        var url = BASE_URL + path + "/"
        $.get(BASE_URL + path + "/", function(res) {
                completion(res)
            })
            .fail(function(error) {
                console.log(error)
                completion(error)
            })
    };

    that.PUT = function(req, path, completion) {
        var url = BASE_URL + path + "/"
        $.ajax({
            url: url,
            data: req,
            type: 'PUT',
            success: completion
        });
    };

    that.DELETE = function(path, completion) {
        var url = BASE_URL + path + "/"
        $.ajax({
            url: url,
            type: 'DELETE',
            success: completion
        });
    };


    Object.freeze(that);
    return that;
}