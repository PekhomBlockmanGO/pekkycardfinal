document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader Logic ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Give the bar animation a tiny bit of extra time to reach 100% visually
            setTimeout(() => {
                preloader.classList.add('hide-preloader');
            }, 500);
        }
    });

    // 1. Dynamic Typing Effect
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'C Programmer', 'Tech Enthusiast'];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of phrase
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        // Adjust these to change when the fade happens
        const bottomRevealPoint = 150; // Pixels from bottom before fading IN
        const topHidePoint = 100;     // Pixels from top before fading OUT (scrolling past it)

        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();

            // Check if the element is currently visible in the screen window 
            // (top edge is below the top hide point AND bottom edge is below the bottom reveal view)
            if (rect.top < windowHeight - bottomRevealPoint && rect.bottom > topHidePoint) {
                element.classList.add('active');
            } else {
                // If it scrolls out of view (up or down), remove the class so it fades out again
                element.classList.remove('active');
            }
        });
    };

    // Initial check in case elements are already in view
    revealOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Contact Form Submit Handler (Standard POST for FormSubmit Activation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Prevent instantly leaving the page so we can show the animation briefly
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.interactive-hover-btn');

            // Loading state visualization
            submitBtn.innerHTML = '<span class="interactive-hover-btn-text" style="transform: translateX(0); color: #fff;">Redirecting... <i class="fas fa-spinner fa-spin"></i></span><div class="interactive-hover-btn-dot" style="left:0; top:0; height:100%; width:100%; transform:scale(1.8);"></div>';
            submitBtn.style.pointerEvents = 'none';

            // Use fetch for AJAX submission so the page doesn't redirect
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            fetch("https://formsubmit.co/ajax/jyosimsen123@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // Success state
                    submitBtn.innerHTML = '<span class="interactive-hover-btn-text" style="transform: translateX(0); color: #fff;">Sent Successfully! <i class="fas fa-check"></i></span><div class="interactive-hover-btn-dot" style="left:0; top:0; height:100%; width:100%; transform:scale(1.8); background-color: #00ff00;"></div>';
                    contactForm.reset(); // Clear the form

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.style.pointerEvents = 'auto';
                        submitBtn.innerHTML = `
                        <span class="interactive-hover-btn-text">Send Message</span>
                        <div class="interactive-hover-btn-reveal">
                            <span>Send Message</span>
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="interactive-hover-btn-dot"></div>
                    `;
                    }, 3000);
                })
                .catch(error => {
                    console.log(error);
                    submitBtn.innerHTML = '<span class="interactive-hover-btn-text" style="transform: translateX(0); color: #fff;">Error! Try Again <i class="fas fa-times"></i></span><div class="interactive-hover-btn-dot" style="left:0; top:0; height:100%; width:100%; transform:scale(1.8); background-color: #ff0000;"></div>';

                    setTimeout(() => {
                        submitBtn.style.pointerEvents = 'auto';
                        submitBtn.innerHTML = `
                        <span class="interactive-hover-btn-text">Send Message</span>
                        <div class="interactive-hover-btn-reveal">
                            <span>Send Message</span>
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="interactive-hover-btn-dot"></div>
                    `;
                    }, 3000);
                });
        });
    }

    // 6. Interactive WebGL Shader Animation (Three.js)
    const canvas = document.getElementById('webgl-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(new THREE.Color(0x000000));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

        const vertexShader = `
          attribute vec3 position;
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
          uniform float xScale;
          uniform float yScale;
          uniform float distortion;

          void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            
            float d = length(p) * distortion;
            
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
            float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
            float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
            
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `;

        const uniforms = {
            resolution: { value: [window.innerWidth, window.innerHeight] },
            time: { value: 0.0 },
            xScale: { value: 1.0 },
            yScale: { value: 0.5 },
            distortion: { value: 0.05 },
        };

        const position = [
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
        ];

        const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", positions);

        const material = new THREE.RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: uniforms,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height, false);
            uniforms.resolution.value = [width, height];
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial sizing

        const animate = () => {
            uniforms.time.value += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }

    // 7. Interactive Particle Canvas Animation (Restored, overlapping WebGL)
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        let particlesArray = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
            initParticles();
        });

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }

            update() {
                if (this.x > particleCanvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > particleCanvas.height || this.y < 0) this.directionY = -this.directionY;

                // Check collision mouse - particle
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * 3;
                        const directionY = forceDirectionY * force * 3;

                        // Push particles away
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Calculate number of particles based on screen size (keeps it responsive)
            let numberOfParticles = (particleCanvas.height * particleCanvas.width) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;

                let colorPool = ['#00f3ff', '#bc13fe', '#ffffff'];
                let color = colorPool[Math.floor(Math.random() * colorPool.length)];

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function hexToRgb(hex) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 255, g: 255, b: 255 };
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    // Constellation effect between particles
                    if (distance < (particleCanvas.width / 10) * (particleCanvas.height / 10)) {
                        opacityValue = 1 - (distance / 12000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.1})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }

                // Connect particle to mouse with colored laser effect!
                if (mouse.x != null && mouse.y != null) {
                    let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) +
                        ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                    if (mouseDistance < 20000) {
                        opacityValue = 1 - (mouseDistance / 20000);
                        if (opacityValue > 0) {
                            let rgb = hexToRgb(particlesArray[a].color);
                            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacityValue * 0.8})`;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(mouse.x, mouse.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        initParticles();
        animateParticles();
    }

    // 8. Custom Animated Cursor (Valorant Inspired)
    const customCursor = document.querySelector('.custom-cursor');

    if (customCursor && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        customCursor.style.transform = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Using requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            });
        });

        // Add 'recoil' effect on click
        window.addEventListener('mousedown', () => {
            customCursor.classList.add('click');
        });
        window.addEventListener('mouseup', () => {
            customCursor.classList.remove('click');
        });

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .timeline-content, .skill-badge, .contact-item, .liquid-button, .interactive-hover-btn');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
        });
    }
});

// --- Modal Functions ---
function openDiscordModal() {
    const modal = document.getElementById('discordModal');
    if (modal) {
        modal.classList.add('show');
        // Reset tooltip
        document.getElementById('copyTooltip').textContent = 'Click to copy!';
        document.getElementById('copyTooltip').classList.remove('copied');
    }
}

function closeDiscordModal() {
    const modal = document.getElementById('discordModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// --- Certificate Modal Functions ---
function openCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function openSingleCert(imgSrc) {
    const modal = document.getElementById('singleCertModal');
    const img = document.getElementById('certImage');
    const title = document.getElementById('certTitle');

    if (modal && img) {
        img.src = imgSrc;
        if (imgSrc === 'dsa.jpg') title.innerText = 'Data Structures in C';
        modal.classList.add('show');
    }
}

function closeSingleCert() {
    const modal = document.getElementById('singleCertModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            const img = document.getElementById('certImage');
            if (img) img.src = '';
        }, 300); // Clear after animation
    }
}

// Close modal if clicked completely outside
window.addEventListener('click', (e) => {
    const discordModal = document.getElementById('discordModal');
    const resumeModal = document.getElementById('resumeModal');
    const certModal = document.getElementById('certModal');
    const singleCertModal = document.getElementById('singleCertModal');

    if (e.target === discordModal) {
        closeDiscordModal();
    }
    if (e.target === resumeModal) {
        closeResumeModal();
    }
    if (e.target === certModal) {
        closeCertModal();
    }
    if (e.target === singleCertModal) {
        closeSingleCert();
    }
});

function copyDiscordId() {
    const id = document.getElementById('discordIdText').innerText;
    navigator.clipboard.writeText(id).then(() => {
        const tooltip = document.getElementById('copyTooltip');
        tooltip.textContent = 'Copied to clipboard!';
        tooltip.classList.add('copied');

        // Make sure the cursor reacts appropriately to the click
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.classList.add('click');
            setTimeout(() => customCursor.classList.remove('click'), 150);
        }
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

// --- Floating RPG Stats on Avatar Click ---
document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.orbit-center');

    if (avatar) {
        const statsMsg = [
            '+100 Coffee',
            'Level Up!',
            '+50 Recursion',
            'CRITICAL HIT!',
            '+99 CSS Magic',
            'Bug Squashed',
            '+10 IQ'
        ];

        avatar.addEventListener('click', (e) => {
            // Create a floating text element
            const statElements = document.createElement('span');
            statElements.classList.add('floating-stat');

            // Randomly pick a string from the array
            statElements.innerText = statsMsg[Math.floor(Math.random() * statsMsg.length)];

            // Position it exactly where the user clicked
            statElements.style.left = `${e.clientX}px`;
            statElements.style.top = `${e.clientY}px`;

            // A tiny random horizontal offset to make it look scattered
            const randomXOffset = (Math.random() - 0.5) * 50;
            statElements.style.setProperty('--x-offset', `${randomXOffset}px`);

            // Append to body so it isn't clipped by overflow hidden containers
            document.body.appendChild(statElements);

            // Remove it from DOM after the float animation finishes (1 second)
            setTimeout(() => {
                statElements.remove();
            }, 1000);
        });
    }


});

// --- Hacker "pekky" Easter Egg ---
let keyBuffer = '';
const secretCode = 'pekky';

window.addEventListener('keydown', (e) => {
    // Basic keys only, ignore shifts/ctls/etc
    if (e.key.length === 1) {
        keyBuffer += e.key.toLowerCase();

        // Keep buffer size limited to code length
        if (keyBuffer.length > secretCode.length) {
            keyBuffer = keyBuffer.slice(1);
        }

        if (keyBuffer === secretCode) {
            triggerMatrixEffect();
            keyBuffer = ''; // Reset
        }
    }
});

function triggerMatrixEffect() {
    // Prevent double triggers
    if (document.getElementById('matrix-overlay')) return;

    // Create Canvas Layer
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-overlay';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '999999';
    canvas.style.pointerEvents = 'none'; // Don't block clicks
    canvas.style.transition = 'opacity 1s ease';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters (Katakana + Latin)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops to 1
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Draw Function
    const drawMatrix = () => {
        // Black background with extreme 0.05 opacity provides the trailing fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Get the current theme color for the matrix text
        const computedStyles = getComputedStyle(document.documentElement);
        const matrixColor = computedStyles.getPropertyValue('--neon-blue').trim() || '#0F0';

        ctx.fillStyle = matrixColor;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly reset drops to top to make it look scattered
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };

    const matrixInterval = setInterval(drawMatrix, 33); // ~30fps

    // Cleanup after 4 seconds
    setTimeout(() => {
        canvas.style.opacity = '0';
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.remove();
        }, 1000); // Wait 1s for fade out CSS transition
    }, 4000);
}

// --- Audio Visualizer Logic (Circular Ring on Profile Pic) ---
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const startMusicBtn = document.getElementById('startMusicBtn');
    const visualizerCanvas = document.getElementById('audio-visualizer');

    // Set initial volume
    if (bgMusic) bgMusic.volume = 0.4;

    if (!bgMusic || !visualizerCanvas) return;

    const ctx = visualizerCanvas.getContext('2d');
    let audioContext, analyser, dataArray, bufferLength, source;
    let isVisualizerInitialized = false;

    // Set canvas resolution (match CSS size for crisp rendering)
    const CANVAS_SIZE = 450;
    const resizeVisualizer = () => {
        const dpr = window.devicePixelRatio || 1;
        visualizerCanvas.width = CANVAS_SIZE * dpr;
        visualizerCanvas.height = CANVAS_SIZE * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resizeVisualizer);
    resizeVisualizer();

    const initAudioVisualizer = () => {
        try {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();

                source = audioContext.createMediaElementSource(bgMusic);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                analyser.fftSize = 256; // More frequency bins for smoother circle
                bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
            }

            isVisualizerInitialized = true;
            drawVisualizer();
        } catch (e) {
            console.error("Audio Context initialization failed:", e);
        }
    };

    const drawVisualizer = () => {
        if (!isVisualizerInitialized) return;

        requestAnimationFrame(drawVisualizer);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const centerX = CANVAS_SIZE / 2;
        const centerY = CANVAS_SIZE / 2;
        const baseRadius = 175; // Match the profile pic radius (350/2)

        // --- Smooth the frequency data by averaging neighbors ---
        const smoothWindow = 8;
        const smoothed = new Float32Array(bufferLength);
        for (let i = 0; i < bufferLength; i++) {
            let sum = 0;
            let count = 0;
            for (let j = -smoothWindow; j <= smoothWindow; j++) {
                const idx = (i + j + bufferLength) % bufferLength;
                sum += dataArray[idx];
                count++;
            }
            smoothed[i] = sum / count;
        }

        // We only use a subset of bins for the ring (too many = too noisy)
        const numPoints = 64;
        const step = Math.floor(bufferLength / numPoints);
        const angleStep = (Math.PI * 2) / numPoints;

        // Helper: get ring points for a given config
        const getRingPoints = (maxDistortion, radiusOffset, dataOffset) => {
            const points = [];
            for (let i = 0; i < numPoints; i++) {
                const dataIdx = ((i * step) + dataOffset) % bufferLength;
                const angle = i * angleStep - Math.PI / 2;
                const value = smoothed[dataIdx];
                const distortion = (value / 255) * maxDistortion;
                const r = baseRadius + radiusOffset + distortion;
                points.push({
                    x: centerX + r * Math.cos(angle),
                    y: centerY + r * Math.sin(angle)
                });
            }
            return points;
        };

        // Helper: draw a smooth closed curve through points using cubic bezier
        const drawSmoothRing = (points) => {
            const n = points.length;
            ctx.beginPath();
            // Start at the midpoint between last and first
            const startX = (points[n - 1].x + points[0].x) / 2;
            const startY = (points[n - 1].y + points[0].y) / 2;
            ctx.moveTo(startX, startY);

            for (let i = 0; i < n; i++) {
                const current = points[i];
                const next = points[(i + 1) % n];
                const midX = (current.x + next.x) / 2;
                const midY = (current.y + next.y) / 2;
                ctx.quadraticCurveTo(current.x, current.y, midX, midY);
            }

            ctx.closePath();
        };

        // --- Layer 1: Main green ring (filled with gradient) ---
        const greenPoints = getRingPoints(35, 0, 0);
        drawSmoothRing(greenPoints);

        // Create a radial gradient for the fill
        const greenGrad = ctx.createRadialGradient(centerX, centerY, baseRadius - 5, centerX, centerY, baseRadius + 40);
        greenGrad.addColorStop(0, 'rgba(0, 255, 0, 0.0)');
        greenGrad.addColorStop(0.3, 'rgba(0, 255, 0, 0.15)');
        greenGrad.addColorStop(0.7, 'rgba(0, 255, 0, 0.3)');
        greenGrad.addColorStop(1, 'rgba(0, 255, 0, 0.0)');

        ctx.fillStyle = greenGrad;
        ctx.fill();

        ctx.shadowBlur = 25;
        ctx.shadowColor = '#00ff00';
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // --- Layer 2: Magenta/Pink accent ring (offset data) ---
        const magentaPoints = getRingPoints(30, 3, Math.floor(bufferLength / 3));
        drawSmoothRing(magentaPoints);

        const magentaGrad = ctx.createRadialGradient(centerX, centerY, baseRadius - 5, centerX, centerY, baseRadius + 38);
        magentaGrad.addColorStop(0, 'rgba(255, 0, 200, 0.0)');
        magentaGrad.addColorStop(0.4, 'rgba(255, 0, 200, 0.12)');
        magentaGrad.addColorStop(1, 'rgba(255, 0, 200, 0.0)');

        ctx.fillStyle = magentaGrad;
        ctx.fill();

        ctx.shadowBlur = 18;
        ctx.shadowColor = '#ff00c8';
        ctx.strokeStyle = 'rgba(255, 0, 200, 0.5)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // --- Layer 3: Cyan accent ring (different offset) ---
        const cyanPoints = getRingPoints(25, -2, Math.floor(bufferLength * 2 / 3));
        drawSmoothRing(cyanPoints);

        const cyanGrad = ctx.createRadialGradient(centerX, centerY, baseRadius - 5, centerX, centerY, baseRadius + 30);
        cyanGrad.addColorStop(0, 'rgba(0, 255, 255, 0.0)');
        cyanGrad.addColorStop(0.4, 'rgba(0, 255, 255, 0.1)');
        cyanGrad.addColorStop(1, 'rgba(0, 255, 255, 0.0)');

        ctx.fillStyle = cyanGrad;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // --- Layer 4: Thin white base ring (always visible, holds shape) ---
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
    };

    // Tie everything to the play button
    if (startMusicBtn) {
        startMusicBtn.addEventListener('click', () => {
            // First time initialization
            if (!isVisualizerInitialized) {
                initAudioVisualizer();
            } else if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }

            // Play the actual music track
            bgMusic.play().then(() => {
                setTimeout(() => {
                    startMusicBtn.style.display = 'none';
                }, 300);
            }).catch(err => {
                console.error("Audio playback failed:", err);
            });
        });
    }
});

