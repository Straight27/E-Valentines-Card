document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter-container');
    const noBtn = document.querySelector(".no-btn");
    const yesBtn = document.querySelector(".yes-btn");

    const title = document.getElementById('letter-title');
    const buttons = document.getElementById('letter-buttons');
    const finalTextTop = document.getElementById('final-text-top');
    const finalText = document.getElementById('final-text');

    const introScreen = document.getElementById("intro-screen");
    const envelopeContainer = document.getElementById("envelope_container");
    const loadingBar = document.getElementById("loading-bar");
    const loadingText = document.getElementById("loading-text");

    const decisionAudio = document.getElementById("jeopardy");
    const yayAudio = document.getElementById("yay");

    const introDuration = 5000;
    const holdDuration = 800;

    const startTime = performance.now();

    /* ================= LOADING BAR ================= */

    function animateLoadingBar(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / introDuration, 1);

        loadingBar.style.width = `${progress * 100}%`;

        if (progress < 1) {
            requestAnimationFrame(animateLoadingBar);
        } else {
            // Bar finished
            loadingBar.classList.add("complete");
            loadingText.textContent = "LOADING...";

            setTimeout(() => {
                introScreen.style.display = "none";
                envelopeContainer.style.display = "block";
            }, holdDuration);
        }
    }

    requestAnimationFrame(animateLoadingBar);

    /* Pulse dots */
    let dotCount = 0;
    const dotInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingText.textContent = "LOADING" + ".".repeat(dotCount);
    }, 500);

    setTimeout(() => {
        clearInterval(dotInterval);
    }, introDuration + holdDuration);

    /* ================= ENVELOPE ================= */

    envelope.addEventListener('click', () => {
        envelope.style.display = 'none';
        letter.style.display = 'flex';

        setTimeout(() => {
            document.querySelector(".letter-window").classList.add("open");
            decisionAudio.volume = 0.4; // optional, keeps it soft & romantic
            decisionAudio.play().catch(() => {
            // prevents console errors if autoplay is blocked
        });
        }, 50);
    });

    /* ================= NO BUTTON ================= */

    noBtn.addEventListener("mouseover", () => {
        const distance = 200;
        const angle = Math.random() * Math.PI * 2;

        noBtn.style.transform = `translate(
            ${Math.cos(angle) * distance}px,
            ${Math.sin(angle) * distance}px
        )`;
    });

    /* ================= YES BUTTON ================= */

    yesBtn.addEventListener('click', () => {
        decisionAudio.pause();
        decisionAudio.currentTime = 0;

        yayAudio.currentTime = 0;
        yayAudio.volume = 0.8;
        yayAudio.play()

        title.style.display = "none";
        finalTextTop.style.display = "block";

        document.querySelector(".smile-us").style.display = "none";
        document.querySelector(".legend").style.display = "block";

        document.querySelector(".letter-window").classList.add("final");


        buttons.style.display = "none";
        finalText.style.display = "block";


        createPhotoShower(); 
    });

    function createPhotoShower() {
        const container = document.getElementById("photo-shower-container");
        const photoUrls = [
            "1.png", 
            "2.png",
            "3.png",
            "4.png"
        ]; // your heart images or Valentine pics
        const totalPhotos = 20;
    
        for (let i = 0; i < totalPhotos; i++) {
            const img = document.createElement("img");
            img.src = photoUrls[Math.floor(Math.random() * photoUrls.length)];
            img.classList.add("falling-photo");
    
            // random horizontal start
            img.style.left = `${Math.random() * 100}vw`;
    
            // random duration between 3–6 seconds
            const duration = 3 + Math.random() * 3;
            img.style.animationDuration = `${duration}s`;
    
            // random size for depth effect
            // const size = 40 + Math.random() * 50; 
            // img.style.width = `${size}px`;
    
            // random rotation
            img.style.transform = `rotate(${Math.random() * 360}deg)`;
    
            container.appendChild(img);
    
            // remove once animation ends
            img.addEventListener("animationend", () => {
                img.remove();
            });
        }
    }

});
