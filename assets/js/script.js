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