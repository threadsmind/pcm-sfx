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



//app var
let PcmSfx = new Object({
	//project version following Y.M.D format
	version: '2019.3.7',
	//default instrument settings & ADSR envelope
	instrument: {
		//the (A.ttack D.ecay S.ustain R.elease) envelope data
		adsr: {
			attack: {
				time: 0.02,
				value: 0.96,
				type: 'linear',
			},
			decay: {
				time: 0.2,
				value: 0.3,
				type: 'linear',
			},
			sustain: {
				time: 0.5,
				value: 0.3,
				type: 'linear',
			},
			release: {
				time: 0.4,
				value: 0,
				type: 'linear',
			},
		},
		//used to keep track to the sound file length
		totalTime: 0,
		//adds a small buffer to the end of the file
		tail: 0.3,
		//this probably shouldn't change unless you have and unusual/professional audio processor.
		sampleRate: 48000,
		//number of channels in the audio buffer - unused for now, but could be used to create more complex sounds in the future
		channels: 1,
		//the PCM formula that defines the sound of the audio
		formula: '(c+1)|(c+2)*c',
	},

	//html elements for user input
	elements: {
		formula: document.getElementById('formula'),
		play: document.getElementById('play'),
		render: document.getElementById('render'),
		download: document.getElementById('download'),
		load: document.getElementById('load'),
		adsr: {
			attack: {
				time: document.getElementById('attack-time'),
				//type: document.getElementById('attack-type'),
			},
			decay: {
				time: document.getElementById('decay-time'),
				//type: document.getElementById('decay-type'),
			},
			sustain: {
				time: document.getElementById('sustain-time'),
				value: document.getElementById('sustain-value'),
			},
			release: {
				time: document.getElementById('release-time'),
				//type: document.getElementById('release-type'),
			},
		},
		audioPlayer: document.getElementById('audio'),
		mainApp: document.getElementById('main'),
		renderOverlay: document.getElementById('rendering'),
	},

	//holds chunks for download blob
	chunks: [],

	//file type to download
	fileType: 'audio/wav',

	//is this (probably) being run from a mobile device?
	isMobile: true,

	//is something playing
	isplaying: false,

	//audio context for live play
	//playContext: null,
});
