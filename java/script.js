// 3D Hero Scene
        let scene, camera, renderer, particles;

        function initHeroScene() {
            const canvas = document.getElementById('hero-canvas');
            
            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                canvas: canvas,
                alpha: true,
                antialias: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Floating particles
            const particleCount = 1000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 200;
                positions[i + 1] = (Math.random() - 0.5) * 200;
                positions[i + 2] = (Math.random() - 0.5) * 200;

                const color = new THREE.Color();
                color.setHSL(Math.random() * 0.2 + 0.5, 0.75, 0.5);
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            // Central glowing orb
            const orbGeometry = new THREE.SphereGeometry(3, 32, 32);
            const orbMaterial = new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.6
            });
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            scene.add(orb);

            camera.position.z = 50;

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                particles.rotation.y += 0.0005;
                particles.rotation.x += 0.0003;

                const time = Date.now() * 0.0005;
                particles.rotation.z = time * 0.1;

                // Mouse movement effect
                const mouseX = (mouseX / window.innerWidth) * 20;
                const mouseY = (mouseY / window.innerHeight) * 20;
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (mouseY - camera.position.y) * 0.05;

                renderer.render(scene, camera);
            }
            animate();

            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        // Mouse tracking
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.contact-form form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon. 🚀');
            this.reset();
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe project cards and other elements
        document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.9)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.3)';
            }
        });

        // Initialize 3D scene when page loads
        window.addEventListener('load', initHeroScene);

        // Parallax effect for project images
        document.querySelectorAll('.project-image').forEach((image, index) => {
            image.style.background = `linear-gradient(135deg, 
                hsl(${240 + index * 30}, 70%, 60%), 
                hsl(${300 + index * 30}, 70%, 60%))`;
            
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05) rotateY(10deg)';
            });
            
            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotateY(0deg)';
            });
        });


        