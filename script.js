// 김지민 복귀 축하 사이트 인터랙션
document.addEventListener('DOMContentLoaded', function () {
    createStars();
    createFloatingEmojis();
    setupFireworks();

    // 로드되자마자 축포 한 번
    setTimeout(() => launchBurst(window.innerWidth / 2, window.innerHeight / 3), 700);
});

/* ---------- 별 반짝임 배경 ---------- */
function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    const count = Math.min(160, Math.floor(window.innerWidth / 8));
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--dur', (2 + Math.random() * 3).toFixed(2) + 's');
        star.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
        container.appendChild(star);
    }
}

/* ---------- 떠오르는 이모지 ---------- */
function createFloatingEmojis() {
    const container = document.getElementById('floatingEmojis');
    if (!container) return;
    const emojis = ['🎉', '🎊', '🎈', '✨', '💙', '💜', '🥳', '⭐', '🎆'];

    function spawn() {
        const el = document.createElement('div');
        el.className = 'float-emoji';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (1.2 + Math.random() * 1.6).toFixed(2) + 'rem';
        const dur = 8 + Math.random() * 8;
        el.style.animationDuration = dur + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), dur * 1000);
    }

    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 400);
    setInterval(spawn, 1200);
}

/* ---------- 폭죽 ---------- */
let fwCanvas, fwCtx, particles = [];

function setupFireworks() {
    fwCanvas = document.getElementById('fireworks');
    if (!fwCanvas) return;
    fwCtx = fwCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 버튼으로 축포
    const btn = document.getElementById('celebrateBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    launchBurst(
                        window.innerWidth * (0.2 + Math.random() * 0.6),
                        window.innerHeight * (0.2 + Math.random() * 0.4)
                    );
                }, i * 220);
            }
        });
    }

    // 화면 클릭으로도 폭죽
    document.addEventListener('click', (e) => {
        if (e.target.closest('.celebrate-btn')) return;
        launchBurst(e.clientX, e.clientY);
    });

    requestAnimationFrame(renderFireworks);
}

function resizeCanvas() {
    if (!fwCanvas) return;
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}

function launchBurst(x, y) {
    const colors = ['#7fdbff', '#b388ff', '#ff6ec7', '#ffd166', '#8affc1', '#ff8ac2'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 5;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.008 + Math.random() * 0.012,
            color,
            size: 1.5 + Math.random() * 2.5
        });
    }
}

function renderFireworks() {
    if (!fwCtx) return;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.045;      // 중력
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }

        fwCtx.globalAlpha = Math.max(p.life, 0);
        fwCtx.fillStyle = p.color;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fwCtx.fill();
    }
    fwCtx.globalAlpha = 1;
    requestAnimationFrame(renderFireworks);
}
