/**
 *
 * Crop Image While Uploading With jQuery
 * 
 * Copyright 2013, Resalat Haque
 * http://www.w3bees.com/
 *
 */

// set info for cropping image using hidden fields
function setInfo(i, e) {
	$('#x').val(e.x1);
	$('#y').val(e.y1);
	$('#w').val(e.width);
	$('#h').val(e.height);
}

$(document).ready(function() {
	
$('#imageForm').submit( function( e ) {	

	var formData = new FormData($('#imageForm')[0]);

    $.ajax( {
      url: 'http://www.stampready.net/dashboard/editor/scripts/image_crop_upload.php',
      type: 'POST',
      data: formData,
      success: function(data){
	    
	    	$('#frame img.image_target').attr('src','http://www.stampready.net/dashboard/editor/'+data);
	    	$('#frame img.image_target').removeClass('active');
	    	
	    	$('.imgareaselect-selection').parent().remove();
	    	$('.imgareaselect-outer').remove();
	    	
	    	$('img#uploadPreview').imgAreaSelect({
		   		hide: true
		   	});
	    	
	    	closePopup();
	    	allowSave();
	    	hideEditLink();
	    	hideToolTip();
	    	
	    	$('#uploadImage').replaceWith($('#uploadImage').val('').clone(true));
	      
      },
      error: function(data){
	      
	      alert(data)
	      
      },
      processData: false,
      contentType: false
    });
    
    return false;
    
  });
  
  $(document).on('click', '#crop_image[value="Crop Image"]', function(){
	  
	  $(this).val('Cropping..');
	  $('#img_original_crop_w').val(img_w);
	  $('#img_original_crop_h').val(img_h);
	  $('#imageForm').trigger('submit');
	  
  })

	// prepare instant preview
	$("#uploadImage").change(function(){
	
		headline = '';
		btnTrue = 'Crop Image';
		btnTrueId = 'crop_image';
		
		btnFalse = 'Cancel Cropping';
		
		customHtml = '<div class="wrap"><center><img id="uploadPreview"></center></div><style>#popup { background-color: #131313; } #popupOverlay { background-color: rgba(0,0,0,0.85); }</style>';
		
		openPopup();
		
		var p = $("#uploadPreview");
		
		// fadeOut or hide preview
		p.fadeOut();
		
		$('#popup h3').remove();
		$('#popup').css('padding','20px 0px 100px 0px').css('width','820px');
		
		setTimeout(function(){

		// prepare HTML5 FileReader
		var oFReader = new FileReader();
		
		oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
		
		oFReader.onload = function (oFREvent) {
	
		var tmp = new Image()
		tmp.src = oFREvent.target.result;

		
	   		p.attr('src', oFREvent.target.result).fadeIn();
	   		
	   		setTimeout(function(){
		   	
		   		img_s_w = p.width();
		   		img_s_h = p.height();	
		   		
		   		img_h = parseInt($('#frame img.image_target').height());
		   		img_w = parseInt($('#frame img.image_target').width());
		   		
		   		$('#img_original_w').val(tmp.width);
			   	$('#img_scaled_w').val(img_s_w);
			   	$('#img_original_h').val(tmp.height);
			   	$('#img_scaled_h').val(img_s_h);
		   		
		   		if(img_h == tmp.height){
			   		
			   		if(img_w == tmp.width){
			   			
			   			$('img#uploadPreview').imgAreaSelect({
					   		// set crop ratio (optional)
					   		x1: 0, y1: 0, x2: img_w, y2: img_h,
					   		handles: false,
					   		move: true,
					   		resizable: false,
					   		persistent: true,
					   		onInit: setInfo,
					   		onSelectEnd: setInfo,
					   		keys: false
					   	});
			   			
			   			setTimeout(function(){
			   				$('#crop_image[value="Crop Image"]').trigger('click');
			   				
			   			}, 500);
			   		
			   		}
			   		
		   		}
		   		
		   		else if(img_w == tmp.width){
			   		
			   		if(img_h == tmp.height){
			   			
			   			$('img#uploadPreview').imgAreaSelect({
					   		// set crop ratio (optional)
					   		x1: 0, y1: 0, x2: img_w, y2: img_h,
					   		handles: false,
					   		move: true,
					   		resizable: false,
					   		persistent: true,
					   		onInit: setInfo,
					   		onSelectEnd: setInfo,
					   		keys: false
					   	});
			   			
			   			setTimeout(function(){
			   				$('#crop_image[value="Crop Image"]').trigger('click');
			   				
			   			}, 500);
			   		
			   		}
			   		
		   		}
		   		
		   		else if(img_s_w < img_w){
			   	
			   		$('img#uploadPreview').imgAreaSelect({
					   		// set crop ratio (optional)
					   		x1: 0, y1: 0, x2: img_s_w, y2: img_s_h,
					   		handles: false,
					   		move: true,
					   		resizable: false,
					   		persistent: true,
					   		onInit: setInfo,
					   		onSelectEnd: setInfo,
					   		keys: false
				   	});
				   	
				   	setTimeout(function(){
		   				$('#crop_image[value="Crop Image"]').trigger('click');
		   				
		   			}, 500);
			   	
			   	}
			   	
			   	else if(img_s_h < img_h){
			   	
			   		$('img#uploadPreview').imgAreaSelect({
					   		// set crop ratio (optional)
					   		x1: 0, y1: 0, x2: img_s_w, y2: img_s_h,
					   		handles: false,
					   		move: true,
					   		resizable: false,
					   		persistent: true,
					   		onInit: setInfo,
					   		onSelectEnd: setInfo,
					   		keys: false
				   	});
				   	
				   	setTimeout(function(){
		   				$('#crop_image[value="Crop Image"]').trigger('click');
		   				
		   			}, 500);
			   	
			   	}
			   	
			   	else {
				   	
				   	$('img#uploadPreview').imgAreaSelect({
					   		// set crop ratio (optional)
					   		x1: 0, y1: 0, x2: img_w, y2: img_h,
					   		handles: true,
					   		move: true,
					   		resizable: true,
					   		persistent: true,
					   		onInit: setInfo,
					   		minHeight: img_h / 2,
					   		minWidth: img_w / 2,
					   		keys: false,
					   		aspectRatio: ""+img_w+":"+img_h,
					   		onSelectEnd: setInfo
					   	});
				   	
			   	}
		   		
		   		setTimeout(function(){
			   		
			   		$('.imgareaselect-border1, .imgareaselect-border2, .imgareaselect-border3, .imgareaselect-border4, .imgareaselect-handle, .imgareaselect-outer').animate({
			   		opacity: 0.5
			   	});
			   		
		   		}, 100)
		   		
	   		}, 500);
	   		
		};	
			
		}, 500)
		
	});
	
});