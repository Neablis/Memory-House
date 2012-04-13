
$(function() {
              
   var dropbox = $('#dropbox');
   var message = $('.message', dropbox);
	
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
					alert('Too many files! Only upload 1 at a time');
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
      console.log(file.type);
			if(!((file.type.match(/^image\//)) || (file.type.match('audio.*')))){
				alert('Only images or audio files allowed are allowed!');
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
      if(file.type.match(/^image\//) ){
    			createImage(file, 'image');
      }else if( file.type.match('audio.*') ){
          createImage(file, 'audio');
      }
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
	
	
	function createImage(file, type)
  {

		var preview = $(template), 
		image = $('img', preview);
			
    if( type == 'audio' ){
      image.attr('src','assets/img/Audio.jpg');
      message.hide();
      preview.appendTo(dropbox);
      
      // Associating a preview container
      // with the file, using jQuery's $.data():
      
      $.data(file,preview);
      $('#border').css({top:($('#HomeButton').position().top-13)});

    }else{
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
      
		
	}

	function showMessage(msg)
  {
		message.html(msg);
	}
             
});
