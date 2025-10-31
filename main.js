// Platform card selection and confirmation button logic
window.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.platform-card');
    const confirmContainer = document.getElementById('platform-confirmation');
    if (!cards.length || !confirmContainer) return;
    const platformData = {
        YouTube: {
            color: 'linear-gradient(90deg, #f44336 0%, #e53935 100%)',
            btnText: 'Continue with YouTube',
            link: 'youtube.html'
        },
        Instagram: {
            color: 'linear-gradient(90deg, #a21caf 0%, #f43f5e 100%)',
            btnText: 'Continue with Instagram',
            link: '#'
        },
        Twitter: {
            color: 'linear-gradient(90deg, #1DA1F2 0%, #2563eb 100%)',
            btnText: 'Continue with Twitter',
            link: '#'
        }
    };
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove selected from all
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            // Show confirmation button
            const platform = card.getAttribute('data-platform');
            const data = platformData[platform];
            confirmContainer.innerHTML = `<a href="${data.link}" class="platform-confirm-btn" style="background:${data.color}">${data.btnText}</a>`;
            confirmContainer.style.display = 'flex';
        });
    });
});

// Auto-scroll the portfolio grid horizontally back and forth (for index.html)
window.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;
    let direction = 1;
    let scrollSpeed = 1.2; // pixels per frame
    let pause = false;
    function autoScroll() {
        if (!pause) {
            grid.scrollLeft += direction * scrollSpeed;
            // Pause at the ends
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2) {
                direction = -1;
                pause = true;
                setTimeout(() => { pause = false; }, 1200);
            } else if (grid.scrollLeft <= 2) {
                direction = 1;
                pause = true;
                setTimeout(() => { pause = false; }, 1200);
            }
        }
        requestAnimationFrame(autoScroll);
    }
    autoScroll();
});

function logout() {
    try {
        sessionStorage.clear();
        localStorage.clear();
    } catch (e) {
        // ignore
    }
    // use replace so user can't go back to protected page via back button
    window.location.replace('login.html');
}