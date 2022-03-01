/**
 * 可移动矩形: 宽，高，横坐标，纵坐标，横向速度，纵向速度，对应dom对象
 * 横向速度单位：像素/秒
 * 纵向速度单位：像素/秒
 */
class Rectangle {
	constructor(width, height, left, top, xSpeed, ySpeed, dom) {
		this.width = width;
		this.height = height;
		this.left = left;
		this.top = top;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.dom = dom;
		this.render();
	}

	render() {
		this.dom.style.width = this.width + 'px';
		this.dom.style.height = this.height + 'px';
		this.dom.style.left = this.left + 'px';
		this.dom.style.top = this.top + 'px';
	}

	/**
	 * 根据速度和移动的时间(单位：秒)，得出移动距离
	 * @param {*} duration 
	 */
	move(duration) {
		const xDis = this.xSpeed * duration;
		const yDis = this.ySpeed * duration;
		this.left = this.left + xDis;
		this.top = this.top + yDis;

		// 重新渲染前，需要做一些事情
		if (this.onMove) {
			this.onMove();
		}

		this.render();
	}
}