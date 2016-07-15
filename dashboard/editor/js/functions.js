// Close modules function
function closeModules() {

	if($('#modules').is(':visible')){
	
		//Let's animate the modules sidebar
		$('#modules').animate({
			
			marginLeft: -400
			
		}, { duration: 360, easing: 'easeInBack', complete: function(){
			
			//Hide modules incase it's visible
	   		$('#modules').hide();	 
	   		
	   		//Hide Colorpicker
	   		closeColorpickers();
	   		
	   		} 
			   
		});	
		
	}
	
}

function positionTemplate() {

	w = $(window).width();
	a = $('#canvas').width();
	
	if(w < 1600){
		
		b = a - 905;	
		
		c = b / 2;
		d = c + 247;
		$('#holder').css('margin-left', d).css('width','700px');
		
	}
	
	else {
			
		b = a - 1115;
	
		c = b / 2;
		d = c + 247;
		$('#holder').css('margin-left', d).css('width','900px');
		
	}
	
}


//Open modules function
function openModules() {
		
		//Unhide the modules bar
		$('#modules').show();
		
		//Animate the modules bar
		$('#modules').animate({
			
			marginLeft: 0
		
		}, { duration: 360, easing: 'easeOutBack', complete: function(){
	   			 
		    }
		
		});	
	
}


//background_appearance
function background_appearance(event) {

	attr = $(event).parent().find('span').text();
	global = $(event).parent().find('span').text();
	size = $(event).val();
	output = $(event).parent().find('.output');
	
	//if switch active
	if($('#switch_thumb').hasClass('active')){
	
		//clear current background attributes
		$('.parentOfBg [data-bg="'+attr+'"]').css('background-position','');
		$('.parentOfBg [data-bg="'+attr+'"]').css('background-size','').css('-webkit-background-size','').css('-moz-background-size','').css('-o-background-size','');
		$('.parentOfBg [data-bg="'+attr+'"]').css('background-attachment','').css('-webkit-background-attachment','').css('-moz-background-attachment','').css('-o-background-attachment','');
	
		if(size == 0){
		
			format = 'Original';
			$('.parentOfBg [data-bg="'+attr+'"]').css('background-position','center center');
			
		}
		
		else if(size == 1){
			
			format = '100%';
			$('.parentOfBg [data-bg="'+attr+'"]').css('background-size','100%');
			
		}
		
		else if(size == 2){
			
			format = 'Fluid';
			$('.parentOfBg [data-bg="'+attr+'"]').css('background-position','center center').css('-webkit-background-size','cover').css('-moz-background-size','cover').css('-oz-background-size','cover').css('background-size','cover')
			
		}
		
		else if(size == 3){
			
			format = 'Fixed';
			$('.parentOfBg [data-bg="'+attr+'"]').css('background-position','center center').css('-webkit-background-size','cover').css('-moz-background-size','cover').css('-oz-background-size','cover').css('background-size','cover').css('-webkit-background-attachment','fixed').css('-moz-background-attachment','fixed').css('-o-background-attachment','fixed').css('background-attachment','fixed');
			
		}
	
	}
	
	else {
	
		//clear current background attributes
		$('#frame [data-bg="'+attr+'"]').css('background-position','');
		$('#frame [data-bg="'+attr+'"]').css('background-size','').css('-webkit-background-size','').css('-moz-background-size','').css('-o-background-size','');
		$('#frame [data-bg="'+attr+'"]').css('background-attachment','').css('-webkit-background-attachment','').css('-moz-background-attachment','').css('-o-background-attachment','');
		
		if(size == 0){
		
			format = 'Original';
			$('#frame [data-bg="'+attr+'"]').css('background-position','center center');
			
		}
		
		else if(size == 1){
			
			format = '100%';
			$('#frame [data-bg="'+attr+'"]').css('background-size','100%');
			
		}
		
		else if(size == 2){
			
			format = 'Fluid';
			$('#frame [data-bg="'+attr+'"]').css('background-position','center center').css('-webkit-background-size','cover').css('-moz-background-size','cover').css('-oz-background-size','cover').css('background-size','cover')
			
		}
		
		else if(size == 3){
			
			format = 'Fixed';
			$('#frame [data-bg="'+attr+'"]').css('background-position','center center').css('-webkit-background-size','cover').css('-moz-background-size','cover').css('-oz-background-size','cover').css('background-size','cover').css('-webkit-background-attachment','fixed').css('-moz-background-attachment','fixed').css('-o-background-attachment','fixed').css('background-attachment','fixed');
			
		}
		
	}
	
	$(output).val(format);
	
	allowSave();

}


//Change font size function
function sizes(event) {
	
	//Variables
	attr = $(event).parent().find('span').text();
	global = $(event).parent().find('span').text();
	size = $(event).val();
	output = $(event).parent().find('.output');
	
	if(size > 16 && size < 32){
			
		extra = 1.45
	
	}
	
	else if(size < 17){
			
		extra = 1.7
	
	}
	
	else {
		
		extra = 1
		
	}
	
	$('.elementIndicator').removeClass('elementIndicator');
	
	//if switch active
	if($('#switch_thumb').hasClass('active')){
	
		//Each data-size element in the editor
		$('.currentTable [data-size="'+attr+'"]').each(function(){
			
			//Change value of the font
			$(this).css('font-size',size+'px').css('line-height',size*extra+'px');
			
		});
		
		$('.currentTable table '+global).each(function(){
		
			g = $(this);
			
			//Change value of the font
			$(this).not('[data-size]').css('font-size',size+'px').css('line-height',size*extra+'px');
			
		});
		
	}
	
	else {
		
		//Each data-size element in the editor
		$('#frame [data-size="'+attr+'"]').each(function(){
			
			//Change value of the font
			$(this).css('font-size',size+'px').css('line-height',size*extra+'px');
			
		});
		
		$('#frame table '+global).each(function(){
		
			g = $(this);
			
			//Change value of the font
			$(this).not('[data-size]').css('font-size',size+'px').css('line-height',size*extra+'px');
			
		});
		
	}
	
	//Also, change the output 
	$(output).val(size);
	
	allowSave();
	
}



//Close colorpickers
function closeColorpickers() {

	//Animate colorpickers, from to show
	$('#colorpicker, #bg_colorpicker').animate({
			
		"height": "hide",
		"marginTop": "hide",
		"marginBottom": "hide",
		"paddingTop": "hide",
		"paddingBottom": "hide",
		"opacity": "0"
		
	}, { duration: 400, easing: 'easeOutBack' });
	
	//Deactivate flag on modules
	$('#modules').removeClass('on');

}


//Check styling attributes
function checkAttributes() {
	
	//each appearances attribute
	$('#appearances li').not('.background_appearance').each(function(){
				
		li = $(this);
		name = $(this).attr('name');
		
		//if data-size exists
		if ($('#frame [data-size="'+name+'"]').length === 0) {
		
			$(li).remove();
		
		}
		
	});
			
	//each background_settings attribute
	$('#background_settings li').each(function(){
		
		li = $(this);
		name = $(this).attr('name');
		
		//if data-bg exists
		if ($('#frame [data-bg="'+name+'"]').length === 0) {
		
			$(li).remove();
		
		}
		
	});
		
	//each colors attribute	
	$('#colors li').each(function(){
		
		li = $(this);
		name = $(this).attr('name');
		
		if(name == 'a'){
			
			
		}
		
		else {
		
			//if data-color
			if ($('#frame [data-color="'+name+'"]').length === 0) {
			
				$(li).remove();
			
			}
			
		}
		
	});
	
	//each bg_colors attribute
	$('#bg_colors li').each(function(){
		
		li = $(this);
		name = $(this).attr('name');
		
		//if data-bgcolor exists
		if ($('#frame [data-bgcolor="'+name+'"], #frame [data-border-color="'+name+'"], #frame [data-border-top-color="'+name+'"], #frame [data-border-bottom-color="'+name+'"], #frame [data-border-left-color="'+name+'"], #frame [data-border-right-color="'+name+'"]').length === 0) {
		
			$(li).remove();
		
		}
		
	});
	
	appearances = $('#appearances li').size();
	colors = $('#colors li').size();
	bg_colors = $('#bg_colors li').size();
	background_settings = $('#background_settings li').size();
	
	$('#style_options div.empty').remove();
	
	if ($(appearances).length < 1) {
	
/* 				$('#appearances').append('<div class="empty">No Attributes</div>'); */
		$('#appearances').prev('h4').hide();
		$('#appearances').hide();
	
	}
	
	else {
		
		$('#appearances').prev('h4').show();
		$('#appearances').show();
		
	}
	
	if ($(colors).length < 1) {
	
/* 				$('#colors').append('<div class="empty">No Attributes</div>'); */
		$('#colors').prev('h4').hide();
		$('#colors').hide();
	
	}
	
	else {
		
		$('#colors').prev('h4').show();
		$('#colors').show();
		
	}

	if ($(bg_colors).length < 1) {
	
/* 				$('#bg_colors').append('<div class="empty">No Attributes</div>'); */
		$('#bg_colors').prev('h4').hide();
		$('#bg_colors').hide();
	
	}
	
	else {
		
		$('#bg_colors').prev('h4').show();
		$('#bg_colors').show();
		
	}
	
	if ($(background_settings).length < 1) {
	
/* 				$('#background_settings').append('<div class="empty">No Attributes</div>'); */
		$('#background_settings').prev('h4').hide();
		$('#background_settings').hide();
	
	}
	
	else {
		
		$('#background_settings').prev('h4').show();
		$('#background_settings').show();
		
	}
	
	sidebarFlag = 0;
	
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            var ranges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}



function restoreSelection(savedSel) {
    if (savedSel) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}



function createLink() {

	m = Math.floor(Math.random()*1E7)

    // There's actually no need to save and restore the selection here. This is just an example.
    var savedSel = saveSelection();
    var url = 'http://www.newlink.com?'+m
    restoreSelection(savedSel);
	document.execCommand("CreateLink", false, url);
	
	$('*').removeClass('new_link');
	$('*').removeClass('change_link');
	$('#frame a[href="http://www.newlink.com?'+m+'"]').addClass('new_link')

	link_color2 = $('.new_link').closest('[data-link-color]').attr('data-link-color');
	link_size = $('.new_link').closest('[data-link-size]').attr('data-link-size');
	link_style = $('.new_link').closest('[data-link-style]').attr('data-link-style');
	

	var array1 = [];
	var array2 = [];
	var array3 = [];
	y = 0;
	x = 0;
	z = 0;
	
	
	$('#frame .new_link').closest('td').find('a:not([data-bgcolor])').each(function(){
	
		array1[y++] = $(this).attr('data-color');
		array2[x++] = $(this).attr('style');
		array3[z++] = $(this).attr('data-size');
		
	});	
	
	var counts1 = {}, max1 = 0, res1;
	var counts2 = {}, max2 = 0, res2;
	var counts3 = {}, max3 = 0, res3;
	
	for (var v1 in array1) {
	  counts1[array1[v1]] = (counts1[array1[v1]] || 0) + 1;
	  if (counts1[array1[v1]] > max1) { 
	    max1 = counts1[array1[v1]];
	    res1 = array1[v1];
	  }
	}
	
	for (var v2 in array2) {
	  counts2[array2[v2]] = (counts2[array2[v2]] || 0) + 1;
	  if (counts2[array2[v2]] > max2) { 
	    max2 = counts2[array2[v2]];
	    res2 = array2[v2];
	  }
	}
	
	for (var v3 in array3) {
	  counts3[array3[v3]] = (counts3[array3[v3]] || 0) + 1;
	  if (counts3[array3[v3]] > max3) { 
	    max3 = counts3[array3[v3]];
	    res3 = array3[v3];
	  }
	}
	
	link_data_style = res2;
	link_data_color = res1;
	link_data_size = res3;
	
	if(typeof link_style !== 'undefined'){
	
		$('#frame a.new_link').attr('style',link_style).attr('data-color',link_color2).attr('data-size',link_size);
	
	}
	
	else if(typeof link_data_style !== 'undefined'){
		
		// your code here.
		$('#frame a.new_link').attr('style',link_data_style).attr('data-color',link_data_color).attr('data-size',link_data_size);
		
	}
		
	else {
	   	
	   	$('#frame a.new_link').css('color',link_color2);
	   	
	}
	
	$('#style_widget').trigger('click');
	
	$('#frame a[href="http://www.newlink.com?'+m+'"]').attr('href','')
	
	allowSave();
    
}




function hideToolTip() {
	
	$('.highlighter-container, #link').hide();
	$('#template_actions').show();
	$('.new_link').removeClass('new_link');
	$('#link_value').val('');
	
}



function hideEditLink() {
	
	$('#edit_link').hide();
	$('.change_link').removeClass('change_link');
	
}



function filterHTML() {
	
    $tmp = $("<div></div>").html($("#frame").html());
    $tmp.find('*[contenteditable]').each(function() { $(this).removeAttr('contenteditable') });
    $tmp.find('.delete').each(function() { $(this).remove(); });
    $tmp.find('#edit_link').each(function() { $(this).remove(); });
    $tmp.find('[class=""]').each(function() { $(this).removeAttr('class') });
    source = $tmp.html().replace(new RegExp('<tbody>', 'g'), '').replace(new RegExp('</tbody>', 'g'), '');
    
    $('#htmldump').val(source);
	
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function allowSave() {
	
	$('.de').removeClass('de');
	$('.ani').removeClass('ani');
	
}

function openPopup() {

	$('body, html').css('overflow','hidden');
	$('#popupOverlay').remove();
	
	$tmp = $('<div></div>');
	
	if(typeof icon === 'undefined'){}
	else { $tmp.append('<div style="text-align: center!important; padding-bottom: 40px;"><img src="img/icons/'+icon+'" style="margin: auto!important;"></div>') }
	
	if(typeof headline === 'undefined'){}
	else { $tmp.append('<h3>'+headline+'</h3>') }
	
	if(typeof paragraph === 'undefined'){}
	else { $tmp.append('<p>'+paragraph+'</p>') }
	
	if(typeof btnTrue === 'undefined'){}
	else { $tmp.append('<input type="button" value="'+btnTrue+'" id="'+btnTrueId+'" class="btnTrue semi_bold" style="left: 0px;">') }
	
	if(typeof btnTrue2 === 'undefined'){}
	else { $tmp.append('<input type="button" value="'+btnTrue2+'" id="'+btnTrueId2+'" class="btnTrue2 semi_bold" style="right: 0px;">') }
	
	if(typeof btnFalse === 'undefined'){ }
	else { $tmp.append('<input type="button" value="'+btnFalse+'" class="btnFalse semi_bold" style="right: 0px;" onclick="closePopup();">') }
	
	if(typeof textArea === 'undefined'){}
	else { $tmp.append('<textarea id="'+textAreaId+'" class="regular">'+textArea+'</textarea>') }
	
	if(typeof inputField === 'undefined'){}
	else { $tmp.append('<input type="text" placeholder="'+inputField+'" id="'+inputFieldId+'" class="light inputField">'); }
	
	if(typeof customHtml === 'undefined'){}
	else { $tmp.append(customHtml) }

	
	content = $tmp.html();
	
	$('body').prepend('<div id="popupOverlay"><div id="popup">'+content+'<div class="closePopup"></div></div>');
	
	setTimeout(function() {

		$('#popupOverlay').css({
			'opacity': '1',
			'transition': '0.4s all ease',	
		});
		
		$('#popup').css({
			'opacity': '1',
			'transition': '0.4s all ease',
			'transform': 'scale(1) translateY(-50%)'
		});
		
		$('.stackSR').css({
			'transition': '0.4s all ease',
			'transform': 'scale(0.9)'
		});
		
    }, 50);
	
	btn_size = $('#popup input[type="button"]').size();
	submit_size = $('#popup input[type="submit"]').size();
	size = btn_size + submit_size;
	
	if(size > 1) {
		
		$('#popup input[type="button"], #popup input[type="submit"]').each(function(){
			
			$(this).css('width','50%');
			
		})
		
	}
	
	if(typeof invert === 'undefined'){ }
	else { $('.btnFalse, .btnTrue, #popup input[type="submit"]').addClass('invert'); }
	
	$('#popup input[type="text"], #popup input[type="password"], #popup textarea').focus();
	
	delete window.icon;
	delete window.headline;
	delete window.paragraph;
	delete window.btnTrue;
	delete window.btnTrue2;
	delete window.btnFalse;
	delete window.textArea;
	delete window.inputField;
	delete window.customHtml;
	delete window.invert;
	
	$(document).keyup(function(e){
		
		if (e.keyCode == 27) { 
		
			closePopup();
		
		}
	
	});
	
	$('.inputField').keyup(function(e){
		
		if (e.keyCode == 13) { 
		
			$('.btnTrue').trigger('click');
		
		}
	
	});

	
}

function closePopup() {
	
	$('#popupOverlay').css({
		'opacity': '0',
	});
	
	$('#popup').css({
		'opacity': '0',
		'transform': 'translateY(-50%) scale(0.8)'
	});
	
	$('.stackSR').css({
		'transform': 'scale(1)'
	});
	
	$('img#uploadPreview').imgAreaSelect({
		   		hide: true
		   	});
	
	setTimeout(function(){
		
		$('html, body').css('overflow','');
		$('#popupOverlay').remove();
		
	}, 400);
	
	$('.image_target').removeClass('image_target');
	
}


//Initialise the template
function initialiseTemplate() {

	//if it's a demo
	if (demo.indexOf('demo') > -1) {
	
		//set target as the frame, as all the html is in there
		target = $('#frame table[data-module]');
		
		//count number of data-module tags
		el = $('#frame table[data-module]').length -1;
		
		//Create array of link color
		var arr = [];
		i = 0;
		
		$('#frame table a:not([data-color])').each(function(){
			
			arr[i++] = $(this).css('color');
			
		});
		
		var counts = {}, max = 0, res;
		for (var v in arr) {
		  counts[arr[v]] = (counts[arr[v]] || 0) + 1;
		  if (counts[arr[v]] > max) { 
		    max = counts[arr[v]];
		    res = arr[v];
		  }
		}
		
		link_color = res;
		
		if(typeof link_color !== 'undefined'){ }
		
		else { link_color = '#2b8df0'; }
		
		$('#frame table[data-visible="false"]').each(function(){
			
			$(this).remove();
			
		});
		
	}
	
	else {
		
		//set target as the modules holder, because the html is inside there
		target = $('#modules_holder table[data-module]');
		
		//count number of data-module tags.
		el = $('#modules_holder table[data-module]').length -1;
		
		//Create array of link color
		var arr = [];
		i = 0;
		
		$('#modules_holder table a:not([data-color])').each(function(){
			
			arr[i++] = $(this).css('color');
			
		});
		
		var counts = {}, max = 0, res;
		for (var v in arr) {
		  counts[arr[v]] = (counts[arr[v]] || 0) + 1;
		  if (counts[arr[v]] > max) { 
		    max = counts[arr[v]];
		    res = arr[v];
		  }
		}
		
		link_color = res;
		
		if(typeof link_color !== 'undefined'){ }
		
		else { link_color = '#2b8df0'; }
		
	}

	//reset count to zero
	count = 0;
	
	count_m = $('#frame table[data-module]').size();
				  
	if ($(count_m).length > 0) {
	
		$('#frame').prepend('<input type="button" id="clear_template" class="semi_bold" value="Clear Template">');
		$('#frame').removeClass('empty');
	
	}
	
	setTimeout(function(){
		
		//generate thumbnails
		generateThumbs();
		
	}, 50);
	
}

function generateThumbs(){
	
	//if count is greater than the elements, quit.
	if(count > el){
		
		//give a little timeout to execute the script
		setTimeout(function(){
			
			//convert all
			convertThumbs();
			
		}, 100)
		
	}
	
	else {
		
		//the module name
		var the_module = $(target).eq(count).attr('data-module');
		
		//the thumbnail image
		var the_thumb = $(target).eq(count).attr('data-thumb');
		
		//the id of the module
		var id = $(target).eq(count);
		
		//wrap 
		$('#modules_widgets').append('<div data-id="'+the_module+'">');
		
		if(the_thumb === undefined){ 
		
			$('#modules_widgets [data-id="'+the_module+'"]').append('<p class="undefined_thumb">'+the_module+'</p>');	
		
		}
		
		else if (the_thumb.indexOf('http') !== -1) { $('#modules_widgets [data-id="'+the_module+'"]').append('<img src="'+the_thumb+'">'); }
		
		
		$('#modules_widgets img').error(function(){
			 
			$(this).unbind("error");
			$(this).parent().html('<p class="undefined_thumb">'+the_module+'</p>');
			
		});

		//add 1 to count
		++count;
		
		//run script again
		generateThumbs();  
		
	  }
		
}

function convertThumbs() {
	
	//reposition template
	positionTemplate();
	
	// Create the measurement node
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	
	// Get the scrollbar width
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	
	// Delete the DIV 
	document.body.removeChild(scrollDiv);
	
	//if width is bigger than zero..
	if(scrollbarWidth > 0){
		
		//.. increase/decrease modules_widgets sidebar
		$('#modules_widgets').css('width','366');
		
	}
	
	l_number = 0;
	l_rotate = 0;
	max = 0;
	
	//make the thumbnails draggable z
	$('#modules_widgets div').draggable({
	
	    connectToSortable: '#frame',
		scroll: false,
		zIndex: 1000,
		helper: 'clone',
		delay: 100,
	    revert: 'invalid',
	    start : function(event, ui){
	    	
	       //make the frame sortable
	       $('#frame').sortable({ });
	       
	       //set cursor
	       $('#modules_widgets div img, #modules_widgets div p').css('cursor','-webkit-grabbing');
	       
	       //ui helper 250px
	       ui.helper.css({
		       width: 250,
		       height: 'auto',
	       });
	       
	       $('.ui-draggable.ui-draggable-dragging p').css('outline','none');
	       
	       /*
$(document).mousemove(function(e) {
		       
		   		mouseX = e.pageX;
		   		mouseY = e.pageY;
		   		windowY = $(window).height();
		   		threshold = 100;
		   		step = 10;

		   		if(mouseY > windowY - threshold){
				   		
			   		s_top = $('#canvas').scrollTop();
			   		$('#canvas').scrollTop(s_top + step);
			   		
		   		}
		   		
		   		else if(mouseY < threshold){
			   	
			   		s_top = $('#canvas').scrollTop();
			   		$('#canvas').scrollTop(s_top - step);	
			   	
			   	}
		       
		   });
*/
	       
	    },
	    stop: function(event, ui){
		  
		  //reset cursor
		  $('#modules_widgets div img, #modules_widgets div p').css('cursor','-webkit-grab');
		    
	    },
	    cursorAt: { left: 125, top: 15 },
	    complete: function(event, ui){
	    
	    	//on complete
	    
	    },
	    
	});
	
	$('#frame').sortable({
		axis: 'y',
	    opacity: 0.9,
	    scroll: false,
	    zIndex: 1000,
	    refreshPositions: true,
	    cursor: '-webkit-grabbing',
	    over: function(event, ui) {   
	       
	        var mouseX, mouseY;
	        var p = $('#frame').offset();
			var s = $(window).width();
			
			$(document).mousemove(function(e) {
				
				mouseX = e.pageX - p.left + 4;
				mouseY = e.pageY;
				height_ui = $('.ui-sortable-placeholder').height();
				
				count = $('#frame table[data-module]').size();
				
				if ($('.ui-draggable.ui-draggable-dragging').length > 0) { 
				
					if($('.ui-sortable-placeholder').next().is('table')) {
					
						if ($(count).length > 0) {
						
							w = $(window).width();
		
							if(w < 1600){
							
								a = 250 / 350;
							
							}
							
							else {
								
								a = 250 / 450;
								
							}
					
							b = mouseX * a;
							
							if(b > 250){
							
								c = 500 - b;
							
								$('.ui-sortable-placeholder').css('height',c+'px');
								
							}
							
							else {
								
								$('.ui-sortable-placeholder').css('height',b+'px');
								
							}
						
						}
						
						else {
						
							$('.ui-sortable-placeholder').css('height','250px');
							
						}
					
					}
					
					else {
						
						$('.ui-sortable-placeholder').css('height','250px');
						
					}
					
				}
			
			});	

	       
	    },
	    deactivate: function (event, ui) {
	    	
	    	$(document).unbind('mousemove');
	    	$('#frame').css('min-height','250px');
	    	
	    },
	    out: function (event, ui) {
	    
	    	
			$('#frame').css('min-height','250px');
	    
			$('#frame').sortable({
	       });
	       
		},
		receive: function (event, ui) {
		
			$(document).unbind('mousemove');
			animateFlag = 1;
	           
	       	a = $('#frame .ui-draggable').attr('data-id');

	       	$('#frame .delete, #frame .handle_wrapper').remove();
	       	$('#frame').removeClass('empty');
	       	$('#frame').find('div[data-id="'+a+'"]').html('<div style="height: '+height_ui+'px" class="temporary"></div>');
	        
	        $('.pre-message').slideUp(200);
			
			module = $('#modules_holder').find('[data-module="'+a+'"]').clone();
			
			h = $('#heightChecker').html(module).height();
			
	        setTimeout(function(){
	       
				$('#frame').find('.temporary').animate({
					height: h
				}, 250);
				
	       		setTimeout(function(){
	       			
	       			$('.temporary').remove();
			   		$('#frame').find('div[data-id="'+a+'"]').css('opacity','0').append(module);
			   			$('#frame').find('div[data-id="'+a+'"]').animate({ opacity: 1 }, 300);
			   			
			   			$('#frame').animate({
			   				
			   				'min-height': '10px'
			   				
		   				}, 300)
		   			
		   			
			   			setTimeout(function(){
				   			
				   			$('table').removeClass('currentTable');
				   			$('#frame').find('div[data-id="'+a+'"] > table').addClass('currentTable');
			   				$('#frame').find('div[data-id="'+a+'"]').contents().unwrap();
			   				$('#frame').find('div[data-id="'+a+'"]').removeAttr('data-id');
			   				
			   				frame_h = $('#frame').height();
			   				
			   				 count = $('#frame table[data-module]').size();
		
							  if ($(count).length > 0) {
						
										$('#frame').removeClass('empty');
										
										if ($('#clear_template').length > 0) { 
										
										
										}
										
										else {
											
											$('#frame').prepend('<input type="button" id="clear_template" class="semi_bold" value="Clear Template">');	
											
										}
						
							
							  }
			   				
			   				allowSave();
			   				$('.last-table').removeClass('last-table');
			   				$('#frame table:last-child').addClass('last-table');
			   				animateFlag = 0;
			   				
			   				
			   			}, 100);
	       			
	       		}, 250);
			
		   	
		  }, 200);
	
	    }
		
	});
	
	setTimeout(function(){
		
		openModules();
			
		$('#modules_widgets [data-id]').css('opacity','1').css('display','block');
			
		
	}, 250)
	
}

function repositionTemplate() {
	
	w = $(window).width();
	a = $('#canvas').width();
	
	if(w < 1450){
		
		b = a - 1165;	
		
		c = b / 2;
		d = c + 247;
		$('#holder').animate({
			'margin-left': d
		});
		
	}
	
	else {
			
		b = a - 1365;
	
		c = b / 2;
		d = c + 247;
		$('#holder').animate({
			'margin-left': d
		});
		
	}
	
}

function animateTemplate() {
	
	w = $(window).width();
	a = $('#canvas').width();
	
	if(w < 1450){
		
		b = a - 905;	
		
		c = b / 2;
		d = c + 247;
		$('#holder').animate({
			'margin-left': d
		});
		
	}
	
	else {
			
		b = a - 1115;
	
		c = b / 2;
		d = c + 247;
		$('#holder').animate({
			'margin-left': d
		});
		
	}
	
}

//Change font size function
function screen(event) {
	
	customHtml = '<div id="iphone_header_preview"><div class="closeMobile" onclick="closePopup();"></div></div><iframe id="mobilePreviewFrame"></iframe><div id="iphone_footer_preview"></div><style>#iphone_header_preview { width: 100%; height: 65px; background-image: url(img/framework/iphone_preview_header.png); position: absolute; left: 0px; top: 0px; } #iphone_footer_preview { width: 100%; height: 45px; background-image: url(img/framework/iphone_preview_footer.png); position: absolute; left: 0px; bottom: 0px; } #popup { background-color: transparent; padding: 0px; width: 320px; height: 100%; padding-top: 65px; padding-bottom: 45px; box-sizing: border-box; background-color: #FFF;} #popupOverlay { background-color: rgba(0,0,0,0.85); padding-top: 81px; padding-bottom: 80px; box-sizing: border-box; } #mobilePreviewFrame { height: 100%; width: 100%; background-color: #FFFFFF}</style>';
	openPopup();
	
	document.getElementById('mobilePreviewFrame').srcdoc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	
	html = $('#frame').html();
	meta = $('#meta_holder').html();
	title = $('#titles_holder').html();
	style = $('#styles_holder').html();
	style = style.replace(/body\[yahoofix\]/g,'');
	
	if(typeof title === 'undefined'){
	
		title = '';
	
	}
	
	setTimeout(function(){

		//Clone the template into an iframe
		// $('#popup iframe').contents().find('body').html('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>'+meta+'<title>Full Screen</title>'+style+'</head><body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0">'+html+'</body></html>');
		$('#popup iframe').contents().find('html').before('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">')
		$('#popup iframe').contents().find('body').html(html);
		$('#popup iframe').contents().find('head').append(meta)
		$('#popup iframe').contents().find('head').append(style)
		$('#popup iframe').contents().find('body').css('background-color','#FFFFFF').css('overflow-x','hidden');
		$('#popup iframe').contents().find('[contenteditable]').removeAttr('contenteditable');
		$('#popup iframe').contents().find('.editable').removeClass('editable')
		$('#popup iframe').contents().find('.image_target').removeClass('image_target');
		$('#popup iframe').contents().find('.ui-sortable-handle').removeClass('ui-sortable-handle')
		$('#popup iframe').contents().find('[href]').attr('onclick','');
		$('#popup iframe').contents().find('.parentOfBg').contents().unwrap('div');
		$('#popup iframe').contents().find('[href="#"]').attr('onclick','event.preventDefault()');
		$('#popup iframe').contents().find('#clear_template, .moduleDeleteButton, .moduleDragButton, .moduleCodeButton, .highlighter-container, .edit_link').remove();
		$('#popup iframe').contents().find('.last-table').removeClass('last-table');
		$('#popup iframe').contents().find('.currentTable').removeClass('currentTable');
	
		outcomeHtml = $('#popup iframe').contents().find('body').find('table').html();

		if(typeof outcomeHtml === 'undefined'){
			
			$('#popup iframe').contents().find('body').html('<div style="width: 100%; height: 100%; text-align: center;"><img src="img/icons/empty_mobile.png" style="padding-top: 90px; padding-bottom: 30px;"><br/><span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px;"><b>Oops</b>. No Content.</span><br/><br/> <span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px; font-size: 14px;">Try dragging a few modules to your<br/>editing canvas. Don\'t be shy!</span></div>')
			
		}
		
	}, 500)
	
}

function validate(evt)

 {

  if(evt.keyCode!=8)

  {

  var theEvent = evt || window.event;

  var key = theEvent.keyCode || theEvent.which;

  key = String.fromCharCode( key );

  var regex = /[0-9]|\./;

  if( !regex.test(key) ){

    theEvent.returnValue = false;

    if(theEvent.preventDefault) theEvent.preventDefault();

  }
  
  else {
	  
	  setTimeout(function(){
		  
		//Variables
		attr = $(':focus').parent().find('span').text();
		global = $(':focus').parent().find('span').text();
		size = $(':focus').val();
		
		//if switch active
		if($('#switch_thumb').hasClass('active')){
		
			//Each data-size element in the editor
			$('.currentTable [data-size="'+attr+'"]').each(function(){
				
				//Change value of the font
				$(this).css('font-size',size+'px').css('line-height',size*1.5+'px');
				
			});
			
			$('.currentTable table '+global).each(function(){
			
				g = $(this);
				
				//Change value of the font
				$(this).not('[data-size]').css('font-size',size+'px').css('line-height',size*1.5+'px');
				
			});
			
		}
		
		else {
		
			//Each data-size element in the editor
			$('#frame [data-size="'+attr+'"]').each(function(){
				
				//Change value of the font
				$(this).css('font-size',size+'px').css('line-height',size*1.5+'px');
				
			});
			
			$('#frame table '+global).each(function(){
			
				g = $(this);
				
				//Change value of the font
				$(this).not('[data-size]').css('font-size',size+'px').css('line-height',size*1.5+'px');
				
			});
		
		}
		
		$(':focus').next('.slider').val(size);
		  
	  }, 50);
	  
	}

  }

}

function checkSpecificAttributes() {

	$('#appearances, #background_settings, #colors, #bg_colors').empty();
	
	frame = $('.currentTable');
	
	$(frame).find('[data-size]').each(function(){
	
		the_id = $(this).attr('data-size');
		min = $(this).attr('data-min');
		max = $(this).attr('data-max');
		
		if(typeof min === 'undefined'){
		
			min = 12
		
		}
		
		if(typeof max === 'undefined'){
		
			max = 52
		
		}
		
		$('#appearances').append('<li name="'+the_id+'"><span>'+the_id+'</span> <input type="text" class="output regular" onkeypress="validate(event)" value="'+min+'" maxlength="2"><input class="slider" type="range" value="'+min+'" min="'+min+'" max="'+max+'" onchange="sizes(this,event)" oninput="sizes(this,event)"></li>');
		
	});
    
    $(frame).parent('.parentOfBg').find('[data-bg]').each(function(){
    
    	the_bg = $(this).attr('data-bg');
    	format = '';
    	format_number = '';
        
    	$('#background_settings').append('<li name="'+the_bg+'"><span>'+the_bg+'</span><input type="button" value="Change" class="change_background semi_bold"></li>');
    	
    	//check what format it is
    	if ($(this).css('background-attachment') == 'fixed' || $(this).css('-webkit-background-attachment') == 'fixed' || $(this).css('-moz-background-attachment') == 'fixed' || $(this).css('-o-background-attachment') == 'fixed'){
    	
    		format = 'Fixed';
    		format_number = 3;
    	
    	}
    	
    	else if ($(this).css('background-size') == 'cover'){
    	
    		format = 'Fluid';
    		format_number = 2;
    	
    	}
    	
    	else if ($(this).css('background-size') == '100%'){
    	
    		format = '100%';
    		format_number = 1;
    	
    	}
    	
    	else {
	    	
	    	format = 'Original';
    		format_number = 0;
	    	
    	}
    	
		$('#appearances').append('<li name="'+the_bg+' size" class="background_appearance"><span>'+the_bg+'</span><input type="text" class="output regular" readonly value="'+format+'"><input class="slider_background_appearance" type="range" value="'+format_number+'" min="0" max="3" onchange="background_appearance(this,event)" oninput="background_appearance(this,event)"></li>');
    	        
    })
    
    $(frame).parent('.parentOfBg').find('[data-color]').each(function(){
    
    	the_color = $(this).attr('data-color');
    
    	$('#colors').append('<li name="'+the_color+'"><span>'+the_color+'</span><input type="text" value="#FFF" class="semi_bold colorpicker"></li>')
    
    });
    
    $(frame).parent('.parentOfBg').find('[data-border-color]').each(function(){
    
    	the_border = $(this).attr('data-border-color');
    
    	$('#bg_colors').append('<li name="'+the_border+'"><span>'+the_border+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });
    
    $(frame).parent('.parentOfBg').find('[data-border-top-color]').each(function(){
    
    	the_border = $(this).attr('data-border-top-color');
    
    	$('#bg_colors').append('<li name="'+the_border+'"><span>'+the_border+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });
    
    $(frame).parent('.parentOfBg').find('[data-border-bottom-color]').each(function(){
    
    	the_border = $(this).attr('data-border-bottom-color');
    
    	$('#bg_colors').append('<li name="'+the_border+'"><span>'+the_border+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });
    
    $(frame).parent('.parentOfBg').find('[data-border-left-color]').each(function(){
    
    	the_border = $(this).attr('data-border-left-color');
    
    	$('#bg_colors').append('<li name="'+the_border+'"><span>'+the_border+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });
    
    $(frame).parent('.parentOfBg').find('[data-border-right-color]').each(function(){
    
    	the_border = $(this).attr('data-border-right-color');
    
    	$('#bg_colors').append('<li name="'+the_border+'"><span>'+the_border+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });

	$(frame).parent('.parentOfBg').find('[data-bgcolor]').each(function(){
    
    	the_bgcolor = $(this).attr('data-bgcolor');
    
    	$('#bg_colors').append('<li name="'+the_bgcolor+'"><span>'+the_bgcolor+'</span><input type="text" value="#FFF" class="semi_bold bg_colorpicker"></li>')
    
    });
    
    
    
	str = 'a';

	var newStr = str.replace(/,/g,'');

	var arr = newStr.split(' ');

	for (var i = 0; i < arr.length; i++) {
	   var word = arr[i];
	   
	   $('.currentTable ').find(word).not('[data-color]').each(function(){
		   
		   $('#colors').append('<li name="'+word+'"><span>Links</span><input type="text" value="#FFF" class="semi_bold colorpicker a"></li>');
		   
	   });
	   
	}	
	
	var sizes = {};
	var colors = {};
	var bgcolors = {};
	var backgrounds = {};
	
	$('#appearances li span').each(function() {
		var txt = $(this).text();
		
		if (sizes[txt])
			$(this).parent().remove();
		else
			sizes[txt] = true;
	});
	
	$('#colors li span').each(function() {
		var txt = $(this).text();
		
		if (colors[txt])
			$(this).parent().remove();
		else
			colors[txt] = true;
	});
	
	$('#bg_colors li span').each(function() {
		var txt = $(this).text();
		
		if (bgcolors[txt])
			$(this).parent().remove();
		else
			bgcolors[txt] = true;
	});
	
	$('#background_settings li span').each(function() {
		var txt = $(this).text();
		
		if (backgrounds[txt])
			$(this).parent().remove();
		else
			backgrounds[txt] = true;
	});
	
	$('#appearances .output').each(function(){
			
		if ($(this).val() === 'undefinedpx') {
		
			$(this).val('50');
		
		}
			
	});
	
	$('.currentTable').find('[data-color]').each(function(){
		
		d_color = $(this).css('color')
		the_color = $(this).attr('data-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	})
	
	$('.currentTable').find('a:not([data-color])').each(function(){
		
		d_color = $(this).css('color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="a"] .colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="a"] .colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	})
	
	$('.currentTable').find('[data-bgcolor]').each(function(){
		
		d_color = $(this).css('background-color')
		the_color = $(this).attr('data-bgcolor');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	})
	
	$('.currentTable').find('[data-border-color]').each(function(){
		
		d_color = $(this).css('border-color')
		the_color = $(this).attr('data-border-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	});
	
	$('.currentTable').find('[data-border-top-color]').each(function(){
		
		d_color = $(this).css('border-top-color')
		the_color = $(this).attr('data-border-top-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	});
	
	$('.currentTable').find('[data-border-bottom-color]').each(function(){
		
		d_color = $(this).css('border-bottom-color')
		the_color = $(this).attr('data-border-bottom-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	});
	
	$('.currentTable').find('[data-border-left-color]').each(function(){
		
		d_color = $(this).css('border-left-color')
		the_color = $(this).attr('data-border-left-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	});
	
	$('.currentTable').find('[data-border-right-color]').each(function(){
		
		d_color = $(this).css('border-right-color')
		the_color = $(this).attr('data-border-right-color');
		
		hex = rgb2hex(d_color);
		
		var c = hex.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		
		if (luma < 50) {
		    // pick a different colour
		    $('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#FFFFFF').val(hex)	
		}
		
		else {
			
			$('li[name="'+the_color+'"] .bg_colorpicker').css('background-color',hex).css('color','#000000').val(hex)	
			
		}
		
	});
	
	$('.currentTable').find('[data-size]').each(function(){
		
		d_size = parseInt($(this).css('font-size'));
		the_size = $(this).attr('data-size')
		
		$('li[name="'+the_size+'"] .output, li[name="'+the_size+'"] .slider').val(d_size);
		
	})
	
	count_attr = $('#style_options li').length;
		
	$('#empty_stylings').remove();
	$('#select_module').remove();
		
	if(count_attr < 1){
		
		if ($('#frame [data-module]').length > 0) { 
			
			// it exists 
			$('#info_bar').hide();
			$('#style_options').append('<div id="select_module" class="semi_bold"><h5>Select a module to the right</h5></div>');
			closeColorpickers();
			
		}
		
		else {
		
			$('#info_bar').hide();
			$('#style_options').append('<div id="empty_stylings" class="semi_bold"><h5>You need to have at least one<br/>module present</h5></div>');
			closeColorpickers();
			
		}
			
	}
	
	else {
		
		$('#info_bar').show();
		
	}
		
}

function openEditor() {
	
	
	hideEditLink();
	hideToolTip();
		
	$('.moduleCode').remove();
	
	$(theMod).wrap('<div class="parentModule"></div>');
	getTemp = $('.parentModule').html();
	$('.parentModule').contents().unwrap('.parentModule');

	$tmp = $('<div></div>');
	$tmp.html(getTemp);
	$tmp.find('.ui-resizable-handle, #clear_template, #edit_link, .handle_wrapper, .delete, .moduleCodeButton, .moduleDeleteButton, .moduleDragButton, .moduleDuplicateButton').remove();
	$tmp.find('.ui-resizable').removeClass('ui-resizable');
	$tmp.find('.last-table').removeClass('last-table');

	getTemp = $tmp.html();
	getTemp = getTemp.replace(/<tbody>/g,'').replace(/<\/tbody>/g,'')

	getTemp = getTemp.replace(/(v:)+([\w])|(xmlns)+(:v)/gi, function vml_pre_replace(x){return x.replace(/:/g,"_");});

	getTemp = $.htmlClean(getTemp, {format:true, allowEmpty: [["td"], ["link"], ["meta"], ["table"], ["tr"], ["p"], ["b"], ["i"], ["font"], ["div"], ["a"], ["li"], ["ul"]], formatIndent: 1, allowComments: true, allowedAttributes:[["id"], ["map"], ["area"], ["class"], ["border"], ["style"], ["width"], ["height"], ["bgcolor"], ["shape"], ["coords"], ["cellspacing"], ["cellpadding"], ["mso-table-lspace"], ["mso-table-rspace"], ["align"], ["bgcolor"], ["valign"], ["name"], ["data-module"], ["data-color"], ["data-size"], ["href"], ["data-min"], ["data-max"], ["data-crop"], ["data-link-style"], ["data-link-size"], ["data-link-color"], ["data-bg"], ["data-bgcolor"], ["data-border-top-color"], ["data-border-bottom-color"], ["data-border-left-color"], ["data-border-right-color"], ["background"], ["itemscope"], ["itemtype"], ["itemprop"], ["datetime"], ["fill", ["v_rect"]], ["stroke", ["v_rect"]], ["type", ["v_fill"]], ["src", ["v_fill"]], ["color", ["v_fill"]], ["inset", ["v_textbox"]], ["xmlns_v", ["v_rect"]]]});
	
	getTemp = getTemp.replace(/(v_)+([\w])|(xmlns)+(_v)/gi, function vml_aft_replace(x){return x.replace(/_/g,":");});

	$('#code').remove();
	$(theMod).after('<div class="moduleCode"><textarea id="code" name="code">'+getTemp+'</textarea></div>');
	
	var delay;
	// Initialize CodeMirror editor with a nice html5 canvas demo.
	var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
		mode: 'text/html',
		lineNumbers: true,
		lineWrapping: true,
		styleActiveLine: true
	});
	
	editor.setSize('100%', '100%');
	editor.setOption("theme", 'mbo');
	
	setTimeout(function(){
		
		editor.on("change", function() {
		
			$('.saveCodeButton').addClass('active');
		
		});
		
	}, 1050);
	
	
	//save code button editor
	$(document).on('click', '.saveCodeButton', function(){
	
		updatePreview();
		
	});
	
	function updatePreview() {
		
		editorVal = editor.getValue();
		$('.moduleCode').prev('[data-module]').replaceWith(editorVal);
		$('.saveCodeButton').removeClass('active');
		
	}
		
	setTimeout(function(){
		
		$('.moduleCode').animate({
				
			height: '475px'
					
		}, 250, 'easeOutQuad', function () {
		
			
		});
		
		p = $(theMod);
		position = p.position();
		
		$('#canvas').animate({
		
			scrollTop: position.top + 100
		
		
		}, 250, 'easeOutQuad', function () {
		
			editor.setValue(getTemp);
			
		});
		
		$('.moduleCode').resizable({
	        handles: 's',
	        grid: 10,
	        start: function(e, ui) {
	        
	        
	        
	        }, resize: function(e, ui) {
		        
		        editor.refresh();
		        
	        }
	        
	    });
	    
	    $('.moduleCode').prepend('<div class="moduleSaveCodeButton"><div class="saveCodeButton"></div></div>');
		
	}, 350)
	
}

function closeEditor() {
	
	$('.moduleCode').animate({
					
		height: '0px'
				
	}, 350, 'easeOutQuad', function () {
	
		$('.moduleCode').remove();
		
	});
	
	
	
}

function notification() {

	$('.notify').remove();
	$('html').prepend('<div class="notify semi_bold" style="background-color: '+notificationColor+'">'+notificationContent+'</div>');
		
	$('.notify').animate({
			
		"height": "show",
		"marginTop": "show",
		"marginBottom": "show",
		"paddingTop": "show",
		"paddingBottom": "show",
		"lineHeight" : '81px'
				
	}, { duration: 500, easing: 'easeOutBack' });
	
	setTimeout(function(){
		
			
		$('.notify').animate({
				
			"height": "hide",
			"marginTop": "hide",
			"marginBottom": "hide",
			"paddingTop": "hide",
			"paddingBottom": "hide",
			"lineHeight" : '0px'
					
		}, { duration: 500, easing: 'easeInBack' });		
	
	}, 2000);
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function confirmBackspaceNavigations(){
    var lastUserInputWasBackspace = false
    $(document).keydown(function(event){
        lastUserInputWasBackspace = event.which == 8 ? true : false
    })
    $(document).mousedown(function(){
        lastUserInputWasBackspace = false
    })
    $(window).on('beforeunload', function(){
        if (lastUserInputWasBackspace) {
            return "Are you sure you want to leave this page?"
        }
    })
}

confirmBackspaceNavigations()