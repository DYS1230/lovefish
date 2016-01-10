function momFruitCollision()        //大鱼果实碰撞
{
	var distance=0;
	if(data.gameover==false)	//游戏未结束可以碰撞，结束后碰撞不了
	{
		for(var i=0;i<fruit.number;i++)
		{
			if(fruit.ate[i]==true)	//看食物是否可以食用
			{
				distance=Math.pow(mom.x - fruit.x[i], 2) + Math.pow(mom.y - fruit.y[i], 2);//勾股定理
				if(distance <900)
				{
					fruit.alive[i]=false;	//食物死了
					data.score+=100;		//分数加100
					mom.fruitCount+=1;		//大鱼口中食物加1，可以变化大鱼身体颜色
					wave.born(fruit.x[i],fruit.y[i],1/*碰到的是食物*/);
					if(fruit.fruitType[i]==fruit.qun_2)	//碰到红色圈圈就死亡
					{
						data.gameover=true;
					}	
				}
			}
		}
	}
}
function momBabyCollision()       //喂食
{
	if(data.gameover==false)
	{
		var distance=0;
		distance=Math.pow(mom.x - baby.x, 2) + Math.pow(mom.y - baby.y, 2);
		if(distance <900 && mom.fruitCount!=0)
		{
				wave.born(baby.x,baby.y,2/*碰到的是小鱼*/);
				baby.bodyCount=0;   //喂食后小鱼满血复活
				mom.fruitCount=0;   //大鱼嘴里食物归零
		}
	}
}
