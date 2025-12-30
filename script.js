const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const video = document.getElementById("myVideo");


setTimeout(() => {
    screen1.classList.remove("active");
    screen2.classList.add("active");

    video.play().catch(() => {});
    
    setTimeout(() => {
        screen2.classList.remove("active");
        screen3.classList.add("active");
        startFireworks();
    }, 5000);

}, 4000);


function startFireworks() {

    function launchFirework() {
        const x = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const peakY = Math.random() * window.innerHeight * 0.5 + 100;

        const rocket = document.createElement("div");
        rocket.className = "rocket";
        rocket.style.left = x + "px";
        rocket.style.top = startY + "px";
        screen3.appendChild(rocket);

        let y = startY;

        const rise = setInterval(() => {
            y -= 10;
            rocket.style.top = y + "px";

            if (y <= peakY) {
                clearInterval(rise);
                rocket.remove();
                explode(x, y);
            }
        }, 16);
    }

    function explode(x, y) {
        const particles = 80;
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

        for (let i = 0; i < particles; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            p.style.background = color;
            p.style.left = x + "px";
            p.style.top = y + "px";
            screen3.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            let frame = 0;

            const anim = setInterval(() => {
                frame++;

                const dx = Math.cos(angle) * speed * frame;
                const dy = Math.sin(angle) * speed * frame + frame * 0.35;

                p.style.transform = `translate(${dx}px, ${dy}px)`;
                p.style.opacity = 1 - frame / 70;

                if (frame > 70) {
                    clearInterval(anim);
                    p.remove();
                }
            }, 16);
        }
    }

    setInterval(launchFirework, 700);
}