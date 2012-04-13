

$(function() {
              
  // bind 'myForm' and provide a simple callback function 

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
  

  if (!!window.FileReader && Modernizr.draganddrop ) {
    $(".manual").hide();
    // sexy drag and drop action
  } else {
    $(".drag").hide();
    // no drag and drop support available :(
  }

             
});


