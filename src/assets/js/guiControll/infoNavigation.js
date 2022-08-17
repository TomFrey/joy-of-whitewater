// eslint-disable-next-line no-unused-vars
const InfoNavigation = (function () {
  let infoNavButton;
  let infoNavWrapper;

  function toggleInfoNavigation(event){
      console.log('event: '+event)
      if(infoNavWrapper.classList.contains('opened-nav')){
        event.innerHTML = "Info";
        infoNavWrapper.classList.remove('opened-nav');
      }
      else{
        event.innerHTML = "X";
        infoNavWrapper.classList.add('opened-nav');
      }
  }

	function init() {
    infoNavButton = document.querySelector('.info-nav-button'),
    infoNavWrapper = document.querySelector('.info-nav-wrapper');

    if (infoNavButton !== null) {
      infoNavButton.addEventListener('click', (event) => {
        toggleInfoNavigation(event.target);
      });
    }
	}

	// public api
	return {
		init
	};
})();
