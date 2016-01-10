function BabyObj()
{
	this.x=0;
	this.y=0;
	this.angle=0;
	this.tail=[];	this.tailCount=0;	this.tailTime=0;	// 小鱼的图片，要显示图片的序号，时间
	this.body=[];	this.bodyCount=0;	this.bodyTime=0;  
	this.eye=[];	this.eyeCount=0;	this.eyeTime=0;		this.eyeInterval=2000;
}
BabyObj.prototype.initBaby=function()
{
	this.x=drawWidth/2-50;           //初始时小鱼的坐标
	this.y=drawHeight/2;
	this.angle=Math.PI;            //初始时小鱼的角度
	for(var i=0;i<8;i++)
	{   //图片预加载
		this.tail[i]=new Image();
		this.tail[i].src="src/babyTail"+i+".png";
	}
	for(var j=0;j<20;j++)
	{
		this.body[j]=new Image();
		this.body[j].src="src/babyFade"+j+".png";
	}
	for(var k=0;k<2;k++)
	{
		this.eye[k]=new Image();
		this.eye[k].src="src/babyEye"+k+".png";
	}
}
BabyObj.prototype.drawBaby=function()
{
		
	this.x=lerpDistance(mom.x-10, this.x, 0.98);       //跟随大鱼而动
	this.y=lerpDistance(mom.y, this.y, 0.98);      
	
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var target=Math.atan2(deltaY,deltaX)+Math.PI;         // 距离大鱼的角度tanθ
	this.angle=lerpAngle(target,this.angle,0.5);     //跟随大鱼的角度
	
	this.tailTime+=deltaTime;               //时间累积
	if(this.tailTime>50)
	{
		this.tailCount++;            //序号变化
		this.tailCount%=8;          //序号永远为 0~7
		this.tailTime%=50;         // 50ms变一次
	}
	
	this.bodyTime+=deltaTime;      //时间累积
	if(this.bodyTime>200)
	{
		if(this.bodyCount!=19)
		{
			this.bodyCount++;          //序号变化
			this.bodyCount%=20;        //序号为0~19
			this.bodyTime%=200;       // 200ms 变一次
		}
		else
		{
			data.gameover=true;					 //小鱼死了
		}
	}
	
	this.eyeTime+=deltaTime;
	if(this.eyeTime>this.eyeInterval)
	{
		this.eyeCount++;
		this.eyeCount%=2;         //序号为0~1
		this.eyeTime%=300;           
		this.eyeInterval= (this.eyeCount)?300:2000;          //闭眼300ms 睁眼2000ms
	}
	contextFront.save();
	contextFront.translate(this.x,this.y);             //改变原点
	contextFront.rotate(this.angle);                //选择角度
	contextFront.drawImage(this.tail[this.tailCount],9,-this.tail[0].height/2);   //尾巴位置
	contextFront.drawImage(this.body[this.bodyCount],-this.body[0].height/2,-this.body[0].height/2);//身体位置
	contextFront.drawImage(this.eye[this.eyeCount],-this.eye[0].width*0.5,-this.eye[0].height/2);//眼睛位置
	contextFront.restore();
}