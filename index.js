
        document.addEventListener('DOMContentLoaded', () => {
            const counters = document.querySelectorAll('.stat-card strong[data-value]');
            const progressBars = document.querySelectorAll('.progress-bar-inner');
            const textPhrases = ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Modern Interfaces'];
            let textIndex = 0;
            let charIndex = 0;
            let typingForward = true;

            const body = document.body;
            const progressBar = document.getElementById('progressBar');
            const pageLoader = document.querySelector('.page-loader');
            const typedText = document.getElementById('typedText');
            const cursorDot = document.getElementById('cursorDot');
            const cursorOutline = document.getElementById('cursorOutline');
            const interactiveElements = Array.from(document.querySelectorAll('.interactive'));
            const navLinks = document.querySelectorAll('nav a');

            const updateProgress = () => {
                const scrollDistance = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollHeight ? (scrollDistance / scrollHeight) * 100 : 0;
                progressBar.style.width = `${progress}%`;
            };

            window.addEventListener('scroll', () => {
                updateProgress();
                const currentScroll = window.scrollY + window.innerHeight / 3;
                document.querySelectorAll('section[id]').forEach((section) => {
                    const top = section.offsetTop;
                    const bottom = top + section.offsetHeight;
                    const id = section.getAttribute('id');
                    const link = document.querySelector(`nav a[href="#${id}"]`);
                    if (currentScroll >= top && currentScroll < bottom) {
                        navLinks.forEach((item) => item.classList.remove('active'));
                        if (link) link.classList.add('active');
                    }
                });
            });

            const animateProgressBars = () => {
                progressBars.forEach((bar) => {
                    const value = bar.getAttribute('data-progress');
                    bar.style.width = `${value}%`;
                });
            };

            const animateCounters = () => {
                counters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-value'), 10);
                    let count = 0;
                    const step = Math.ceil(target / 60);
                    const update = () => {
                        count += step;
                        if (count >= target) count = target;
                        counter.textContent = count;
                        if (count < target) requestAnimationFrame(update);
                    };
                    update();
                });
            };

            const typed = () => {
                const currentText = textPhrases[textIndex];
                if (typingForward) {
                    charIndex += 1;
                    typedText.textContent = currentText.slice(0, charIndex);
                    if (charIndex === currentText.length) {
                        typingForward = false;
                        setTimeout(typed, 900);
                        return;
                    }
                } else {
                    charIndex -= 1;
                    typedText.textContent = currentText.slice(0, charIndex);
                    if (charIndex === 0) {
                        typingForward = true;
                        textIndex = (textIndex + 1) % textPhrases.length;
                    }
                }
                setTimeout(typed, typingForward ? 90 : 50);
            };

            const updateCursor = (x, y) => {
                cursorDot.style.transform = `translate(${x}px, ${y}px)`;
                cursorOutline.style.transform = `translate(${x}px, ${y}px)`;
            };

            window.addEventListener('mousemove', (event) => {
                updateCursor(event.clientX - 6, event.clientY - 6);
            });

            interactiveElements.forEach((element) => {
                element.addEventListener('mouseenter', () => {
                    cursorOutline.style.transform += ' scale(1.5)';
                });
                element.addEventListener('mouseleave', () => {
                    cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
                });
            });

            document.querySelector('.contact-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const submitBtn = event.target.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sending...';
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    alert('Thank you! Your message has been received.');
                    event.target.reset();
                }, 700);
            });

            window.setTimeout(() => {
                pageLoader.style.opacity = '0';
                pageLoader.style.visibility = 'hidden';
                body.classList.remove('loading');
            }, 800);

            updateProgress();
            animateProgressBars();
            typed();
            animateCounters();
        });
    