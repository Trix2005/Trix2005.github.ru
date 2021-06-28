var activated;

$(".payment-button").click(function() {
	var amount = $(this).attr("data-amount");
	var item = $(this).attr("data-item");
	var title = $(this).attr("data-title");

	$(".item-description").text("Читы для " + title);
	$(".item-amount").text(amount + " руб.");
	$("input[name=amount]").val(amount);
	$("input[name=item]").val(item);

	$(".input-label").hide();
	$("input[name=promocode]").val("").css("pointer-events", "auto");
	$(".promo-button").show();
});

$(".promo-button").click(function() {
	var code = $("input[name=promocode]").val();
	var item = $("input[name=item]").val();

	if (code == "") {
		$("#label-promo").css("color", "#e74c3c");
		$("#label-promo").text("Введите промокод для проверки.");
		$("#label-promo").fadeIn();

		return false;
	}

	$.post("promo.php", { code: code, item: item })
	.done(function(response) {
		if (response !== "error") {
			$(".item-amount").text(response + " руб.");
			$("input[name=amount]").val(response);

			$(".promo-button").fadeOut();
			$("input[name=promocode]").css("pointer-events", "none");
			$("#label-promo").css("color", "#1a7f0b").text("Промокод успешно активирован.").fadeIn();

			activated = true;
		}
	})
	.fail(function() {
		$("#label-promo").css("color", "#e74c3c").text("Неверный промокод.").fadeIn();
		return false;
	});
});

$(".modal-button").click(function() {
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	var email = $("input[name=email]").val();

	if (email == "") {
		$("#label-mail").text("Введите электронную почту.").fadeIn();
		return false;
	}

	if (pattern.test(email)) {
		if (activated !== true) {
			$("#input-promo").val("");
		}
	} else {
		$("#label-mail").text("Некорректный адрес электронной почты.").fadeIn();
		return false;
	}
});