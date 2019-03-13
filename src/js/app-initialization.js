// require render-audio.js interactions.js



//pre init
function preInit() {
	document.getElementById('no-js').innerHTML = '';
	//is this a mobile device?
	PcmSfx.isMobile = new RegExp('iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini', 'i')
		.test(navigator.userAgent)
		? true : false;
	let loadButton = document.getElementById('load');
	if (this.isMobile) {
		loadButton.addEventListener('touchstart', init);
	} else {
		loadButton.addEventListener('click', init);
	}
	loadButton.classList.remove('hidden');
}


//pre-fills data and sound
function init() {
	//set input type to touch or click
	const input = PcmSfx.isMobile ? 'touchstart' : 'click';

	//download, play, render buttons
	PcmSfx.elements.play.addEventListener(input, playAudio);
	PcmSfx.elements.render.addEventListener(input, renderAudio);
	//PcmSfx.elements.download.addEventListener(input, downloadFile);

	//adsr curve type buttons
	/* 	['attack', 'decay', 'release'].forEach((el) => {
			PcmSfx.elements.adsr[el].type.addEventListener(input, switchType.bind(null, el));
		}); */

	//init adsr envelope time inputs
	['attack', 'decay', 'sustain', 'release'].forEach((el) => {
		//updates instrument object on input
		PcmSfx.elements.adsr[el].time.addEventListener('input', setTime.bind(null, el));
		//pre-fills the input values on start-up
		PcmSfx.elements.adsr[el].time.value = PcmSfx.instrument.adsr[el].time;
	});

	//updates instrument object on input
	PcmSfx.elements.adsr.sustain.value.addEventListener('input', setValue);
	//pre-fills the input value on start-up
	PcmSfx.elements.adsr.sustain.value.value = PcmSfx.instrument.adsr.sustain.value * 100;

	//set formula input box from instrument object
	PcmSfx.elements.formula.value = PcmSfx.instrument.formula;

	//PCM formula input
	PcmSfx.elements.formula.addEventListener('input', setFormula);

	//audio player should call playAudio when it finishes playing
	PcmSfx.elements.audioPlayer.addEventListener('ended', playAudio);

	//init audioPlayer volume to 70% to avoid ear damage
	PcmSfx.elements.audioPlayer.volume = 0.7;

	//show the main app once everything else is initialized
	document.getElementById('loading').classList.add('hidden');
	PcmSfx.elements.mainApp.classList.remove('hidden');

	//render initial audo -- can get rid of this once/if live audio solved
	renderAudio()

	//log message on start-up
	console.log(
		'PCM-SFX\n' +
		'by @threadsmind\n' +
		'v' + PcmSfx.version
	);
}


//startup shuffle
preInit();

