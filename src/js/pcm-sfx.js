/*

PCM-SFX
by Brandon Thread (@threadsmind)
https://brandonmakesthings.itch.io/pcm-sfx
Create sound effects with math!

Inspirations:
https://seansleblanc.itch.io/pcm-tool
https://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html
http://www.drpetter.se/project_sfxr.html

*/


//global variables
let instrument = {};
let fileType = 'audio/wav';
let audioPlayer = '';
let downloadButton = '';
let isPlaying = false;
let renderingOverlay = '';
let appDiv = '';
let hasSound = false;

//controls
let attackControl = '';
let decayControl = '';
let sustainControl = '';
let releaseControl = '';

let attackValue = '';
let decayValue = '';
let sustainValue = '';
let releaseValue = '';

let formulaValue = '';

//will be used to create the audio data blob that will be converted into a downloadedable audio file
let chunks = [];


//pre-fills data and sound
function init() {

	//default instrument settings & ADSR envelope
	instrument = {
		// the (A.ttack D.ecay S.ustain R.elease) envelope data
		adsr: {
			attack: {
				time: 0.02,
				value: 0.9,
				type: 'linear'
			},
			decay: {
				time: 0.2,
				value: 0.3,
				type: 'linear'
			},
			//sustain only needs a time param... but maybe I'm wrong and it needs everything...
			sustain: {
				time: 0.5
			},
			release: {
				time: 0.4,
				type: 'linear'
			}
		},
		//used to keep track to the sound file length
		totalTime: 0,
		//adds a small buffer to the end of the file
		tail: 0.3,
		//this probably shouldn't change unless you have and unusual/professional sound processor.
		sampleRate: 48000,
		//number of channels in the audio buffer - unused for now, but could be used to create more complex sounds in the future
		channels: 1,
		//used to store a basic, working formula -- TODO add a "reset" button
		//defaultFormula: '(c+1)|(c+2)*c',
		//used to store the math formula that is used to generate a sound effect
		formula: '(c+1)|(c+2)*c'
	}

	//set formula html
	formulaValue = document.getElementById('formula');

	//set formula value from instrument
	formulaValue.value = instrument.formula;

	//set audio player
	audioPlayer = document.querySelector('audio');
	audioPlayer.addEventListener('ended', endSound);

	//add a click event listener to the "render" button
	//TODO: add basic touch support filter with agent regex
	document.getElementById('render').addEventListener('click', renderAudio);

	//set play button
	document.getElementById('play').addEventListener('click', playPauseSound);

	//store the rendering div for later use
	renderingOverlay = document.getElementsByClassName('render-overlay')[0];

	//get download button
	downloadButton = document.getElementById('download');

	//default audio playback at 70% to avoid ear damage from abrasive sounds
	audioPlayer.volume = 0.7;

	//set controls and values
	initControls();

	//TODO: remove "loading" div and display app controls
	document.getElementsByClassName('loading')[0].classList.add('hidden');
	appDiv = document.getElementsByClassName('app')[0];
	appDiv.classList.remove('hidden');

	console.log('PCM-SFX by @threadsmind');
}


//initialize controls -- TODO this needs some clean up
function initControls() {
	//find control elements
	attackControl = document.getElementById('attack');
	decayControl = document.getElementById('decay');
	sustainControl = document.getElementById('sustain');
	releaseControl = document.getElementById('release');

	//find value elements
	attackValue = document.getElementById('attack-value');
	decayValue = document.getElementById('decay-value');
	sustainValue = document.getElementById('sustain-value');
	releaseValue = document.getElementById('release-value');

	//set control elements
	attackControl.value = instrument.adsr.attack.time;
	decayControl.value = instrument.adsr.decay.time;
	sustainControl.value = instrument.adsr.sustain.time;
	releaseControl.value = instrument.adsr.release.time;

	//set value elements
	attackValue.innerHTML = attackControl.value;
	decayValue.innerHTML = decayControl.value;
	sustainValue.innerHTML = sustainControl.value;
	releaseValue.innerHTML = releaseControl.value;

	//set value DISPLAY updates
	attackControl.addEventListener('input', function () {
		attackValue.innerHTML = attackControl.value;
	});
	decayControl.addEventListener('input', function () {
		decayValue.innerHTML = decayControl.value;
	});
	sustainControl.addEventListener('input', function () {
		sustainValue.innerHTML = sustainControl.value;
	});
	releaseControl.addEventListener('input', function () {
		releaseValue.innerHTML = releaseControl.value;
	});

	//set the instrument updates
	attackControl.addEventListener('change', function () {
		instrument.adsr.attack.time = parseFloat(attackControl.value);
	});
	decayControl.addEventListener('change', function () {
		instrument.adsr.decay.time = parseFloat(decayControl.value);
	});
	sustainControl.addEventListener('change', function () {
		instrument.adsr.sustain.time = parseFloat(sustainControl.value);
	});
	releaseControl.addEventListener('change', function () {
		instrument.adsr.release.time = parseFloat(releaseControl.value);
	});
}


//generates PCM data from the current formula and 
function sampler(formula, c) {
	//TODO: explore options ----- here--V & here--V
	return (Math.abs(eval(formula)) / (1000)) % 2 - 1;
}


//play button function
function playPauseSound() {
	//test if a sound is playing
	if (isPlaying) {
		//stop the player if playing
		audioPlayer.pause();
		audioPlayer.currentTime = 0;
		isPlaying = false;
	} else {
		//play the player if stopped
		audioPlayer.play();
		isPlaying = true;
	}
}


//end sound
function endSound() {
	playPauseSound(true);
}


//show or hide the "rendering" display
function renderDisplay(render) {
	//render is a bool set in the function call
	if (render) {
		//show render display
		renderingOverlay.classList.remove('hidden');
		appDiv.classList.add('hidden');
	} else {
		//hide render display
		renderingOverlay.classList.add('hidden');
		appDiv.classList.remove('hidden');
	}
}


//render PCM data to file  --  TODO add option to choose file type?
function renderAudio() {
	//check formula for valid-ish input
	let isValid = false;
	try {
		//will need to make this a loop for multi-formula/multi-channel sounds
		const c = 1;
		eval(formulaValue.value);
		//if valid, set as instrument formula
		instrument.formula = formulaValue.value;
		formulaValue.style.backgroundColor = 'white';
		//set is valid to true if the eval doesn't error out
		isValid = true;
	} catch (e) {
		//display some error message text about invalid formula
		formulaValue.style.backgroundColor = 'red';
	}

	//only render if the formula eval passes
	if (isValid) {
		//hide or disable controls + show "rendering" 
		renderDisplay(true);

		//create a new audioContext for the new render
		let context = new(window.AudioContext || window.webkitAudioContext)({
			sampleRate: 48000
		});

		//reset totalTime
		instrument.totalTime = 0;
		//this makes the code below more readable, but maybe isn't the most memory-efficient thing ever
		const adsr = instrument.adsr;
		//create new audio player object
		let player = context.createGain();
		//start at 0 volume
		player.gain.setValueAtTime(0, 0);

		//attack
		curve(adsr.attack.value, adsr.attack.time, adsr.attack.type);
		//decay
		curve(adsr.decay.value, adsr.decay.time, adsr.decay.type);
		//sustain -- use decay value and "linear" type because sustain is a a constant level
		curve(adsr.decay.value, adsr.sustain.time, 'linear');
		//release -- use 0 as the target value because release should be the end of the sound
		curve(0, adsr.release.time, adsr.release.type);

		//build envelope curve from params
		function curve(value, time, type) {
			//removes any instant value changes
			if (time <= 0) {
				time = 0.001;
			}
			//add length of curve to the total time
			instrument.totalTime += time;
			//build a curve based on the input type
			if (type == 'exponent') {
				//filters 0 to avoid throwing errors
				if (value <= 0) {
					value = 0.001;
				}
				//curve to "value" exponentially
				player.gain.exponentialRampToValueAtTime(value, instrument.totalTime);
			} else {
				//curve to "value" linearly
				player.gain.linearRampToValueAtTime(value, instrument.totalTime);
			}
		}

		//add the the instrument tail to the total length of the sound
		instrument.totalTime += instrument.tail;

		//create a media stream and media recorder from the audio context
		const streamDestination = context.createMediaStreamDestination();
		//create a new media recorder node to capture and save the stream data to an audio file
		let mediaRecorder = new MediaRecorder(streamDestination.stream);
		//connect the media stream destination to the player
		player.connect(streamDestination);

		//create a buffer source for the audio data
		const bufferSource = context.createBufferSource();
		//connect the buffer source to the player
		bufferSource.connect(player);

		//create an audio buffer on the open audio context
		const buffer = context.createBuffer(
			instrument.channels, //buffer channels - default 1
			instrument.sampleRate * instrument.totalTime, //total buffer time - how long is the rendered sound?
			context.sampleRate //how many audio samples do we take per second? - default 48000
		);

		//get channel data from the buffer... hardcoded to 0 for now. Change to loop if addibng multi-channel audio feature
		//channelData is an array of sample data
		let channelData = buffer.getChannelData(0);

		//add data to the buffer until the buffer length matches the total time + tail time of the instrument
		//(instrument.sampleRate * instrument.totalTime) multiplies the sample rate by the desired sound length - this creates a buffer with enough samples to fill that length of time in the buffer with audio data
		for (let i = 0; i < (instrument.sampleRate * instrument.totalTime); ++i) {
			//fill the channelData array with data
			//pass in the formula because we may later have different formulas for different channels
			channelData[i] = sampler(instrument.formula, i);
		}

		//set the player's new buffer source to the buffer we created above
		bufferSource.buffer = buffer;
		//start recording any audio that comes from the 
		mediaRecorder.start();
		//start streaming the buffer source
		bufferSource.start();
		//reset chunks
		chunks = [];

		//wait for the length of the audio (multiplied by 1000 to convert to milliseconds) to stop the media recorder and request the data
		setTimeout(function () {
			mediaRecorder.requestData();
			mediaRecorder.stop();
			//close context
			context.close();
			//hide render display
			renderDisplay(false);
		}, (instrument.totalTime * 1000));

		//called after mediaRecorder.requestData() get the audio data from the playing buffer
		mediaRecorder.ondataavailable = function (event) {
			//makes an array of chunks from our audio data
			chunks.push(event.data);
		}

		//converts our chunk data into a usable audio blob when the mediaRecorder is stopped
		mediaRecorder.onstop = function (event) {
			//create a blob from our chunk data
			const blob = new Blob(chunks, {
				//sets the blob's file type to the user-defined file type - default wav
				'type': fileType
			});

			//set our blob as the audio source of the HTML audio tag
			audioPlayer.src = URL.createObjectURL(blob);

			//set download link to blob
			downloadButton.href = audioPlayer.src;
			downloadButton.target = '_blank';
			downloadButton.download = 'pcm-sfx.wav';

			//show the audio player if hidden
			if (!hasSound) {
				document.getElementsByClassName('player')[0].classList.remove('hidden');
				hasSound = true;
			}
		}
	}
}

//start the program
init();
