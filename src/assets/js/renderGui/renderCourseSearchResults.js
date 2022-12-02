// eslint-disable-next-line no-unused-vars
const RenderCourseSearchResults = (function () {
    const SHOW = 'js-show';
    const SELECTED = 'js-isSelected';

	let courseSearchResultContainer;
    let courseSearchResults;
  


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
		//courseSearchResults.innerText = 'Suchresultate';
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
        console.log('RenderCourseSearchResults.init()');

        courseSearchResultContainer = document.querySelector('.course-search-result-wrapper');
        if (courseSearchResultContainer !== null) { 
          
            deleteAllData(courseSearchResultContainer);
            renderCourses(foundCourses);

        }

	}

	// public api
	return {
		init
	};
})();
