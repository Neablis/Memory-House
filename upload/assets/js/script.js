
$(function() {
            
            
  // Load dialog on page load
  var userCk  = $.cookies.get( 'user' );
            
  if( userCk != 'agreed' ){
  $( "#dialog:ui-dialog" ).dialog( "destroy" );
  $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:270,
      modal: true,
                  
      buttons: {
        "Accept Terms": function() {
          $.cookies.set( 'user', 'agreed' );
            $( this ).dialog( "close" );
          }
      }

  });
             
  }

  $('#HomeButton').mouseover(function(){
        $("#border a").attr("href", "default.html");
        var height = $('#HomeButton').position().top-13;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:675, top:height},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
    $('#AboutButton').mouseover(function(){
        $("#border a").attr("href", "about.html");
        var height = $('#HomeButton').position().top-13;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:1120, top:height},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
    $('#UploadButton').mouseover(function(){
        $("#border a").attr("href", "upload.html");
        var height = $('#HomeButton').position().top-13;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:890, top:height},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
  
  var drag = document.getElementById("drag");
	var manual = document.getElementById("manual");
  if (!!window.FileReader && Modernizr.draganddrop ) {
    manual.style.display = "none";
    // sexy drag and drop action
  } else {
    drag.style.display = "none";
    // no drag and drop support available :(
  }
   
  var dropbox = $('#dropbox'), message = $('.message', dropbox);
	
	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		maxfiles: 1,
    maxfilesize: 10,
		url: 'post_file.php',
		
		uploadFinished:function(i,file,response, time){
      $(dropbox).css({opacity:1});
      var text = $("textarea[name=styled-textarea]").val();
      if( text.length > 35 ){
        text = text.substring(0, 30) + '...';
      }
      $.data(file).find('.progress').text(text);
      $("textarea[name=styled-textarea]").val("");
			$.data(file).addClass('done');
			// response is the JSON object that post_file.php returns
		},
    
    data: {
        // send POST variables
        param1: function(){
           var textValue = $("textarea[name=styled-textarea]").val();     
           return textValue;          
        }         
    },
		
    error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Only upload 5 at a time');
					break;
				case 'FileTooLarge':
					alert(file.name+' is too large! Please upload files up to 15mb.');
					break;
				default:
					break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
      var text = $("textarea[name=styled-textarea]").val();
      text = text.split(' ').join('');
			if(!file.type.match(/^image\//)){
				alert('Only images are allowed!');
				$(dropbox).css({opacity:1});
				// Returning false will cause the
				// file to be rejected
				return false;
			}else if( text == "" ){
        alert( "Please enter a message first before uploading a image" );
        $(dropbox).css({opacity:1});
        return false;
      
      }
		},
		
		uploadStarted:function(i, file, len){
    			createImage(file);
		},
    
    dragOver: function() {
      $(dropbox).css({opacity:0.8});
    },
    dragLeave: function() {
      $(dropbox).css({opacity:1});
    },
   		
		progressUpdated: function(i, file, progress) {
			$.data(file).find('.progress').width(progress); 
    }
    	 
	});
	
	var template = '<div class="preview">'+
                  '<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 
	
	
	function createImage(file)
  {

		var preview = $(template), 
			image = $('img', preview);
			
		var reader = new FileReader();
		
		
		reader.onload = function(e){
			
			// e.target.result holds the DataURL which
			// can be used as a source of the image:
			
			image.attr('src',e.target.result);
		};
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		message.hide();
		preview.appendTo(dropbox);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);
    $('#border').css({top:($('#HomeButton').position().top-13)});
	}

	function showMessage(msg)
  {
		message.html(msg);
	}
            
             
});


