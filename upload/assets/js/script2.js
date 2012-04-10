$(document).ready(function(){

  var dropbox = $('#dropbox')
  var log_dir = '../logs/';
  var upload_dir = '../uploads/';
  var template = 
        '<div class="preview">'+
            '<span class="imageHolder">'+
							'<img />'+
              '<span class="uploaded"></span>'+
						 '</span>'+
        '</div>'; 

  function loadXMLDoc(dname)
    {
	var maxWidth = 600;
      if (window.XMLHttpRequest)
        {
        xhttp=new XMLHttpRequest();
        }
      else
        {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
      xhttp.open("GET",dname,false);
      xhttp.send();
      return xhttp.responseXML;
    }
 
    xmlDoc = new loadXMLDoc(log_dir+"messages.xml");
    var x=xmlDoc.getElementsByTagName("image");


    for (i=0;i<x.length;i++)
      { 
     
      var preview = $(template); 
      var image = $('img', preview);


      image.attr('src', upload_dir+x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
      preview.appendTo(dropbox);
      preview.addClass('done');

	console.log( image.width() );
      

      //document.write(x[i].getElementsByTagName("message")[0].childNodes[0].nodeValue);
      }

    $('body').delegate(".uploaded", 'click', function() {
    
     // $(this).style.background = "url('../img/cross.png') no-repeat center center rgba(255,255,255,0)";
  
      $(this).parent().parent().toggleClass("done");
      $(this).parent().parent().toggleClass("failed");
    

        console.log($(this));
    });
         
 
});

$(window).load(function(){
   var $container = $('#dropbox');
        $($container).isotope({
          layoutMode : 'fitRows',
          animationEngine: 'jquery',
          animationOptions: {
             duration: 750,
             easing: 'linear',
             queue: true
           },
          // options
          itemSelector : '.preview'
          });
});



