/**
 * ============================================================================
 * University of Sindh (UOS) Mock Test Portal - Advanced FX Engine
 * Powered by Three.js (3D Cosmos & Crystals) + GSAP & ScrollTrigger
 * ============================================================================
 */

(function () {
    'use strict';

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================================================
    // 1. THREE.JS 3D KNOWLEDGE COSMOS & FLOATING CRYSTALS
    // ========================================================================
    function initThreeHeroScene() {
        if (prefersReducedMotion) return;
        if (typeof THREE === 'undefined') {
            console.warn('[FX Engine] Three.js not loaded, skipping 3D background.');
            return;
        }

        const canvas = document.getElementById('heroThreeCanvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 500;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
        camera.position.z = 85;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Group to hold all 3D objects for unified parallax tilt
        const cosmosGroup = new THREE.Group();
        scene.add(cosmosGroup);

        // --- PART A: 3D Particle Constellation (Nodes & Connections) ---
        const particleCount = window.innerWidth < 768 ? 75 : 160;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities = [];

        const bounds = { x: 75, y: 45, z: 45 };

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * bounds.x * 2;
            const y = (Math.random() - 0.5) * bounds.y * 2;
            const z = (Math.random() - 0.5) * bounds.z * 2;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.03
            });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        // Create glowing circular texture for particles
        const particleTexture = createGlowTexture();
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x60a5fa,
            size: 2.8,
            map: particleTexture,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        cosmosGroup.add(particleSystem);

        // Constellation Connecting Lines
        const maxConnections = particleCount * 4;
        const linePositions = new Float32Array(maxConnections * 6);
        const lineColors = new Float32Array(maxConnections * 6);
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.4
        });

        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        cosmosGroup.add(lineMesh);

        // --- PART B: Floating Academic Knowledge Crystals (Icosahedrons) ---
        const crystals = [];
        const crystalPalette = [0x3b82f6, 0x6366f1, 0xf59e0b, 0x10b981];
        const numCrystals = window.innerWidth < 768 ? 3 : 6;

        for (let i = 0; i < numCrystals; i++) {
            const size = Math.random() * 2.8 + 2.0;
            const geo = new THREE.IcosahedronGeometry(size, 0);

            // Inner faceted solid
            const mat = new THREE.MeshPhongMaterial({
                color: crystalPalette[i % crystalPalette.length],
                emissive: 0x0f172a,
                specular: 0xffffff,
                shininess: 90,
                transparent: true,
                opacity: 0.65,
                flatShading: true
            });
            const crystalMesh = new THREE.Mesh(geo, mat);

            // Outer glowing wireframe cage
            const wireGeo = new THREE.IcosahedronGeometry(size * 1.12, 0);
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0x93c5fd,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });
            const wireMesh = new THREE.Mesh(wireGeo, wireMat);
            crystalMesh.add(wireMesh);

            // Initial positioning
            crystalMesh.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 45,
                (Math.random() - 0.5) * 35
            );

            crystalMesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.015,
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatOffset: Math.random() * Math.PI * 2,
                initialY: crystalMesh.position.y
            };

            crystals.push(crystalMesh);
            cosmosGroup.add(crystalMesh);
        }

        // Lighting for 3D Crystals
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 120);
        blueLight.position.set(40, 30, 40);
        scene.add(blueLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 2.0, 120);
        goldLight.position.set(-40, -20, 30);
        scene.add(goldLight);

        // Mouse Parallax Physics
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        function onMouseMove(e) {
            const rect = container.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom) return;

            const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

            targetRotY = normX * 0.35;
            targetRotX = -normY * 0.25;
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Touch parallax for mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = container.getBoundingClientRect();
                const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
                targetRotY = normX * 0.3;
                targetRotX = -normY * 0.2;
            }
        }, { passive: true });

        // Window Resize Listener
        function onResize() {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener('resize', onResize);

        // Pause animation when scrolled off-screen for maximum efficiency
        let isVisible = true;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.05 });
        observer.observe(container);

        // Main 60fps Animation Loop
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const elapsedTime = clock.getElapsedTime();

            // Smooth parallax camera damping
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;

            cosmosGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.15) * 0.04;
            cosmosGroup.rotation.y = currentRotY + elapsedTime * 0.03;

            // Animate Particles & calculate Constellation lines
            const positions = particleGeometry.attributes.position.array;
            let lineVertexIndex = 0;
            let lineColorIndex = 0;
            let connectionCount = 0;
            const connectionDistance = 14;

            for (let i = 0; i < particleCount; i++) {
                // Update position with velocity
                positions[i * 3] += particleVelocities[i].x;
                positions[i * 3 + 1] += particleVelocities[i].y;
                positions[i * 3 + 2] += particleVelocities[i].z;

                // Boundary bounce
                if (Math.abs(positions[i * 3]) > bounds.x) particleVelocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > bounds.y) particleVelocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > bounds.z) particleVelocities[i].z *= -1;

                // Connect nearby particles with luminous lines
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectionDistance && connectionCount < maxConnections) {
                        const alpha = 1.0 - (dist / connectionDistance);

                        linePositions[lineVertexIndex++] = positions[i * 3];
                        linePositions[lineVertexIndex++] = positions[i * 3 + 1];
                        linePositions[lineVertexIndex++] = positions[i * 3 + 2];

                        linePositions[lineVertexIndex++] = positions[j * 3];
                        linePositions[lineVertexIndex++] = positions[j * 3 + 1];
                        linePositions[lineVertexIndex++] = positions[j * 3 + 2];

                        // Blend between Cyan/Blue & Gold
                        const r = 0.38 + alpha * 0.4;
                        const g = 0.65 + alpha * 0.2;
                        const b = 0.98;

                        lineColors[lineColorIndex++] = r * alpha;
                        lineColors[lineColorIndex++] = g * alpha;
                        lineColors[lineColorIndex++] = b * alpha;

                        lineColors[lineColorIndex++] = r * alpha;
                        lineColors[lineColorIndex++] = g * alpha;
                        lineColors[lineColorIndex++] = b * alpha;

                        connectionCount++;
                    }
                }
            }

            particleGeometry.attributes.position.needsUpdate = true;
            lineGeometry.setDrawRange(0, connectionCount * 2);
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.attributes.color.needsUpdate = true;

            // Animate Floating Crystals
            for (let i = 0; i < crystals.length; i++) {
                const c = crystals[i];
                c.rotation.x += c.userData.rotSpeedX;
                c.rotation.y += c.userData.rotSpeedY;
                c.position.y = c.userData.initialY + Math.sin(elapsedTime * 1.5 + c.userData.floatOffset) * 2.2;
            }

            renderer.render(scene, camera);
        }

        animate();
    }

    // Helper: Generate round glowing texture programmatically
    function createGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(147, 197, 253, 0.9)');
        gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    // ========================================================================
    // 2. GSAP ADVANCED CHOREOGRAPHY & MICRO-INTERACTIONS
    // ========================================================================
    function initGsapAnimations() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') {
            console.warn('[FX Engine] GSAP not loaded, skipping motion choreo.');
            return;
        }

        // Register ScrollTrigger plugin if present
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // --- A. Master Hero Entrance Timeline ---
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Sticky header subtle drop-in
        tl.from('header.glass-header', {
            y: -25,
            opacity: 0,
            duration: 0.8
        }, 0);

        // Hero badges & Admin quick access pill
        tl.from('.hero-mesh .inline-flex, .hero-mesh a[href="admin.html"]', {
            y: 20,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7
        }, 0.2);

        // Hero headline
        tl.from('.hero-mesh h1', {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(1.4)'
        }, 0.35);

        // Hero subtitle description
        tl.from('.hero-mesh p.text-slate-300', {
            y: 20,
            opacity: 0,
            duration: 0.7
        }, 0.5);

        // Search Input & Update MCQs button
        tl.from('#searchInput', {
            x: -25,
            opacity: 0,
            duration: 0.7
        }, 0.65);

        tl.from('#btnHeroUpdateQuestions', {
            x: 25,
            opacity: 0,
            scale: 0.92,
            duration: 0.7,
            ease: 'back.out(1.5)'
        }, 0.7);

        // Direct access pills
        tl.from('.hero-mesh a.inline-flex[href^="#"], .hero-mesh a.inline-flex[href="admin.html"]', {
            scale: 0.85,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'back.out(1.6)'
        }, 0.85);

        // --- B. Animated Counter for Hero Stats Strip ---
        const statsElements = document.querySelectorAll('.hero-mesh .text-sm.font-black.text-white');
        if (statsElements.length >= 4) {
            // Animate 13 Years
            animateCounter(statsElements[0], 0, 13, '+ Years', 1.4);
            // Animate 24 Tests
            animateCounter(statsElements[1], 0, 24, ' Total Tests', 1.6);
            // Animate 90 Mins
            animateCounter(statsElements[2], 0, 90, ' Minutes', 1.8);
            // Animate 100 Marks
            animateCounter(statsElements[3], 0, 100, ' Marks', 2.0);
        }

        // --- C. Magnetic Button Attraction (Micro-Interaction) ---
        initMagneticButtons();

        // --- D. ScrollTrigger Card Reveals ---
        initScrollReveals();

        // --- E. 3D Parallax Tilt on Test Cards ---
        init3DCardTilt();
    }

    // Helper: Animate numeric counters with GSAP
    function animateCounter(element, start, end, suffix, duration) {
        if (!element) return;
        const obj = { val: start };
        gsap.to(obj, {
            val: end,
            duration: duration || 1.5,
            ease: 'power2.out',
            delay: 0.9,
            onUpdate: function () {
                element.textContent = Math.round(obj.val) + (suffix || '');
            }
        });
    }

    // Magnetic Button Effect for Key Controls
    function initMagneticButtons() {
        const magneticSelectors = [
            '#topNavAdminBtn',
            '#openCandidateLoginBtn',
            '#btnHeroUpdateQuestions',
            '#btnOpenStudio'
        ];

        const buttons = document.querySelectorAll(magneticSelectors.join(','));

        buttons.forEach(btn => {
            if (!btn) return;

            const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                xTo(x * 0.28);
                yTo(y * 0.28);
            });

            btn.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
            });
        });
    }

    // ScrollTrigger Card Staggers
    function initScrollReveals() {
        if (typeof ScrollTrigger === 'undefined') return;

        // Animate Mock Test Series Cards
        const mockCards = document.querySelectorAll('#mockTestsGrid .test-card');
        if (mockCards.length > 0) {
            gsap.from(mockCards, {
                scrollTrigger: {
                    trigger: '#mockSeriesSection',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        // Animate Past Papers Cards
        const pastCards = document.querySelectorAll('#pastPapersGrid .official-card, #pastPapersGrid .test-card');
        if (pastCards.length > 0) {
            gsap.from(pastCards, {
                scrollTrigger: {
                    trigger: '#officialTestPapers',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                stagger: 0.07,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        // Animate Subject Cards
        const subjectCards = document.querySelectorAll('.subject-card');
        if (subjectCards.length > 0) {
            gsap.from(subjectCards, {
                scrollTrigger: {
                    trigger: '#syllabusBreakdownSection',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                scale: 0.94,
                opacity: 0,
                stagger: 0.06,
                duration: 0.5,
                ease: 'back.out(1.3)'
            });
        }
    }

    // 3D Card Interactive Tilt
    function init3DCardTilt() {
        if (window.innerWidth < 1024) return; // Desktop-only for maximum performance

        const cards = document.querySelectorAll('.test-card, .official-card');
        cards.forEach(card => {
            let isHovered = false;

            card.addEventListener('mouseenter', () => {
                isHovered = true;
                gsap.to(card, { scale: 1.025, duration: 0.25, ease: 'power1.out' });
            });

            card.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = -((y - centerY) / centerY) * 7;
                const rotateY = ((x - centerX) / centerX) * 7;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 800,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ========================================================================
    // 3. INITIALIZATION ON DOM READY
    // ========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initThreeHeroScene();
            initGsapAnimations();
        });
    } else {
        initThreeHeroScene();
        initGsapAnimations();
    }

    // Expose for external controls if needed
    window.UOS_FX = {
        initThree: initThreeHeroScene,
        initGsap: initGsapAnimations
    };

})();
