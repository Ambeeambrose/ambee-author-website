// Ambee Author Website JavaScript

function openTrailer(videoFile) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("trailerVideo");
    const source = document.getElementById("videoSource");

    source.src = videoFile;
    video.load();

    modal.style.display = "flex";
    video.play();
}

function closeTrailer() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("trailerVideo");

    video.pause();
    video.currentTime = 0;

    modal.style.display = "none";
}

// Load About Me content from about.json
document.addEventListener("DOMContentLoaded", async () => {

    if (!window.location.pathname.endsWith("about.html")) {
        return;
    }

    try {
        const response = await fetch("data/about.json");
        const data = await response.json();

        if (document.getElementById("aboutHeading"))
            document.getElementById("aboutHeading").textContent = data.heading;

        if (document.getElementById("aboutIntro"))
            document.getElementById("aboutIntro").innerHTML = data.intro;

        if (document.getElementById("aboutP1"))
            document.getElementById("aboutP1").textContent = data.paragraph1;

        if (document.getElementById("aboutP2"))
            document.getElementById("aboutP2").textContent = data.paragraph2;

        if (document.getElementById("aboutP3"))
            document.getElementById("aboutP3").textContent = data.paragraph3;

        if (document.getElementById("aboutP4"))
            document.getElementById("aboutP4").textContent = data.paragraph4;

        if (document.getElementById("aboutP5"))
            document.getElementById("aboutP5").textContent = data.paragraph5;

        if (document.getElementById("aboutP6"))
            document.getElementById("aboutP6").textContent = data.paragraph6;

        if (document.getElementById("aboutAuthor"))
            document.getElementById("aboutAuthor").textContent = data.author;

        if (document.getElementById("aboutPhoto")) {
            document.getElementById("aboutPhoto").src = data.photo;
            document.getElementById("aboutPhoto").alt = data.author;
        }

    } catch (error) {
        console.error("Unable to load About data:", error);
    }

});

// Load Book Trailers from trailers.json
document.addEventListener("DOMContentLoaded", async () => {

    const videoGrid = document.getElementById("videoGrid");

    // If we're not on videos.html, do nothing.
    if (!videoGrid) {
        return;
    }

    try {
        const response = await fetch("data/trailers.json");
        const data = await response.json();

        videoGrid.innerHTML = "";

        data.trailers.forEach(trailer => {

            videoGrid.innerHTML += `
                <div class="video-card">

                    <div class="video-thumbnail">

                        <img src="${trailer.cover}" alt="${trailer.title}">

                        <div class="play-overlay">
                            <div class="play-circle">▶</div>
                        </div>

                    </div>

                    <div class="video-info">

                        <h3>${trailer.title}</h3>

                        <p>${trailer.subtitle}</p>

                        <div class="video-buttons">

                            <a href="#"
                               class="btn"
                               onclick="openTrailer('${trailer.video}'); return false;">
                               ▶ Watch
                            </a>

                            <a href="${trailer.amazon}"
                               class="btn-outline"
                               target="_blank"
                               rel="noopener">
                               Buy
                            </a>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (error) {
        console.error("Unable to load trailers:", error);
    }

});

// Load Homepage content from homepage.json
document.addEventListener("DOMContentLoaded", async () => {

    const heroImage = document.getElementById("heroImage");

    // If we're not on the homepage, do nothing.
    if (!heroImage) {
        return;
    }

    try {

        const response = await fetch("data/homepage.json");

        if (!response.ok) {
            throw new Error("Unable to load homepage.json");
        }

        const data = await response.json();

        // Update Hero Portrait
        if (data.heroImage) {
            heroImage.src = data.heroImage;
            heroImage.alt = data.heroTitle || "Ambee Ambrose";
        }

    } catch (error) {

        console.error("Unable to load Homepage data:", error);

    }

});