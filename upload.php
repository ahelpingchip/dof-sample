<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Check if file already exists
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }


if ($_FILES["fileToUpload"]["size"] > 50000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

if($fileType != "csv" ) {
    echo "Sorry, only CSV files are allowed.";
    $uploadOk = 0;
}

if ($uploadOk == 0) {``
    echo "Sorry, your file was not uploaded.";

} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "live-data.csv")) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
