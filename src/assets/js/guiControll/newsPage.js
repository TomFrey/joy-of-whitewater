// eslint-disable-next-line no-unused-vars
const NewsPage = (function (Crypto) {
    const SHOWANDFADE = 'js-fadeaway';

    let copySignalNewsGroupButton;
    let copyWhatsappNewsGroupButton;
    let copyActionMessage;


    function copySignalNewsGroupLinkToClipboard() {
        let decriptLink = Crypto.decryptLinkToNewsGroup('Balleras', '4e525256551c0909554f4148474a0841544953560905654c776d6f63735651694a724a79636157544c72795c6b5668156057106841544e77554542715c7614174d14494c7f74634e6717176c116d1454544b7f79686d0b474a7e6d615f70');
        navigator.clipboard.writeText(decriptLink).then(() => {
            showCopyActionMessage('signal-group');
        });
    }


    function copyWhatsappNewsGroupLinkToClipboard() {
        let decriptLink = Crypto.decryptLinkToNewsGroup('Condores', '4559595d5e1702024e454c59035a454c595e4c5d5d034e424002681d7f6666466b4b67441d6a455c46581e6169456b58');
        navigator.clipboard.writeText(decriptLink).then(() => {
            showCopyActionMessage('whatsapp-group');
        });
    }


    function showCopyActionMessage(group) {
        copyActionMessage = document.querySelector('.copied__action-message.' + group);
        copyActionMessage.classList.add(SHOWANDFADE);
        setTimeout(function() {
            copyActionMessage.classList.remove(SHOWANDFADE);
          }, 1200);
    }


	function init() {
        copySignalNewsGroupButton = document.querySelector('.copy-newsgroup-button--signal');
		if (copySignalNewsGroupButton !== null) {
			copySignalNewsGroupButton.addEventListener('click', () => {
				copySignalNewsGroupLinkToClipboard();
			});
		}

        copyWhatsappNewsGroupButton = document.querySelector('.copy-newsgroup-button--whatsapp');
		if (copyWhatsappNewsGroupButton !== null) {
			copyWhatsappNewsGroupButton.addEventListener('click', () => {
				copyWhatsappNewsGroupLinkToClipboard();
			});
		}
	}

	// public api
	return {
		init
	};
})(Crypto);
