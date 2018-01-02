<?php
    header('Content-Type: application/json');

	function downloadUrlToFile($url, $outFileName)
	{   
		$outFileName = "uploads/" . $outFileName;
	    if(is_file($url)) {
	        copy($url, $outFileName); 
	    } else {
	        $options = array(
	          CURLOPT_FILE    => fopen($outFileName, 'w'),
	          CURLOPT_TIMEOUT =>  28800, // set this to 8 hours so we dont timeout on big files
	          CURLOPT_URL     => $url
	        );

	        $ch = curl_init();
	        curl_setopt_array($ch, $options);
	        curl_exec($ch);
	        curl_close($ch);
	    }
	    return "Uploaded";
	}

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'downloadUrlToFile':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                   $aResult['result'] = downloadUrlToFile($_POST['arguments'][0], $_POST['arguments'][1]);
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);

?>