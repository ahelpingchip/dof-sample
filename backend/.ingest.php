<?php 
	$target = ""; 
	$target = $target . basename( $_FILES['uploaded']['name']) ; 
	$ok=1; 

	$redirect = "
		<script>
		setTimeout(function(){ 
			window.location.href = './';
		}, 1900);
		</script>
	";

	if ($uploaded_size > 350000) 
	{ 
		echo "Your file is too large. <br>"; 
		$ok=0; 
	} 
	 
	$mimes = array(
		'text/csv',
		'text/tsv',
	    'text/plain',
	    'application/csv',
	    'text/comma-separated-values',
	    'application/excel',
	    'application/vnd.ms-excel',
	    'application/vnd.msexcel',
	    'text/anytext',
	    'application/octet-stream',
	    'application/txt'
    );
	if(!in_array($_FILES['uploaded']['type'],$mimes)){
		echo "Only CSV files are allowed. <br>";
		$ok=0;
	}


	if ($ok==0) 
	{ 
		Echo "Sorry, your file was not uploaded.";
	} 
	else 
	{ 
		if(move_uploaded_file($_FILES['uploaded']['tmp_name'], $target)) 
		{ 
			echo "Your file ". basename( $_FILES['uploaded']['name']). " has been uploaded. Please wait."; 
			echo $redirect;
		} 
		else 
		{ 
			echo "Sorry, there was a problem uploading your file."; 
		} 
	} 
?> 