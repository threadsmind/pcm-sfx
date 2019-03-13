# Create Free Sound Effects with PCM-SFX

Create and download pulse-code modulation (PCM) sound effects (SFX) from the comfort of your browser!

&nbsp;

## Using PCM-SFX

This app allows you to create sfx using a formula and an Attack-Decay-Sustain-Release ([adsr](https://www.wikiaudio.org/adsr-envelope/)) envelope.

### The ADSR Envelope

Each section of the adsr envelope has a time input that defines how long in seconds it should take to reach its target value. This time value can be any int or float that is greater than or equal to zero.

The sustain section of the envelope has a volume value input as well. This input defines the target volume as a percentage of the total volume of the attack target value (full volume).

### The Formula

The contents of the formula input are converted into the math that defines your sound. You can use any javascript [Arithmetic Operators](https://www.w3schools.com/js/js_arithmetic.asp) or [Bitwise Operators](https://www.w3schools.com/js/js_bitwise.asp) in your formula.

The pcm sampler uses the variable 'c' to store sample array data. You should use this variable in your formula (one or more times) for the best results. Play around with the variable and all of the available math operators. You never know what you will find!

**Note** At the moment, invalid formula input can result in a crash when using this app in Firefox.

### Rendering, Playing, and Downloading

Once you have configured your adsr envelope and your pcm formula, you will want to BUILD your sound. This renders your sound to a playable and downloadable WAVE file.

After rendering your sound you can hit the play arrow to listen to a preview!

If everything sounds good you can then hit the download arrow to save a local copy as a WAVE file to your device.

&nbsp;

## Inspiration

[https://seansleblanc.itch.io/pcm-tool](https://seansleblanc.itch.io/pcm-tool)

[https://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html](https://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html)

[http://www.drpetter.se/project_sfxr.html](http://www.drpetter.se/project_sfxr.html)

&nbsp;

## Known Issues

* Invalid formula input crashes Firefox.
* Attempting to render a sound with Dev Tools open in Chrome causes a soft crash.
* WAVE file headers missing. This can cause the file to appear empty in some audio software.



