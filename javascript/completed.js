$(document).ready(function() {
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


});