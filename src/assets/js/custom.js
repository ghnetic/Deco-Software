// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

//show active step
function showActiveStep()
{
    if ($('#step0').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else if ($('#step1').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else if ($('#step2').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else if ($('#step3').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else if ($('#step4').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else if ($('#step5').is(':visible'))
    {
        $(".step-bar .bar .fill").eq(now).addClass('w-100');
    }
    else
    {
    console.log("error");
    }
}


function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
    console.log(now);

    showActiveStep();
}
$(".prev").on('click', function()
{

    $('.radio-field').addClass('bounce-left');
    $('.radio-field').removeClass('bounce-right');
    $(".step-bar .bar .fill").eq(now).removeClass('w-100');
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
    console.log(now);

    showActiveStep();

})


// quiz validation
var checkedradio = false;

function radiovalidate(stepnumber)
{
    var checkradio = $("#step"+stepnumber+" input").map(function()
    {
    if($(this).is(':checked'))
    {
        return true;
    }
    else
    {
        return false;
    }
    }).get();

    checkedradio = checkradio.some(Boolean);
}




// form validation
$(document).ready(function()
{

    // check step0
    $("#step0btn").on('click', function()
    {
        radiovalidate(1);
        checkedradio = true;

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes rellenar los campos!</div>')));
            
            radiovalidate(1);

        }
        
        else
        {
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            console.log(firstName,lastName);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            $('#step0 .radio-field').removeClass('bounce-left');
            $('#step0 .radio-field').addClass('bounce-right');
            setTimeout(function()
            {
                next();
            }, 900)

        }


    })

    // check step1
    $("#step1btn").on('click', function()
    {
        radiovalidate(1);

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>')));
            
            radiovalidate(1);

        }
        
        else
        {
            $('#step1 .radio-field').removeClass('bounce-left');
            $('#step1 .radio-field').addClass('bounce-right');
            setTimeout(function()
            {
                next();
            }, 900)

        }


    })

    // check step2
    $("#step2btn").on('click', function()
    {
        radiovalidate(2);

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>')));
            
            radiovalidate(2);

        }

        else
        {
            $('#step2 .radio-field').removeClass('bounce-left');
            $('#step2 .radio-field').addClass('bounce-right');
            setTimeout(function()
            {
                next();
            }, 900)

        }
    })

    // check step3
    $("#step3btn").on('click', function()
    {
        radiovalidate(3);

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>')));
            
            radiovalidate(3);

        }

        else
        {
            $('#step3 .radio-field').removeClass('bounce-left');
            $('#step3 .radio-field').addClass('bounce-right');
            setTimeout(function()
            {
                next();
            }, 900)

        }
    })

    // check step4
    $("#step4btn").on('click', function()
    {
        radiovalidate(4);

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>')));
            
            radiovalidate(4);
            
        }

        else
        {
            $('#step4 .radio-field').removeClass('bounce-left');
            $('#step4 .radio-field').addClass('bounce-right');
            setTimeout(function()
            {
                next();
            }, 900)

        }
    })

    // check last step
    $("#sub").on('click', function()
    {
        radiovalidate(5);

        if(checkedradio == false)
        {
            
        (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>')));
            
            radiovalidate(5);

        }

        else
        {
            showresult();
            $("#sub").html('Listo');

        }
    })
})