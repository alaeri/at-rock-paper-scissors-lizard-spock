if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {


    navigator.mediaDevices
    	.getUserMedia({ video: true })
    	.then(function(stream) {

    		console.log("user has authorized media capture stream");
    		console.log("we insert video, canvas, and button into the dom at #videoCapture")
			const rootVideo = document.getElementById("videoCapture");
			rootVideo.insertAdjacentHTML('beforeend','<video id="video" width="640" height="480"></video>');
			rootVideo.insertAdjacentHTML('beforeend','<button id="snap" class="btn btn-lg btn-block">Snap Photo</button>');
			rootVideo.insertAdjacentHTML('beforeend','<canvas id="canvas" width="640" height="480"></canvas>');
			

			const canvas = document.getElementById('canvas');
			const context = canvas.getContext('2d');
			const video = document.getElementById('video');
			
			console.log("we insert the stream into the video element here")   
	        video.srcObject = stream;
	        video.play();

	        document.getElementById("snap").addEventListener("click", function() {
	        	console.log("we write the video capture frame into the canvas")
				context.drawImage(video, 0, 0, 640, 480);
				console.log("we retrieve a DataURL representing the image from the canvas")
				const dataURL = canvas.toDataURL("image/png", 0.8);
				console.log(dataURL);
				
				console.log("we create XMLHttpRequest and configure it")
				const xhr = new XMLHttpRequest();
				xhr.open("POST", window.location.href, false);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				xhr.onreadystatechange = function() {
					console.log(xhr.readyState);
					// if(http.readyState == 1){
					// 	console.log("sending data");
					// 	http.send(data);
					// }
					//Call a function when the state changes.
					if(xhr.readyState == 4 && xhr.status == 200) {
						// alert(http.responseText);
						// console.log(http.responseText);
						console.log("xhr has finished, we redirect to the next step (returned in response)");
						window.location.href =xhr.responseText;
					}
				}
				console.log("we encode and send dataURL as upload form parameter");
				xhr.send("upload=" + encodeURIComponent(dataURL));
				
				
				
			});
	    }).catch(function(e) {
	    	console.log('webcam fail!', e);
	  	});
}