window.onload = function(){
  $('#border').css({top:($('#HomeButton').position().top-13)});  
  $('#border').css({left:($('#HomeButton').position().left+35)});
}

$(function(){

$('#HomeButton').mouseover(function(){
        $("#border a").attr("href", "index.html");
        var topV = $('#HomeButton').position().top-13;
        var leftV = $('#HomeButton').position().left+35;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:leftV, top:topV},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
    $('#AboutButton').mouseover(function(){
        $("#border a").attr("href", "about.html");
        var topV = $('#HomeButton').position().top-13;
        var leftV = $('#AboutButton').position().left+40;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:leftV, top:topV},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
    $('#UploadButton').mouseover(function(){
        $("#border a").attr("href", "upload.html");
        var topV = $('#HomeButton').position().top-13;
        var leftV = $('#UploadButton').position().left+33;
        //$(this).stop().animate({opacity: 0.25},"fast");
        $('#border').stop().animate({left:leftV, top:topV},"medium");
    }).mouseout(function(){
        //$(this).stop().animate({opacity: 1},"fast");
  }); 
  
});