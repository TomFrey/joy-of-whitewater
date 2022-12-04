// eslint-disable-next-line no-unused-vars
const RenderCourseSearchResults = (function (RenderCourseDates) {
    const SHOW = 'js-show';
    
	let courseSearchResultContainer;

    function toggleSpinner(){
        const courseSearchLoader = document.querySelector('.course-search-loader');
		if (courseSearchLoader.classList.contains(SHOW)) {
			courseSearchLoader.classList.remove(SHOW);
		} else {
			courseSearchLoader.classList.add(SHOW);
		}
    }

    function deleteAllData(courseSearchResultContainer){
        // delete all current children
        while (courseSearchResultContainer.firstChild) {
            courseSearchResultContainer.removeChild(courseSearchResultContainer.firstChild);
        }
    }

    function renderCourses(foundCourses){
        const courseSearchResults = document.createElement('div');
		courseSearchResults.classList.add('course-list-wrapper');
        courseSearchResults.classList.add('course-search-result');
		courseSearchResultContainer.appendChild(courseSearchResults);

        if(foundCourses.length > 0){
            RenderCourseDates.createCourseListFor(foundCourses, 
                ['Level1', 'Level2', 'Level3', 'Level3-Level4', 'Level4', 'Level5', 'alle'], 
                ['Kanukurs', 'Packraft Kurs', 'Eskimotieren', 'Paddelreise'], 
                '.course-search-result');
        } else {
            RenderCourseDates.createEmptyCourseList('.course-search-result-wrapper .course-search-result');
        }
    }


	function init(foundCourses) {
        courseSearchResultContainer = document.querySelector('.course-search-result-wrapper');
        if (courseSearchResultContainer !== null) {  
            deleteAllData(courseSearchResultContainer);
            toggleSpinner();

            const searchPromise = new Promise((resolve) => {
                setTimeout(() => {
                    toggleSpinner();
                    //Daten noch mal löschen, sonst werden sie mehrfach angezeigt, wenn der User mehrfach schnell klickt.
                    deleteAllData(courseSearchResultContainer);
                    renderCourses(foundCourses);
                    resolve();
                }, 500)
            });
            return searchPromise;
        }
	}

	// public api
	return {
		init
	};
})(RenderCourseDates);
