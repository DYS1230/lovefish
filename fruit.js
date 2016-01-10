function FruitObj()
{
	this.x=[];
	this.y=[];
	this.l=[];                   //食物大小
	this.alive=[];            //食物是否活着
	this.speed=[];            //食物生长速度及漂浮速度
	this.ate=[];             //食物是否可食
	this.parasitic=[];   //寄生id
	
	this.number=12;              //食物个数
	this.MIN_NUMBER=12;			//为了令游戏gameover时食物不会突然消失，详见date.js 
	//蓝，橙果实
	this.orange=new Image();
	this.blue=new Image();
	//彩虹果实
	this.qun_1=new Image();	
	this.qun_2=new Image();		
	this.qun_3=new Image();	
	this.qun_4=new Image();	
	this.qun_5=new Image();	
	
	this.fruitType=[];
}
FruitObj.prototype.initFruit=function()
{
	for(var i=0;i<this.number;i++)
	{
		this.alive[i]=false;
		this.ate[i]=false;
	}
	this.orange.src="src/orange.png";
	this.blue.src="src/blue.png";
	this.qun_1.src="src/qun_1.png";
	this.qun_2.src="src/qun_2.png";
	this.qun_3.src="src/qun_3.png";
	this.qun_4.src="src/qun_4.png";
	this.qun_5.src="src/qun_5.png";
	
}
FruitObj.prototype.born=function(i)
{
	var aneID=Math.floor( Math.random() * ane.number );     //寄生的海葵
	this.speed[i]=Math.random()*0.01+0.01;          //果实生长速度与漂浮速度
	this.x[i]=ane.changeX[aneID];			//食物x坐标随着海葵头部移动
	this.parasitic[i]=aneID;                     //寄生id赋值
	this.y[i]=drawHeight-ane.y[aneID];              
	this.l[i]=0;                                   //大小从零开始
	this.alive[i]=true;
	var temp=Math.floor( Math.random() * 5 ) ;             //果实颜色
	switch(temp)
	{
		case 0: this.fruitType[i]=this.qun_1;break;
		case 1: this.fruitType[i]=this.qun_2;break;
		case 2: this.fruitType[i]=this.qun_3;break;
		case 3: this.fruitType[i]=this.qun_4;break;
		case 4: this.fruitType[i]=this.qun_5;break;
		default: this.fruitType[i]=this.blue;break;
	}
	
}
FruitObj.prototype.drawFruit=function()
{
	this.monitor();
	if(deltaTime>=150)
	{
		deltaTime=150;	//防止食物无限增大	
	}
	for(var i=0;i<this.number;i++)
	{
		if(this.alive[i]==true)
		{
			if(this.l[i]<=20)
			{
				var tempID=this.parasitic[i];	//食物i寄生的海葵的编号
				this.l[i]+=this.speed[i]*deltaTime;	//食物增大
				this.x[i]=ane.changeX[tempID];		//x坐标随海葵头部移动
			}
			else
			{
				this.y[i]-=this.speed[i]*deltaTime*6;	//食物漂浮
				this.ate[i]=true;	//可以吃了
			}
			if(this.y[i]<=3)
			{
				this.alive[i]=false;		//食物出界
				this.ate[i]=false;
			}
			contextBack.drawImage(this.fruitType[i],this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);
		}
	}
}
FruitObj.prototype.monitor=function()
{
	var count=0;
	var rubbish=[];             //死了的果实
	for(i=0;i<this.number;i++)
	{
		if(this.alive[i]==true)
		{
			count++;	//计算活着的果实数量
		}
		else
		{
			rubbish.push(i);	//死了的果实编号放入rubbish
		}
	}
	if(count<this.MIN_NUMBER)	//	食物小于最小数目时食物再生
	{
		var newBorn=rubbish.splice(0,1);	//rubbish减去一
		this.born(newBorn);
	}
}