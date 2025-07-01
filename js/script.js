// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Adicionar classe active ao menu mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMediaChange(e) {
        if (e.matches) {
            nav.style.display = 'none';
            
            // Adicionar estilo quando o menu estiver ativo
            if (!document.querySelector('.mobile-nav-style')) {
                const style = document.createElement('style');
                style.className = 'mobile-nav-style';
                style.textContent = `
                    nav ul.active {
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: rgba(18, 18, 18, 0.95);
                        padding: 20px 0;
                        text-align: center;
                    }
                    
                    nav ul.active li {
                        margin: 15px 0;
                    }
                    
                    .menu-toggle.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 6px);
                    }
                    
                    .menu-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .menu-toggle.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(5px, -6px);
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            nav.style.display = 'flex';
        }
    }
    
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
    
    // Scroll suave para as seções
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile após clicar
            if (mediaQuery.matches) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Header com fundo transparente no topo e sólido ao rolar
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(18, 18, 18, 1)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        }
    });
});

// Animação de entrada para elementos ao rolar
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Adicionar classe para animação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilo para animações
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Aplicar classe fade-in aos elementos que queremos animar
    document.querySelectorAll('section h2, .mix-card, .evento, .form-container, .social-links').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});
