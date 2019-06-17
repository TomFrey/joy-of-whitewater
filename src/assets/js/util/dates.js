// eslint-disable-next-line no-unused-vars
const Dates = (function () {
	const oneDayInMilliseconds = 86400000;

	/**
	 * Nimmt ein Datum von der DB und konvertiert es nach dd.m z.B. 02.6
	 *
	 * @param dateInDBFormat
	 * @returns {string}
	 */
	function convertToShortWithoutYearDateFormat(dateInDBFormat) {
		const jsDate = new Date(dateInDBFormat);
		return jsDate.toLocaleString('de-DE', { month: 'numeric', day: '2-digit' });
	}

	/**
	 * Nimmt ein Datum von der DB und konvertiert es nach dd.m.yy z.B. 02.6.19
	 *
	 * @param dateInDBFormat
	 * @returns {string}
	 */
	function convertToShortWithYearDateFormat(dateInDBFormat) {
		const jsDate = new Date(dateInDBFormat);
		return jsDate.toLocaleString('de-DE', { year: '2-digit', month: 'numeric', day: '2-digit' });
	}

	/**
	 * Nimmt ein Datum von der DB und konvertiert es nach dd.month z.B. 02. Juni
	 *
	 * @param dateInDBFormat
	 * @returns {string}
	 */
	function convertToMediumWithoutYearDateFormat(dateInDBFormat) {
		const jsDate = new Date(dateInDBFormat);
		return jsDate.toLocaleString('de-DE', { month: 'short', day: '2-digit' });
	}

	/**
	 * Nimmt ein Datum von der DB und konvertiert es nach dd. month yyyy z.B. 12. Juni 2019
	 *
	 * @param dateInDBFormat
	 * @returns {string}
	 */
	function convertToMediumWithYearDateFormat(dateInDBFormat) {
		const jsDate = new Date(dateInDBFormat);
		return jsDate.toLocaleString('de-DE', { year: 'numeric', month: 'short', day: '2-digit' });
	}

	/**
	 * Berechnet die Dauer in Tagen zwischen zwei Daten.
	 * Wobei calculateDurationBetweenTwoDates('12.6.2019', '12.6.2019') ein Tag ergibt.
	 *
	 * @param toDate Date oder DB Format
	 * @param fromDate Date oder DB Format
	 * @returns number
	 */
	function calculateDurationBetweenTwoDates(to, from) {
		let toDate = to;
		let fromDate = from;

		if (!(toDate instanceof Date)) {
			toDate = new Date(toDate);
		}
		if (!(fromDate instanceof Date)) {
			fromDate = new Date(fromDate);
		}
		return ((toDate - fromDate) + oneDayInMilliseconds) / oneDayInMilliseconds;
	}

	// public api
	return {
		calculateDurationBetweenTwoDates,
		convertToShortWithoutYearDateFormat,
		convertToShortWithYearDateFormat,
		convertToMediumWithoutYearDateFormat,
		convertToMediumWithYearDateFormat,
	};
})();
