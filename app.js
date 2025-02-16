const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'home',
            currentSlide: 0,
            newMessage: '',
            navItems: [
                { id: 'home', name: '关于我' },
                { id: 'chat', name: 'AI助手' },
                { id: 'portfolio', name: '作品展示' }
            ],
            profile: {
                name: '你的名字',
                title: '前端开发工程师 / 设计爱好者',
                description: '致力于创造简洁优雅的用户界面，热爱技术与设计的结合。',
                email: 'your.email@example.com'
            },
            messages: [
                { text: '👋 你好！我是AI助手，很高兴认识你！', isUser: false }
            ],
            portfolio: [
                { url: 'image1.jpg', description: '项目1' },
                { url: 'image2.jpg', description: '项目2' },
                { url: 'image3.jpg', description: '项目3' }
            ],
            socialLinks: [
                { platform: 'github', url: '#', icon: 'fab fa-github' },
                { platform: 'linkedin', url: '#', icon: 'fab fa-linkedin' },
                { platform: 'instagram', url: '#', icon: 'fab fa-instagram' },
                { platform: 'twitter', url: '#', icon: 'fab fa-twitter' }
            ]
        }
    },
    computed: {
        carouselStyle() {
            return {
                transform: `translateX(-${this.currentSlide * 100}%)`
            }
        }
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim()) {
                // 添加用户消息
                this.messages.push({
                    text: this.newMessage,
                    isUser: true
                });
                
                const userMessage = this.newMessage;
                this.newMessage = '';

                // 模拟AI回复
                setTimeout(() => {
                    this.botReply(userMessage);
                }, 1000);
            }
        },
        botReply(userMessage) {
            const replies = [
                "这是一个很有趣的观点！",
                "我明白你的想法，让我们继续探讨这个话题。",
                "确实如此，你说得很对。",
                "这让我想到了一些相关的内容...",
                "我需要更多信息来理解你的想法。"
            ];
            
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            this.messages.push({
                text: randomReply,
                isUser: false
            });

            // 滚动到最新消息
            this.$nextTick(() => {
                const chatMessages = this.$refs.chatMessages;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.portfolio.length;
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.portfolio.length) % this.portfolio.length;
        }
    }
}).mount('#app') 