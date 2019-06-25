// eslint-disable-next-line no-unused-vars
const Crypto = (function () {
	function UnCryptMailto(s) {
		let n = 0;
		let r = '';
		for (let i = 0; i < s.length; i++) {
			n = s.charCodeAt(i);
			if (n >= 8364) { n = 128; }
			r += String.fromCharCode(n - (1));
		}
		return r;
	}

	function linkToUnCryptMailto(s)	{
		location.href = UnCryptMailto(s);
	}

	// public api
	return {
		linkToUnCryptMailto
	};
})();
