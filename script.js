// ========================================
// PORTFOLIO EDUARDO MAGALHÃES - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. MENU MOBILE TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fechar menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ==========================================
    // 2. NAVEGAÇÃO ATIVA (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Remove classe active de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ==========================================
    // 4. ANIMAÇÕES DE ENTRADA (SCROLL REVEAL)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.projeto-card, .sobre-content, .inicio-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 5. EFEITO DE DIGITAÇÃO NO TÍTULO
    // ==========================================
    function typeWriter() {
    const titleElement = document.querySelector('.inicio-text h2');
    if (!titleElement) return;

    const texts = [
        'Desenvolvedor Front-Endd',
        'Desenvolvedor Back-Endd',
        'Desenvolvedor Full-Stackk'
    ];

    const speed = 100; // velocidade de digitação
    const pause = 2000; // pausa antes de apagar

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        const displayedText = isDeleting
            ? currentText.substring(0, charIndex--)
            : currentText.substring(0, charIndex++);

        titleElement.innerHTML = displayedText + '<span class="cursor">|</span>';

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, pause);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            type();
        } else {
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
    }

    setTimeout(type, 1000); // inicia após 1s
}


    // ==========================================
    // 6. SMOOTH SCROLL PERSONALIZADO
    // ==========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 7. CONTADOR ANIMADO (para futuras métricas)
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // ==========================================
    // 8. PARALLAX SUAVE NO BACKGROUND
    // ==========================================
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const inicioSection = document.querySelector('#inicio');
        
        if (inicioSection) {
            const rate = scrolled * -0.5;
            inicioSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // ==========================================
    // 9. LOADING SCREEN
    // ==========================================
    function hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    // ==========================================
    // 10. BOTÃO VOLTAR AO TOPO
    // ==========================================
    function createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #ff6b35;
            color: #000;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(backToTop);
        
        // Mostrar/esconder botão
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
        
        // Scroll para o topo
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', toggleBackToTop);
    }

    // ==========================================
    // 11. PRELOADER DE IMAGENS DOS PROJETOS
    // ==========================================
    function preloadProjectImages() {
        const projectImages = document.querySelectorAll('.projeto-img');
        
        projectImages.forEach(img => {
            // Adiciona placeholder enquanto carrega
            img.style.background = 'linear-gradient(45deg, #333, #555)';
            
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });
        });
    }

    // ==========================================
    // INICIALIZAÇÃO DE TODAS AS FUNÇÕES
    // ==========================================
    
    // Eventos de scroll
    window.addEventListener('scroll', function() {
        updateActiveLink();
        handleHeaderScroll();
        handleParallax();
    });
    
    // Inicializar funções
    typeWriter();
    createBackToTop();
    preloadProjectImages();
    hideLoader();
    
    // Primeira chamada para definir estado inicial
    updateActiveLink();
    handleHeaderScroll();
    
    console.log('🚀 Portfolio Eduardo Magalhães carregado com sucesso!');
});

// ==========================================
// 12. ANIMAÇÕES CSS DINÂMICAS
// ==========================================

// Adiciona essas classes CSS dinamicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Animações de entrada */
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Cursor piscando */
    .cursor {
        animation: blink 1s infinite;
        color: #ff6b35;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Loader */
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid #333;
        border-top: 3px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Hover effect nos botões */
    .back-to-top:hover {
        background: #fff !important;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
    }
`;

document.head.appendChild(styleSheet);