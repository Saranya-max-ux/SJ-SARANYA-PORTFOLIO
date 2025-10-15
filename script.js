// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Make all sections visible by default
document.querySelectorAll('section').forEach(section => {
    section.classList.add('visible');
});

// Scroll-triggered animations for education and experience cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Make all timeline items visible immediately (no animations)
document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.add('animate-in');
});

// Make all timeline containers visible immediately (no animations)
document.querySelectorAll('.timeline').forEach(timeline => {
    timeline.classList.add('animate-in');
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);
        
        try {
            console.log('Form submitted:', formProps);
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    });
}

// Add CSS for scroll-to-top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-top-btn.show {
        opacity: 1;
        visibility: visible;
    }

    .scroll-top-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .success-message,
    .error-message {
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 5px;
        text-align: center;
    }

    .success-message {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;
document.head.appendChild(style);

// Sara AI Chatbot Functionality
const chatbotContainer = document.getElementById('sara-chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

let isOpen = false;

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        chatbotContainer.classList.add('active');
        chatbotInput.focus();
    } else {
        chatbotContainer.classList.remove('active');
    }
});

// Chatbot responses
const chatbotResponses = {
    'hello': 'Hello! I\'m Sara AI, your portfolio assistant. I can tell you about my projects, skills, experience, and more!',
    'hi': 'Hi there! I\'m Sara AI. Ask me anything about my portfolio!',
    'projects': 'I have several exciting projects! Here are some highlights:\n\n🤖 AI Agent - Web automation with Playwright and Google Gemini 2.0\n💼 Personal Assistant - Python assistant with sentiment analysis\n❤️ Heart Attack Risk Prediction - ML pipeline for healthcare\n💬 Sentiment Analysis Chatbot - AI-powered customer feedback analysis\n💳 Credit Card Fraud Detection - ML system with explainable AI\n📚 Attendance Management System - Java-based educational system\n🚂 Railway Booking System - Java reservation system\n📊 AI-Powered Customer Insights - Financial data analytics\n\nWhich project would you like to know more about?',
    'skills': 'My technical skills include:\n\n🐍 Python (90%)\n☕ Java (85%)\n🤖 AI/ML (85%)\n🌐 Full Stack Development (80%)\n📊 Data Analytics (80%)\n🔧 Machine Learning (85%)\n💾 MySQL (75%)\n🎨 Frontend Development (70%)\n\nI specialize in AI, Generative AI, NLP, LLMs, and Full Stack Development!',
    'experience': 'I have diverse experience in AI and Full Stack Development:\n\n🏢 GenAI-Powered Data Analytics (Tata iQ - Forage)\n💻 Java Full Stack Web Development (TAP Academy)\n🤖 AI Intern (Teachnook)\n\nI\'ve worked on sentiment analysis, web automation, machine learning, and data analytics projects!',
    'education': 'I\'m pursuing B.Tech with 85% marks, completed Intermediate with 68%, and 10th grade with 87%. I\'m passionate about AI and Full Stack Development!',
    'contact': 'You can reach me at:\n📧 sjsaranyasara@gmail.com\n🌍 India\n🔗 LinkedIn: linkedin.com/in/sj-saranya-607974257\n💻 GitHub: github.com/Saranya-max-ux',
    'about': 'I\'m a passionate Full Stack Developer and AI Engineer specializing in Generative AI, NLP, LLMs, and Machine Learning. I combine cutting-edge AI technologies with robust full-stack development to create innovative solutions that solve real-world problems.',
    'default': 'I\'m not sure about that. I can help you with information about my projects, skills, experience, education, or contact details. What would you like to know?'
};

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(chatbotResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return chatbotResponses.default;
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Auto-open chatbot after 3 seconds
setTimeout(() => {
    if (!isOpen) {
        chatbotContainer.classList.add('active');
        isOpen = true;
    }
}, 3000); 