// 好朋友之间的关心话语
const loveMessages = [
    "记得按时吃饭",
    "好好休息，别太累",
    "有我在，别担心",
    "记得照顾好自己",
    "有什么困难就说",
    "要多喝热水呀",
    "记得早睡早起",
    "别熬夜太晚啦",
    "有空一起出去玩",
    "有什么不开心就找我聊",
    "记得保暖，别着凉",
    "工作再忙也要休息",
    "记得给家人打电话",
    "有想不开的事情就说",
    "记得运动保持健康",
    "心情不好可以找我",
    "记得开心每一天",
    "再忙也要好好吃饭",
    "记得给自己放个假",
    "有我在身边陪着你",
    "不要给自己太大压力",
    "累了就停下来歇歇",
    "记得微笑面对每一天",
    "有难题我们一起解决",
    "别把事情都憋在心里",
    "记得给自己买点好吃的",
    "记得出门带伞",
    "别一个人默默承受",
    "记得多和朋友联系",
    "有委屈就说出来",
    "记得给自己点鼓励",
    "别总是委屈自己",
    "记得享受生活的小美好",
    "累了就好好睡一觉",
    "记得保持好心情",
    "有什么事别一个人扛",
    "记得给自己一个拥抱",
    "别给自己设限",
    "记得追逐自己的梦想",
    "有快乐要一起分享",
    "记得善待自己",
    "别忘记你其实很棒",
    "记得相信自己",
    "有烦恼就不要硬撑",
    "记得给自己奖励",
    "别总是为难自己",
    "记得保持初心",
    "有梦想就要去追",
    "记得每天给自己点赞",
    "别把自己弄得太累",
    "记得保持童真",
    "有困惑就多问问",
    "记得保持乐观心态",
    "别总是一个人待着",
    "记得培养兴趣爱好",
    "有压力就释放出来",
    "记得给自己安全感",
    "别让负能量占据内心",
    "记得拥抱阳光",
    "有事要记得说",
    "记得保持好奇心",
    "别失去对生活的热情",
    "记得给自己加油打气",
    "有需要随时找我",
    "记得保持正能量",
    "别忘记生活的美好",
    "记得给生活加点甜",
    "有快乐记得笑出来",
    "记得保持好睡眠",
    "别让忙碌偷走快乐",
    "记得给自己充电",
    "有事没事多联系",
    "记得保持身心健康",
    "别让焦虑占据内心",
    "记得好好爱自己",
    "有目标就去实现",
    "记得保持好习惯",
    "别让生活失去色彩",
    "记得给自己温暖",
    "有想法就去尝试",
    "记得保持年轻心态",
    "别让压力压垮自己",
    "记得给生活调味",
    "有阳光就有希望",
    "记得保持感恩心",
    "别忘记自己的价值",
    "记得给未来希望",
    "有友谊就有力量",
    "记得保持热情",
    "别让困难打倒你",
    "记得给心灵放假",
    "有梦想就有方向",
    "记得保持善良",
    "别忘记生活的意义",
    "记得给自己信心",
    "有爱就有力量"
];

// 标签颜色类
const tagColors = ['tag-red', 'tag-pink', 'tag-purple', 'tag-blue', 'tag-yellow', 'tag-green'];

// 存放活跃标签的数组
const activeTags = [];

// 语音播放状态
let isVoiceEnabled = true;

// 播放语音函数
function playVoice(text) {
    // 检查是否启用语音
    if (!isVoiceEnabled) return;
    
    // 检查浏览器是否支持语音合成
    if ('speechSynthesis' in window) {
        // 停止正在播放的语音，避免叠加
        speechSynthesis.cancel();
        
        // 创建语音合成对象
        const utterance = new SpeechSynthesisUtterance(text);
        
        // 设置语音参数
        utterance.lang = 'zh-CN'; // 中文
        utterance.rate = 0.9; // 速度稍慢
        utterance.pitch = 1; // 音调
        utterance.volume = 0.7; // 音量
        
        // 选择最适合的中文声音
        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
            voice.lang.startsWith('zh-CN') && voice.name.includes('Xiaoxiao')
        ) || voices.find(voice => voice.lang.startsWith('zh-CN')) 
        || voices.find(voice => voice.lang.startsWith('zh'));
        
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        // 播放语音
        speechSynthesis.speak(utterance);
    }
}

// 创建随机位置的标签
function createRandomTag() {
    const wrapper = document.querySelector('.heart-wrapper');

    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];

    const tag = document.createElement('div');
    tag.className = `heart-tag ${randomColor}`;
    tag.textContent = randomMessage;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 出现点：屏幕外环
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(window.innerWidth, window.innerHeight) * 0.6;
    const startX = centerX + Math.cos(angle) * radius;
    const startY = centerY + Math.sin(angle) * radius;

    tag.style.left = startX + 'px';
    tag.style.top = startY + 'px';
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.5)';

    wrapper.appendChild(tag);
    activeTags.push(tag);

    playVoice(randomMessage);

    // ✅ 中央“聚集区” → 更大范围更柔和
    const clusterRadiusX = window.innerWidth * 0.35;  
    const clusterRadiusY = window.innerHeight * 0.35; 

    setTimeout(() => {
        tag.style.transition = 'all 0.9s cubic-bezier(.25,.8,.25,1)';
        tag.style.left = centerX + (Math.random() * clusterRadiusX - clusterRadiusX / 2) + 'px';
        tag.style.top = centerY + (Math.random() * clusterRadiusY - clusterRadiusY / 2) + 'px';
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
    }, 20);

    tag.addEventListener('click', () => scatterTag(tag));
    setTimeout(() => scatterTag(tag), 6000 + Math.random() * 3000);
}



// 移除标签
function removeTag(tag) {
    if (!tag.parentNode) return;
    
    tag.style.transition = 'all 2s ease-in';
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.3) translateY(-50px)';
    
    setTimeout(() => {
        tag.remove();
        const index = activeTags.indexOf(tag);
        if (index > -1) {
            activeTags.splice(index, 1);
        }
    }, 2000);
}

// 持续生成标签循环
function startTagCycle() {
    // 立即创建第一个标签
    createRandomTag();
    
    // 每隔一段时间创建新标签
    function nextTag() {
        createRandomTag();
        // 随机间隔 0.3-0.8 秒（加快出现速度）
        const delay = 150 + Math.random() * 300;
        setTimeout(nextTag, delay);
    }
    
    setTimeout(nextTag, 500 + Math.random() * 500);
}

// 创建粒子动画
function createParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小改变时重置
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 添加浪漫的效果
function addLoveEffects() {
    // 随机让某些活跃标签闪烁
    setInterval(() => {
        if (activeTags.length > 0) {
            const randomTag = activeTags[Math.floor(Math.random() * activeTags.length)];
            if (randomTag && randomTag.parentNode) {
                randomTag.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    if (randomTag.parentNode) {
                        randomTag.style.transform = '';
                    }
                }, 300);
            }
        }
    }, 2000);
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    // 预加载语音系统
    if ('speechSynthesis' in window) {
        // 强制获取可用的声音列表
        speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices();
        };
    }
    
    startTagCycle();
    createParticles();
    addLoveEffects();
});

function scatterTag(tag) {
    if (!tag.parentNode) return;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.max(window.innerWidth, window.innerHeight) * 0.8;

    tag.style.transition = 'all 1.5s ease-in';
    tag.style.opacity = '0';
    tag.style.transform = `scale(0.3) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(180deg)`;

    setTimeout(() => {
        tag.remove();
        const index = activeTags.indexOf(tag);
        if (index > -1) activeTags.splice(index, 1);
    }, 1500);
}
