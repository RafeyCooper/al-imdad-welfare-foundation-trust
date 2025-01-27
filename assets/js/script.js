$(document).ready(function() {
    var sentences = [
        "educational services to children",
        "medical care for families",
        "food and clothing distribution"
    ];
    
    var index = 0;
    var letterIndex = 0;
    var currentText = '';
    var isTyping = true;

    function typeText() {
        currentText = sentences[index];
        $(".running-text").text(""); // Clear previous text
        letterIndex = 0; // Reset letter index

        var typingInterval = setInterval(function() {
            if (isTyping) {
                $(".running-text").append(currentText[letterIndex]);
                letterIndex++;
                if (letterIndex === currentText.length) {
                    clearInterval(typingInterval);
                    setTimeout(backspaceText, 1000); // Wait before backspacing
                }
            }
        }, 150); // Adjust typing speed here (150ms per letter)
    }

    function backspaceText() {
        var backspaceInterval = setInterval(function() {
            var currentLength = $(".running-text").text().length;
            $(".running-text").text(currentText.substring(0, currentLength - 1));

            if (currentLength === 0) {
                clearInterval(backspaceInterval);
                index = (index + 1) % sentences.length; // Cycle through sentences
                typeText(); // Start typing the next sentence
            }
        }, 100); // Adjust backspace speed here (100ms per letter)
    }

    typeText(); // Start typing the first sentence
});


var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Make the dots clickable
    },
    autoplay: {
      delay: 2000, // Auto-scroll every 2 seconds (2000ms)
      disableOnInteraction: false, // Keep autoplay working even if the user interacts with the swiper
    },
    loop: true, // Enable looping of the slides
    effect: "fade", // Set the effect to 'fade'
    fadeEffect: {
      crossFade: true, // Enable crossfade for a smoother transition
    },
  });
  

  $(document).ready(function() {
    $(".dropbtn").click(function() {
        $(".dropdown-content").slideToggle(300); // Toggle with animation
    });

    // Close the dropdown if clicked outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-content").slideUp(300); // Close with animation
        }
    });
});


var swiperSecond = new Swiper('.swiper-container-second', {
    loop: true,
    // autoplay: {
    //     delay: 5000, // Different delay for second slider
    // },
    pagination: {
        el: '.swiper-container-second .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-container-second .swiper-button-next-second',
        prevEl: '.swiper-container-second .swiper-button-prev-second',
    },
});

$(document).ready(function() {
    $('#pc-service').click(function() {
        $('.nav-dropdown-menu').stop(true, true).slideToggle(200);
        $(this).toggleClass('open');
    });

    // Optional: Close the dropdown when clicking outside of the dropdown
    // $(document).click(function(event) {
    //     if (!$(event.target).closest('.nav-dropdown').length) {
    //         $('.nav-dropdown-menu').stop(true, true).slideUp(200);
    //         $('.nav-dropdown').removeClass('open');
    //     }
    // });
});

// $(document).ready(function() {
//     $('.nav-drop-heading').click(function() {
//         $(this).next('.nav-drop-content').slideToggle(300); // Show or hide content
//     });
// });


$(document).ready(function() {
    // When "Services" is clicked, show the modal
    $('#mobile-service').click(function() {
        $('#myModal').fadeIn(); // Show the modal
    });

    // When the close button is clicked, hide the modal
    $('.modal .close').click(function() {
        $('#myModal').fadeOut(); // Hide the modal
    });

    // When anywhere outside the modal content is clicked, hide the modal
    $(window).click(function(event) {
        if ($(event.target).is('#myModal')) {
            $('#myModal').fadeOut(); // Hide the modal
        }
    });
});


$('#donationFormModal').on('show.bs.modal', function () {
    // Close any currently open modals
    $('.modal').not(this).modal('hide');
});