<?php
$target_dir = "uploads/";

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

$uploadOk = 1;
$textFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
	?>
	<script type="text/javascript">
		alert("File is already uploaded.");
		window.location = "../";
	</script>
	<?php
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
	?>
	<script type="text/javascript">
		alert("Sorry, your file is too large.");
		window.location = "../";
	</script>
	<?php
    $uploadOk = 0;
}
// Allow certain file formats
if($textFileType != "txt" ) {
	?>
	<script type="text/javascript">
		alert("Sorry, only TXT files are allowed.");
		window.location = "../";
	</script>
	<?php
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	?>
	<script type="text/javascript">
		alert("Sorry, your file was not uploaded.");
		window.location = "../";
	</script>
	<?php
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    ?>
			<script type="text/javascript">
				alert("File uploaded succesfully.");
				window.location = "../";
			</script>
	<?php
   //     echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
    ?>
			<script type="text/javascript">
				alert("Sorry, there was an error uploading your file.");
				window.location = "../";
			</script>
	<?php
    }
}

?>