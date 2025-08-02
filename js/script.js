document.addEventListener('DOMContentLoaded', function() {
    const glitchContainer = document.getElementById('glitchLogoContainer');
    const logoWidth = 250;
    const logoHeight = 250;
    const numSegments = 10;
    const glitchSegments = [];
    const root = document.documentElement;
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Generar segmentos de glitch
    for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.className = 'glitch-segment';
        glitchContainer.appendChild(segment);
        glitchSegments.push(segment);
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function activateGlitch() {
        // Usar filtro diferente para móviles
        const filterId = isMobile ? 'glitch-filter-mobile' : 'glitch-filter-active';
        glitchContainer.style.filter = `url(#${filterId}) hue-rotate(${getRandom(0, 360)}deg)`;
        
        // Activar pseudo-elementos
        root.style.setProperty('--glitch-line-1-opacity', getRandom(0.7, 1));
        root.style.setProperty('--glitch-line-2-opacity', getRandom(0.7, 1));
        root.style.setProperty('--glitch-line-1-x', `${getRandom(-10, 10)}px`);
        root.style.setProperty('--glitch-line-2-x', `${getRandom(-10, 10)}px`);
        
        // Activar segmentos
        generateGlitchSegments();
        setTimeout(clearGlitchSegments, getRandom(80, 250));
    }

    function deactivateGlitch() {
        glitchContainer.style.filter = 'url(#glitch-filter-base)';
        root.style.setProperty('--glitch-line-1-opacity', '0');
        root.style.setProperty('--glitch-line-2-opacity', '0');
        root.style.setProperty('--glitch-line-1-x', '0px');
        root.style.setProperty('--glitch-line-2-x', '0px');
        clearGlitchSegments();
    }

    function generateGlitchSegments() {
        glitchSegments.forEach(segment => {
            const segmentHeight = getRandom(3, 40);
            const segmentWidth = getRandom(15, 120);
            const segmentY = getRandom(0, logoHeight - segmentHeight);
            const segmentX = getRandom(0, logoWidth - segmentWidth);
            
            // Valores más sutiles para móviles
            const translateX = isMobile ? getRandom(-15, 15) : getRandom(-30, 30);
            const translateY = isMobile ? getRandom(-3, 3) : getRandom(-5, 5);
            const rotateZ = isMobile ? getRandom(-2, 2) : getRandom(-3, 3);
            const opacity = isMobile ? getRandom(0.3, 0.8) : getRandom(0.4, 1);
            const blurAmount = isMobile ? getRandom(0, 1) : getRandom(0, 2);
            
            segment.style.width = `${logoWidth}px`;
            segment.style.height = `${logoHeight}px`;
            segment.style.top = '0';
            segment.style.left = '0';
            segment.style.clip = `rect(${segmentY}px, ${segmentX + segmentWidth}px, ${segmentY + segmentHeight}px, ${segmentX}px)`;
            segment.style.backgroundPosition = `-${segmentX}px -${segmentY}px`;
            segment.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateZ}deg)`;
            segment.style.opacity = opacity;
            segment.style.filter = `blur(${blurAmount}px) hue-rotate(${getRandom(0, 360)}deg)`;
            
            const shadowColorR = getRandom(0, 255);
            const shadowColorG = getRandom(0, 255);
            const shadowColorB = getRandom(0, 255);
            segment.style.boxShadow = `0 0 ${getRandom(3, isMobile ? 5 : 10)}px rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${getRandom(0.3, 0.8)})`;
        });
    }

    function clearGlitchSegments() {
        glitchSegments.forEach(segment => {
            segment.style.opacity = 0;
            segment.style.transform = 'none';
            segment.style.filter = 'none';
            segment.style.boxShadow = 'none';
            segment.style.clip = 'rect(0, 0, 0, 0)';
        });
    }

    let glitchCycleInterval;

    function startGlitchCycle() {
        glitchCycleInterval = setInterval(() => {
            const shouldGlitch = Math.random() > 0.3;
            const glitchDuration = getRandom(100, 800);
            
            if (shouldGlitch) {
                activateGlitch();
                setTimeout(deactivateGlitch, glitchDuration);
            } else {
                deactivateGlitch();
            }
        }, getRandom(500, 700));
    }

    function stopGlitchCycle() {
        clearInterval(glitchCycleInterval);
        deactivateGlitch();
    }

    // Iniciar
    startGlitchCycle();

    setTimeout(function() {
        stopGlitchCycle();
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 5000);
});