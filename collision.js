function momFruitCollision()        //�����ʵ��ײ
{
	var distance=0;
	if(data.gameover==false)	//��Ϸδ����������ײ����������ײ����
	{
		for(var i=0;i<fruit.number;i++)
		{
			if(fruit.ate[i]==true)	//��ʳ���Ƿ����ʳ��
			{
				distance=Math.pow(mom.x - fruit.x[i], 2) + Math.pow(mom.y - fruit.y[i], 2);//���ɶ���
				if(distance <900)
				{
					fruit.alive[i]=false;	//ʳ������
					data.score+=100;		//������100
					mom.fruitCount+=1;		//�������ʳ���1�����Ա仯����������ɫ
					wave.born(fruit.x[i],fruit.y[i],1/*��������ʳ��*/);
					if(fruit.fruitType[i]==fruit.qun_2)	//������ɫȦȦ������
					{
						data.gameover=true;
					}	
				}
			}
		}
	}
}
function momBabyCollision()       //ιʳ
{
	if(data.gameover==false)
	{
		var distance=0;
		distance=Math.pow(mom.x - baby.x, 2) + Math.pow(mom.y - baby.y, 2);
		if(distance <900 && mom.fruitCount!=0)
		{
				wave.born(baby.x,baby.y,2/*��������С��*/);
				baby.bodyCount=0;   //ιʳ��С����Ѫ����
				mom.fruitCount=0;   //��������ʳ�����
		}
	}
}
