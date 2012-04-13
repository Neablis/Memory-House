<?php

// If you want to ignore the uploaded files, 
// set $demo_mode to true;


$demo_mode = false;
$upload_dir_photos = 'uploads/Photos/';
$upload_dir_audio = 'uploads/Audio/';
$log_dir = 'logs/';
$allowed_ext_photos = array('jpg','jpeg','png','gif');
$allowed_ext_audio = array('mp3','ogg','wav');
$upload_string = '';

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}


if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){

	$pic = $_FILES['pic'];
  $note = 'No Message';

	$tmp = explode('.', $pic['name']);
  $uniqueName = stripJunk($tmp[0]) . "_" . time() . "." . array_pop($tmp);

  
	if(in_array(get_extension($pic['name']),$allowed_ext_photos)){
    //File is good
    if(array_key_exists('param1',$_POST) == true){
      $note = $_POST['param1'];
    }
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'success'));
    file_put_contents($log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND); 
    $upload_string = $upload_dir_photos.$uniqueName;
    update_SQL( $uniqueName, $note );
	}else if(in_array(get_extension($pic['name']),$allowed_ext_audio)){	
    //File is good

    $note = 'Audio File';

    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'success'));
    file_put_contents($log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND); 
    $upload_string = $upload_dir_audio.$uniqueName;
    update_SQL( $uniqueName, $note );
   
  }else{
      //file is bad
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'failed'));
		file_put_contents( $log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND);
		exit_status('Only '.implode(',',$allowed_ext_photos).' files are allowed!');
  }
  
  if($demo_mode){
		exit_status('Uploads are ignored in demo mode.');
	}
   // Move the uploaded file from the temporary 
	// directory to the uploads folder:
	if(move_uploaded_file($pic['tmp_name'], $upload_string)){

		exit_status('File was uploaded successfuly!');
	}
	
}

/*
elseif( array_key_exists('file', $_FILES ){
  
    /*
      echo "Upload: " . $_FILES["file"]["name"] . "<br />";
      echo "Type: " . $_FILES["file"]["type"] . "<br />";
      echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
      echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
    */

 /* 
  
	$pic = $_FILES["file"];
  $note = 'No Message';

	$tmp = explode('.',  $_FILES["file"]["name"]);
  $uniqueName = stripJunk($tmp[0]) . "_" . time() . "." . array_pop($tmp);;

  
	if(!in_array(get_extension($pic['name']),$allowed_ext)){
    //file is bad
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'failed'));
		file_put_contents( $log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND);
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}else{	
    //File is good
    if(array_key_exists('param1',$_POST) == true){
      $note = $_POST['param1'];
    }
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'success'));
    file_put_contents($log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND); 

    update_XML($log_dir.'messages.xml', $uniqueName, $note );
   
  }
  
  if($demo_mode){
		exit_status('Uploads are ignored in demo mode.');
	}
   // Move the uploaded file from the temporary 
	// directory to the uploads folder:
	if(move_uploaded_file($pic['tmp_name'], $upload_dir_audio.$uniqueName)){
		exit_status('File was uploaded successfuly!');
	}


}


//upload failed
$line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'failed'));
file_put_contents($log_dir . 'log.txt', $line.PHP_EOL, FILE_APPEND);
exit_status('Something went wrong with your upload!');
*/

// Helper functions

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}

function stripJunk($string){
    $string = preg_replace("/[^a-zA-Z0-9\s]/", "", $string);
    $string = str_replace(" ", "-", $string);
    $string = strtolower($string);
    return $string;
}

function update_SQL($imageName, $note){

  $con = mysql_connect("localhost","polaroid","Aa5266063");
    
    if (!$con)
      {
        exit_status('Could not connect');

      }else{
        mysql_select_db("polaroid", $con);
        
        mysql_query("INSERT INTO images (Filename, message ) VALUES ('" .  $imageName . "', '" . $note . "')");
      }
      
      mysql_close($con);

}

function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}
?>