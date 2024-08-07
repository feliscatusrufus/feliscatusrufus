const video1 = document.getElementById('video1');
        const video2 = document.getElementById('video2');

        let clickCount = 0;
        let clickTimer = null;

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

        // Ensure only one video plays at a time
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

        // Handle the triple click to switch videos
        video1.addEventListener('click', handleTripleClick);
        video2.addEventListener('click', handleTripleClick);