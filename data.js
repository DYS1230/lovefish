function DataObj()
{
	this.gameover=false;	//	游戏是否结束标志
	this.score=0; 			//	分数
	this.alpha=0;			//	gameover显现时透明度从0到1
}
DataObj.prototype.initData=function()
{
	this.score=0;			
}
DataObj.prototype.drawData=function()
{

	contextFront.save();
	contextFront.font="30px Verdana";	//分数绘制
	contextFront.textAlign="center"
	var gradient=contextFront.createLinearGradient(drawWidth/2-contextFront.measureText("score :"+this.score).width/2,0,drawWidth/2+contextFront.measureText("score :"+this.score).width/2,0);
	gradient.addColorStop("0.00","red");	
	gradient.addColorStop("0.50","orange");
	gradient.addColorStop("1.0","yellow");
	contextFront.fillStyle=gradient;
	contextFront.fillText("score :"+this.score,drawWidth/2,50);  //context.measureText(text).width
	contextFront.restore();
	
}
DataObj.prototype.monitor=function()
{
	if(this.gameover==true)	
	{
		drawFront.onmousemove=null;	//死亡后鼠标移动废了
		fruit.MIN_NUMBER=0;			//食物最小数目归零，但当前食物还在
		contextFront.save();
		contextFront.shadowBlur=10;
		contextFront.shadowColor="white";
		contextFront.font="30px Verdana";
		contextFront.textAlign="center"
		this.alpha+=deltaTime *0.0005;	//gameover的透明度
		if(this.alpha>=1)
			this.alpha=1;
		contextFront.fillStyle="rgba(255,255,255," + this.alpha + ")";
		contextFront.fillText("GameOver",drawWidth/2,drawHeight/2);
		contextFront.restore();
	}
}
