class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.nextButton = document.querySelector('.next');
        this.prevButton = document.querySelector('.prev');
        this.dotsContainer = document.querySelector('.carousel-dots');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // 创建轮播点
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // 添加事件监听
        this.nextButton.addEventListener('click', () => this.nextSlide());
        this.prevButton.addEventListener('click', () => this.prevSlide());
        
        // 鼠标悬停时暂停自动播放
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());

        // 开始自动播放
        this.startAutoPlay();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.track.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.goToSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(this.currentSlide);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

class ChatBot {
    constructor() {
        this.messages = document.getElementById('chatMessages');
        this.input = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendMessage');
        
        this.init();
    }

    init() {
        // 发送按钮点击事件
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // 输入框回车事件
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    // 添加消息到对话框
    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        this.messages.appendChild(messageDiv);
        
        // 滚动到最新消息
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    // 发送消息
    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            // 添加用户消息
            this.addMessage(message, true);
            
            // 清空输入框
            this.input.value = '';
            
            // 模拟AI回复
            setTimeout(() => {
                this.botReply(message);
            }, 1000);
        }
    }

    // AI回复逻辑
    botReply(userMessage) {
        // 这里可以添加更复杂的回复逻辑
        const replies = [
            "这是一个很有趣的观点！",
            "我明白你的想法，让我们继续探讨这个话题。",
            "确实如此，你说得很对。",
            "这让我想到了一些相关的内容...",
            "我需要更多信息来理解你的想法。"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        this.addMessage(randomReply);
    }
}

// 当页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    new ChatBot();
}); 