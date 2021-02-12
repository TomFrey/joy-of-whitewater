// eslint-disable-next-line no-unused-vars
const Responsive = (function (Globals, RenderHeader) {
    const breakPointLarge = Globals.get().breakpointLarge;

	function reloadWhenBrowserWidthCrossesBreakpoint (windowInnerWidthOld) {
		const isBreakPointLargeCrossedGettingBigger = windowInnerWidthOld < breakPointLarge && window.innerWidth >= breakPointLarge;
		const isBreakPointLargeCrossedGettingSmaller = windowInnerWidthOld > breakPointLarge && window.innerWidth <= breakPointLarge;
		const isBreakPointLargeCrossed = isBreakPointLargeCrossedGettingBigger || isBreakPointLargeCrossedGettingSmaller;

		if (isBreakPointLargeCrossed) {
			document.location.reload();
			if (isBreakPointLargeCrossedGettingBigger) {
				return breakPointLarge+1;
			} else {
				return breakPointLarge-1;
			}
		}
		return windowInnerWidthOld;
	}


	function renderHeaderWithImagesAccordingToBreakPoint(carouselImages, mobileImages) {
		if (window.innerWidth >= breakPointLarge) {
			RenderHeader.createImagesListForTheCarousel(carouselImages);
		} else {
			RenderHeader.createPictureTagForMobileHeader(mobileImages);
		}
	}


	// public api
	return {
        renderHeaderWithImagesAccordingToBreakPoint,
		reloadWhenBrowserWidthCrossesBreakpoint
	};
})(Globals, RenderHeader);
