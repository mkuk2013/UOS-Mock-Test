/**
 * ============================================================================
 * University of Sindh (UOS) Mock Test Portal - Executive FX & 3D Engine
 * Featuring:
 * 1. Three.js 3D Quantum Gyroscope & Academic Celestial Sphere with Dual Orbitals
 * 2. Ethereal Starfield & Knowledge Constellation Network
 * 3. Linear/Stripe-Style Interactive Card Spotlight Shader Tracking
 * 4. GSAP Cinematic Motion Choreography, Counters & Magnetic Controls
 * ============================================================================
 */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================================================
    // 1. THREE.JS 3D EXECUTIVE CELESTIAL SPHERE & ORBITAL GYROSCOPE
    // ========================================================================
    function initThreeHeroScene() {
        if (prefersReducedMotion) return;
        if (typeof THREE === 'undefined') {
            console.warn('[UOS FX] Three.js library not detected.');
            return;
        }

        const canvas = document.getElementById('heroThreeCanvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 520;

        // Scene, Camera, WebGL Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(0, 0, 95);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Master Group for 3D Elements
        const masterGroup = new THREE.Group();
        // Shift slightly to the right on wide screens to balance the hero text on the left
        if (window.innerWidth >= 1024) {
            masterGroup.position.set(28, 2, 0);
        } else {
            masterGroup.position.set(0, 0, -10);
        }
        scene.add(masterGroup);

        // --------------------------------------------------------------------
        // A. THE CELESTIAL KNOWLEDGE CORE (Faceted Dual-Layer Icosahedron)
        // --------------------------------------------------------------------
        const coreRadius = window.innerWidth < 768 ? 13 : 17;
        const coreGeo = new THREE.IcosahedronGeometry(coreRadius, 1);

        // Inner translucent crystal
        const coreMat = new THREE.MeshPhongMaterial({
            color: 0x1d4ed8,
            emissive: 0x0f172a,
            specular: 0x60a5fa,
            shininess: 100,
            transparent: true,
            opacity: 0.55,
            flatShading: true
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        masterGroup.add(coreMesh);

        // Outer glowing wireframe geodesic lattice
        const wireGeo = new THREE.IcosahedronGeometry(coreRadius * 1.08, 1);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.45
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        coreMesh.add(wireMesh);

        // --------------------------------------------------------------------
        // B. DUAL CONCENTRIC QUANTUM ORBITAL RINGS
        // --------------------------------------------------------------------
        // 1. Outer Golden Academic Orbit (Torus Ring)
        const outerRingRadius = coreRadius * 1.85;
        const outerTorusGeo = new THREE.TorusGeometry(outerRingRadius, 0.45, 16, 100);
        const outerTorusMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            emissive: 0x78350f,
            metalness: 0.85,
            roughness: 0.25,
            transparent: true,
            opacity: 0.75
        });
        const outerOrbit = new THREE.Mesh(outerTorusGeo, outerTorusMat);
        outerOrbit.rotation.x = Math.PI / 3;
        outerOrbit.rotation.y = Math.PI / 6;
        masterGroup.add(outerOrbit);

        // 6 Golden Satellite Nodes along the Outer Orbit
        const satelliteGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const satelliteMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
        const satelliteGroup = new THREE.Group();
        outerOrbit.add(satelliteGroup);

        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
            sat.position.set(
                Math.cos(angle) * outerRingRadius,
                Math.sin(angle) * outerRingRadius,
                0
            );
            satelliteGroup.add(sat);
        }

        // 2. Inner Cobalt Gyroscopic Orbit (Counter-Precession)
        const innerRingRadius = coreRadius * 1.45;
        const innerTorusGeo = new THREE.TorusGeometry(innerRingRadius, 0.35, 16, 90);
        const innerTorusMat = new THREE.MeshStandardMaterial({
            color: 0x06b6d4,
            emissive: 0x083344,
            metalness: 0.9,
            roughness: 0.2,
            transparent: true,
            opacity: 0.8
        });
        const innerOrbit = new THREE.Mesh(innerTorusGeo, innerTorusMat);
        innerOrbit.rotation.x = -Math.PI / 4;
        innerOrbit.rotation.y = Math.PI / 3;
        masterGroup.add(innerOrbit);

        // --------------------------------------------------------------------
        // C. ETHEREAL STARDUST & KNOWLEDGE CONSTELLATION
        // --------------------------------------------------------------------
        const particleCount = window.innerWidth < 768 ? 90 : 180;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities = [];
        const bounds = { x: 80, y: 48, z: 45 };

        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.04,
                y: (Math.random() - 0.5) * 0.04,
                z: (Math.random() - 0.5) * 0.03
            });
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        // Soft Radial Glow Particle Texture
        const glowTex = createSoftGlowTexture();
        const particleMat = new THREE.PointsMaterial({
            color: 0x93c5fd,
            size: 2.6,
            map: glowTex,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const starField = new THREE.Points(particleGeo, particleMat);
        scene.add(starField);

        // Constellation Dynamic Lines
        const maxLines = particleCount * 3;
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.35
        });

        const constellationMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(constellationMesh);

        // --------------------------------------------------------------------
        // D. LIGHTING & ATMOSPHERE
        // --------------------------------------------------------------------
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
        scene.add(ambientLight);

        // Cyan/Blue Key Light
        const keyLight = new THREE.PointLight(0x38bdf8, 3, 150);
        keyLight.position.set(40, 30, 45);
        scene.add(keyLight);

        // Gold Rim Light
        const rimLight = new THREE.PointLight(0xf59e0b, 2.5, 140);
        rimLight.position.set(-45, -25, 35);
        scene.add(rimLight);

        // Violet Fill Light
        const fillLight = new THREE.PointLight(0x818cf8, 1.8, 120);
        fillLight.position.set(0, 40, -20);
        scene.add(fillLight);

        // --------------------------------------------------------------------
        // E. FLUID PARALLAX PHYSICS & MOUSE TRACKING
        // --------------------------------------------------------------------
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        function handlePointerMove(clientX, clientY) {
            const rect = container.getBoundingClientRect();
            if (clientY < rect.top - 100 || clientY > rect.bottom + 100) return;

            const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
            const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

            targetRotY = normX * 0.45;
            targetRotX = -normY * 0.35;
        }

        window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY), { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        // Responsive Resize Handler
        function handleResize() {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);

            if (window.innerWidth >= 1024) {
                masterGroup.position.set(28, 2, 0);
            } else {
                masterGroup.position.set(0, 0, -10);
            }
        }
        window.addEventListener('resize', handleResize);

        // IntersectionObserver: Pause rendering when scrolled out of view for 0% CPU waste
        let isSceneVisible = true;
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isSceneVisible = entry.isIntersecting;
            });
        }, { threshold: 0.05 });
        viewObserver.observe(container);

        // --------------------------------------------------------------------
        // F. ANIMATION RENDER LOOP (60FPS)
        // --------------------------------------------------------------------
        const clock = new THREE.Clock();

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            if (!isSceneVisible) return;

            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            // Spring inertia damping
            currentRotX += (targetRotX - currentRotX) * 0.04;
            currentRotY += (targetRotY - currentRotY) * 0.04;

            // Rotate Master Group with Parallax
            masterGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.25) * 0.03;
            masterGroup.rotation.y = currentRotY + elapsed * 0.05;

            // Celestial Core Rotation
            coreMesh.rotation.x += 0.005;
            coreMesh.rotation.y += 0.008;

            // Orbital Rings Gyroscopic Spin
            outerOrbit.rotation.z += 0.006;
            innerOrbit.rotation.z -= 0.009;

            // Subtly pulse the core wireframe
            const pulse = 1.0 + Math.sin(elapsed * 2.0) * 0.03;
            wireMesh.scale.set(pulse, pulse, pulse);

            // Animate Constellation Particles & Lines
            const posArray = particleGeo.attributes.position.array;
            let lineIdx = 0;
            let colIdx = 0;
            let lineCount = 0;
            const linkDist = 13;

            for (let i = 0; i < particleCount; i++) {
                posArray[i * 3] += particleVelocities[i].x;
                posArray[i * 3 + 1] += particleVelocities[i].y;
                posArray[i * 3 + 2] += particleVelocities[i].z;

                // Boundary bounce
                if (Math.abs(posArray[i * 3]) > bounds.x) particleVelocities[i].x *= -1;
                if (Math.abs(posArray[i * 3 + 1]) > bounds.y) particleVelocities[i].y *= -1;
                if (Math.abs(posArray[i * 3 + 2]) > bounds.z) particleVelocities[i].z *= -1;

                // Inter-particle links
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = posArray[i * 3] - posArray[j * 3];
                    const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                    const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < linkDist * linkDist && lineCount < maxLines) {
                        const dist = Math.sqrt(distSq);
                        const alpha = 1.0 - (dist / linkDist);

                        linePositions[lineIdx++] = posArray[i * 3];
                        linePositions[lineIdx++] = posArray[i * 3 + 1];
                        linePositions[lineIdx++] = posArray[i * 3 + 2];

                        linePositions[lineIdx++] = posArray[j * 3];
                        linePositions[lineIdx++] = posArray[j * 3 + 1];
                        linePositions[lineIdx++] = posArray[j * 3 + 2];

                        const r = 0.25 + alpha * 0.45;
                        const g = 0.65 + alpha * 0.25;
                        const b = 0.95;

                        lineColors[colIdx++] = r * alpha;
                        lineColors[colIdx++] = g * alpha;
                        lineColors[colIdx++] = b * alpha;

                        lineColors[colIdx++] = r * alpha;
                        lineColors[colIdx++] = g * alpha;
                        lineColors[colIdx++] = b * alpha;

                        lineCount++;
                    }
                }
            }

            particleGeo.attributes.position.needsUpdate = true;
            lineGeo.setDrawRange(0, lineCount * 2);
            lineGeo.attributes.position.needsUpdate = true;
            lineGeo.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        }

        renderFrame();
    }

    // Helper: Generate soft circular glow texture for stardust
    function createSoftGlowTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');

        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(186, 230, 253, 0.9)');
        grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
    }

    // ========================================================================
    // 2. LINEAR/STRIPE-STYLE INTERACTIVE CARD SPOTLIGHT SHADER
    // ========================================================================
    function initSpotlightTracking() {
        // Find all interactive cards across the portal
        const cards = document.querySelectorAll('.test-card, .official-card, .subject-card, .phase2-card');
        if (cards.length === 0) return;

        cards.forEach(card => {
            card.classList.add('spotlight-card');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }, { passive: true });
        });
    }

    // ========================================================================
    // 3. GSAP CINEMATIC MOTION & EXECUTIVE CHOREOGRAPHY
    // ========================================================================
    function initGsapChoreography() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // --- A. Master Entrance Timeline with Back Easing ---
        const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Sticky Header Drop-In
        masterTl.from('header.glass-header', {
            y: -30,
            opacity: 0,
            duration: 0.9
        }, 0);

        // Status Badge & Admin Top Link
        masterTl.from('.hero-mesh .inline-flex, .hero-mesh a[href="admin.html"]', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'back.out(1.5)'
        }, 0.2);

        // Hero Headline
        masterTl.from('.hero-mesh h1', {
            y: 35,
            opacity: 0,
            duration: 1.0,
            ease: 'power4.out'
        }, 0.3);

        // Hero Subtitle
        masterTl.from('.hero-mesh p.text-slate-300', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, 0.45);

        // Search Bar & MCQs Button
        masterTl.from('#searchInput', {
            x: -25,
            opacity: 0,
            duration: 0.75
        }, 0.6);

        masterTl.from('#btnHeroUpdateQuestions', {
            x: 25,
            opacity: 0,
            scale: 0.9,
            duration: 0.75,
            ease: 'back.out(1.6)'
        }, 0.65);

        // Shortcut Pills Stagger
        masterTl.from('.hero-mesh .mb-6 a.inline-flex', {
            scale: 0.85,
            opacity: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: 'back.out(1.8)'
        }, 0.8);

        // --- B. Numeric Counters Animation on Hero Stats ---
        const statElements = document.querySelectorAll('.hero-mesh .text-sm.font-black.text-white');
        if (statElements.length >= 4) {
            animateCountUp(statElements[0], 2013, 2025, '2013 - 2025', 1.4);
            animateCountUp(statElements[1], 0, 24, '24 Total Tests', 1.6);
            animateCountUp(statElements[2], 0, 90, '90 Minutes', 1.8);
            animateCountUp(statElements[3], 0, 100, '100 Marks', 2.0);
        }

        // --- C. Magnetic Button Attraction Physics ---
        initMagneticPhysics();

        // --- D. ScrollTrigger Staggered Card Reveals ---
        initScrollTriggers();

        // --- E. 3D Subtle Tilt Physics on Cards ---
        init3DTiltPhysics();
    }

    // Helper: Dynamic Smooth Count-Up
    function animateCountUp(el, start, end, finalText, duration) {
        if (!el) return;
        const obj = { val: start };
        gsap.to(obj, {
            val: end,
            duration: duration || 1.6,
            ease: 'power2.out',
            delay: 0.8,
            onUpdate: function () {
                if (start === 2013) {
                    el.textContent = `2013 - ${Math.round(obj.val)}`;
                } else {
                    el.textContent = Math.round(obj.val) + (finalText.replace(/^\d+/, '') || '');
                }
            },
            onComplete: function () {
                el.textContent = finalText;
            }
        });
    }

    // Magnetic Button Physics
    function initMagneticPhysics() {
        const magneticTargets = [
            '#topNavAdminBtn',
            '#openCandidateLoginBtn',
            '#btnHeroUpdateQuestions',
            '#btnOpenStudio',
            '#btnThemeToggle',
            '#btnSoundToggle'
        ];

        const elements = document.querySelectorAll(magneticTargets.join(','));
        elements.forEach(btn => {
            if (!btn) return;

            const xSetter = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
            const ySetter = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.32;
                const deltaY = (e.clientY - centerY) * 0.32;

                xSetter(deltaX);
                ySetter(deltaY);
            });

            btn.addEventListener('mouseleave', () => {
                xSetter(0);
                ySetter(0);
            });
        });
    }

    // ScrollTrigger Reveals for Tests & Past Papers
    function initScrollTriggers() {
        if (typeof ScrollTrigger === 'undefined') return;

        // Mock Tests 1-10 Stagger
        const mockCards = document.querySelectorAll('#mockTestsGrid .test-card');
        if (mockCards.length > 0) {
            gsap.from(mockCards, {
                scrollTrigger: {
                    trigger: '#mockSeriesSection',
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                scale: 0.96,
                opacity: 0,
                stagger: 0.08,
                duration: 0.65,
                ease: 'power3.out'
            });
        }

        // Past Papers 2013-2025 Cards Stagger
        const pastCards = document.querySelectorAll('#pastPapersGrid .official-card, #pastPapersGrid .test-card');
        if (pastCards.length > 0) {
            gsap.from(pastCards, {
                scrollTrigger: {
                    trigger: '#officialTestPapers',
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                scale: 0.96,
                opacity: 0,
                stagger: 0.07,
                duration: 0.65,
                ease: 'power3.out'
            });
        }

        // Subject Breakdown Cards
        const subjectCards = document.querySelectorAll('.subject-card');
        if (subjectCards.length > 0) {
            gsap.from(subjectCards, {
                scrollTrigger: {
                    trigger: '#syllabusBreakdownSection',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                scale: 0.92,
                opacity: 0,
                stagger: 0.06,
                duration: 0.55,
                ease: 'back.out(1.4)'
            });
        }
    }

    // Desktop 3D Hover Tilt Physics
    function init3DTiltPhysics() {
        if (window.innerWidth < 1024) return;

        const tiltCards = document.querySelectorAll('.test-card, .official-card');
        tiltCards.forEach(card => {
            let active = false;

            card.addEventListener('mouseenter', () => {
                active = true;
                gsap.to(card, { scale: 1.02, duration: 0.25, ease: 'power1.out' });
            });

            card.addEventListener('mousemove', (e) => {
                if (!active) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;

                const rotX = -((y - cy) / cy) * 6;
                const rotY = ((x - cx) / cx) * 6;

                gsap.to(card, {
                    rotationX: rotX,
                    rotationY: rotY,
                    transformPerspective: 900,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                active = false;
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ========================================================================
    // 4. BOOTSTRAP FX SYSTEM ON DOM READY
    // ========================================================================
    function startFX() {
        initThreeHeroScene();
        initSpotlightTracking();
        initGsapChoreography();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startFX);
    } else {
        startFX();
    }

    window.UOS_EXECUTIVE_FX = {
        initThree: initThreeHeroScene,
        initSpotlight: initSpotlightTracking,
        initGsap: initGsapChoreography
    };

})();
