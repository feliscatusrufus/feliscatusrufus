const video1 = document.getElementById('video1');
        const video2 = document.getElementById('video2');

        function initializeVideos() {
            // Start with video1 visible and playing
            video1.style.display = 'block';
            video2.style.display = 'none';
            video1.play();

            // Event listeners to ensure only one video plays at a time
            video1.addEventListener('play', function () {
                if (!video2.paused) {
                    video2.pause();
                }
            });

            video2.addEventListener('play', function () {
                if (!video1.paused) {
                    video1.pause();
                }
            });
        }

        function switchVideo() {
            if (video1.style.display === 'block') {
                video1.style.display = 'none';
                video2.style.display = 'block';
                video2.play();
            } else {
                video2.style.display = 'none';
                video1.style.display = 'block';
                video1.play();
            }
        }

        let clickCount = 0;
        let clickTimer = null;
        let startX;

        function handleTripleClick() {
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(function () {
                    clickCount = 0;
                }, 400);
            } else if (clickCount === 3) {
                switchVideo();
                clearTimeout(clickTimer);
                clickCount = 0;
            }
        }

        function handleTouchStart(event) {
            startX = event.touches[0].clientX;
        }

        function handleTouchMove(event) {
            if (!startX) return;
            let currentX = event.touches[0].clientX;
            let diffX = startX - currentX;

            if (Math.abs(diffX) > 50) {
                switchVideo();
                startX = null; // Reset startX after switching video
            }
        }

        // Initialize videos on page load
        window.addEventListener('load', initializeVideos);

        // Handle the triple click to switch videos
        video1.addEventListener('click', handleTripleClick);
        video2.addEventListener('click', handleTripleClick);

        // Handle swipe gesture to switch videos
        const videoSection = document.getElementById('videoSection');
        videoSection.addEventListener('touchstart', handleTouchStart, false);
        videoSection.addEventListener('touchmove', handleTouchMove, false);