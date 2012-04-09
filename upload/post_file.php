<?php

// If you want to ignore the uploaded files, 
// set $demo_mode to true;



$demo_mode = false;
$upload_dir = 'uploads/';
$allowed_ext = array('jpg','jpeg','png','gif');


if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status('Error! Wrong HTTP method!');
}


if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){
	
	$pic = $_FILES['pic'];
  $note = 'No Message';

	$tmp = explode('.', $pic['name']);
  $uniqueName = $tmp[0] . "_" . time() . "." . array_pop($tmp);;
  
	if(!in_array(get_extension($pic['name']),$allowed_ext)){
    //file is bad
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'failed'));
		file_put_contents('logs/log.txt', $line.PHP_EOL, FILE_APPEND);
		exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
	}else{	
    //File is good
    if(array_key_exists('param1',$_POST) == true){
      $note = $_POST['param1'];
    }
    $line = implode('  ,  ', array( date('r'), $_SERVER['REMOTE_ADDR'], $pic['size'], $uniqueName, 'success'));
    file_put_contents('logs/log.txt', $line.PHP_EOL, FILE_APPEND);  
    $message = "\n" . '<image>' .  
               "\n\t" .'<name>' . "\n\t\t" . $uniqueName . "\n\t" . '</name>' .
               "\n\t" .'<message>' . "\n\t\t" . $note . "\n\t" . '</message>' . 
               "\n" .'</image>';
    file_put_contents('logs/messages.xml', $message.PHP_EOL, FILE_APPEND);  
  }
  
  if($demo_mode){
		exit_status('Uploads are ignored in demo mode.');
	}
   // Move the uploaded file from the temporary 
	// directory to the uploads folder:
	if(move_uploaded_file($pic['tmp_name'], $upload_dir.$uniqueName)){
		exit_status('File was uploaded successfuly!');
	}
	
}

exit_status('Something went wrong with your upload!');


// Helper functions

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}

function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}
?>