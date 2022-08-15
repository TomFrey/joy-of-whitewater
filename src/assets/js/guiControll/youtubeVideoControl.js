// eslint-disable-next-line no-unused-vars
const YoutubeVideoControl = (function (Responsive) {
    const HIDE = 'js-hide';

    let openVideoModalButtons;
    let closeVideoModalButtons;
	let youTubePlayer;
	
	function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        var videoStatuses = Object.entries(window.YT.PlayerState);
    }
	
    function loadVideo(event) {
		const youtubevVideoId = event.parentElement.parentElement.getAttribute('data-youtubevVideoId');
        let youtubeHeight;
        let youtubeWidth;

        switch (Responsive.getBrowserBreakpointArea()) {
            case 'large':
                youtubeHeight = "450";
                youtubeWidth = "800";
                break;
            case 'medium':
                youtubeHeight = "366";
                youtubeWidth = "550";
                break;
            case 'small':
                youtubeHeight = "180";
                youtubeWidth = "270";
                break;
            default:
                youtubeHeight = "450";
                youtubeWidth = "800";
                break;
          }

		window.YT.ready(function() {
			youTubePlayer = new window.YT.Player("wildwasserReisenVideoPlayer", {
				height: youtubeHeight,
				width: youtubeWidth,
				videoId: youtubevVideoId,
				events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
				}
		  	});
		});
	}

    function toggleVideoModal(event) {
		const movieModal = document.querySelector('.yt-modal');
		const movieOverlay = document.querySelector('.yt-modal-overlay');

		// Modal öffnen
		if (movieModal.classList.contains(HIDE)) {
			movieModal.classList.remove(HIDE);
			movieOverlay.classList.remove(HIDE);

			if (youTubePlayer === undefined) {
				loadVideo(event);
			} else {
				youTubePlayer.playVideo();
			}
		// Modal schliessen
		} else {
			youTubePlayer.pauseVideo();
			movieModal.classList.add(HIDE);
			movieOverlay.classList.add(HIDE);
		}
	}

    function initiate() {	
		openVideoModalButtons = document.querySelectorAll('.open-yt-modal-to-play-movie');
		if (openVideoModalButtons !== null) {
			openVideoModalButtons.forEach((openVideoModalButton) => {
				openVideoModalButton.addEventListener('click', (event) => {
					toggleVideoModal(event.target);
				});
			});
		}

		closeVideoModalButtons = document.querySelectorAll('.yt-modal__close-button');
		if (closeVideoModalButtons !== null) {
			closeVideoModalButtons.forEach((closeVideoModalButton) => {
				closeVideoModalButton.addEventListener('click', (event) => {
					toggleVideoModal(event.target);
				});
			});
		}
	}

	// public api
	return {
		init: initiate
	};
})(Responsive);
