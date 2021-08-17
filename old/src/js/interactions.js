// require visual.js



//play audio
function playAudio() {
	if (PcmSfx.isplaying) {
		PcmSfx.elements.audioPlayer.pause();
		PcmSfx.elements.audioPlayer.currentTime = 0;
		PcmSfx.isplaying = false;
	} else {
		PcmSfx.elements.audioPlayer.play();
		PcmSfx.isplaying = true;
	}
}


//switch curve type for selected adsr section  -- will need to change for multi-channel
function switchType(adsr) {
	if (PcmSfx.instrument.adsr[adsr].type == 'linear') {
		PcmSfx.instrument.adsr[adsr].type = 'exponent';
		//TODO: make this change the svg image
	} else {
		PcmSfx.instrument.adsr[adsr].type = 'linear';
	}
}


//set adsr timing for selected adsr section  -- will need to change for multi-channel
function setTime(adsr) {
	const val = parseFloat(PcmSfx.elements.adsr[adsr].time.value);
	if (val >= 0) {
		PcmSfx.instrument.adsr[adsr].time = val;
	} else {
		PcmSfx.elements.adsr[adsr].time.value = '0';
	}
}


//set adsr timing for selected adsr section  -- will need to change for multi-channel
function setValue() {
	const val = parseFloat(PcmSfx.elements.adsr.sustain.value.value);
	if (val >= 0) {
		if (val <= 100) {
			const flt = val / 100;
			PcmSfx.instrument.adsr.sustain.value = flt;
			PcmSfx.instrument.adsr.decay.value = flt;
		} else {
			PcmSfx.elements.adsr.sustain.value.value = '100';
		}
	} else {
		PcmSfx.elements.adsr.sustain.value.value = '0';
	}
}


//set PCM formula in instrument from html input -- will need to change for multi-channel
function setFormula() {
	PcmSfx.instrument.formula = PcmSfx.elements.formula.value;
}
