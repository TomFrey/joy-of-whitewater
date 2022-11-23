// eslint-disable-next-line no-unused-vars
const CourseSearch = (function () {
    const SHOW = 'js-show';
    const SELECTED = 'js-isSelected';

	let courseSearchContainer;
    let dropdownButtons;
    let dropdownListElements;
    let courseSearchResetButton;
    let courseSearchButton;
  
    /**
     * Öffnet und schliesst die Dropdown Liste und dreht das 'Dreieck Icon' um 180 Grad.
     * @param {*} event 
     */
    function toggleDropdownList(event) {
        const dropdownButtonIcon = event.lastElementChild;
		const dropdownList = event.parentElement.lastElementChild;

		if (dropdownList.classList.contains(SHOW)) {
			dropdownList.classList.remove(SHOW);
			dropdownButtonIcon.classList.remove(SHOW);
		} else {
			dropdownList.classList.add(SHOW);
			dropdownButtonIcon.classList.add(SHOW);
		}
    }

    /**
     * Markiert oder demarkiert eine Element in der Dropdown Liste
     * @param {*} event 
     */
    function toggleSelectedElement(event){
        let listElement = event;
        let selectedElement = event.innerText;

        if (listElement.classList.contains(SELECTED)) {
			listElement.classList.remove(SELECTED);
		} else {
			listElement.classList.add(SELECTED);
		}
    }

    /**
     * Setzt alle ausgewählten Kriterien zurück und schliesst die Dropdown Listen
     */
    function resetSearchCriteria(){
        dropdownListElements.forEach((dropdownListElement) => {
            if (dropdownListElement.classList.contains(SELECTED)) {
                dropdownListElement.classList.remove(SELECTED);
            } 
        })

        dropdownButtons.forEach((dropdownButton) => {
            const dropdownList = dropdownButton.parentElement.lastElementChild;
            const dropdownButtonIcon = dropdownButton.lastElementChild;
            if (dropdownList.classList.contains(SHOW)) {
                dropdownList.classList.remove(SHOW);
                dropdownButtonIcon.classList.remove(SHOW);
            } 
        })
    }

    /**
     * 
     */
    function startSearch(){
        console.log('startSearch() called');
    }


	function init() {
        console.log('CourseSearch.init()');

		courseSearchContainer = document.querySelector('.course-search-container');
		
        if (courseSearchContainer !== null) {

            dropdownButtons = document.querySelectorAll('.dropdown-button');
            if (dropdownButtons !== null) { 
                dropdownButtons.forEach((dropdownButton) => {
                    dropdownButton.addEventListener('click', (event) => {
                        toggleDropdownList(event.target);
                    });
                });
            }

            dropdownListElements = document.querySelectorAll('.dropdown-list ul:not(.dropdown-list-group-wrapper) li:not(.dropdown-list-group)');
            if (dropdownListElements !== null) { 
                dropdownListElements.forEach((dropdownListElement) => {
                    dropdownListElement.addEventListener('click', (event) => {
                        toggleSelectedElement(event.target);
                    });
                });
            }

            courseSearchResetButton = document.querySelector('.course-search-reset-button');
            if (courseSearchResetButton !== null) { 
                courseSearchResetButton.addEventListener('click', () => {
                    resetSearchCriteria();
                });
            }

            courseSearchButton = document.querySelector('.course-search-button');
            if (courseSearchButton !== null) { 
                courseSearchButton.addEventListener('click', (event) => {
                    startSearch(event.target);
                });
            }
			
		}
	}

	// public api
	return {
		init
	};
})();
