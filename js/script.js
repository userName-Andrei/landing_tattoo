$(document).ready(function(){
	//Bureger-menu
	$('.header__burger').click(function (e){
		$('.header__burger,.ul__menu,.header__menu').toggleClass('active');
	});

	//Tabs
	$('.items__item').click(function(e){
		$('.items__item').removeClass('active');
		$(this).addClass('active');
		if($(this).hasClass('active')){
			for(let i=0; i<$('.body__item').length; i++){
				if($('.body__item:eq('+i+')').attr('data-tabsItem') == $(this).attr('data-tabs-img')){
					$('.body__item').removeClass('active');
					$('.body__item:eq('+i+')').addClass('active');
					$('.section3').css("background", 'url(img/tabs_bg/'+(i+1)+'.jpg) 67%/cover no-repeat');
				}
			}
		}
	});
	$('.items__item:eq(0)').click();

	//Gallery carousel
	$('.carousel').carousel({
		
	});

	//Modal windows (map, recording, img)
	function modalClose(){
		$('.modal').css({'opacity': 0, 'visibility': 'hidden',});
		$('.modal__dialog').css({'opacity': 0, 'visibility': 'hidden',});
		if($('.modal__dialog').css('display') == 'none'){
			$('.modal__dialog').css('display', 'block');
		}
		$('.modal__img').remove();
		$('.alert').remove();
		$('.map').remove();
		$('body').css('overflow', '');
		$('.lockScroll').css('padding-right', 0);
	};
	let lockPaddingScroll = window.innerWidth - document.querySelector('.wrap').offsetWidth + 'px';
	$(document).click(function(e){
		for(let i = 0; i<=document.querySelectorAll('.popup').length; i++){
			if(e.target == document.querySelectorAll('a.popup')[i]){
			e.preventDefault();
			$('.modal').css({'opacity': 1, 'visibility': 'visible',});
			$('.modal__dialog').css({'opacity': 1, 'visibility': 'visible',});
			$('body').css('overflow', 'hidden');
			$('.lockScroll').css('padding-right', lockPaddingScroll);
			}else if(e.target == document.querySelectorAll('img.popup')[i]){
				$('.modal').css({'opacity': 1, 'visibility': 'visible',});
				$('<div class="modal__img"></div').appendTo('.modal');
				$(e.target).clone().removeClass('popup').appendTo('.modal__img');
				$('body').css('overflow', 'hidden');
				$('.modal__dialog').css('display', 'none');
				$('.lockScroll').css('padding-right', lockPaddingScroll);
			}else if(e.target == document.querySelectorAll('p.popup')[i]){
				let mapHTML = '<div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577325.3467487649!2d36.82513270460939!3d55.581524456925656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1611665441503!5m2!1sru!2sru" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div>';
				$(mapHTML).appendTo('.modal');
				$('.modal').css({'opacity': 1, 'visibility': 'visible',});
				$('body').css('overflow', 'hidden');
				$('.modal__dialog').css('display', 'none');
				$('.lockScroll').css('padding-right', lockPaddingScroll);
			}
		}
			if(e.target == document.querySelector('.modal') || e.target == document.querySelector('.modal__close')){
				modalClose();
			}

	});

	//mail validator
	$("input[name='phone']").mask("+7(999) 999-99-99");
	$("form[name='formMail']").submit(function(e){
		e.preventDefault();
		let name = $("input[name='name']").val(),
			tel = $("input[name='phone']").val(),
			comment = $("textarea[name='comment']").val(),
			email = $("input[name='email']").val(),
			alert = $('.alert');
		if((name.trim() == '' || name.trim() == null) || (tel.trim() == '' || tel.trim() == null) || (email.trim() == '' || email.trim() == null)){
			alert.text("Введите ваше имя, телефон и email!");
			alert.addClass('error');
		}else{
			$.ajax({
	            url: 'mail.php',
	            data: {name: name, tel: tel, comment: comment, email: email},
	            type: 'POST',
	            success: function(res){
	            	console.log(res);
	                alert.removeClass('error').addClass('success');
					alert.text("Ваше сообщение успешно отправлено, в ближайшее время наш менеджер с вами свяжется.");
	            },
	            error: function(){
	                alert.text("Ошибка при отправке, попробуйте позже!");
					alert.addClass('error');
           		},
        	});
        	setTimeout(()=>document.location.reload(), 2000);
		}
	});
});
