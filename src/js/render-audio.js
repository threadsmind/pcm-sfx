// require app-object.js visual.js



//render audio to file
function renderAudio() {
	//check formula for errors
	if (formulaValid(PcmSfx.instrument.formula) && renderDisplay(true)) {
		//make sure formula text box color is reset
		PcmSfx.elements.formula.style.backgroundColor = 'initial';

		//create a new audio context for the rendering process
		const audioContext = new (window.AudioContext || window.webkitAudioContext)({
			sampleRate: 48000
		});
		//create new audio player object
		const player = audioContext.createGain();
		//start at 0 volume
		player.gain.setValueAtTime(0.01, 0);
		//reset total time
		PcmSfx.instrument.totalTime = 0;

		//local totalTime
		let totalTime = 0;

		//create envelope curves
		['attack', 'decay', 'sustain', 'release'].forEach((element) => {
			curve(
				PcmSfx.instrument.adsr[element].value,
				PcmSfx.instrument.adsr[element].time,
				PcmSfx.instrument.adsr[element].type
			);
		});

		//add the the instrument tail to the total length of the sound
		totalTime += PcmSfx.instrument.tail;

		//update instrument total time -- this will be useful if I added multi-channel support
		if (totalTime > PcmSfx.instrument.totalTime) {
			PcmSfx.instrument.totalTime = totalTime;
		}

		//create a media stream and media recorder from the audio context
		const streamDestination = audioContext.createMediaStreamDestination();
		//create a new media recorder node to capture and save the stream data to an audio file
		let mediaRecorder = new MediaRecorder(streamDestination.stream);
		//connect the media stream destination to the player
		player.connect(streamDestination);
		//create a buffer source for the audio data
		const bufferSource = audioContext.createBufferSource();
		//connect the buffer source to the player
		bufferSource.connect(player);

		const buffer = audioContext.createBuffer(
			PcmSfx.instrument.channels, //buffer channels - default 1  -- can change this later to create more complex sounds
			PcmSfx.instrument.sampleRate * PcmSfx.instrument.totalTime, //total buffer time - how long is the rendered sound?
			PcmSfx.instrument.sampleRate //how many audio samples do we take per second? - default 48000
		);

		//get channel data from the buffer... hardcoded to 0 for now. Change to loop if addibng multi-channel audio feature
		//channelData is an array of sample data
		let channelData = buffer.getChannelData(0);

		//add data to the buffer until the buffer length matches the total time + tail time of the instrument
		//(instrument.sampleRate * instrument.totalTime) multiplies the sample rate by the desired sound length - this creates a buffer with enough samples to fill that length of time in the buffer with audio data
		for (let i = 0; i < (PcmSfx.instrument.sampleRate * PcmSfx.instrument.totalTime); ++i) {
			//fill the channelData array with data
			//pass in the formula because we may later have different formulas for different channels
			channelData[i] = sampler(PcmSfx.instrument.formula, i);
		}

		//set the player's new buffer source to the buffer we created above
		bufferSource.buffer = buffer;
		//start recording any audio that comes from the 
		mediaRecorder.start();
		//start streaming the buffer source
		bufferSource.start();


		//wait for the length of the audio (multiplied by 1000 to convert to milliseconds) to stop the media recorder and request the data
		setTimeout(function () {
			mediaRecorder.requestData();
			mediaRecorder.stop();
			//close context
			audioContext.close();
			//hide render display
			renderDisplay(false);
		}, (PcmSfx.instrument.totalTime * 1000));


		//called after mediaRecorder.requestData() get the audio data from the playing buffer
		mediaRecorder.ondataavailable = function (event) {
			//makes an array of chunks from our audio data
			PcmSfx.chunks.push(event.data);
		}


		//converts our chunk data into a usable audio blob when the mediaRecorder is stopped
		mediaRecorder.onstop = function (event) {
			//create a blob from our chunk data
			const blob = new Blob(PcmSfx.chunks, {
				//sets the blob's file type to the user-defined file type - default wav
				'type': PcmSfx.fileType,
			});
			//set our blob as the audio source of the HTML audio tag
			PcmSfx.elements.audioPlayer.src = URL.createObjectURL(blob);
			//set download link to blob
			PcmSfx.elements.download.href = PcmSfx.elements.audioPlayer.src;
			PcmSfx.elements.download.target = '_blank';
			PcmSfx.elements.download.download = 'pcm-sfx.wav';
			//reset chunks
			PcmSfx.chunks = [];
		}


		//build envelope curve from params
		function curve(value, time, type) {
			//removes any instant value changes
			if (time <= 0) {
				time = 0.001;
			}
			//add length of curve to the total time
			totalTime += time;
			//build a curve based on the input type
			if (type == 'exponent') {
				//filters 0 to avoid throwing errors
				if (value <= 0) {
					value = 0.001;
				}
				//curve to "value" exponentially
				player.gain.exponentialRampToValueAtTime(value, totalTime);
			} else {
				//curve to "value" linearly
				player.gain.linearRampToValueAtTime(value, totalTime);
			}
		}


		//creates PCM data based on user-input formula
		function sampler(formula, c) {
			//TODO: explore options ----- here--V & here--V
			return (Math.abs(eval(formula)) / (1000)) % 2 - 1;
		}

	} else {
		//set formula text box color to red for error
		PcmSfx.elements.formula.style.backgroundColor = 'red';

		//hide render display
		renderDisplay(false);
	}

	//test current input for validity.... breaks in FF if not valid
	function formulaValid(formula) {
		if (formula != null && formula != '') {
			const c = 1;
			try {
				eval(formula);
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}

}
