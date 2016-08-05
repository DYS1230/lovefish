function WaveObj() {
	this.x = [];
	this.y = [];
	this.r = [];
	this.number = 10;	//波浪最大数目
	this.alpha = [];	//波浪透明度
	this.alive = [];	//波浪是否存在
	this.color = [];	//波浪颜色
}

WaveObj.prototype.initWave = function () {
	for (var i = 0; i < this.number; i++) {
		this.alive[i] = false;	//初始化，定义所有波浪不存在
	}
}

WaveObj.prototype.drawWave = function () {
	for (var i=0; i < this.number; i++) {
		if (this.alive[i]) {		//倘若波浪存在，绘制波浪
			this.r[i] += deltaTime * 0.05;	//波浪半径变化
			var alpha = 1 - (this.r[i] - 20) / 50;	//波浪透明度，随着半径增大为透明
			if ( this.r[i] > 70) {
				this.alive[i] = false;	//波浪半径大于70后，波浪消失，且不再绘制
				break;					//因为若r>70，透明度会变成负数，负数会变1，为了防止负数时绘制
			}
			contextBack.save();
			contextBack.beginPath();
			contextBack.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			contextBack.lineWidth = 2 ;	//圆弧的宽度
			contextBack.globalAlpha = alpha;	//圆弧透明度
			contextBack.strokeStyle = this.color[i];
			contextBack.shadowBlur = 10;
			contextBack.shadowColor = this.color[i];
			contextBack.stroke();
			contextBack.restore();
		}
	}
}
WaveObj.prototype.born = function (x, y, type) {	//type为1时，是食物，2是小鱼
	for (var i = 0; i < this.number; i++) {	//找出可以"重生"的波浪
		if(this.alive[i] == false) {
			this.x[i] = x;	//波浪坐标为小鱼/食物坐标
			this.y[i] = y;
			this.r[i] = 20;	//初始化半径为20
			this.alive[i] = true;
			if (type == 1) {
				var temp = Math.floor(Math.random() * 6)	//随机定义波浪颜色
				this.color[i] = color[temp];
			}
			else {
				this.color[i] = 'orange';	//触碰小鱼，波浪颜色为橙色
			}
			break;	//重生完走人
		}
	}
}