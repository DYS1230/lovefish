function AneObj()
{
	this.x=[];             //海葵的x坐标
	this.y=[];            // 海葵的y坐标
	this.changeX=[];      //海葵头部x坐标
	this.number=50;       //海葵数量
	this.randomColor=[];    //海葵魔性颜色
	this.alpha=0;
}
AneObj.prototype.initAne=function()    //初始化海葵
{
	for(var i=0;i<this.number;i++)
	{
		this.x[i]=16*i+Math.random()*20;     //海葵x坐标
		this.y[i]=150+Math.random()*50;      //海葵y坐标
		this.randomColor[i]=rndScope(0,6);      //海葵彩虹色,
		/*function rndScope(min, max){
			return parseInt((Math.random()*999999)%(max-min+1))+min;//生成一范围在min ~ max 间的随机数。
		}*/
	}
	
};
AneObj.prototype.drawAne=function()
{
	this.alpha+=deltaTime * 0.001;		
	this.alpha%=Math.PI * 2;
	var temp=Math.sin(this.alpha);	//海葵头部移动根据正弦函数移动
	contextBack.save();	
	for(var i=0;i<this.number;i++)
	{	
		contextBack.beginPath();                 //开始路径
		contextBack.moveTo(this.x[i],drawHeight); // 把坐标移动到x坐标处
		//contextBack.lineTo(this.x[i],drawHeight-this.y[i]); //移动到海葵的高度
		this.changeX[i]=this.x[i]+50*temp;
		contextBack.quadraticCurveTo(this.x[i],drawHeight-100,this.changeX[i],drawHeight-this.y[i]);
		contextBack.strokeStyle='purple';    //海葵颜色
	/*	
	//	魔性海葵
		var randomNum=rndScope(0,6);
		contextBack.strokeStyle=color[randomNum];
	*/
	/*
	//	彩虹葵
		contextBack.strokeStyle=color[this.randomColor[i]];
	*/
		contextBack.globalAlpha=0.5;          //海葵透明度
		contextBack.lineWidth=20;           //海葵宽度
		contextBack.lineCap="round"         //海葵头部是圆的
		contextBack.stroke();              //把颜色涂上去
	}
	contextBack.restore();
};