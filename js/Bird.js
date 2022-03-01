const birdDom = document.querySelector('.game .bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //向下加速度，单位：像素/秒²
        // 最大y坐标
        this.maxY = gameHeight - landHeight - this.height;
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }

    // 扇动翅膀
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus++;
            if (this.swingStatus === 4) {
                this.swingStatus = 1;
            }
            this.render();
        }, 300);
    }

    // 暂停，停止
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration) {
        super.move(duration);
        // 通过加速度改变速度向下移动 vt = v0 + at;
        this.ySpeed += this.g * duration;
    }

    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    // 小鸟向上跳动
    jump() {
        this.ySpeed = -450;
    }
}

// var bird = new Bird();
// setInterval(() => {
//     bird.move(16 / 1000);
// }, 16)