function DustObj() {
	this.x = [];
	this.y = []; 
	this.number = 50;          //尘埃数量
	this.range = [];            //振动幅度
	this.alpha = 0;            //角度
	this.dustPic = [];         //图片
	this.picNumber = [];        //尘埃为第几张图片
}

DustObj.prototype.initDust = function () {
	for (var i = 0; i < 7; i++) {     //预加载
		this.dustPic[i] = new Image();
		this.dustPic[i].src = 'src/dust' + i + '.png';
	}
	for (var j = 0 ; j < this.number; j++) {
		this.x[j] = Math.random() * drawWidth;      //随机定义尘埃x，y坐标，尘埃幅度
		this.y[j] = Math.random() * drawHeight;
		this.range[j] = Math.random() * 50 + 30;    
		this.picNumber[j] = Math.floor(Math.random() * 6);      //尘埃为第几张图片
	}
}

DustObj.prototype.drawDust=function() { 
	this.alpha += deltaTime * 0.001;
	this.alpha %= Math.PI * 2;
	var temp = Math.sin(this.alpha);         //尘埃以正弦函数移动
	
	for (var i = 0; i < this.number; i++) {
		contextBack.drawImage(this.dustPic[this.picNumber[i]], this.x[i] + this.range[i] * temp, this.y[i]);
	}
}