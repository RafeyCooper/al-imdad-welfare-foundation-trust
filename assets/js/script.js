$(document).ready(function () {
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
        $(".running-text").text("");
        letterIndex = 0;

        var typingInterval = setInterval(function () {
            if (isTyping) {
                $(".running-text").append(currentText[letterIndex]);
                letterIndex++;
                if (letterIndex === currentText.length) {
                    clearInterval(typingInterval);
                    setTimeout(backspaceText, 1000);
                }
            }
        }, 150);
    }

    function backspaceText() {
        var backspaceInterval = setInterval(function () {
            var currentLength = $(".running-text").text().length;
            $(".running-text").text(currentText.substring(0, currentLength - 1));

            if (currentLength === 0) {
                clearInterval(backspaceInterval);
                index = (index + 1) % sentences.length;
                typeText();
            }
        }, 100);
    }

    typeText();
});

var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
});

$(document).ready(function () {
    $(".dropbtn").click(function () {
        $(".dropdown-content").slideToggle(300);
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-content").slideUp(300);
        }
    });
});

var swiperSecond = new Swiper('.swiper-container-second', {
    loop: true,
    pagination: {
        el: '.swiper-container-second .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-container-second .swiper-button-next-second',
        prevEl: '.swiper-container-second .swiper-button-prev-second',
    },
});

$(document).ready(function () {
    $('#pc-service').click(function () {
        $('.nav-dropdown-menu').stop(true, true).slideToggle(200);
        $(this).toggleClass('open');
    });
});

$(document).ready(function () {
    $('#mobile-service').click(function () {
        $('#myModal').fadeIn();
    });
    $('.modal .close').click(function () {
        $('#myModal').fadeOut();
    });
    $(window).click(function (event) {
        if ($(event.target).is('#myModal')) {
            $('#myModal').fadeOut();
        }
    });
});

$('#donationFormModal').on('show.bs.modal', function () {
    $('.modal').not(this).modal('hide');
});

$(document).ready(function () {

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    function showAlert(text) {
        $(".alert-message-donation-form-text-danger").html(text);
        $('.alert-message-donation-form-text-success').html('')
    }

    function showSuccessAlert(text) {
        $(".alert-message-donation-form-text-danger").html('');
        $('.alert-message-donation-form-text-success').html(text)
    }

    function loaderAction(action) {
        if (action) {
            $(".donationFormLoader").css('display', 'flex');
            $('.button-19-new').css('display', 'none');
        }
        else {
            $(".donationFormLoader").css('display', 'none');
            $('.button-19-new').css('display', 'block');
        }
    }

    function checkForInput() {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });

            if (!input.value) {
                input.classList.remove('has-value');
            }
        });
    }

    $("#donationFormSubmitBtn").on('click', function (e) {
        e.preventDefault();

        let fullName = $("#donation_form_full_name").val().trim();
        let emailAddress = $("#donation_form_email_address").val().trim();
        let donationAmount = $("#donation_amount").val().trim();
        let purposeOfDonation = $("#donation_form_purpose_of_donation").val().trim();
        let receiptFile = $("#donation_form_recipt")[0].files[0];
        let comment = $("#donation_form_comment").val().trim();

        let valid = true;

        if (fullName === "") {
            showAlert('All fields are required')
            valid = false;
        } else if (emailAddress === "") {
            showAlert('All fields are required')
            valid = false;
        } else if (!validateEmail(emailAddress)) {
            showAlert('Invalid Email')
            valid = false;
        } else if (donationAmount === "" || isNaN(donationAmount) || donationAmount <= 0) {
            showAlert('Please enter a valid donation amount.')
            valid = false;
        } else if (purposeOfDonation === "") {
            showAlert('All fields are required')
            valid = false;
        } else if (!receiptFile) {
            showAlert('Please upload the payment receipt.')
            valid = false;
        }

        if (!valid) return;

        let formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('email_address', emailAddress);
        formData.append('donation_amount', donationAmount);
        formData.append('purpose_of_donation', purposeOfDonation);
        formData.append('receipt', receiptFile);
        if (comment !== "") {
            formData.append('comment', comment);
        }

        loaderAction(true)

        $.ajax({
            url: './php/submit_donation_form.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status == 'success') {

                    $('#donation_form_full_name').val('');
                    $('#donation_form_email_address').val('');
                    $('#donation_amount').val('');
                    $('#donation_form_purpose_of_donation').val('');
                    $('#donation_form_recipt').val('');
                    $('#donation_form_comment').val('');
                    showSuccessAlert('Thank you for your donation!')
                    checkForInput();
                }
                else {
                    showAlert(response.message)
                }

                loaderAction(false)

            },
            error: function (xhr, status, error) {
                loaderAction(false)
                showAlert('An error occurred while submitting your donation. please try again later')
            }
        });
    });

    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

