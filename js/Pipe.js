const gameWidth = gameDom.clientWidth;

// 水管类
class Pipe extends Rectangle {
    constructor(height, top, xSpeed, dom) {
        super(52, height, gameWidth, top, xSpeed, 0, dom);
    }

    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 水管对（一对水管）
class PipePare {
    constructor(speed) {
        this.spaceHeight = 150;  //水管对上下空间
        this.minHeight = 80;    //水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;  //水管最大高度

        const upHeight = getRandom(this.minHeight, this.maxHeight);  //上水管随机高度
        const downHeight = landTop - upHeight - this.spaceHeight;   //则下水管高度可得
        const downTop = landTop - downHeight;   // 则下水管top值

        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        const downDom = document.createElement('div');
        downDom.className = 'pipe down';

        // this.upPipe = new Pipe(?, 0, speed, ?); 
        // this.downPipe = new Pipe(?, ?, speed, ?);
        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

    // 该水管对是否溢出视野
    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }
}

/**
 * 水管对生产器
 */
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            // 移除视野外的水管对
            for (let i = 0; i < this.pairs.length; i++) {
                const pair = this.pairs[i];
                if (pair.useLess) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }

}

// var produce = new PipePareProducer(-100);
// produce.startProduce();
// setInterval(() => {
//     produce.pairs.forEach(pair => {
//         pair.move(16 / 1000);
//     })
// }, 16);