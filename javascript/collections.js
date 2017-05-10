var Request = new Request();

var collectionThumbnail = function(collection, index) {
    //{'path_to_img': self.path_to_img, 'name': self.name, 'number': self.number, 'id': self.id}
    return '<div class="column"> <img src=' + collection.path_to_img +
        ' style="width:100%" onclick="openModal();currentSlide(' + (index + 1) + ')" class="hover-shadow cursor">' +
        '<p class="image-title">' + collection.name + '</p></div>'
}

var collectionModalContent = function(collection, index, n) {
    console.log(collection)
    return '<div class="mySlides">' +
        '<div class="numbertext">' + (index + 1) + '/' + n + '</div>' +
        '<img src=' + collection.path_to_img + ' style="width:100%"></div>'
}

var collectionModalThumbnail = function(collection, index) {
    console.log(collection)
    return '<div class="column">' +
        '<img class="demo cursor" src="' + collection.path_to_img + '"style="width:100%" onclick="currentSlide(' + (index + 1) + ')' +
        '"alt=" ' + collection.name + '"> </div>'
}

$(document).ready(function() {

    // Handlebars.partials = Handlebars.templates;
    var loader = document.createElement('div');
    loader.className = "loader-container";
    loader.innerHTML = '<div class="loader"></div>'
    $(".main-body").append(loader)

    var getCollectionsCallback = function(response) {

        if (response && !response.error) {
            $(".loader-container").remove();
            var collections = response.collections;
            var n = collections.length
            if (n && n > 0) {
                $("#message").text("Here are the photos you've collected!")
                var collectionThumbnails = collections.map(function(collection, index) {
                    return collectionThumbnail(collection, index)
                });

                var modalContents = collections.map(function(collection, index) {
                    return collectionModalContent(collection, index, n)
                });

                var collectionModalThumbnails = collections.map(function(collection, index) {
                    return collectionModalThumbnail(collection, index)
                });

                collectionThumbnails.forEach(function(thumbnail) {
                    $(".row").append(thumbnail)
                })

                modalContents.forEach(function(modal) {
                    $(".modal-content").append(modal)
                })

                var buffer = '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>' +
                    '<a class="next" onclick="plusSlides(1)">&#10095;</a>' +

                    '<div class="caption-container">' +
                    '<p id="caption"></p>' +
                    '</div>'

                $(".modal-content").append(buffer)

                collectionModalThumbnails.forEach(function(thumbnail) {
                    $(".modal-content").append(thumbnail)
                })
            } else {
                $("#message").text("Do some exercises to collect some photos!")
            }
        } else {
            if (response.status && response.status == 500 && (retryCount < retryMax)) {
                retryCount += 1;
                console.log('Retried GET /collections/' + retryCount.toString() + ' times.');
                Request.GET('collections', getCollectionsCallback);
            } else {
                // TODO unknown error, handle accordingly
            }
        }
    };

    var retryMax = 10;
    var retryCount = 0;
    Request.GET('collections', getCollectionsCallback);

});