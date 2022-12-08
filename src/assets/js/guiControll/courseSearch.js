// eslint-disable-next-line no-unused-vars
const CourseSearch = (function (CourseDates, RenderCourseSearchResults, CourseRegistration) {
    const SHOW = 'js-show';
    const SELECTED = 'js-isSelected';

	let courseSearchContainer;
    let dropdownButtons;
    let dropdownListElements;
    let courseSearchResetButton;
    let courseSearchButton;
    let isSearchActive = true;
    let removeEventListenerController;
    
  
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
     * Markiert oder demarkiert ein Element in der Dropdown Liste
     * @param {*} event 
     */
    function toggleSelectedElement(event){
        const listElement = event;

        if (listElement.classList.contains(SELECTED)) {
			listElement.classList.remove(SELECTED);
		} else {
			listElement.classList.add(SELECTED);
		}
    }


    function toggleCourseDetails(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
		} else {
			drawer.classList.add(SHOW);
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
     * Alle vom Benutzer ausgewählten Suchkriterien (AKTIVITÄT, BOOT, MONAT, STUFE) 
     * in ein Objekt schreiben.
     * 
     * Die Texte der Listelemente werden mit 'innerHTML' gelesen, weil 'innerText' auf einem Mobile Gerät nicht funktioniert.
     * Im Mobile Simulator auf dem Desktop geht es noch, aber auf dem echten Mobilgerät dann nicht mehr.
     */
    function getSearchCriteria(){
        let searchObject = {levels: [], months: [], activities: [], boats: []};

        dropdownListElements.forEach((dropdownListElement) => {
            if (dropdownListElement.classList.contains(SELECTED)) {
                if (dropdownListElement.innerHTML.includes('Level')) {
                    searchObject.levels.push(dropdownListElement.innerHTML.replace(/\s+/g, ''));

                } else if (dropdownListElement.innerHTML.includes('Wildwasser')) {
                    if(dropdownListElement.innerHTML === 'Wildwasser Reise'){
                        searchObject.activities.push('Paddelreise');
                    } else {
                        //Bei einem Kurs immer nach Kanu, Packraft und Eskimotierkurs suchen
                        searchObject.activities.push('Kanukurs', 'Packraft Kurs', 'Eskimotieren');
                    }

                } else if (dropdownListElement.innerHTML === 'Kajak' || 
                           dropdownListElement.innerHTML === 'Kanadier' ||
                           dropdownListElement.innerHTML === 'Packraft') {
                    searchObject.boats.push(dropdownListElement.innerHTML);

                } else {
                    searchObject.months.push(dropdownListElement.innerHTML);
                }
            }
        });

        //Packraft kennt nur den 'Level3-Level4'. Drum bei 'Level3' oder 'Level4' nach 'Level3-Level4' suchen.
        if(searchObject.boats.includes('Packraft') && 
          (searchObject.levels.includes('Level3') || searchObject.levels.includes('Level4'))){
            searchObject.levels.push('Level3-Level4');
        }
        //console.log('searchObject: ' + JSON.stringify(searchObject));
        return searchObject;
    }

    /**
     * Alle Kurse anhand der Suchkriterien (AKTIVITÄT, BOOT, MONAT, STUFE) filtern.
     * 
     * @param {*} searchCriteria 
     * @param {*} data 
     * @returns [{}, {}, {}... ,{}] searchResult 
     */
    function getSearchResults(searchCriteria, data){
        let searchResult = data;

        if(searchCriteria.activities.length > 0){
            searchResult = searchResult.filter((course) => {
                return searchCriteria.activities.some((activity) => {
                    return activity === course.typ
                })
            });
        }

        if(searchCriteria.boats.length > 0){
            //Wenn gefiltert wird, dann sollen 'alle' immer kommen.
            searchCriteria.boats.push('alle');
            searchResult = searchResult.filter((course) => {
                return searchCriteria.boats.some((boat) => {
                    return boat === course.sportArt
                })
            });
        }

        if(searchCriteria.levels.length > 0){
            searchResult = searchResult.filter((course) => {
                return searchCriteria.levels.some((level) => {
                    return level === course.kursStufe
                })
            });
        }

        if(searchCriteria.months.length > 0){
            searchResult = searchResult.filter((course) => {
                const options = { month: 'long' };
                let fromMonth = new Date(course.vonDatum).toLocaleDateString('de-DE', options);
                let toMonth = new Date(course.bisDatum).toLocaleDateString('de-DE', options);

                return searchCriteria.months.some((month) => {
                    return month === fromMonth || month === toMonth
                })
            });
        }

        return searchResult;
    }

    /**
     * Nach dem Aufbau der Suchresultate müssen die Listener auf den Buttons wieder gesetzt 
     * werden.
     */
    function addListenersToSearchResults(){
        const searchResultCourseList = document.querySelector('.course-search-result .course-list');
		if (searchResultCourseList !== null) {
            searchResultCourseList.addEventListener('click', (event) => {
                toggleCourseDetails(event.target);
            });
		}
        CourseRegistration.addListenerToRegistrationButtons();
    }

    /**
     * 
     */
    function startSearch(event){
        let searchCriteria = getSearchCriteria();
        let searchResult = [];

        searchResult = getSearchResults(searchCriteria, CourseDates.getCoursesFromStaticStorage());
        RenderCourseSearchResults.init(searchResult)
        .then(() => {
            addListenersToSearchResults();
        })
    }


	function init() {
		courseSearchContainer = document.querySelector('.course-search-container');		
        if (courseSearchContainer !== null) {
            if(isSearchActive){
                isSearchActive = false;
                removeEventListenerController = new AbortController();

                dropdownButtons = document.querySelectorAll('.dropdown-button');
                if (dropdownButtons !== null) { 
                    dropdownButtons.forEach((dropdownButton) => {
                        dropdownButton.addEventListener('click', (event) => {
                            toggleDropdownList(event.target);
                        }, { signal: removeEventListenerController.signal });
                    });
                }
    
                dropdownListElements = document.querySelectorAll('.dropdown-list ul:not(.dropdown-list-group-wrapper) li:not(.dropdown-list-group)');
                if (dropdownListElements !== null) { 
                    dropdownListElements.forEach((dropdownListElement) => {
                        dropdownListElement.addEventListener('click', (event) => {
                            toggleSelectedElement(event.target);
                        }, { signal: removeEventListenerController.signal });
                    });
                }
    
                courseSearchResetButton = document.querySelector('.course-search-reset-button');
                if (courseSearchResetButton !== null) { 
                    courseSearchResetButton.addEventListener('click', () => {
                        resetSearchCriteria();
                    }, { signal: removeEventListenerController.signal });
                }
    
                courseSearchButton = document.querySelector('.course-search-button');
                if (courseSearchButton !== null) { 
                    courseSearchButton.addEventListener('click', (event) => {
                        startSearch(event.target);
                    }, { signal: removeEventListenerController.signal });
                }    
            //Alle EventListeners beim Schliessen der Suche entfernen, sonst werden Listener angehäuft.
            } else {
                isSearchActive = true;
                removeEventListenerController.abort(); 
            }
		}
	}

	// public api
	return {
		init
	};
})(CourseDates, RenderCourseSearchResults, CourseRegistration);
