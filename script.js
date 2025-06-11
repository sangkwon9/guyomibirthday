// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 환영 메시지 표시
    setTimeout(() => {
        showWelcomeMessage();
    }, 500);

    // 클릭 이벤트 리스너 추가
    document.addEventListener('click', createFireworks);
    
    // 생일 카드 클릭 이벤트
    const birthdayCard = document.querySelector('.birthday-card');
    birthdayCard.addEventListener('click', celebrateClick);
    
    // 케이크 클릭 이벤트
    const cake = document.querySelector('.cake');
    cake.addEventListener('click', blowCandles);
    
    // 배경 음악 효과 (클릭 시)
    document.addEventListener('click', playClickSound);
    
    // 초기 고정 꽃잎 150개 생성
    createStaticPetals();
    
    // 추가 떨어지는 꽃잎 생성
    createMorePetals();
    
    // 옆에서 날아오는 꽃잎 생성
    createSidePetals();
    
    // 구름같은 꽃 클러스터 생성
    createFlowerClouds();
    
    // 색깔 변경 애니메이션
    startColorAnimation();
});

// 환영 메시지 표시
function showWelcomeMessage() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = '🎉 구요미의 특별한 날에 오신 것을 환영합니다! 🎉';
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #e91e63;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: fadeInOut 4s ease-in-out;
    `;
    
    document.body.appendChild(welcomeDiv);
    
    // 4초 후 제거
    setTimeout(() => {
        welcomeDiv.remove();
    }, 4000);
}

// 클릭 시 폭죽 효과
function createFireworks(e) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        background: #ff4081;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: explode 1s ease-out forwards;
    `;
    
    document.body.appendChild(firework);
    
    // 폭죽 파편 생성
    for (let i = 0; i < 8; i++) {
        const fragment = document.createElement('div');
        fragment.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: ${getRandomColor()};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: fragment${i} 1s ease-out forwards;
        `;
        
        document.body.appendChild(fragment);
        
        // 파편 제거
        setTimeout(() => {
            fragment.remove();
        }, 1000);
    }
    
    // 폭죽 제거
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// 생일 카드 클릭 시 축하 효과
function celebrateClick() {
    const card = document.querySelector('.birthday-card');
    card.style.animation = 'celebrateShake 0.5s ease-in-out';
    
    // 하트 이모지 떨어뜨리기
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFallingHeart();
        }, i * 100);
    }
    
    // 애니메이션 재설정
    setTimeout(() => {
        card.style.animation = 'cardAppear 1s ease-out';
    }, 500);
}

// 떨어지는 하트 생성
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💝', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -50px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: fallDown 3s linear forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// 케이크 클릭 시 촛불 끄기 효과
function blowCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.style.animation = 'candleBlow 0.5s ease-out forwards';
            candle.innerHTML = '💨';
            
            // 1초 후 다시 켜기
            setTimeout(() => {
                candle.innerHTML = '🕯️';
                candle.style.animation = 'candleFlicker 2s ease-in-out infinite';
            }, 1000);
        }, index * 200);
    });
    
    // 성공 메시지 표시
    showMessage('🎉 소원을 빌어보세요! 🎉');
}

// 메시지 표시 함수
function showMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = text;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 20px 40px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #e91e63;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: messageAppear 2s ease-in-out forwards;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// 클릭 사운드 효과 (시각적)
function playClickSound() {
    const soundWave = document.createElement('div');
    soundWave.innerHTML = '🎵';
    soundWave.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: soundWave 1s ease-out forwards;
    `;
    
    document.body.appendChild(soundWave);
    
    setTimeout(() => {
        soundWave.remove();
    }, 1000);
}

// 수백개의 고정 꽃잎 생성 (300개)
function createStaticPetals() {
    const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '🌿', '🍀', '🏵️', '💐', '🌱', '🌾', '🥀', '🌳', '🌲', '🎋'];
    
    // 300개의 고정 꽃잎 생성 (수백개)
    for (let i = 0; i < 300; i++) {
        const petal = document.createElement('div');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.className = 'static-petal';
        petal.style.cssText = `
            position: fixed;
            left: ${Math.random() * (window.innerWidth + 200) - 100}px;
            top: ${Math.random() * (window.innerHeight + 200) - 100}px;
            font-size: ${0.6 + Math.random() * 2}rem;
            pointer-events: auto;
            cursor: pointer;
            z-index: 1;
            opacity: ${0.2 + Math.random() * 0.6};
            animation: staticFloat ${2 + Math.random() * 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
            transform: rotate(${Math.random() * 360}deg);
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
            transition: transform 0.1s ease;
        `;
        
        // 꽃잎 클릭 이벤트 추가
        petal.addEventListener('click', function(e) {
            createFlowerExplosion(e, this);
            e.stopPropagation();
        });
        
        // 마우스 호버 효과
        petal.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.3)';
            this.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))';
        });
        
        petal.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            this.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))';
        });
        
        document.body.appendChild(petal);
    }
}

// 수백개의 떨어지는 꽃잎 생성 (대폭 강화)
function createMorePetals() {
    const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '🌿', '🍀', '🏵️', '💐', '🌱', '🌾', '🥀', '🌳', '🌲', '🎋', '🌊', '⭐', '💫', '✨'];
    
    // 극도로 많은 떨어지는 꽃잎 (수백개 수준)
    setInterval(() => {
        // 한 번에 5-10개씩 생성
        const count = 5 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.cssText = `
                position: fixed;
                left: ${Math.random() * (window.innerWidth + 200) - 100}px;
                top: -100px;
                font-size: ${0.8 + Math.random() * 2}rem;
                pointer-events: auto;
                cursor: pointer;
                z-index: 1;
                animation: petalFall ${4 + Math.random() * 8}s linear forwards;
                opacity: ${0.3 + Math.random() * 0.7};
                transform: rotate(${Math.random() * 360}deg);
                filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
                transition: transform 0.1s ease;
            `;
            
            // 떨어지는 꽃잎 클릭 이벤트 추가
            petal.addEventListener('click', function(e) {
                createFlowerExplosion(e, this);
                e.stopPropagation();
            });
            
            // 마우스 호버 효과
            petal.addEventListener('mouseenter', function() {
                this.style.transform += ' scale(1.3)';
                this.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 1))';
            });
            
            petal.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.3)', '');
                this.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))';
            });
            
            document.body.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 12000);
        }
    }, 400); // 매우 자주 생성 (0.4초마다)
}

// 옆에서 날아오는 꽃잎들
function createSidePetals() {
    const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '🌿', '🍀'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        const fromLeft = Math.random() > 0.5;
        
        petal.style.cssText = `
            position: fixed;
            left: ${fromLeft ? -50 : window.innerWidth + 50}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: ${1.2 + Math.random() * 1}rem;
            pointer-events: none;
            z-index: 1;
            animation: sidePetalFly ${8 + Math.random() * 4}s linear forwards;
            opacity: ${0.4 + Math.random() * 0.4};
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 12000);
    }, 1500);
}

// 구름같은 꽃 클러스터 생성
function createFlowerClouds() {
    const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];
    
    setInterval(() => {
        // 구름처럼 뭉쳐서 나타나는 꽃들
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * (window.innerHeight * 0.6);
        
        // 한 구름당 15-25개의 꽃
        const cloudSize = 15 + Math.floor(Math.random() * 11);
        
        for (let i = 0; i < cloudSize; i++) {
            const petal = document.createElement('div');
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            
            // 구름 중심에서 반경 60px 내에 랜덤 배치
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 60;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            petal.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${1.2 + Math.random() * 1}rem;
                pointer-events: auto;
                cursor: pointer;
                z-index: 2;
                opacity: ${0.4 + Math.random() * 0.6};
                animation: cloudFloat ${8 + Math.random() * 4}s ease-in-out forwards;
                animation-delay: ${i * 0.1}s;
                transform: rotate(${Math.random() * 360}deg);
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
                transition: transform 0.1s ease;
            `;
            
            // 구름 꽃잎 클릭 이벤트 추가
            petal.addEventListener('click', function(e) {
                createFlowerExplosion(e, this);
                e.stopPropagation();
            });
            
            // 마우스 호버 효과
            petal.addEventListener('mouseenter', function() {
                this.style.transform += ' scale(1.4)';
                this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 1))';
            });
            
            petal.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.4)', '');
                this.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))';
            });
            
            document.body.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 15000);
        }
    }, 3000); // 3초마다 새로운 꽃 구름 생성
}

// 색깔 변경 애니메이션
function startColorAnimation() {
    const colors = ['#e91e63', '#ff4081', '#673ab7', '#3f51b5', '#009688', '#4caf50'];
    let colorIndex = 0;
    
    setInterval(() => {
        const elements = document.querySelectorAll('.celebration-icons .icon');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.color = colors[(colorIndex + index) % colors.length];
            }, index * 100);
        });
        colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);
}

// 꽃 폭죽 효과 함수
function createFlowerExplosion(e, clickedPetal) {
    // 클릭된 꽃의 위치
    const rect = clickedPetal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 클릭된 꽃을 즉시 제거
    clickedPetal.style.animation = 'explode 0.3s ease-out forwards';
    setTimeout(() => {
        if (clickedPetal.parentNode) {
            clickedPetal.remove();
        }
    }, 300);
    
    // 화려한 꽃 폭죽 생성
    const explosionPetals = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💖', '💝', '💕', '⭐', '✨', '💫'];
    
    // 16개의 폭죽 파편 생성
    for (let i = 0; i < 16; i++) {
        const fragment = document.createElement('div');
        fragment.innerHTML = explosionPetals[Math.floor(Math.random() * explosionPetals.length)];
        
        // 360도 방향으로 균등하게 퍼짐
        const angle = (i * 22.5) * (Math.PI / 180);
        const distance = 100 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        fragment.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${1.5 + Math.random() * 1}rem;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
            animation: flowerExplosion${i} 1.5s ease-out forwards;
        `;
        
        // 각 파편별 개별 애니메이션
        const keyframes = `
            @keyframes flowerExplosion${i} {
                0% { 
                    transform: translate(0, 0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                50% { 
                    transform: translate(${(endX - centerX) * 0.7}px, ${(endY - centerY) * 0.7}px) rotate(${180 + Math.random() * 180}deg) scale(1.3);
                    opacity: 0.8;
                }
                100% { 
                    transform: translate(${endX - centerX}px, ${endY - centerY}px) rotate(${360 + Math.random() * 180}deg) scale(0.2);
                    opacity: 0;
                }
            }
        `;
        
        // 애니메이션을 동적으로 추가
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(fragment);
        
        // 파편 제거
        setTimeout(() => {
            if (fragment.parentNode) {
                fragment.remove();
            }
            if (styleSheet.parentNode) {
                styleSheet.remove();
            }
        }, 1500);
    }
    
    // 중앙 폭발 효과
    const centerBurst = document.createElement('div');
    centerBurst.innerHTML = '💥';
    centerBurst.style.cssText = `
        position: fixed;
        left: ${centerX - 15}px;
        top: ${centerY - 15}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 10000;
        animation: centerBurst 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(centerBurst);
    
    setTimeout(() => {
        if (centerBurst.parentNode) {
            centerBurst.remove();
        }
    }, 800);
    
    // 성공 메시지 표시
    const messages = ['🌸 꽃 폭죽! 🌸', '💖 아름다워! 💖', '✨ 환상적! ✨', '🎉 와! 🎉'];
    showMessage(messages[Math.floor(Math.random() * messages.length)]);
}

// 랜덤 색상 생성
function getRandomColor() {
    const colors = ['#ff4081', '#e91e63', '#673ab7', '#3f51b5', '#009688', '#4caf50', '#ff9800', '#f44336'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
    }
    
    @keyframes fragment0 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(30px, -30px); opacity: 0; }
    }
    
    @keyframes fragment1 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(-30px, -30px); opacity: 0; }
    }
    
    @keyframes fragment2 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(30px, 30px); opacity: 0; }
    }
    
    @keyframes fragment3 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(-30px, 30px); opacity: 0; }
    }
    
    @keyframes fragment4 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(0, -40px); opacity: 0; }
    }
    
    @keyframes fragment5 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(0, 40px); opacity: 0; }
    }
    
    @keyframes fragment6 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(40px, 0); opacity: 0; }
    }
    
    @keyframes fragment7 {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(-40px, 0); opacity: 0; }
    }
    
    @keyframes celebrateShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fallDown {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes candleBlow {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0.5; }
    }
    
    @keyframes messageAppear {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes soundWave {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes petalFall {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 0.7; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    @keyframes staticFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-10px) rotate(90deg) scale(1.1); }
        50% { transform: translateY(-5px) rotate(180deg) scale(0.9); }
        75% { transform: translateY(-15px) rotate(270deg) scale(1.05); }
    }
    
    @keyframes sidePetalFly {
        0% { transform: translateX(0) rotate(0deg); opacity: 0.6; }
        50% { transform: translateX(50vw) rotate(180deg); opacity: 0.8; }
        100% { transform: translateX(100vw) rotate(360deg); opacity: 0; }
    }
    
    @keyframes cloudFloat {
        0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
        20% { transform: translateY(-10px) scale(1) rotate(90deg); opacity: 0.8; }
        50% { transform: translateY(-5px) scale(1.1) rotate(180deg); opacity: 1; }
        80% { transform: translateY(-15px) scale(0.9) rotate(270deg); opacity: 0.6; }
        100% { transform: translateY(-30px) scale(0.3) rotate(360deg); opacity: 0; }
    }
    
    @keyframes centerBurst {
        0% { transform: scale(0.5) rotate(0deg); opacity: 1; }
        50% { transform: scale(2) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0.1) rotate(360deg); opacity: 0; }
    }
`;

document.head.appendChild(style); 