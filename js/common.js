$(function() {

	// Custom JS
	$(".mob-menu").click(function () {
		$(".top-nav ul").slideToggle();
	})

	$(".top-nav").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
				//анимируем переход на расстояние - top за 1500 мс

				$('body,html').animate({scrollTop: top}, 1500);
			});

});

$( "#message-button" ).click(function() {
	var email = $("#message-email").val();
	var messasge = $("#message-text").val();

    $.ajax({
        url: "https://formspree.io/contact@dedicatted.com",
        method: "POST",
        data: {email: email, messasge: messasge},
        dataType: "json"
    });

    alert("Thanks. We'll contact you back shortly!")
    return false;
});