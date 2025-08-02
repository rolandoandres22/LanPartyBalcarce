document.addEventListener('DOMContentLoaded', function() {
            const glitchContainer = document.getElementById('glitchLogoContainer');
            const logoWidth = 250;
            const logoHeight = 250;
            const numSegments = 10; // Cantidad de segmentos de imagen desplazados
            const glitchSegments = [];

            // Referencias a las pseudo-clases, para manipular sus estilos con variables CSS
            const root = document.documentElement; // Elemento root para variables globales

            // Generar los divs para los segmentos desplazados
            for (let i = 0; i < numSegments; i++) {
                const segment = document.createElement('div');
                segment.className = 'glitch-segment';
                glitchContainer.appendChild(segment);
                glitchSegments.push(segment);
            }

            function getRandom(min, max) {
                return Math.random() * (max - min) + min;
            }

            // Función para activar los efectos de glitch
            function activateGlitch() {
                // Activar pseudo-elementos
                root.style.setProperty('--glitch-line-1-opacity', getRandom(0.7, 1));
                root.style.setProperty('--glitch-line-2-opacity', getRandom(0.7, 1));
                root.style.setProperty('--glitch-line-1-x', `${getRandom(-10, 10)}px`);
                root.style.setProperty('--glitch-line-2-x', `${getRandom(-10, 10)}px`);

                // Activar segmentos de glitch
                generateGlitchSegments();
                setTimeout(clearGlitchSegments, getRandom(80, 250)); // Los segmentos parpadean y desaparecen

                // Activar filtro general de distorsión
                glitchContainer.style.filter = `url(#glitch-filter) hue-rotate(${getRandom(0, 360)}deg)`;
            }

            // Función para desactivar los efectos de glitch (mostrar imagen normal)
            function deactivateGlitch() {
                // Desactivar pseudo-elementos
                root.style.setProperty('--glitch-line-1-opacity', '0');
                root.style.setProperty('--glitch-line-2-opacity', '0');
                root.style.setProperty('--glitch-line-1-x', '0px'); // Vuelve a posición normal
                root.style.setProperty('--glitch-line-2-x', '0px'); // Vuelve a posición normal

                // Desactivar segmentos de glitch
                clearGlitchSegments();

                // Desactivar filtro general
                glitchContainer.style.filter = 'url(#glitch-filter)'; // Vuelve al filtro base (sin hue-rotate si no se activa)
            }


            // Esta función se encarga de posicionar y estilizar los segmentos individuales
            function generateGlitchSegments() {
                glitchSegments.forEach(segment => {
                    const segmentHeight = getRandom(3, 40);
                    const segmentWidth = getRandom(15, 120);
                    const segmentY = getRandom(0, logoHeight - segmentHeight);
                    const segmentX = getRandom(0, logoWidth - segmentWidth);

                    const translateX = getRandom(-30, 30);
                    const translateY = getRandom(-5, 5);
                    const rotateZ = getRandom(-3, 3);

                    const opacity = getRandom(0.4, 1);
                    const blurAmount = getRandom(0, 2);
                    const hueRotateAmount = getRandom(0, 360);

                    segment.style.width = `${logoWidth}px`;
                    segment.style.height = `${logoHeight}px`;
                    segment.style.top = '0';
                    segment.style.left = '0';

                    segment.style.clip = `rect(${segmentY}px, ${segmentX + segmentWidth}px, ${segmentY + segmentHeight}px, ${segmentX}px)`;
                    segment.style.backgroundPosition = `-${segmentX}px -${segmentY}px`;
                    segment.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateZ}deg)`;
                    segment.style.opacity = opacity;
                    segment.style.filter = `blur(${blurAmount}px) hue-rotate(${hueRotateAmount}deg)`;

                    const shadowColorR = getRandom(0, 255);
                    const shadowColorG = getRandom(0, 255);
                    const shadowColorB = getRandom(0, 255);
                    segment.style.boxShadow = `0 0 ${getRandom(3, 10)}px rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${getRandom(0.3, 0.8)})`;
                });
            }

            // Esta función oculta y resetea los segmentos individuales
            function clearGlitchSegments() {
                glitchSegments.forEach(segment => {
                    segment.style.opacity = 0;
                    segment.style.transform = 'none';
                    segment.style.filter = 'none';
                    segment.style.boxShadow = 'none';
                    segment.style.clip = 'rect(0, 0, 0, 0)';
                });
            }

            let glitchCycleInterval; // Intervalo para alternar entre normal y glitch

            function startGlitchCycle() {
                glitchCycleInterval = setInterval(() => {
                    // Decidir aleatoriamente si el glitch debe estar activo o no
                    const shouldGlitch = Math.random() > 0.3; // 70% de probabilidad de glitch
                    const glitchDuration = getRandom(100, 800); // Duración del glitch
                    const normalDuration = getRandom(200, 1000); // Duración de la imagen normal

                    if (shouldGlitch) {
                        activateGlitch();
                        // Programar cuándo se desactiva el glitch (vuelve a normal)
                        setTimeout(() => {
                            deactivateGlitch();
                            // Si queremos que la "normalidad" dure un tiempo específico antes del siguiente ciclo
                            // Podríamos añadir un setTimeout aquí para el siguiente activateGlitch
                        }, glitchDuration);
                    } else {
                        deactivateGlitch();
                        // Si no hay glitch, simplemente esperamos un tiempo para el siguiente ciclo
                        // No necesitamos un setTimeout anidado aquí porque el setInterval principal lo manejará
                    }
                }, getRandom(500, 700)); // Frecuencia con la que se toma la decisión de glitch/normal (más rápido)
            }

            function stopGlitchCycle() {
                clearInterval(glitchCycleInterval);
                deactivateGlitch(); // Asegúrate de que el logo quede normal al detenerse
            }

            // Iniciar el ciclo de alternancia
            startGlitchCycle();

            // Simular el tiempo de carga y detener el preloader
            setTimeout(function() {
                stopGlitchCycle(); // Detiene el ciclo de glitch/normal
                document.querySelector('.preloader').style.display = 'none'; // Oculta el preloader
                document.querySelector('.content').style.display = 'block';   // Muestra el contenido
            }, 5000); // Duración total del preloader
        });