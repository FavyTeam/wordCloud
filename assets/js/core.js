var fileSource = [];
var wordSource = [];
var firstSence = 0;
var secondSence = 0;

$(function(){

    $('#uploadFile').click(function(){
        $('#fileToUpload').click();
    });


    $("#fileToUpload").change(function(){
         //submit the form here
         $("#myfileform").submit();
 	});


	var dir = "/uploads";
	var fileextension = ".txt";
	var fileSelectView = document.getElementById('m_filelist');

	$.ajax({
	    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	    url: dir,
	    success: function (data) {
	        // List all mp4 file names in the page
	        $(data).find("a:contains(" + fileextension + ")").each(function () {
	            var filename = this.href.replace(window.location.host, "").replace("http:///", "");
	            
	            filename = decodeURI(filename);

	            var opt = document.createElement('option');
			    opt.value = filename;
			    opt.innerHTML = filename;
			    fileSelectView.appendChild(opt);
	        });
	    }
	});

	$('#mWordCloudOne').click(function(){
		var filename = $( "#m_filelist option:selected" ).text();
		
		filename = encodeURI(filename);

		filename = "uploads/" + filename;

		$.ajax({
            url : filename,
            dataType: "text",
            success : function (data) {
                var res = data.split(" ");
                var wordSelectView = document.getElementById('m_wordview');
                res.forEach(function(entry) {
	                if (entry != ""){
	                		// m_wordlist
	                	var opt = document.createElement('option');
						opt.value = entry;
						opt.innerHTML = entry;
						wordSelectView.appendChild(opt);
	                }
				});

				//-----------------------------
				var frame = window.frames['frameFile'];
    			fileSource = res;
    			firstSence = 1;
    			secondSence = 0;
    			frame.location.reload();
            }
        });
	});

	
	$('#mWordCloudTwo').click(function(){
		var frame = window.frames['frameWord'];
		wordSource = $('#m_wordview').val();

		firstSence = 0;
    	secondSence = 1;
    	frame.location.reload();
	});

	$('#uploadUrls').click(function(){
		var fileUrls = prompt("Write your web urls that contains words. (type must be .txt)", "");

		if (fileUrls){
			var filename = fileUrls.split("/").pop();

			var ext = filename.slice(-3);

			if (ext == "txt"){
				$.ajax({
					type: "POST",
		            url : "../../uploadUrls.php",
		            dataType: "json",
		            data: {functionname: 'downloadUrlToFile', arguments: [fileUrls, filename]},
		            success : function (data) {
		            	//Here is success allow.....
		            	//console.log(data);

		            	if (data["result"] == "Uploaded"){
		            		alert("File uploaded.");
		            	}
		            }
		        });
			}else{
				alert("Please upload correct file, Must be txt file.");
			}
			
		}
		
	});

});

