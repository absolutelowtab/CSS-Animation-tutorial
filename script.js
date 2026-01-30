// Основной JavaScript файл для учебника по CSS-анимациям

document.addEventListener('DOMContentLoaded', function() {
    console.log('Учебник по CSS-анимациям загружен!');

    // ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку в зависимости от темы
    updateThemeIcon(savedTheme);
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Анимация переключения
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#FFD700';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '';
        }
    }

    // ===== АКТИВНЫЙ ПУНКТ НАВИГАЦИИ =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Функция для обновления активной ссылки
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Слушаем событие прокрутки
    window.addEventListener('scroll', updateActiveLink);
    
    // ===== ГЛАВНАЯ ДЕМОНСТРАЦИЯ ПЕРЕХОДОВ =====
    const demoTrigger = document.getElementById('demoTrigger');
    const demoObject = document.getElementById('demoObject');
    const durationSlider = document.getElementById('durationSlider');
    const durationValue = document.getElementById('durationValue');
    const delaySlider = document.getElementById('delaySlider');
    const delayValue = document.getElementById('delayValue');
    const demoCode = document.getElementById('demoCode');
    
    let isAnimating = false;
    
    // Инициализация слайдеров
    if (durationSlider && durationValue) {
        durationValue.textContent = `${durationSlider.value}s`;
        durationSlider.addEventListener('input', function() {
            const duration = durationSlider.value;
            durationValue.textContent = `${duration}s`;
            updateDemoCode();
        });
    }
    
    if (delaySlider && delayValue) {
        delayValue.textContent = `${delaySlider.value}s`;
        delaySlider.addEventListener('input', function() {
            const delay = delaySlider.value;
            delayValue.textContent = `${delay}s`;
            updateDemoCode();
        });
    }
    
    // Обработчик запуска анимации
    if (demoTrigger && demoObject) {
        demoTrigger.addEventListener('click', function() {
            if (!isAnimating) {
                // Запускаем анимацию с перевернутой галочкой
                isAnimating = true;
                const duration = durationSlider ? durationSlider.value : 0.5;
                const delay = delaySlider ? delaySlider.value : 0;
                
                demoObject.classList.add('animated');
                demoObject.style.transition = `all ${duration}s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${delay}s`;
                demoObject.style.transform = 'translateX(150px) rotate(180deg)';
                demoObject.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                demoObject.style.borderRadius = '50%';
                
                demoTrigger.textContent = 'Сбросить анимацию';
                demoTrigger.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
                
                updateDemoCode();
            } else {
                // Сбрасываем анимацию
                isAnimating = false;
                const duration = durationSlider ? durationSlider.value : 0.5;
                const delay = delaySlider ? delaySlider.value : 0;
                
                demoObject.classList.remove('animated');
                demoObject.style.transition = `all ${duration}s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${delay}s`;
                demoObject.style.transform = 'translateX(0) rotate(0deg)';
                demoObject.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                demoObject.style.borderRadius = '10px';
                
                demoTrigger.textContent = 'Запустить анимацию';
                demoTrigger.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                
                updateDemoCode();
            }
        });
    }
    
    // Функция обновления кода демонстрации
    function updateDemoCode() {
        if (!demoCode) return;
        
        const duration = durationSlider ? durationSlider.value : 0.5;
        const delay = delaySlider ? delaySlider.value : 0;
        const targetState = isAnimating ? 
            `  transform: translateX(150px) rotate(180deg);
  background: linear-gradient(135deg, #059669, #10b981);
  border-radius: 50%;` : 
            `  transform: translateX(0) rotate(0deg);
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;`;
        
        demoCode.textContent = `#demoObject {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  transition: all ${duration}s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${delay}s;
}

${isAnimating ? '#demoObject.animated' : '#demoObject:hover'} {
${targetState}
}`;
    }
    
    // Инициализируем код демонстрации
    updateDemoCode();

    // ===== ДЕМОНСТРАЦИЯ TIMING FUNCTIONS =====
    const timingFunctions = document.querySelectorAll('.timing-function');
    
    timingFunctions.forEach(timing => {
        timing.addEventListener('click', function() {
            const timingType = this.getAttribute('data-timing');
            const ball = this.querySelector('.timing-ball');
            
            // Сбрасываем анимацию
            ball.style.animation = 'none';
            void ball.offsetWidth; // Триггер рефлоу для перезапуска анимации
            
            // Запускаем анимацию с выбранным timing function
            ball.style.animation = `moveRight 2s infinite ${timingType}`;
            
            // Показываем уведомление
            showNotification(`Запущена анимация с timing-function: ${timingType}`);
        });
    });
    
    // ===== ПРУЖИННАЯ АНИМАЦИЯ =====
    const bezierDemoBtn = document.getElementById('bezierDemoBtn');
    
    if (bezierDemoBtn) {
        bezierDemoBtn.addEventListener('click', function() {
            const demoContainer = document.querySelector('.transition-demo');
            if (!demoContainer) return;
            
            // Удаляем предыдущие демо
            const oldDemos = demoContainer.querySelectorAll('.bezier-demo-object');
            oldDemos.forEach(demo => demo.remove());
            
            // Создаем новое демо
            const bezierDemo = document.createElement('div');
            bezierDemo.className = 'bezier-demo-object';
            bezierDemo.textContent = '🎯';
            bezierDemo.style.cssText = `
                position: absolute;
                top: 50%;
                left: 40px;
                transform: translateY(-50%);
                animation: springAnimation 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
            `;
            
            // Добавляем keyframes для пружинной анимации
            if (!document.querySelector('#spring-animation')) {
                const style = document.createElement('style');
                style.id = 'spring-animation';
                style.textContent = `
                    @keyframes springAnimation {
                        0% { 
                            transform: translateY(-50%) translateX(0) scale(1); 
                        }
                        20% { 
                            transform: translateY(-50%) translateX(180px) scale(1.2); 
                        }
                        40% { 
                            transform: translateY(-50%) translateX(140px) scale(0.9); 
                        }
                        60% { 
                            transform: translateY(-50%) translateX(200px) scale(1.1); 
                        }
                        80% { 
                            transform: translateY(-50%) translateX(160px) scale(0.95); 
                        }
                        100% { 
                            transform: translateY(-50%) translateX(150px) scale(1); 
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            demoContainer.appendChild(bezierDemo);
            
            // Удаляем элемент после завершения анимации
            setTimeout(() => {
                bezierDemo.remove();
                showNotification('Пружинная анимация завершена!');
            }, 2000);
        });
    }
    
    // ===== КЛЮЧЕВЫЕ КАДРЫ ДЕМО =====
    const keyframesStart = document.getElementById('keyframesStart');
    const keyframesPause = document.getElementById('keyframesPause');
    const keyframesReset = document.getElementById('keyframesReset');
    const keyframesObject = document.getElementById('keyframesObject');
    const iterationsSlider = document.getElementById('iterationsSlider');
    const iterationsValue = document.getElementById('iterationsValue');
    
    if (keyframesObject) {
        // Создаем keyframes анимацию
        const styleSheet = document.styleSheets[0];
        const keyframes = `
            @keyframes keyframesDemo {
                0% { 
                    transform: translateX(0) translateY(0) rotate(0deg); 
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                }
                25% { 
                    transform: translateX(200px) translateY(0) rotate(90deg); 
                    background: linear-gradient(135deg, var(--success-color), #10b981);
                }
                50% { 
                    transform: translateX(200px) translateY(200px) rotate(180deg); 
                    background: linear-gradient(135deg, var(--warning-color), #f59e0b);
                }
                75% { 
                    transform: translateX(0) translateY(200px) rotate(270deg); 
                    background: linear-gradient(135deg, var(--accent-color), #ec4899);
                }
                100% { 
                    transform: translateX(0) translateY(0) rotate(360deg); 
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                }
            }
        `;
        
        try {
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        } catch (e) {
            console.log('Keyframes уже добавлены');
        }
        
        // Устанавливаем начальную анимацию
        keyframesObject.style.animation = 'keyframesDemo 4s ease-in-out infinite';
        
        // Слайдер количества повторений
        if (iterationsSlider && iterationsValue) {
            iterationsValue.textContent = iterationsSlider.value;
            iterationsSlider.addEventListener('input', function() {
                const iterations = iterationsSlider.value;
                iterationsValue.textContent = iterations;
                
                // Обновляем анимацию
                keyframesObject.style.animationIterationCount = iterations === 'infinite' ? 'infinite' : iterations;
                keyframesObject.style.animationPlayState = 'running';
            });
        }
        
        // Кнопка запуска
        if (keyframesStart) {
            keyframesStart.addEventListener('click', function() {
                keyframesObject.style.animationPlayState = 'running';
                showNotification('Анимация запущена', 'success');
            });
        }
        
        // Кнопка паузы
        if (keyframesPause) {
            keyframesPause.addEventListener('click', function() {
                const isPaused = keyframesObject.style.animationPlayState === 'paused';
                keyframesObject.style.animationPlayState = isPaused ? 'running' : 'paused';
                this.textContent = isPaused ? '⏸ Пауза' : '▶ Продолжить';
                showNotification(isPaused ? 'Анимация продолжена' : 'Анимация на паузе', 'success');
            });
        }
        
        // Кнопка сброса
        if (keyframesReset) {
            keyframesReset.addEventListener('click', function() {
                // Сбрасываем анимацию
                keyframesObject.style.animation = 'none';
                setTimeout(() => {
                    keyframesObject.style.animation = 'keyframesDemo 4s ease-in-out infinite';
                    keyframesObject.style.animationPlayState = 'running';
                }, 50);
                
                // Сбрасываем слайдер
                if (iterationsSlider) {
                    iterationsSlider.value = 1;
                    iterationsValue.textContent = '1';
                    keyframesObject.style.animationIterationCount = '1';
                }
                
                showNotification('Анимация сброшена', 'success');
            });
        }
    }
    
    // ===== ДЕМО ANIMATION-PLAY-STATE =====
    const playstatePlay = document.getElementById('playstatePlay');
    const playstatePause = document.getElementById('playstatePause');
    const playstateReset = document.getElementById('playstateReset');
    const playstateObject = document.getElementById('playstateObject');
    
    if (playstateObject) {
        // Кнопка воспроизведения
        if (playstatePlay) {
            playstatePlay.addEventListener('click', function() {
                playstateObject.style.animationPlayState = 'running';
                showNotification('Воспроизведение анимации', 'success');
            });
        }
        
        // Кнопка паузы
        if (playstatePause) {
            playstatePause.addEventListener('click', function() {
                playstateObject.style.animationPlayState = 'paused';
                showNotification('Анимация на паузе', 'success');
            });
        }
        
        // Кнопка сброса
        if (playstateReset) {
            playstateReset.addEventListener('click', function() {
                // Сбрасываем анимацию
                playstateObject.style.animation = 'none';
                setTimeout(() => {
                    playstateObject.style.animation = 'playstateRotate 3s linear infinite';
                    playstateObject.style.animationPlayState = 'running';
                }, 50);
                
                showNotification('Анимация сброшена', 'success');
            });
        }
    }
    
    // ===== ОБСЕРВЕР ДЛЯ АКТИВАЦИИ АНИМАЦИЙ ПРИ СКРОЛЛЕ =====
    const initAnimationObservers = () => {
        const animationSections = [
            '.iteration-example',
            '.direction-example', 
            '.fillmode-example',
            '.playstate-demo'
        ];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Активируем анимации в зависимости от типа элемента
                    if (element.classList.contains('iteration-example')) {
                        const bar = element.querySelector('.iteration-bar');
                        const iteration = element.getAttribute('data-iteration');
                        bar.style.animation = `moveRight 2s ease ${iteration === 'infinite' ? 'infinite' : iteration}`;
                    } else if (element.classList.contains('direction-example')) {
                        const arrow = element.querySelector('.direction-arrow');
                        const direction = element.getAttribute('data-direction');
                        arrow.style.animation = `moveRight 2s linear infinite ${direction}`;
                    } else if (element.classList.contains('fillmode-example')) {
                        const box = element.querySelector('.fillmode-box');
                        box.style.animation = `fillmodeAnimation 2s ease 1`;
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        // Наблюдаем за всеми элементами с анимациями
        animationSections.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                observer.observe(element);
            });
        });
    };
    
    // Инициализируем observers после загрузки
    setTimeout(initAnimationObservers, 1000);
    
    // ===== ПРИМЕРЫ АНИМАЦИЙ =====
    const exampleButtons = document.querySelectorAll('.example-btn');
    const exampleCodeButtons = document.querySelectorAll('.example-code-btn');
    
    // Коды анимаций для модального окна
    const animationCodes = {
        pulse: `/* Анимация пульсации */
.pulse-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(37, 99, 235, 0.5);
  }
}`,
        
        shake: `/* Анимация встряски */
.shake-element {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #db2777, #ec4899);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-8px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(8px);
  }
}`,
        
        flip: `/* Анимация переворота */
.flip-card {
  width: 140px;
  height: 140px;
  perspective: 1000px;
}

.flip-front, .flip-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flip-front {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
}

.flip-back {
  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  transform: rotateY(180deg);
}

.flip {
  animation: flip 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes flip {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}`,
        
        bounce: `/* Анимация отскока */
.bounce-ball {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #059669, #10b981);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
  animation: bounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px);
  }
}`,
        
        rotate: `/* Анимация вращения */
.rotate-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2);
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
        
        fade: `/* Анимация появления */
.fade-element {
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
  animation: fade 2s ease-in-out infinite alternate;
}

@keyframes fade {
  0% {
    opacity: 0.3;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}`,
        
        loading: `/* Анимация загрузки */
.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
        
        typing: `/* Анимация печатания */
.typing-text {
  width: 300px;
  height: 40px;
  background-color: #f3f4f6;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.typing-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, #2563eb, transparent);
  animation: typing 3s steps(20) infinite;
}

@keyframes typing {
  0%, 100% {
    width: 0;
  }
  50% {
    width: 100%;
  }
}`
    };
    
    // Обработчики для кнопок примеров
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Для специальных примеров
            if (target === 'loading') {
                const loadingSpinner = document.querySelector('.loading-spinner');
                if (loadingSpinner) {
                    loadingSpinner.style.animation = 'spin 1s linear infinite';
                    setTimeout(() => {
                        loadingSpinner.style.animation = '';
                    }, 3000);
                    showNotification('Анимация загрузки запущена', 'success');
                }
                return;
            }
            
            if (target === 'typing') {
                const typingText = document.getElementById('typingText');
                if (typingText) {
                    typingText.style.animation = 'none';
                    setTimeout(() => {
                        typingText.style.animation = 'typing 3s steps(20) infinite';
                    }, 50);
                    showNotification('Анимация печатания запущена', 'success');
                }
                return;
            }
            
            // Для обычных примеров
            const exampleElement = document.getElementById(`${target}Example`);
            if (!exampleElement) return;
            
            const animationElement = exampleElement.querySelector('.example-animation > div');
            if (!animationElement) return;
            
            // Запускаем анимацию
            if (target === 'flip') {
                animationElement.style.animation = 'flip 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                setTimeout(() => {
                    animationElement.style.animation = '';
                }, 1000);
            } else {
                animationElement.classList.add(target);
                
                const duration = target === 'shake' ? 500 : 
                               target === 'bounce' ? 1000 : 
                               target === 'pulse' ? 1500 : 2000;
                
                setTimeout(() => {
                    animationElement.classList.remove(target);
                }, duration);
            }
            
            showNotification(`Анимация "${target}" запущена`, 'success');
        });
    });
    
    // Кнопка для прокруточной анимации
    const scrollAnimationBtn = document.getElementById('scrollAnimationBtn');
    if (scrollAnimationBtn) {
        scrollAnimationBtn.addEventListener('click', function() {
            const scrollElement = document.querySelector('.scroll-animation-element');
            if (scrollElement) {
                scrollElement.classList.toggle('visible');
                showNotification(scrollElement.classList.contains('visible') ? 
                    'Элемент появился' : 'Элемент скрыт', 'success');
            }
        });
    }
    
    // Кнопки для показа кода
    exampleCodeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeType = this.getAttribute('data-code');
            const title = this.closest('.example-content').querySelector('h3').textContent;
            
            if (animationCodes[codeType]) {
                showCodeModal(title, animationCodes[codeType]);
            }
        });
    });
    
    // ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====
    const practiceButton = document.getElementById('practiceButton');
    const practiceToggle = document.getElementById('practiceToggle');
    const runPractice = document.getElementById('runPractice');
    const practiceCode = document.getElementById('practiceCode');
    
    // Предустановленный CSS для кнопки
    if (practiceCode) {
        practiceCode.value = `padding: 1rem 2rem;
background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
color: white;
border: none;
border-radius: var(--radius-md);
font-size: 1rem;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
box-shadow: var(--shadow-md);

/* Стили при наведении */
transform: translateY(-3px);
box-shadow: var(--shadow-lg);

/* Стили при нажатии */
transform: scale(0.95);

/* Стили для активного состояния */
animation: pulse 1.5s ease-in-out infinite;`;
    }
    
    let currentPracticeStyle = null;
    
    // Запуск пользовательского кода
    if (runPractice && practiceCode) {
        runPractice.addEventListener('click', function() {
            const code = practiceCode.value;
            
            // Удаляем предыдущий стиль
            if (currentPracticeStyle) {
                currentPracticeStyle.remove();
            }
            
            try {
                // Создаем новый стиль
                currentPracticeStyle = document.createElement('style');
                currentPracticeStyle.textContent = `
                    #practiceButton {
                        ${code}
                    }
                `;
                document.head.appendChild(currentPracticeStyle);
                
                showNotification('Стили применены к кнопке!', 'success');
            } catch (error) {
                showNotification('Ошибка в коде CSS', 'error');
                console.error('CSS Error:', error);
            }
        });
    }
    
    // Переключатель пульсации
    if (practiceToggle && practiceButton) {
        practiceToggle.addEventListener('click', function() {
            practiceButton.classList.toggle('active');
            
            if (practiceButton.classList.contains('active')) {
                practiceButton.style.animation = 'pulse 1.5s ease-in-out infinite';
                practiceToggle.textContent = 'Отключить пульсацию';
                showNotification('Пульсация активирована', 'success');
            } else {
                practiceButton.style.animation = '';
                practiceToggle.textContent = 'Активировать пульсацию';
                showNotification('Пульсация отключена', 'success');
            }
        });
    }
    
    // Добавляем обработчики для предпросмотра
    if (practiceButton) {
        // При наведении
        practiceButton.addEventListener('mouseenter', function() {
            if (!this.style.animation || !this.style.animation.includes('pulse')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        practiceButton.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.boxShadow = 'var(--shadow-md)';
            }
        });
        
        // При нажатии
        practiceButton.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        practiceButton.addEventListener('mouseup', function() {
            if (this.classList.contains('active')) {
                this.style.transform = '';
            } else {
                this.style.transform = 'translateY(-3px)';
            }
        });
    }
    
    // ===== ПОДПИСКА НА РАССЫЛКУ =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Имитация отправки
            setTimeout(() => {
                showNotification(`Спасибо за подписку! На ${email} отправлено подтверждение.`, 'success');
                this.reset();
            }, 500);
        });
    }
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCode = document.getElementById('modalCode');
    const modalClose = document.getElementById('modalClose');
    const copyCodeBtn = document.getElementById('copyCode');
    const tryCodeBtn = document.getElementById('tryCode');
    
    // Функция показа модального окна
    function showCodeModal(title, code) {
        if (!modal || !modalTitle || !modalCode) return;
        
        modalTitle.textContent = `Код анимации: ${title}`;
        
        // Очищаем и устанавливаем чистый код
        modalCode.innerHTML = '';
        const codeText = document.createTextNode(code);
        modalCode.appendChild(codeText);
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Подсветка синтаксиса
        highlightSyntax(modalCode);
    }
    
    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие модального окна при клике вне его
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Копирование кода
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function() {
            if (!modalCode) return;
            
            const codeToCopy = modalCode.textContent;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                showNotification('Код скопирован в буфер обмена!', 'success');
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                showNotification('Не удалось скопировать код', 'error');
            });
        });
    }
    
    // Кнопка "Попробовать в редакторе"
    if (tryCodeBtn && practiceCode) {
        tryCodeBtn.addEventListener('click', function() {
            if (!modalCode) return;
            
            const code = modalCode.textContent;
            // Извлекаем только содержимое селектора .element
            const lines = code.split('\n');
            let cssContent = '';
            let inSelector = false;
            
            for (let line of lines) {
                if (line.trim().startsWith('.')) {
                    inSelector = true;
                }
                if (inSelector && line.trim() === '}') {
                    cssContent += line + '\n';
                    inSelector = false;
                }
                if (inSelector) {
                    cssContent += line + '\n';
                }
            }
            
            practiceCode.value = cssContent;
            
            // Прокручиваем к редактору
            document.querySelector('.practice-section').scrollIntoView({
                behavior: 'smooth'
            });
            
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            showNotification('Код добавлен в редактор!', 'success');
        });
    }
    
    // ===== УВЕДОМЛЕНИЯ =====
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    function showNotification(message, type = 'success') {
        if (!notification || !notificationText) return;
        
        notificationText.textContent = message;
        
        // Устанавливаем цвет в зависимости от типа
        if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
        } else if (type === 'warning') {
            notification.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
        } else {
            notification.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }
        
        notification.classList.add('show');
        
        // Удаляем предыдущие таймеры
        if (window.notificationTimer) {
            clearTimeout(window.notificationTimer);
        }
        
        // Автоматическое скрытие через 3 секунды
        window.notificationTimer = setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Добавляем обработчик для закрытия уведомлений по клику
    if (notification) {
        notification.addEventListener('click', function() {
            this.classList.remove('show');
            if (window.notificationTimer) {
                clearTimeout(window.notificationTimer);
            }
        });
    }
    
    // ===== ПОДСВЕТКА СИНТАКСИСА =====
    function highlightSyntax(element) {
        if (!element) return;
        
        let code = element.textContent;
        
        // Простая подсветка ключевых слов CSS
        const keywords = [
            '@keyframes', 'animation', 'transition', 'transform',
            'from', 'to', 'infinite', 'alternate', 'ease', 'linear',
            'cubic-bezier', 'scale', 'rotate', 'translate', 'skew',
            'perspective', 'backface-visibility', 'opacity',
            'background', 'border-radius', 'box-shadow', 'position'
        ];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">$1</span>`);
        });
        
        // Подсветка свойств
        const properties = [
            'width', 'height', 'color', 'background-color',
            'border', 'margin', 'padding', 'display', 'position'
        ];
        
        properties.forEach(property => {
            const regex = new RegExp(`(${property}):`, 'g');
            code = code.replace(regex, `<span class="property">$1</span>:`);
        });
        
        // Подсветка значений
        code = code.replace(/(\d+)(px|s|ms|deg|%)/g, '<span class="value">$1$2</span>');
        code = code.replace(/#([0-9a-f]{3,6})\b/gi, '<span class="color">#$1</span>');
        
        // Подсветка комментариев
        code = code.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
        
        element.innerHTML = code;
    }
    
    // Добавляем стили для подсветки синтаксиса
    const syntaxStyles = `
        .keyword { color: #2563eb; font-weight: bold; }
        .property { color: #7c3aed; }
        .value { color: #059669; }
        .color { color: #db2777; }
        .comment { color: #6b7280; font-style: italic; }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = syntaxStyles;
    document.head.appendChild(styleSheet);
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
    // Обновляем активную ссылку при загрузке
    updateActiveLink();
    
    // Показываем приветственное сообщение
    setTimeout(() => {
        showNotification('Добро пожаловать в учебник по CSS-анимациям! Начните изучение с раздела "Основы".', 'success');
    }, 1000);
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ КЛАВИАТУРЫ =====
    document.addEventListener('keydown', function(e) {
        // Закрытие модального окна по ESC
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        
        // Переключение темы по Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // ===== ПРЕДЗАГРУЗКА АНИМАЦИЙ =====
    function preloadAnimations() {
        // Создаем скрытый элемент для предзагрузки keyframes
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
            opacity: 0;
        `;
        
        // Добавляем все анимационные классы
        const animationClasses = ['pulse', 'shake', 'flip', 'bounce', 'rotate', 'fade'];
        animationClasses.forEach(className => {
            const element = document.createElement('div');
            element.className = className;
            preloader.appendChild(element);
        });
        
        document.body.appendChild(preloader);
        
        // Удаляем через 1 секунду
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 1000);
    }
    
    // Запускаем предзагрузку
    preloadAnimations();
});