class Game {
	constructor() {
		this.sky = new Sky();
		this.land = new Land(-100);
		this.bird = new Bird();
		this.produce = new PipePareProducer(-100);
		this.timer = null;
		this.tick = 16;  //移动时间间隔， 毫秒
		this.gameOver = false;
		this.pause = false;
		this.score = 0;
	}

	start() {
		if (this.timer) {
			return;
		}
		if (this.gameOver) {
			window.location.reload();   //刷新页面
		}
		this.bird.startSwing();
		this.produce.startProduce();
		this.timer = setInterval(() => {
			const duration = this.tick / 1000;
			this.sky.move(duration);
			this.land.move(duration);
			this.bird.move(duration);
			this.produce.pairs.forEach(pair => {
				pair.move(duration);
			});
			if (this.isGameOver()) {
				this.stop();
				this.gameOver = true;
				this.statusPage();
			}
		}, this.tick);
	}

	// count(pipe) {
	//     if (this.bird.left > pipe.left + pipe.width) {
	//         this.score++;
	//         console.log(this.score);
	//     }
	// }

	statusPage() {
		const overDom = document.querySelector('.game #title');
		const h2Dom = document.querySelector('.game #title h2');
		const pDom = document.querySelector('.game #title p');

		if (this.gameOver) {
			overDom.className = 'over';
			h2Dom.innerHTML = '游戏结束';
			pDom.innerHTML = '按Enter重新开始';
		} else if (this.pause) {
			overDom.className = 'over';
			h2Dom.innerHTML = '游戏暂停';
			pDom.innerHTML = '按Enter继续游戏';
		} else {
			overDom.className = '';
		}
	}

	stop() {
		clearInterval(this.timer);
		this.timer = null;
		this.bird.stopSwing();
		this.produce.stopProduce();
	}

	regEvent() {
		window.onkeydown = e => {
			if (e.key === 'Enter') {
				if (this.timer) {
					this.stop();
					this.pause = true;
					this.statusPage();
				} else {
					this.start();
					this.pause = false;
					this.statusPage();
				}
			}
			if (e.key === ' ') {
				this.bird.jump();
			}
		}
	}

	/**
	 * 矩形碰撞检测
	 * @param {*} rect1 
	 * @param {*} rect2 
	 */
	isHit(rect1, rect2) {
		// 横向：两个矩形的中心点的横向距离，是否小于两者宽度之和的一半
		// 纵向：两个矩形的中心点的纵向距离，是否小于两者高度之和的一半
		const centerX1 = rect1.left + rect1.width / 2;
		const centerY1 = rect1.top + rect1.height / 2;
		const centerX2 = rect2.left + rect2.width / 2;
		const centerY2 = rect2.top + rect2.height / 2;
		const disX = Math.abs(centerX1 - centerX2);  //两个矩形中心点横向距离
		const disY = Math.abs(centerY1 - centerY2);  //两个矩形中心点纵向距离

		if (disX < (rect1.width + rect2.width) / 2 &&
			disY < (rect1.height + rect2.height) / 2) {
			return true;
		}
		return false;
	}


	isGameOver() {
		if (this.bird.top === this.bird.maxY) {
			// 鸟碰到了大地
			return true;
		}
		for (let i = 0; i < this.produce.pairs.length; i++) {
			const pair = this.produce.pairs[i];
			if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
				return true;
			}
		}
		return false;
	}
}

var g = new Game();
g.regEvent();