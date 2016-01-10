var drawFront=null;    //获取canvas id=front      绘制鱼的
var drawBack=null;     //获取canvas id=back    绘制背景，海葵，食物
var contextFront=null;  //   front 的 context
var contextBack=null;   //   back  的 context 
var drawHeight=0;         // 画布高度
var drawWidth=0;        //画布宽度
var backgroundPic=new Image();   //定义背景

var ane={};       //海葵
var fruit={};     //食物
var mom={};     // 大鱼
var momX=0;     //大鱼x坐标
var momY=0;     //大鱼y坐标
var baby={};    //小鱼
var data={};    //分数
var dust={};    //漂浮物
var wave={};	//波浪

var color=['red','yellow','green','teal','blue','purple','orange'];  //魔性海葵颜色
var lastTime=0;           // 上一次循环的时间
var deltaTime=0;          // 两次循环间隔的时间

window.onload=function()
{
	init();        //初始化
	move();        //鼠标的移动
	loop();        //画布循环，即动作的循环
}


function init(){
	lastTime=Date.now();        //上一次循环的时间
	drawFront=document.getElementById("front");     //获取canvas
	drawBack=document.getElementById("back");
	
	contextFront=drawFront.getContext("2d");        //获取 context
	contextBack=drawBack.getContext("2d");
	drawHeight=drawFront.height;            //画布高、宽度
	drawWidth=drawFront.width;
	
	backgroundPic.src="src/background.jpg";  //背景图片
	
	ane=new AneObj();                 //海葵
	ane.initAne();                     //海葵初始化
	
	fruit=new FruitObj();           //食物
	fruit.initFruit();               //食物初始化
	
	momX=drawWidth/2;         //大鱼初始坐标
	momY=drawHeight/2;        //大鱼初始坐标，不在此处定义的话坐标会是0,0

	mom=new MomObj();         //大鱼
	mom.initMom();          //大鱼初始化
	
	baby=new BabyObj();        //小鱼
	baby.initBaby();        //小鱼初始化
	
	data=new DataObj();       //数据
	data.initData();
	
	dust=new DustObj();     //漂浮物
	dust.initDust();
	
	wave=new WaveObj();		//波浪
	wave.initWave();
}
function loop()
{
	window.requestAnimFrame(arguments.callee);  //循环函数，html5新的循环函数，在commonFunctions里面
	var now=Date.now();            // 循环了一次，现在的时间
	deltaTime=now-lastTime;        // 两次循环间隔时间
	lastTime=now;                  // 把上一次时间定义为现在循环的时间
	
	drawBackground();             //绘制背景
	ane.drawAne();               //绘制海葵
	fruit.monitor();           // 食物监视，保证食物数量
	fruit.drawFruit();          // 绘制食物
	
	contextFront.clearRect(0,0,drawWidth,drawHeight);     //清除上一层的画布
	mom.drawMom();          //画大鱼      
	baby.drawBaby();        //画小鱼
	
	momFruitCollision();          // 大鱼吃东西
	momBabyCollision();           // 大鱼喂小鱼
	
	data.drawData();              //数据绘制
	data.monitor();
	
	dust.drawDust();		//尘埃绘制
	
	wave.drawWave();	//波浪绘制
}

function move()
{
	drawFront.onmousemove=function(event)
	{
		
		momX=event.offsetX;             //大鱼要到达的x坐标
		momY=event.offsetY;             //大鱼要到达的y坐标
	}
}