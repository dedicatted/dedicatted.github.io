$(function() {

	// Custom JS
	$(".mob-menu").click(function () {
		$(".top-nav ul").slideToggle();
	})

	$(".index-nav, .nav").on("click","a", function (event) {
		if(this.outerText !== 'Blog') {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();
			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 1500);
		}
	});

});

$( "#message-button" ).click(function() {
	var email = $("#message-email");
	var message = $("#message-text");
	var email_error = $(".error-empty-email")
	var message_error = $(".error-empty-message")

	if(email.val() === "") {
		email.addClass("error")
		email_error.css({"display": "block"}).animate({"opacity": 1}, 200)

		setTimeout(function() {
			email_error.animate({"opacity": 0}, 200, "linear", function() {
				$(this).css({"display": "none"})
				email.removeClass("error")
			})
		}, 1500)	
	}

	if(message.val() === "") {
		message.addClass("error")
		message_error.css({"display": "block"}).animate({"opacity": 1}, 200)

		setTimeout(function() {
			message_error.animate({"opacity": 0}, 200, "linear", function() {
				$(this).css({"display": "none"})
				message.removeClass("error")
			})
		}, 1500)
	}

	if(email.val() === "" || message.val() === "") {
		return false
	}

    $.ajax({
        url: "https://formspree.io/contact@dedicatted.com",
        method: "POST",
        data: {email: email.val(), messasge: message.val()},
        dataType: "json"
    })
	.done(function() {
		$(".popup-overlay").css("display", "block").animate({opacity: 0.7}, 200)
		$(".popup").css("display", "block").animate({opacity: 1}, 200)

		setTimeout(function(){
			$(".popup-overlay, .popup").animate({opacity: 0}, 200, "linear", function(){
				$(this).css("display", "none")
			})
		}, 2000)

		$("#message-email").val('')
		$("#message-text").val('')
	});

    return false;
});
