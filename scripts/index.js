// TO DO NOTES
// 1: HOW BIG IS THE ACTUAL DOT ON THE SCREEN? 
// DOESN'T MATTER - WE CALCULATE A CENTERPOINT AND DETERMINE IF THAT CENTERPOINT IS WITHIN
// THE PLANE OF THE PIANO KEY OR SOUND OBJECT


//Set up our Canvas - optimized for full-screen
var canvasElement = document.getElementById("displayArea");
var displayArea = canvasElement.getContext("2d");

// set up the scaling
var canvX = 960;
var canvY = 540;
var objscale = Math.floor((960/canvX)*100)/100; //rounds to two decimal places

//initialize images & sounds
var sounds = [];
var images = [];
loadData();

//Create a leap controller object
var controller = new Leap.Controller({});

// the "good" fingers are the left index (1), and right index (6)
// other fingers can be enabled by adding *strings* of the numbers 
//from 0-9 to the goodfingers array  

var goodfingers = ['1','6'];

// Let's set up fingertip trackers. When the fingertip's Z coordinate 
// is past the "plane of contact", allfingers[i].tip is set to true. If it's not,
// allfingers[i].tip is set to false and allfingers[i].play is set to true.
// 
// if tip and play are both true for a finger, the collision tracker
// is invoked. If there's a collision, the appropriate sound is played. 

var allfingers = [];

// set up the fuzzy yellow dots we'll use to show the 
// fingertip positions on screen
var fingertip = new Image();
fingertip.src = "images/fingertip.png";



// controller logic

controller.on("frame", function(frame){
    if(frame.pointables.length > 0)
    {
        canvasElement.width = canvX;
        canvasElement.height= canvY; //clear

        drawNoisies();

        //Get a pointable and normalize the tip position
       for(var i in goodfingers){
           if(!frame.pointables[goodfingers[i]]){
                continue;
           }
            var pointable = frame.pointables[goodfingers[i]];
            var interactionBox = frame.interactionBox;
            var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
            
            // Convert the normalized coordinates to span the canvas
            var canvasX = canvasElement.width * normalizedPosition[0];
            var canvasY = canvasElement.height * (1 - normalizedPosition[1]);

            //we can ignore z for a 2D context
            displayArea.drawImage(fingertip,canvasX,canvasY);
            if(pointable.tipPosition[2] < 0){checkHit(canvasX, canvasY)}

        }
    }
});
controller.connect();


function loadData(){
	// populate images array with {img object, square object (topy, bottomy, leftx, rightx)}
	// since this is a start-up func, we'll iterate through the images and sounds separately 
	// simply to help ensure the images have more time to preload.

	for(var i in imagelist){
		var data = imagelist[i];
		var img = new Image();
		img.src = data.imagePath;
		img.onload = function(){
			canvasElement.width = canvX;
    		canvasElement.height= canvY; //clear
		    drawNoisies();
		}
		images.push({"image": img, "square":{ "leftx" : data.topx, "topy": data.topy, "rightx": (data.topx + data.width), "bottomy": (data.topy + data.height) }})
	}

	for(var i in imagelist){
		var data = imagelist[i];
		var sound = {};
		sound.played = false;
		if(data.isfunc){
			sound.type = "function";
			sound.function = window[data.soundfunction];
			sound.params = data.params;
		  } else {
			var audio = document.createElement("audio");
			audio.src = data.soundpath;
			sound.type = "audio";
			sound.holder = audio;
			document.body.appendChild(audio);
		  }
		sounds.push(sound);
	}


	return true;

}


function drawNoisies(){
	for(var i in images){
		var data = images[i];
		displayArea.drawImage(data.image, data.square.leftx, data.square.topy);
	}

}


function checkHit(x, y){
 	for(var i in images){
 		var data = images[i];
 		if (isHit({"x": x, "y": y}, data.square)) playSound(i);
 	}
}


function isHit(point, square){
	if( between(square.leftx, square.rightx, point.x) && between(square.topy, square.bottomy, point.y) ){
		return true;
	} else {
		return false;
	}


}

function between(a,b,c){
	// if c is between or equal to a and b
	if((c >= a) && (c <= b)) {
		return true;
	} else {
		return false;
	}
}

function playSound(num){
	//if we're on a delay until the sound can be played again
	if(sounds[num].played) return;

	
	if(sounds[num].type == 'audio'){
		sounds[num].played = true;
		sounds[num].holder.play();
	}

	window.setTimeout(function(){
		sounds[num].played = false;
	}, 150);

}

