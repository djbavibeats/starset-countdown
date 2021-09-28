let userEmail = "";

// COUNTDOWN TIMER
var countDownDate = new Date("Oct 8, 2021 00:00:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    days = (days < 10 ? '0' : '') + days;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = (hours < 10 ? '0' : '') + hours;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    minutes = (minutes < 10 ? '0' : '') + minutes;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    seconds = (seconds < 10 ? '0' : '') + seconds;

    // Display the result in the element with id="demo"
    document.getElementById("countdown-timer").innerHTML = days + " :" + hours + " :"
    + minutes + " :" + seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-timer").innerHTML = "EXPIRED";
    }
}, 1000);
// END COUNTDOWN TIMER

window.addEventListener("click", () => {
    document.getElementById("bgvid");
    if (bgvid.muted) {
        bgvid.muted = false;
    } 
})

function submitForm() {
    let email = document.getElementById('email').value;
    
    document.cookie = `email_signup=${email}`;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let info = {
            email: email,
            dsp: [ 'countdown-timer' ]
        }
            return fetch('https://infected.starsetonline.com/mailchimp/add-member', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            }).then(response => {
                return response.json()
                    .then(data => {
                        if (data.status == 400) {
                            // The email already exists, update the member
                            console.log("email exists");
                            return fetch('https://infected.starsetonline.com/mailchimp/update-member', {
                                method: 'POST',
                                mode: 'cors',
                                cache: 'no-cache',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(info)
                            }).then(response => {
                                console.log("email updated");
                                // The member's email was updated
                                $('#postsubmit-text').css({ 'display' : 'flex' })
                                $('#presubmit-text').css({ 'display' : 'none' })
                                $('#email').css({ 'display' : 'none' })
                                $('#presubmit-button').css({ 'display' : 'none' })

                            })
                        } else {
                            // The member's email was added
                            $('#postsubmit-text').css({ 'display' : 'flex' })
                            $('#presubmit-text').css({ 'display' : 'none' })
                            $('#email').css({ 'display' : 'none' })
                            $('#presubmit-button').css({ 'display' : 'none' })

                        }
                    })
            })
    } else {
        alert("You have entered an invalid email address!")
        return false;
    }
}

// Check to see if device is accessing site on mobile
$(window).resize(function() {
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if (window.matchMedia("(orientation: portrait)").matches) {
            // you're in PORTRAIT mode
            $('#mobile-instructions').css({
                'position': 'absolute',
                'width': '100%',
                'height': '100vh',
                'top': '0',
                'z-index': '10',
                'display': 'flex'
            })
        }

        if (window.matchMedia("(orientation: landscape)").matches) {
            // you're in LANDSCAPE mode
            $('#mobile-instructions').css({
                'display' : 'none'
            })
        }

    }
}).resize();

window.onclick = function(event) {
    var socialModalWrapper = document.getElementById('social-modal-wrapper');
    if (event.target == socialModalWrapper) {
        socialModalWrapper.style.display = "none";
    }
}

