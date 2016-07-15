$(document).ready(function() {

	$(window).resize(function(){
		
		positionTemplate();
		
	});
	
	if (top != self) top.location.replace(self.location.href);
	
	positionTemplate();
	

	//Global Variables
	//Elements for Content Editable
	elements = 'table p, table td, table span, table a, table b, table i, table font';
	
	
	//Initialise subscriber meter
	subs = $('.number_subs').text().replace(/,/g, '');
	total = $('.subs_total').text().replace(/,/g, '');
	math = subs / total * 100;
	animateFlag = 0;
	sidebarFlag = 0;
	moduleFlag = 0;
	testFlag = false;
	busyFlag = false;
	
	setTimeout(function(){
		
		$('body').css('background-color','#757575!important');
		
	}, 2000);
	
	$('.meter').css('width',math+'%');
	
	$('input[type="text"]').each(function() {
		var val = $(this).attr('value');
		if(val != '')
		{
		$(this).focus(function() {
		            var newVal = $(this).val();
		            if(newVal == val) $(this).val('');
		            });
		$(this).blur(function() {
		           var newVal = $(this).val();
		           if(newVal == '')
		           {
		           $(this).val(val);
		           }
		           });
		}
	});
	
	$(document).on('keypress', '#tf_temp_price', function(e) {     
		if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
	});

		
	$(document).on('paste', '[contenteditable="true"]', function(e) {
	
		var text = '';
		var that = $(this);
		
		if (e.clipboardData)
		    text = e.clipboardData.getData('text/plain');
		else if (window.clipboardData)
		    text = window.clipboardData.getData('Text');
		else if (e.originalEvent.clipboardData)
		    text = $('<div></div>').text(e.originalEvent.clipboardData.getData('text'));
		
		    
		if (document.queryCommandSupported('insertText')) {
		    document.execCommand('insertHTML', false, $(text).html());
		    return false;
		}
		else { // IE > 7
		    that.find('*').each(function () {
		         $(this).addClass('within');
		    });
		
		    setTimeout(function () {
		          // nochmal alle durchlaufen
		          that.find('*').each(function () {
		               // wenn das element keine klasse 'within' hat, dann unwrap
		               // http://api.jquery.com/unwrap/
		               $(this).not('.within').contents().unwrap();
		          });
		    }, 1);
		}	
		    
	});
	
	
	$(document).on('mousedown', '.slider, .slider_background_appearance', function(){
		
		$(this).closest('li').find('.output').addClass('output_highlight');
		
		//if switch active
		if($('#switch_thumb').hasClass('active')){
		
			p = $('.currentTable');
			position = p.position();
			c_h = $('#canvas')[0].scrollHeight;
			
			$('#canvas').animate({
			
				scrollTop: position.top
			
			
			}, 550, 'easeOutQuad', function () {});
			
		}		
		
	}).on('mouseup', '.slider, .slider_background_appearance', function(){
		
		$(this).closest('li').find('.output').removeClass('output_highlight');
		
	});
	
	
	$('#send_link #send').click(function(){
		
		if($('#save').hasClass('de')){
			
			campaign_id = $(this).attr('name');
			$(location).attr('href','../send/index.php?campaign_id='+campaign_id);
			
		}
		
		else {
			
			headline = 'You have not yet saved your template';
			paragraph = 'Would you like to save?'
			
			btnTrue = 'Yes';
			btnTrueId = 'save_campaign';
			
			btnFalse = 'No';
			
			openPopup();
			
			$('.btnFalse').addClass('without_saving');
			
			$('.btnFalse').addClass('exit');
			
		}
		
	});
	
	$(document).on('click', '.without_saving', function(){
		
		campaign_id = $('#send').attr('name');
		
		$(location).attr('href','../send/index.php?campaign_id='+campaign_id);
		
	})
	
	
	$(document).on('click', '#back_to_live_preview', function(){
		
		$(location).attr('href','../new_campaign/index.php');
		
	})
	
	$(document).on('click', '#save_campaign', function(){
		
		$('#save').trigger('click');
		closePopup();
		
		setTimeout(function(){
			
			campaign_id = $('#send').attr('name');
			$(location).attr('href','../send/index.php?campaign_id='+campaign_id);
			
		}, 1000)
		
	});
	
	$(document).on('click', '#nav li li', function(e){
	
		if ($(this).find(".lock").length > 0){ 

			$(this).removeClass('active');
			template_name = $('.temp_name').text();
			template_price = $('.temp_price').text();
			
			headline = 'You need to purchase <span>'+template_name+'</span> to use this feature.';
			paragraph = template_name+' is available on Themeforest.'
			
			btnTrue = 'Buy '+template_name+' for '+template_price;
			btnTrueId = 'buy_template_btn';
			
			btnFalse = 'Not yet';
			
			openPopup();

		}	
	
	});
	
	$(document).on('click', '#buy_template_btn', function(){
		
		checkout_link = $('#buy_template').attr('href');
		
		$(location).attr('href',checkout_link);
		
	})
	
	
	
	$('.credits_or_plan').click(function(){
		
		if( $(this).text().indexOf('Credits') >= 0){
			
			$(location).attr('href','http://www.stampready.net/dashboard/credits/index.php');
			
		}
		
		else if( $(this).text().indexOf('LOGIN') >= 0){
		
			$(location).attr('href','http://www.stampready.net/index.php?action=login');
		
		}
		
		else {
			
			
			
		}

		
	});

	//if demo
	demo = $(location).attr('href');
	
	//if demo
	if (demo.indexOf('demo') > -1) {
	
		template_name = $('.temp_name').text();
		
		setInterval(function(){
		
			closePopup();
			
			setTimeout(function(){
				
				template_name = $('.temp_name').text();
				headline = 'This is a Live Preview';
				paragraph = 'Just a reminder your\'re editing a Demo version of '+template_name+'.';
			
				btnTrue = 'Purchase Template';
				btnTrueId = 'purchase_template';
				
				btnFalse  = 'No, keep editing';
				
				openPopup();
				
			}, 750)
			
		}, 300000)
	
		$('#save, #export').removeAttr('id');
		$('#send').removeAttr('onclick');
	
		$('#options_link li, #send_link li:not(#send_test_email), #mirror_mobile').each(function(){
			
			$(this).append('<div class="lock"></div>');
			
		})
	
		$('#username').text('Live Preview');
	
		style_clone = $('#frame style').text();
		$('#frame style, #frame title').remove();
		$('#styles_holder').prepend('<style>'+style_clone+'</style>');
		$('#modules_widgets').prepend('<p class="pre-message semi_bold" style="color: #a2a2a2;">Drag or click modules</p>');

		
		//Reset vars
		meta = '';
		
		//Read and all meta tags
		$('#frame').find('meta').each(function(){
			
			meta += $(this).clone().wrap('<div>').parent().html();
			
		});
		
		$('#meta_holder').append(meta);
		$('#frame').find('meta').remove();
		
		$tmp = $('<div></div>');
		
		$('#frame').each(function(){
			
			mod = $(this).find('[data-module]').clone();
			
			$tmp.prepend(mod);
			
		});
		
		source = $tmp.html();
		
		$('#frame').find('#edit_link').each(function(){
			
			edit_link = $(this).clone().wrap('<div>').parent().html();
			
		});

		$('#frame body').remove();
		$('#frame table').remove();
		$('#frame, #modules_holder').html(source);

 		$('#frame').append(edit_link);
		
	}	
	
	else {
							
		setInterval(function(){
			
			if ($('.ui-draggable.ui-draggable-dragging').length > 0) {
			
				return false;
			
			}
			
			if ($('.temporary').length > 0) {
			
				return false;
			
			}
			
			$('#save').trigger('click')
			
		}, 60000)
				
	}
	
	//change background color by custom parameter
	$('meta[name="sr bgcolor"]').each(function(){
		
		//bgcolor
		bg_color = $(this).attr('content');
		
		if(typeof bg_color === 'undefined'){}
		else {
			
			$('#canvas').css('background-color',bg_color);
			
		}
		
	});

	$(document).on('click', '#clear_template', function(){
		
		template_name = $('.temp_name').text();
		headline = 'Would you like to start over?';
		paragraph = 'If confirmed, you won\'t be able to undo.';
	
		btnTrue = 'Yes, start over';
		btnTrueId = 'clear_template_true';
		
		btnFalse  = 'No, keep template';
		
		openPopup();
		
	});
	
	$(document).on('click', '#purchase_template', function(){
		
		checkout_link = $('#buy_template').attr('href');
		
		$(location).attr('href',checkout_link);
		
	})
	
	
	$(document).on('click', '#clear_template_true', function(){
	
		$('#clear_template').remove();
		$('#frame table').remove();
		$('#frame').addClass('empty');
		$('#frame').addClass('empty').css('min-height','250px');
		
		$('#modules_link').find('h2').trigger('click');
		$('#modules_widget').trigger('click')
		
		checkAttributes();
		allowSave();
		closePopup();
	
	});


	//Initialise the tooltip
	$('#frame').highlighter();

	
	
	//Nav indicator
	$('#nav > li h2').click(function(){
			
		$('#nav > li').attr('class','');
		$(this).parent('li').addClass('active');
			
	});
	
	
	//Slidedown Nav
	$('#nav h2').click(function(){
	
		if($(this).next('ul').is(":visible") ){
			
			
			
		}
		
		else {
		
			$('#nav ul').slideUp(200);
			$(this).next('ul').slideDown(200);	
			
		}
	
	});
	
	
	//On image click in Editor
	$('#frame').on('mouseup', 'img', function(ev){
	
		document.getSelection().removeAllRanges();
		
		//vars
		elem = $("#frame");
		x = $(this).offset().left - elem.parent().offset().left;
		y = $(this).offset().top - elem.parent().offset().top;
		w = $(this).outerWidth() / 2;
		z = x + w;
		img_w = $(this).width();
		img_h = $(this).height();
		
		//remove all image_target classes..
		$('.image_target').removeClass('image_target');
		
		$('#change_image .pixel_result').text(img_w+' x '+img_h);
		
		//and add the class to 'this' image 
		$(this).addClass('image_target');
		
		//hide the first tooltip and close button
		$('#edit_link_value, .close_link, .highlighter-container').hide();
		
		//show elements
		$('#edit_link, #change_image_wrapper').show();	
		
		//position the tooltip at cursor click
		$('#edit_link').css('left',z+'px').css('top',y+'px');
		
		//prevent other actions
		ev.stopPropagation();
		ev.preventDefault();
	
	});
	
	
	//on change_image_link click
	$(document).on('click', '#remove_image', function(){
	
		$('.image_target').wrap('<div class="deleted_image"></div>');
		
		image_del_flag = 1;
		image_del_attr = $('.deleted_image').html();
		image_del_pos = $('.image_target').closest('td');
		
		$('.image_target').closest('div').addClass('delete_image');
		
		setTimeout(function(){
			
			$('.image_target').closest('div').remove();
			
		}, 180)
		
		//hide edit link
		hideEditLink();
		
		//hide tooltip
		hideToolTip();
		
		allowSave();
	
	});
	
	
	//on change_image_link click
	$('#frame').on('click', '#change_image_link', function(){
	
	
		//if image parent contains a link
		if ($('.image_target').parents('a').length) {
		
			//give a flag
			$('.image_target').parent('a').addClass('change_link');
			
			//hide change image wrapper
			$('#change_image_wrapper').hide();
			
			//and show the desired elements
			$('#edit_link_value, .close_link').show();	
			
			//vars
			current = $('.image_target').parent('a').attr('href');
			
			//insert current link value
			$('#edit_link_value').val(current);
			
		}
		
		//else, add a link
		else {
			
			//wrap a link tag to the desired image
			$('.image_target').wrap('<a href="" class="change_link"></a>');
			
			//hide elements
			$('#change_image_wrapper').hide();
			
			//show elements
			$('#edit_link_value, .close_link').show();
			
			//vars
			current = $('.image_target').parent('a').attr('href');
			
			//insert current link value
			$('#edit_link_value').val(current);
			
		}
	
	});
	
	
	//export to other account
	$(document).on('click', '#export_to_account', function(ev){
		
		headline = 'Share this campaign to another account';
		paragraph = 'Enter the email address of the designated account. The user will receive an email and choose to accept or not.';
		
		btnTrue = 'Copy to account';
		btnTrueId = 'copy_to_account';
		
		btnFalse = 'Nevermind';
		
		inputField = 'john@doe.com';
		inputFieldId = 'export_to_account_input'
		
		openPopup();
		
	});
	
	
	$(document).on('click', '#copy_to_account', function(ev){
		
		campaign_id = $('#send').attr('name');
		account_email_address = $('#export_to_account_input').val();
		
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "../scripts/calls.php?func=copy_to_account",
		    data: { campaign_id:campaign_id, account_email_address: account_email_address }
		}).done(function(data) {
				
			if(data == 'no account'){
				
				notificationContent = 'Account does not exists';
				notificationColor = "#ea5a5b";
					
				notification();
				
			}
			
			if(data == 'same user'){
				
				notificationContent = 'Please duplicate your campaign on the drafts page';
				notificationColor = "#ea5a5b";
					
				notification();
				
			}
			
			if(data == 'forbidden'){
				
				notificationContent = 'You do not have control over that campaign';
				notificationColor = "#ea5a5b";
					
				notification();
				
			}
			
			if(data == 'success'){
				
				closePopup();
				
				setTimeout(function(){
					
					notificationContent = 'Email has been sent to '+account_email_address;
					notificationColor = "#69C0AF";
					
					notification();
					
				}, 400)
				
			}
			
		});
		
	});
	
	
	//Convert TF
	$(document).on('mousedown', '#convert_tf', function(ev){
	
		ev.stopPropagation();
		
	});
	
	//Convert TF
	$(document).on('click', '#convert_tf', function(ev){
	
		btnTrue = 'Create Demo';
		btnTrueId = 'create_tf_demo';
		
		btnFalse  = 'Cancel';
	
		customHtml = '<div class="demo_banner light"><span class="semi_bold">Demo</span> settings</div><h4 style="padding-bottom: 14px; margin-top: 114px; color: #919191; font-size: 12px; text-transform: uppercase;" class="semi_bold">Template Name</h4><input type="text" placeholder="Ex. Shellshock" id="tf_temp_name"><h4 style="padding-bottom: 14px; padding-top: 30px; color: #919191; font-size: 12px; text-transform: uppercase;" class="semi_bold">Price</h4><input type="text" placeholder="Ex. 18" id="tf_temp_price"><h4 style="padding-bottom: 14px; padding-top: 30px; color: #919191; font-size: 12px; text-transform: uppercase;" class="semi_bold">Checkout Link</h4><input type="text" placeholder="Ex. http://www.themeforest.net/271827" id="tf_temp_checkout">';
				
		
		openPopup();
		
		$('#tf_temp_name').focus();
		$('#popup').css('width','400px');
	
	});
	
	
	
	$(document).on('click', '#create_tf_demo', function(ev){
	
		author_n = $('#username').text();
		author_name = author_n.replace(/\s/g, "");
		temp_name = $('#tf_temp_name').val();
		temp_price = $('#tf_temp_price').val();
		temp_checkout = $('#tf_temp_checkout').val();
		
		titles = $('#titles_holder').html();
		meta = $('#meta_holder').html();
		styles = $('#styles_holder').html();
		html = $('#modules_holder').html();
		
		campaign_id = $('#send').attr('name');
		
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "scripts/convert_tf.php",
		    data: { author_name:author_name, temp_name:temp_name, temp_price:temp_price, temp_checkout:temp_checkout, titles:titles, meta:meta, styles:styles, html:html, campaign_id:campaign_id }
		}).done(function(data) {
			
			closePopup();
			
			setTimeout(function(){
				
				$('.notification').remove();
				$('html').prepend('<div class="notificationDemoLink semi_bold"><div class="close_notification"></div>Congratulations! Tweet with hashtag #StampReady and we may feature you!<a href="http://www.stampready.net/dashboard/editor/index.php?demo='+data+'" target="_blank">View Live Preview</a></div>');
					
				$('.notificationDemoLink').animate({
						
					"height": "show",
					"marginTop": "show",
					"marginBottom": "show",
					"paddingTop": "show",
					"paddingBottom": "show",
					"lineHeight" : '81px'
							
				}, { duration: 500, easing: 'easeOutBack' });
				
				
			}, 500)
							
			/* $(location).attr('href','http://www.stampready.net/dashboard/editor/index.php?demo='+data); */
							
		});
	
	});
	
	
	$(document).on('click', '.close_notification', function(ev){
	
		$('.notificationDemoLink').animate({
				
			"height": "hide",
			"marginTop": "hide",
			"marginBottom": "hide",
			"paddingTop": "hide",
			"paddingBottom": "hide",
			"lineHeight" : '0px'
					
		}, { duration: 500, easing: 'easeInBack' });
	
	});
	
	
	
	//On change_image 
	$('#frame').on('click', '#change_image', function(ev){
		
		if($('.image_target').attr('data-crop') == 'false' ){
		
			$('#images').prop('accept','image/*');
			$('#images').trigger('click');
			
		}
		
		else {
		
			//allow images only
			$('#images').prop('accept','image/*');
			
			//trigger click the choose file
			$('#uploadImage').trigger('click');
			
		}
		
		//prevent other actions
		ev.stopPropagation();
		
	})
	
	
	
	
	//Command Link
	$(document).on('click', '#cmdLink', function(ev){
	
		//hide template actions
		$('#template_actions').hide();
		
		//show link value
		$('#link').show();
		
		//focus link value
		$('#link_value').focus();
		
		ev.stopPropagation();
	
	});
	
	
	
	
	//Close link
	$(document).on('click', '.close_link', function(ev){
	
		//hide edit link
		hideEditLink();
		
		//hide tooltip
		hideToolTip();
		
		//prevent other actions
		ev.stopPropagation();
		
		$(':focus').blur();
	
	});
		
	//Link value on keyup
	$('.createlink').keyup(function(e){
	
		var code = e.keyCode || e.which;
		 if(code == 13) { //Enter keycode
		   
		   
		   //if enter, hide tooltips
		   hideToolTip();
		   hideEditLink();
		   allowSave();
		   
		   $(':focus').blur();
		  
		 }
		
	})
	
	//On module delete, prevent actions
	$(document).on('mousedown', '.delete_btn, .handle, .deleteButton', function(e) {
	
		e.stopPropagation();
	
	});
	
	
	//duplicate module
	$(document).on('click', '.duplicateButton', function(){
		
		cur_module = $(this).closest('[data-module]');
		html_module = $(this).closest('[data-module]').clone();
		
		$(cur_module).after(html_module);
		$(cur_module).next('[data-module]').find('.moduleCodeButton, .moduleDragButton, .moduleDeleteButton, .moduleDuplicateButton').remove();
		
		//vars
		elem = $("#frame");
		y = $(cur_module).offset().top - elem.parent().offset().top;
		
		cur_module_height = $(cur_module).height();
		
		$('#canvas').animate({
					
			scrollTop: y+cur_module_height
		
			
		}, 550, 'easeOutQuad', function () {});
		
	})
	
	
	
	//Delete Module
	$('#frame').on('click', '.delete_btn', function(ev) {
	
		$(this).parent().parent('table[data-module]').remove();
		
		count = $('#frame table[data-module]').size();
					  
		if ($(count).length > 0) {
						
			$('#frame').removeClass('empty').css('min-height','250px');
			
			if ($('#clear_template').length > 0) { 
														
														
			}
			
			else {
				
				$('#frame').prepend('<input type="button" id="clear_template" class="semi_bold" value="Clear Template">');	
			
			}
		
		}
		
		else {
							
			$('#frame').addClass('empty').css('min-height','250px');
			$('#frame #clear_template').remove();	
							
		}
		
		checkAttributes();
		allowSave()
	
	});
	
	
	
	//Mouseover data-id
	$('#modules_widgets').on('mouseover', '[data-id]', function(ev) {
		
		$("#frame").sortable('enable');
		
	});
	
	
	
	
	//Export Function
	$(document).on('click', '#export', function() {
   
		campaign_id = $('#send').attr('name');
		campaign_name = $('#save').text().toString().replace('Save ','');
		
		headline = 'You are about to export <span class="semi_bold">'+campaign_name+'</span>';
		paragraph = 'Keep the images of your template online or include them in a folder.';
		
		btnTrue = 'Keep images online';
		btnTrueId = 'online_export';
		
		btnTrue2 = 'Include in folder';
		btnTrueId2 = 'offline_export';
		
		inputField = 'Template Name';
		inputFieldId = 'template_name'
		
		openPopup();

		h_popup = $('#popup').height();

		$('#popup').css('height', h_popup+'px');
				
		$('#campaign_id_form').val(campaign_id);
		$('#save').trigger('click');
		
	});
	
	
	$(document).on('click', '#online_export', function(){
   
   		template_name = $('#template_name').val();
   		
   		$('#template_name_form').val(template_name);
   		
   		$('#hiddenform').attr('action','../scripts/calls.php?func=export_online');
   		
   		$('#downloadTemplate').trigger('click');

   		closePopup();

   		
   	});
   
   
	$(document).on('click', '#offline_export', function(){
   
   		template_name = $('#template_name').val();
   		
   		$('#template_name_form').val(template_name);
   		
   		$('#hiddenform').attr('action','../scripts/calls.php?func=export_offline');
   		
   		$('#downloadTemplate').trigger('click');

   		closePopup();

   		
   	});
	
	
	//Overlay hide
	$(document).on('click', '#popup', function(e){
	
		e.stopPropagation();
	
	});
	
	
	//Overlay hide
	$(document).on('click', '#popupOverlay', function(){
	
		closePopup();
	
	});
	
	
	
	//Overlay hide
	$('.overlayNotification, .close_dialog').click(function(){
		
		$('.overlayNotification').fadeOut(400);
		$('#editor').css('transform','scale(1)');
		$('.notification').css('transform','scale(0.8)');
		
	})
	
	
	
	//Notification Desktop
	$('#notificationDesktop').click(function(ev){
		
		return false;
		ev.stopPropagation();
		
	})
	
	
	
	
	//offline switch
	$('#offline').click(function(){
		
		$(this).addClass('active');
		$('#online').removeClass('active');
		
	});
	
	
	
	
	//online switch
	$('#online').click(function(){
		
		$(this).addClass('active');
		$('#offline').removeClass('active');
		
	});
	
	
	
	
	$('#exportTemplate').click(function(){
	
		temp_name = $('.template_name').val();
			
		//Paste the Template Name
		$('#template_name_form').val(temp_name);
		
		filterHTML();
		
		//Download Template Action
		downloadTemplate();
	
	});
	
	
	
	$(document).on('keyup', '.colorpicker', function(){
		
		hex = $(this).val();
		name = $(this).parent().text();
		
		if($('#switch_thumb').hasClass('active')){
		
			$('.currentTable').closest('.parentOfBg').find('[data-color="'+name+'"]').css('color', hex);
			
			if(name == 'Links'){
				
				$('.currentTable a:not([data-color])').css('color', hex);
				
			}
		
		}
		
		else {
		
			$('#frame [data-color="'+name+'"]').css('color', hex);
			
			if(name == 'Links'){
				
				$('#frame table a:not([data-color])').css('color', hex);
				
			}
			
		}
		
	});
	
	$(document).on('keyup', '.bg_colorpicker', function(){
		
		hex = $(this).val();
		name = $(this).parent().text();
		
		if($('#switch_thumb').hasClass('active')){
		
			$('.currentTable').closest('.parentOfBg').find('[data-bgcolor="'+name+'"]').css('background-color', hex);
			$('.currentTable').closest('.parentOfBg').find('[data-border-top-color="'+name+'"]').css('border-top-color', hex);
			$('.currentTable').closest('.parentOfBg').find('[data-border-right-color="'+name+'"]').css('border-right-color', hex);
			$('.currentTable').closest('.parentOfBg').find('[data-border-bottom-color="'+name+'"]').css('border-bottom-color', hex);
			$('.currentTable').closest('.parentOfBg').find('[data-border-left-color="'+name+'"]').css('border-left-color', hex);	
		
		}
		
		else {
		
			$('#frame [data-bgcolor="'+name+'"]').css('background-color', hex);
			$('#frame').find('[data-border-top-color="'+name+'"]').css('border-top-color', hex);	
			$('#frame').find('[data-border-right-color="'+name+'"]').css('border-right-color', hex);	
			$('#frame').find('[data-border-bottom-color="'+name+'"]').css('border-bottom-color', hex);	
			$('#frame').find('[data-border-left-color="'+name+'"]').css('border-left-color', hex);	
			
		}
		
	});
	
	
	
	//Colorpicker
	$(document).on('focus', '.colorpicker', function(ev) {
	
		$('.focus').removeClass('focus');
		$(this).addClass('focus');
		
		var f = $.farbtastic('#colorpicker');
		
		var selected;
		$('.colorpicker')
		  .each(function () { f.linkTo(this); })
		  .focus(function() {
		    if (selected) {
		      $(selected).css('opacity', 1).removeClass('colorwell-selected');
		    }
		    f.linkTo(this);
		    $(selected = this).css('opacity', 1).addClass('colorwell-selected');
		  });
		
		the_color = $(this).parent().text();
		
		if ($('#modules').hasClass('on')) {
			
			$('#bg_colorpicker').hide();
			$('#colorpicker').show();
			$('#colorpicker').css('opacity','1');
			
		}
		
		else {
			
			$('#colorpicker').css('opacity','0');
			$('#colorpicker').animate({
			
				"height": "show",
				"marginTop": "show",
				"marginBottom": "show",
				"paddingTop": "show",
				"paddingBottom": "show",
				"opacity": "1"
				
			}, { duration: 400, easing: 'easeOutBack' });
			
			$('#modules').addClass('on');
			
		}
		
	});
	
	
	
	//Background Color Picker
	$(document).on('focus', '.bg_colorpicker', function(ev) {
	
		$('.focus').removeClass('focus');
		$(this).addClass('focus');
		
		var a = $.farbtastic('#bg_colorpicker');
		
		var u;
		$('.bg_colorpicker')
		  .each(function () { a.linkTo(this); })
		  .focus(function() {
		    if (u) {
		      $(u).css('opacity', 1).removeClass('colorwell-selected');
		    }
		    a.linkTo(this);
		    $(u = this).css('opacity', 1).addClass('colorwell-selected');
		  });
		
		the_color = $(this).parent().text();
		
		if ($('#modules').hasClass('on')) {
			
			$('#bg_colorpicker').show();
			$('#colorpicker').hide();
			$('#bg_colorpicker').css('opacity','1');
			
		}
		
		else {
			
			$('#bg_colorpicker').css('opacity','0');
			$('#bg_colorpicker').animate({
			
				"height": "show",
				"marginTop": "show",
				"marginBottom": "show",
				"paddingTop": "show",
				"paddingBottom": "show",
				"opacity": "1"
				
			}, { duration: 400, easing: 'easeOutBack' });
			
			$('#modules').addClass('on');
			
		}
		
	});
	
	
	
	//Edit Link on Keyup
	$('#edit_link_value, #link_value').keyup(function(){
	
	    url = $(this).val();
	    
	    if (url.indexOf("http://") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("https://") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("https//") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("http//") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("@") >= 0 && url.indexOf(".") >= 0) {
	    
	    	if (url.indexOf("mailto") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    	
	    	else if (url.indexOf("twitter") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    	
	    	else if (url.indexOf(";") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    
			else {
				
				$('#frame .new_link, #frame .change_link').attr('href','mailto:'+url);
				
			}
	    
	    }
	    
	    else if (url == 'sr_unsubscribe') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_unsubscribe');
	    	
	    }
	    
	    else if (url == 'sr_date') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_date');
	    
	    }
	    
	    else if (url == 'sr_name') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_name');
	    
	    }
	    
	    else if (url == 'sr_email') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_email');
	    
	    }
	    
	    else if (url == 'sr_view_online') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_view_online');
	    
	    }
	    
	    else if (url == '#') {
	    	
	    	$('#frame .new_link, #frame .change_link').attr('href',url);
	    
	    }
	    
	    else if (url.indexOf("@") >= 0) {
	    	
	    	$('#frame .new_link, #frame .change_link').attr('href',url);
	    
	    }
	    
	    else {
		    
		    $('#frame .new_link, #frame .change_link').attr('href','http://'+url);
		    
	    }
		
	})



	//Link Value on Keyup
	$('#link_value').keyup(function(e){
	
	  	url = $(this).val();
	    
	    if (url.indexOf("http://") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("https://") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("https//") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("http//") >= 0) {
		    
		    $('#frame .new_link, #frame .change_link').attr('href',url);
		    
	    }
	    
	    else if (url.indexOf("@") >= 0 && url.indexOf(".") >= 0) {
	    
	    	if (url.indexOf("mailto") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    	
	    	else if (url.indexOf("twitter") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    	
	    	else if (url.indexOf(";") >= 0) {
	    	
	    		$('#frame .new_link, #frame .change_link').attr('href',url);
	    	
	    	}
	    
			else {
				
				$('#frame .new_link, #frame .change_link').attr('href','mailto:'+url);
				
			}
				    
	    }
	    
	    else if (url == 'sr_unsubscribe') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_unsubscribe');
	    	
	    }
	    
	    else if (url == 'sr_date') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_date');
	    
	    }
	    
	    else if (url == 'sr_name') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_name');
	    
	    }
	    
	    else if (url == 'sr_email') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_email');
	    
	    }
	    
	    else if (url == 'sr_view_online') {
	    
	    	$('#frame .new_link, #frame .change_link').attr('href','sr_view_online');
	    
	    }
	    
	    else if (url == '#') {
	    	
	    	$('#frame .new_link, #frame .change_link').attr('href',url);
	    
	    }
	    
	    else if (url.indexOf("@") >= 0) {
	    	
	    	$('#frame .new_link, #frame .change_link').attr('href',url);
	    
	    }
	    
	    else {
		    
		    $('#frame .new_link, #frame .change_link').attr('href','http://'+url);
		    
	    }
		
	});
	
	
	$(document).on('mouseenter', '#colorpicker', function(ev){
			
		if ($('#frame .new_link').length > 0) { 
	
			link_at = $('#frame .new_link').attr('data-color');

			// For some browsers, `attr` is undefined; for others,
			// `attr` is false.  Check for both.
			if (typeof link_at !== typeof undefined && link_at !== false) {
			    // ...
			    
			    $('#colors').find('[name="'+link_at+'"] .colorpicker').focus();
			    
			}
			
			else {
				
				$('#colors').find('[name="a"] .colorpicker').focus();
				
			}
				
		
		}
		
		
	})
	
	$('#modules').on('click', 'img, p', function(ev){
	
            if ( $(this).is('.ui-draggable-dragging') ) {
                  return;
            }
            
           a = $(this).parent().attr('data-id');
           
           if(moduleFlag == 1){
	           
	           return false;
	           
           }
           
           moduleFlag = 1;
			
           	$('#modules div').css('opacity','1');
           	$('#frame').removeClass('empty');
           	
           	$('#frame').append('<div class="temporary"></div>');
           	
            
            $('.pre-message').slideUp(200);
			
			module = $('#modules_holder').find('[data-module="'+a+'"]').clone();
			
			h = $('#heightChecker').html(module).height();
			
			$('#heightChecker').html(module);
			
            setTimeout(function(){
           
				$('#frame').find('.temporary').animate({
					height: h
				}, 250);
				
           		setTimeout(function(){
           			
           			$('#frame').find('.temporary').append(module);
		   			$('#frame').find('.temporary').animate({ opacity: 1 }, 500);
		   			$('#frame').animate({ minHeight: 70 }, 500);
		   			
		   			setTimeout(function(){
		   				$('#frame').find('.temporary').contents().unwrap();
		   				$('#frame').find('.temporary').removeAttr('data-id');
		   				
		   				setTimeout(function(){
			   				
			   				$('#frame').find('.temporary').remove();
			   				
			   				if ($('#clear_template').length > 0) { 
														
														
							}
							
							else {
								
								$('#frame').prepend('<input type="button" id="clear_template" class="semi_bold" value="Clear Template">');	
							
							}
			   				
			   				allowSave();
			   				
		   				}, 250);
		   				
		   				
		   			}, 250);
		   			
		   				c_h = $('#canvas')[0].scrollHeight - 300;
		   				c_h_a = c_h - 400
		   				
           		
		           		$('#canvas').animate({
					
							scrollTop: c_h_a
						
							
						}, 550, 'easeOutQuad', function () {});
						
						moduleFlag = 0;
           			
           		}, 250);
			
		   	
		  }, 200);
           		
	})
	
	
	
	
	
	//Elements click
	$('#frame').on('mousedown', elements, function(ev) {
	
		image_del_flag = 0;
		closeEditor();
		closeColorpickers();
	
		$('[contenteditable="true"]').attr('contenteditable','false');
		
		
	
		if($(this).hasClass('editable')){
			
			$(this).attr('contenteditable','true');
			$(this).closest('td').attr('contenteditable','true');
			
		}
	
		else if ($(this).is(':empty')){
		
		
		}
		
		else if($.trim($(this).text()) === '') {
			
			
		}
		
		else {
		
			$(this).attr('contenteditable','true');
			$(this).closest('td').attr('contenteditable','true');
			$(this).addClass('editable');
				
		}
		
		$('table').removeClass('currentTable')
		$(this).closest('[data-module]').addClass('currentTable');
		
		element = $('.currentTable').closest('[data-module]');
		
		if ($('.moduleCode').length > 0) { 
		    // it exists
		}
		
		else {
			
			$('.parentOfBg').contents().unwrap('.parentOfBg');
			
		}
	
		if (!element.parent().is('.parentOfBg')) {
			element.wrap('<div class="parentOfBg">')
		} 
		
		
		if($('#style_options').is(':visible')) {
			
			checkSpecificAttributes();
			checkAttributes();
			
		}
		
		else {
		
			if(animateFlag == 1){
				
				
			}
			
			else {
			
				if(sidebarFlag == 1){
				
					return false;
						
				}
			
				sidebarFlag = 1;
			
				$('#modules_widget').removeClass('active');
				$('#style_widget').addClass('active');
			
				animateTemplate();
				closeModules();
			
				setTimeout(function(){
					
					$('#modules_widgets').hide();
					$('#style_options').show();
					
					openModules();
					
					checkSpecificAttributes();
					
					checkAttributes();
										
				}, 420);	
				
			}
			
		}
		
		hideEditLink();
		hideToolTip();
		ev.stopPropagation();	

	
	});
		
		
		
		
	//Elements click
	$('#frame').on('mouseup', 'a', function(ev) {
	
		elem = $("#frame");
		x = $(this).offset().left - elem.parent().offset().left;
		y = $(this).offset().top - elem.parent().offset().top;
		w = $(this).outerWidth() / 2;
		current = $(this).attr('href');
		z = x + w;
		
		$('#change_image_wrapper').hide();
		$('#edit_link_value, .close_link').show();
		
		if(current.indexOf('newlink') === -1) {
		
		}
		
		else {
			
			current = '#';
			
		}
		
		$('#edit_link_value').val(current);
		$('#edit_link').show();
		$('.change_link').removeClass('change_link');
		$(this).addClass('change_link');
		$('#edit_link').css('left',z+'px').css('top',y+'px');
				
		ev.preventDefault();
		ev.stopPropagation();
	
	});
	
	
	
	
	//Preview Template
	$('#preview_fullscreen').click(function(ev){
	
		html = $('#frame').html();
		style = $('#styles_holder').html();
		meta = $('#meta_holder').html();
		title = $('#titles_holder').html();
		
		if(typeof title === 'undefined'){
	
			title = '';
		
		}
				
		$tmp = $('<div>'+html+'</div>');
		$tmp.find('#clear_template').remove();
		$tmp.find('.parentOfBg').contents().unwrap('<div></div>');
		$tmp.find('[contenteditable]').removeAttr('contenteditable');
		$tmp.find('.last-table').removeClass('last-table');
		$tmp.find('tr').unwrap('<tbody></tbody>')
		$tmp.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
		$tmp.find('.currentTable').removeClass('currentTable');
		$tmp.find('.resetHeight').removeClass('resetHeight');
		$tmp.find('.editable').removeClass('editable');
		
		html = $tmp.html();
	
		var newWindow = window.open();
		newWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>'+meta+'<title>Full Screen</title>'+style+'</head><body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0">'+html+'</body></html>');
	
	});
	
	
	
	
	//open preview
	$(document).on('mouseenter','#sidebar', function(){
		
		if ($('#sidebar').hasClass('preview')){
		
			
			$('#sidebar').animate({
		
			marginLeft: 0
		
		}, { duration: 400, easing: 'easeOutQuad', complete: function(){

			$('#sidebar').removeClass('preview');
			
		    }
		
		});
		
		$('#modules').animate({
		
			marginLeft: 0
		
		}, { duration: 500, easing: 'easeOutQuad', complete: function(){
		    }
		
		});
		
		$('#canvas').animate({
		
			marginLeft: 250
		
		}, { duration: 400, easing: 'easeOutQuad'});
			
		}
		
		else {
			
			$('#frame .delete, #frame .handle_wrapper').remove();
			
		}
		
	});
	
	$(document).on('mousedown', '#switch', function(){
		
		if($('#switch_thumb').hasClass('active')){
			
			$('#switch_thumb').animate({
						
					'right': '2px',
							
			}, { duration: 100, easing: 'linear' });
			
			$('#switch').animate({
						
					backgroundColor: '#68c0b1'
							
			}, { duration: 100, easing: 'linear' });
			
			$('#switch_thumb').removeClass('active');
			
		}
		
		else {
			
			$('#switch_thumb').animate({
						
					'right': '19px'
							
			}, { duration: 100, easing: 'linear' });
			
			$('#switch').animate({
						
					backgroundColor: '#bebebe'
							
			}, { duration: 100, easing: 'linear' });
			
			$('#switch_thumb').addClass('active');
			
		}
		
	});
	
	$(document).on('click', '#empty_stylings', function(){
	
		$('#modules_widget').trigger('click');
	
	});
	
	//Widget Style Click
	$('#style_widget').click(function(){
	
		if(sidebarFlag == 1){
				
			return false;
				
		}
	
		sidebarFlag = 1;
	
		$('#sidebar .active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('ul').closest('li').addClass('active');
	
		if($('#style_options').is(':visible')) {
			
			checkSpecificAttributes();
			checkAttributes();
			
		}
		
		else {
			
		
			$('table').removeClass('currentTable');
		
			animateTemplate();
			closeModules();
		
			setTimeout(function(){
				
				$('#modules_widgets').hide();
				$('#style_options').show();
				
				openModules();
				
				checkSpecificAttributes();
				
				checkAttributes();
									
			}, 420);
			
		}
		
	});
	
	
	
	//Modules Widget
	$('#modules_widget').click(function(){
	
		if(sidebarFlag == 1){
				
			return false;
				
		}
	
		sidebarFlag = 1;
	
		$('#sidebar .active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('ul').closest('li').addClass('active');
	
		if($('#modules_widgets').is(':visible')) {
			
			sidebarFlag = 0;
			
		}
		
		else {
		
			animateTemplate();
			closeModules();
		
			setTimeout(function(){
				
				$('#modules_widgets').show();
				$('#style_options').hide();
				openModules();
				
				sidebarFlag = 0;
				
			}, 420);
		
		}
		
	});

	
	//send test email and sign up
	$(document).on('click', '#sign_up', function(){
		
		if(busyFlag){
			
			return false;
			
		}
		
		busyFlag = true;
		
		//variables
		var el = $(this);
		var email_address = $('#send_test_mail_value').val();
		var ref = window.location.href;
		
		var current_val = $(this).val();
		$(this).val('one moment..');
		
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "../scripts/calls.php?func=register_editor",
		    data: { email_address: email_address, ref: ref }
		}).done(function(data) {
			
			if(data == 'invalid_email'){
				
				notificationContent = 'Invalid email address';
				notificationColor = "#ea5a5b";
				notification();
				
				$(el).val(current_val);
				busyFlag = false;
				
			}
			
			if(data == 'email_exists'){
				
				notificationContent = 'Email address already exists - Please login again';
				notificationColor = "#ea5a5b";
				notification();
				
				$(el).val(current_val);
				busyFlag = false;
				
			}
			
			if(data == 'success'){
				busyFlag = false;
				
				$('#send_test_email').removeClass('demo-only');
				$('.credits_or_plan').html('<span>250 Credits</span>');
				
				closePopup();
				
				setTimeout(function(){
					
					if(testFlag){
						
						$('#send_test_email').trigger('click');
						
						setTimeout(function(){
							
							$('#send_test_mail_value').val(email_address);
							$('#send_test_mail_send').trigger('click');
							
						}, 1000);
						
					}
					
					else {
					
						notificationContent = 'StampReady account created and 250 credits received!';
						notificationColor = "#69C0AF";
						
						notification();	
						
					}
					
				}, 1000);
				
			}
			
		});
		
	})
	
	$(document).on('click', '#create-free-account', function(e){
		
		e.stopImmediatePropagation();
		
		icon = 'popup_dashboard.png';
		
		headline = 'Get full access to StampReady';
		paragraph = 'Create a free account, get access to our full featured email platform and receive<br/><span class="semi_bold" style="color: #323232;">250 credits</span> monthly. By signing up you agree with the <a href="http://www.stampready.net/terms-and-conditions/" style="color: #69c0af; text-decoration: none;" class="semi_bold" target="_blank">terms and conditions</a>.<br/><br/> If you have an account, you may <a href="http://www.stampready.net/index.php?action=login" style="color: #69c0af; text-decoration: none;" class="semi_bold" target="_blank">Login</a>';
		
		btnTrue = 'Sign Up';
		btnTrueId = 'sign_up';
		
		btnFalse = 'Nevermind';
		
		inputField = 'john@doe.com';
		inputFieldId = 'send_test_mail_value';
		
		openPopup();
		
		$('#popup h3').addClass('semi_bold');
		
	})
	
	$(document).on('click', '#send_test_email', function(){
		
		if($(this).hasClass('demo-only')){
		
			icon = 'popup_send.png';
		
			headline = 'Send test email and sign up'; // <span class="semi_bold">'+campaign_name+'</span>
			paragraph = 'Create a free account and get access to the StampReady dashboard. Just use the email address you\'d like to receive the test email for and it\'ll automatically create your account. By signing up you agree with the <a href="http://www.stampready.net/terms-and-conditions/" style="color: #69c0af; text-decoration: none;" class="semi_bold" target="_blank">terms and conditions</a>.<br/><br/> If you have an account, you may <a href="http://www.stampready.net/index.php?action=login" style="color: #69c0af; text-decoration: none;" class="semi_bold" target="_blank">Login</a>';
			
			btnTrue = 'Send Test Email';
			btnTrueId = 'sign_up';
			
			btnFalse = 'Nevermind';
			
			inputField = 'john@doe.com';
			inputFieldId = 'send_test_mail_value';
			
			testFlag = true;
			
			openPopup();
			
			$('#popup h3').addClass('semi_bold');
			
			return false;
			
		}
		
		else {
		
			campaign_name = $('.send_campaign_name').text();
			
			headline = 'Send an email for test purposes'; // <span class="semi_bold">'+campaign_name+'</span>
			paragraph = 'Enter the email address of the recipient that should receive your newsletter. We send from <span class="semi_bold" style="color: #343434">noreply@stampready.net</span>, with subject as <span class="semi_bold" style="color: #343434">Test Email</span>, so it may be caught as spam. Please, check your junk folder.';
			
			btnTrue = 'Send';
			btnTrueId = 'send_test_mail_send';
			
			btnFalse = 'Cancel';
			
			inputField = 'john@do.com';
			inputFieldId = 'send_test_mail_value';
			
			openPopup();
	
			h_popup = $('#popup').height();
	
			$('#popup').css('height', h_popup+'px');
			$('#send_test_mail_value').val(test_email)	
			
		}
				
	})
	
	
	$(document).on('click', '#send_test_mail_send[value="Send"]', function(){
			
		content = $('#frame').html();
		$tmp = $('<div>'+content+'</div>')
		$tmp.find('#clear_template, #edit_link, .highlighter-container').remove();
		$tmp.find('*[contenteditable]').each(function() { $(this).removeAttr('contenteditable') });
		$tmp.find('.editable').each(function() { $(this).removeClass('editable') });
		$tmp.find('.delete, .handle, .moduleDeleteButton, .moduleDragButton, .moduleCodeButton, .moduleCode').each(function() { $(this).remove(); });
		$tmp.find('.last-table').each(function() { $(this).removeClass('last-table'); });
		$tmp.find('.currentTable').each(function() { $(this).removeClass('currentTable'); });
		$tmp.find('#edit_link').each(function() { $(this).remove(); });
		$tmp.find('.parentOfBg').contents().unwrap('div');
		$tmp.find('#clear_template').each(function() { $(this).remove(); });
		$tmp.find('[class=""]').each(function() { $(this).removeAttr('class') });

		
		html = $tmp.html();
		
		title = $('#titles_holder').html();		
		meta = $('#meta_holder').html();
		style = $('#styles_holder').html();
		receiver = $('#send_test_mail_value').val();
		l = $('#send_test_mail_value').val().length;
		
		if(l > 4){
			
			$(this).val('Sending..');
		
			$.ajax({
			    type: "POST",
			    dataType: "html",
			    url: "scripts/test_email.php",
			    data: {titles:title, html: html, style: style, meta: meta, receiver: receiver }
			}).done(function(data) {
				
				if(data == 'invalid email'){
					
					notificationContent = 'Invalid email address';
					notificationColor = "#ea5a5b";
					
				}
				
				else if(data == 'success'){
				
					closePopup();
				
					notificationContent = 'Test email sent to '+receiver;
					notificationColor = "#69C0AF";	
				
				}
				
				setTimeout(function(){
					
					notification();
					
				}, 500)
								
			});
			
		}
		
		else {
			
			notificationContent = 'Invalid email address';
			notificationColor = "#ea5a5b";
				
			notification();
				
			
		}				
		
	});
	
	
	
	//Change Background
	$(document).on('click', '.change_background', function() {
		
		the_img = $(this).parent().text();
		$('.image_target').removeClass('image_target');
		
		$('#images').prop('accept','image/*');
		$('#images').trigger('click');
		
	});
	
	
	
			
	//Tooltip
	$(document).mousedown(function(){
		
		hideToolTip();
		hideEditLink();
		
	});
	
	
	
	
	//Edit Link Mousedown
	$('.highlighter-container, #edit_link').mousedown(function(ev){
	
		ev.stopPropagation();
	
	});
	
	
	
	
	//Close Screens
	$('.close_iframe').click(function(){
		
		closeScreen();
		
	})
	
	
	
	
	//Edit Link Value and Link Value prevent Actions
	$('#edit_link_value, #link_value').keydown(function(ev){
	
		ev.stopPropagation();
	
	});


		
	
	
	
	//Frame keydown, if Meta
	$('#frame').keydown(function(e){
	
		if (e.metaKey);
		else hideToolTip(); hideEditLink();
		
		allowSave();
	
	});
	
	
	
	
	// Command Bold
	$('#cmdBold').click(function(e){
		document.execCommand('bold', false, true);
		allowSave();
	});
	
	
	
	
	
	
	//Command italic
	$('#cmdItalic').click(function(e){
		document.execCommand('italic', false, true);
		allowSave();
	});
	
	
	
	$('#frame').on('mousedown', 'td', function(){
		
		
	})
	
	
	
	
	//Command align left
    $('#cmdLeftAlign').click(function() {
		$('#frame td[contenteditable="true"]').css('text-align','left');
		allowSave();
	});
	
	
	

	//Command align center
	$('#cmdCenterAlign').click(function() {
		$('#frame td[contenteditable="true"]').css('text-align','center');
		allowSave();
		
	});




	//Command align right
	$('#cmdRightAlign').click(function() {
		$('#frame td[contenteditable="true"]').css('text-align','right');
		allowSave();
	});
	
	
	initialiseTemplate();

});