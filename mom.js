function MomObj() {
	this.x = drawWidth / 2;       //大鱼x坐标
	this.y = drawHeight / 2;      //大鱼y坐标
	this.angle = Math.PI;       //大鱼角度
	this.tail = [];	this.tailCount = 0;	this.tailTime = 0;	this.tailInterval = 50;	
	this.body = [];	this.bodyCount = 0;	
	this.eye = [];	this.eyeCount = 0;	this.eyeTime = 0;	this.eyeInterval = 2000;
	this.fruitCount = 0;  //嘴里的食物数量
}

MomObj.prototype.initMom = function () {
	this.x = drawWidth / 2;		//大鱼初始坐标
	this.y = drawHeight / 2;
	for(var i = 0; i < 8; i++) { //大鱼帧数预加载	
		this.tail[i] = new Image();
		this.tail[i].src = 'src/bigTail' + i + '.png';
	}
	for(var j =0; j < 8; j++) {
		this.body[j]=new Image();
		this.body[j].src='src/bigSwim' + j + '.png';
	}
	for(var k=0; k < 2; k++) {
		this.eye[k] = new Image();
		this.eye[k].src = 'src/bigEye' + k + '.png';
	}
}

MomObj.prototype.drawMom=function()
{
	/* function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
	}   
	function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
	} */
	
	this.x = lerpDistance(momX, this.x, 0.93);	//		大鱼跟随鼠标移动
	this.y = lerpDistance(momY, this.y, 0.93);
	
	var deltaY = momY - this.y;
	var deltaX = momX - this.x;
	var target = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(target, this.angle, 0.5);	//大鱼角度变化
	
	this.tailTime += deltaTime;
	if(this.tailTime > this.tailInterval) {
		this.tailCount++;
		this.tailCount %= 8;	//50ms换一帧，序号0~7
		this.tailTime %= 50;
	}
	
	this.bodyCount = this.fruitCount > 7 ? 7 : this.fruitCount;	//根据嘴中食物数量改变大鱼身体颜色
	
	this.eyeTime += deltaTime;
	if(this.eyeTime > this.eyeInterval) {
		this.eyeCount++;
		this.eyeCount %= 2;
		this.eyeTime %= 300;	
		this.eyeInterval = this.eyeCount ? 300 : 2000;	//300ms闭眼，2s睁眼
	}
	contextFront.save();
	contextFront.translate(this.x, this.y);
	contextFront.rotate(this.angle);
	contextFront.drawImage(this.tail[this.tailCount], 12, -this.tail[0].height / 2);
	contextFront.drawImage(this.body[this.bodyCount], -this.body[0].height / 2, -this.body[0].height / 2);
	contextFront.drawImage(this.eye[this.eyeCount], -this.eye[0].width*0.5, -this.eye[0].height / 2);	
	contextFront.restore();
}
