<?php

	error_reporting(E_ERROR | E_PARSE);

	$myFile = $_POST["fileToDelete"];
	unlink($myFile);
	echo "<script>
		setTimeout(function(){ 
			window.location.href = './';
		}, 100);
		</script>";
?>