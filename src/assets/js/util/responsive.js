// eslint-disable-next-line no-unused-vars
const Responsive = (function (Globals, RenderHeader) {
    const breakPointLarge = Globals.get().breakpointLarge;
	const breakPointMedium = Globals.get().breakpointMedium;
	const LARGE = 'large';
	const MEDIUM = 'medium';
	const SMALL = 'small';

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


	function renderHeaderWithImagesAccordingToBreakPoint() {
		if (window.innerWidth >= breakPointLarge) {
			RenderHeader.createImagesListForTheCarousel(this.carouselImages);
		} else {
			RenderHeader.createPictureTagForMobileHeader(this.mobileImages);
		}
	}


	function getBrowserBreakpointArea() {
		if (window.innerWidth >= breakPointLarge) {
			return LARGE;
		} else if (window.innerWidth < breakPointLarge && window.innerWidth >= breakPointMedium) {
			return MEDIUM;
		} else {
			return SMALL;
		}
	}


	// public api
	return {
        renderHeaderWithImagesAccordingToBreakPoint,
		reloadWhenBrowserWidthCrossesBreakpoint,
		getBrowserBreakpointArea
	};
})(Globals, RenderHeader);
