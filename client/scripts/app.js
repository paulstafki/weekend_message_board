function getMessages() {
    $.ajax({
        "type": "GET",
        url: "/things",
        success: function(data) {
            updateMessages(data);
        }
    })
}

function updateMessages(data) {
    $('.dataDiv').empty();
    for (var i = 0; i < data.length; i++) {
        $('.dataDiv').append('<div class="messageDiv"></div>');
        var $short = $('.dataDiv').children().last();
        $short.append('<hr>');
        $short.append("<h3>" + data[i].name + "</h3>");
        $short.append('<hr>');
        $short.append("<p>" + data[i].message + "</p>");
        $short.append('<hr>');
        if (document.location.href == 'http://localhost:5000/secret') {
            $short.append("<button data-id=" + data[i]._id + ">DELETE</button>");
        }
    }
}

$(document).ready(function (){
    $('body').append('<button class="refresh">Refresh</button>');
    $('#inputForm').submit(function(event) {
        event.preventDefault();
        var formData = $("#inputForm").serialize();
        console.log(formData);
        $.ajax ({
            type: "POST",
            url: "/things",
            data: formData,
            success: function(data){
                console.log(data);
                getMessages();
            }
        });
    });
    $('.dataDiv').on('click', 'button', function(){
        $(this).parent().remove();
        $.ajax({
            type: "DELETE",
            url: "/things/" + $(this).data("id"),
            success: function(){
                console.log("For God sakes Jim, Im a doctor not a poolman!");
            },
            error: function(){
                alert("Error: ", status);
            },
            complete: function(){
                console.log("deleted");
            }
        });
    });
    $('body').on('click', '.refresh', function(){
        console.log("Refresh Clicked!");
        getMessages();
    });
    getMessages();
});