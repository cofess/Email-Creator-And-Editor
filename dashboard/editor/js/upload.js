(function () {
	var input = document.getElementById("images"), 
		formdata = false;

	if (window.FormData) {
  		formdata = new FormData();
  		document.getElementById("btn").style.display = "none";
	}
	
 	input.addEventListener("change", function (evt) {
 	
 		var i = 0, len = this.files.length, img, reader, file;
	
		for ( ; i < len; i++ ) {
			file = this.files[i];
	
				if ( window.FileReader ) {
					reader = new FileReader();
					reader.onloadend = function (e) { 

					};
					reader.readAsDataURL(file);
				}
				if (formdata) {
					formdata.append("images[]", file);
				}
			
		}
	
		if (formdata) {
			$.ajax({
				url: "scripts/image_upload.php",
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data) {
				
					$('#images').val('');
					
					if ($('.image_target').length > 0) { 
					
						$('#frame').find('.image_target').attr('src',data);
						$('.image_target').removeClass('image_target');
						
						hideEditLink();
						allowSave();
						
					}
					
					else {
					
						//if switch active
						if($('#switch_thumb').hasClass('active')){
						
							$('.currentTable').wrap('<div id="parentOfBg"></div>');
							$('#parentOfBg').find('[data-bg="'+the_img+'"]').css('background-image','url('+data+')');
							$('#parentOfBg').find('[data-bg="'+the_img+'"]').attr('background',data);
							var replaceContentOfBg = $('#parentOfBg').find('[data-bg="'+the_img+'"]').html().replace(/(v:fill)(.*)(src=")([^"]*)/mi,'v:fill$2src="'+data);
							$('#parentOfBg').find('[data-bg="'+the_img+'"]').html(replaceContentOfBg);
							$('#parentOfBg').contents().unwrap('<div>');
						
						}
						
						else {	
							
							$('#frame').find('[data-bg="'+the_img+'"]').css('background-image','url('+data+')');
							$('#frame').find('[data-bg="'+the_img+'"]').attr('background',data);
							var replaceContentOfBg = $('#frame').find('[data-bg="'+the_img+'"]').html().replace(/(v:fill)(.*)(src=")([^"]*)/mi,'v:fill$2src="'+data);
							$('#frame').find('[data-bg="'+the_img+'"]').html(replaceContentOfBg);
							
						}
						
						allowSave();
						
					}

				}
			});
		}
	}, false);
}());