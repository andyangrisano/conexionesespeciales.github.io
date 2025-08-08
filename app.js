// Conexiones Especiales - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    // Scroll event listener
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            updateActiveNav();
            handleHeaderScroll();
        }, 10);
    });
    
    // Initialize active nav on page load
    updateActiveNav();
    
    // Donate button functionality
    const donateButtons = document.querySelectorAll('.btn--donate, .hero__donate-btn, .btn--donate-footer');
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create and show donation modal
            showDonationModal();
        });
    });
    
    // Learn More button functionality
    const learnMoreBtn = document.querySelector('.hero__learn-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // App CTA button functionality
    const appCtaBtn = document.querySelector('.app-cta .btn');
    if (appCtaBtn) {
        appCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAppInfoModal();
        });
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            handleFormSubmission(formData);
        });
    }
    
    // Form submission handler
    function handleFormSubmission(data) {
        // Create loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // Donation modal functionality
    function showDonationModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal" id="donationModal">
                <div class="modal__overlay">
                    <div class="modal__content">
                        <div class="modal__header">
                            <h3>Support Conexiones Especiales</h3>
                            <button class="modal__close" type="button">&times;</button>
                        </div>
                        <div class="modal__body">
                            <p>Your donation helps us connect athletes and build sports communities worldwide.</p>
                            <div class="donation-amounts">
                                <button class="donation-btn" data-amount="25">$25</button>
                                <button class="donation-btn" data-amount="50">$50</button>
                                <button class="donation-btn" data-amount="100">$100</button>
                                <button class="donation-btn" data-amount="other">Other</button>
                            </div>
                            <div class="custom-amount" style="display: none;">
                                <label class="form-label">Custom Amount ($)</label>
                                <input type="number" class="form-control" id="customAmount" min="1" placeholder="Enter amount">
                            </div>
                        </div>
                        <div class="modal__footer">
                            <button class="btn btn--primary" id="proceedDonation">Proceed to Payment</button>
                            <button class="btn btn--secondary" id="cancelDonation">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            <style>
                .modal { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    z-index: 2000; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                }
                .modal__overlay { 
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: rgba(0, 0, 0, 0.5); 
                    backdrop-filter: blur(5px);
                }
                .modal__content { 
                    position: relative; 
                    background: var(--color-surface); 
                    border-radius: var(--radius-lg); 
                    max-width: 500px; 
                    width: 90%; 
                    max-height: 80%; 
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                }
                .modal__header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: var(--space-20); 
                    border-bottom: 1px solid var(--color-card-border);
                }
                .modal__header h3 { 
                    margin: 0; 
                    color: #FF4A9E; 
                    font-weight: 700;
                }
                .modal__close { 
                    background: none; 
                    border: none; 
                    font-size: 24px; 
                    cursor: pointer; 
                    color: var(--color-text-secondary);
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal__body { 
                    padding: var(--space-20); 
                }
                .modal__footer { 
                    display: flex; 
                    gap: var(--space-12); 
                    padding: var(--space-20); 
                    border-top: 1px solid var(--color-card-border);
                }
                .donation-amounts { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: var(--space-12); 
                    margin: var(--space-20) 0; 
                }
                .donation-btn { 
                    padding: var(--space-12); 
                    border: 2px solid var(--color-border); 
                    border-radius: var(--radius-base); 
                    background: var(--color-surface); 
                    cursor: pointer; 
                    font-weight: 600;
                    transition: all var(--duration-fast) var(--ease-standard);
                }
                .donation-btn:hover, .donation-btn.selected { 
                    border-color: #FF4A9E; 
                    background: rgba(255, 74, 158, 0.1); 
                    color: #FF4A9E;
                }
                .custom-amount { 
                    margin-top: var(--space-16); 
                }
            </style>
        `;
        
        // Add modal to page
        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('donationModal');
        
        // Modal event listeners
        setupDonationModalEvents(modal);
    }
    
    function setupDonationModalEvents(modal) {
        const closeBtn = modal.querySelector('.modal__close');
        const cancelBtn = modal.querySelector('#cancelDonation');
        const proceedBtn = modal.querySelector('#proceedDonation');
        const donationBtns = modal.querySelectorAll('.donation-btn');
        const customAmountDiv = modal.querySelector('.custom-amount');
        const overlay = modal.querySelector('.modal__overlay');
        
        let selectedAmount = null;
        
        // Close modal events
        [closeBtn, cancelBtn, overlay].forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    modal.remove();
                }
            });
        });
        
        // Donation amount selection
        donationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                donationBtns.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                
                if (this.dataset.amount === 'other') {
                    customAmountDiv.style.display = 'block';
                    selectedAmount = null;
                } else {
                    customAmountDiv.style.display = 'none';
                    selectedAmount = this.dataset.amount;
                }
            });
        });
        
        // Proceed to donation
        proceedBtn.addEventListener('click', function() {
            const customAmount = document.getElementById('customAmount').value;
            const finalAmount = selectedAmount || customAmount;
            
            if (!finalAmount || finalAmount <= 0) {
                showNotification('Por favor selecciona un monto válido', 'error');
                return;
            }
            
            // Simulate payment process
            showNotification(`¡Gracias por tu donación de $${finalAmount}! Procesando...`, 'success');
            modal.remove();
        });
    }
    
    // App info modal
    function showAppInfoModal() {
        const appModalHTML = `
            <div class="modal" id="appModal">
                <div class="modal__overlay">
                    <div class="modal__content">
                        <div class="modal__header">
                            <h3>Conexiones Especiales App</h3>
                            <button class="modal__close" type="button">&times;</button>
                        </div>
                        <div class="modal__body">
                            <p>Our app is currently in development and will be available soon!</p>
                            <h4>Features Coming Soon:</h4>
                            <ul>
                                <li>Create detailed athlete profiles</li>
                                <li>Find sports activities near you</li>
                                <li>Connect with other athletes</li>
                                <li>Join organized sports events</li>
                                <li>Track your sports activities</li>
                            </ul>
                            <p>Want to be notified when the app launches?</p>
                            <div class="form-group">
                                <input type="email" class="form-control" id="appNotifyEmail" placeholder="Enter your email">
                            </div>
                        </div>
                        <div class="modal__footer">
                            <button class="btn btn--primary" id="notifyMe">Notify Me</button>
                            <button class="btn btn--secondary" id="closeAppModal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', appModalHTML);
        const appModal = document.getElementById('appModal');
        
        // App modal event listeners
        const closeBtn = appModal.querySelector('.modal__close');
        const closeBtn2 = appModal.querySelector('#closeAppModal');
        const notifyBtn = appModal.querySelector('#notifyMe');
        const overlay = appModal.querySelector('.modal__overlay');
        
        [closeBtn, closeBtn2, overlay].forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    appModal.remove();
                }
            });
        });
        
        notifyBtn.addEventListener('click', function() {
            const email = document.getElementById('appNotifyEmail').value;
            if (email && email.includes('@')) {
                showNotification('¡Te notificaremos cuando la app esté lista!', 'success');
                appModal.remove();
            } else {
                showNotification('Por favor ingresa un email válido', 'error');
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            max-width: 400px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }
    
    // Add some interactive animations to cards
    const cards = document.querySelectorAll('.about__card, .goal-card, .step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // FAQ toggle functionality (if needed)
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        // Make questions clickable for better UX
        question.style.cursor = 'pointer';
        question.addEventListener('click', function() {
            // Simple toggle effect
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                question.style.color = '#FF4A9E';
            } else {
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                question.style.color = answer.style.display === 'none' ? '#FF1738' : '#FF4A9E';
            }
        });
    });
    
    console.log('Conexiones Especiales website loaded successfully! 🏃‍♀️⚽');
});