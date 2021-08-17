// require app-object.js



//show/hide rendering overlay
function renderDisplay(render) {
	//render is a bool set in the function call
	if (render) {
		//show render display
		PcmSfx.elements.renderOverlay.classList.remove('hidden');
		PcmSfx.elements.mainApp.classList.add('hidden');
	} else {
		//hide render display
		PcmSfx.elements.renderOverlay.classList.add('hidden');
		PcmSfx.elements.mainApp.classList.remove('hidden');
	}
	return true;
}

