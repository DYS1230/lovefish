function AneObj()
{
	this.x=[];             //������x����
	this.y=[];            // ������y����
	this.changeX=[];      //����ͷ��x����
	this.number=50;       //��������
	this.randomColor=[];    //����ħ����ɫ
	this.alpha=0;
}
AneObj.prototype.initAne=function()    //��ʼ������
{
	for(var i=0;i<this.number;i++)
	{
		this.x[i]=16*i+Math.random()*20;     //����x����
		this.y[i]=150+Math.random()*50;      //����y����
		this.randomColor[i]=rndScope(0,6);      //�����ʺ�ɫ,
		/*function rndScope(min, max){
			return parseInt((Math.random()*999999)%(max-min+1))+min;//����һ��Χ��min ~ max ����������
		}*/
	}
	
};
AneObj.prototype.drawAne=function()
{
	this.alpha+=deltaTime * 0.001;		
	this.alpha%=Math.PI * 2;
	var temp=Math.sin(this.alpha);	//����ͷ���ƶ��������Һ����ƶ�
	contextBack.save();	
	for(var i=0;i<this.number;i++)
	{	
		contextBack.beginPath();                 //��ʼ·��
		contextBack.moveTo(this.x[i],drawHeight); // �������ƶ���x���괦
		//contextBack.lineTo(this.x[i],drawHeight-this.y[i]); //�ƶ��������ĸ߶�
		this.changeX[i]=this.x[i]+50*temp;
		contextBack.quadraticCurveTo(this.x[i],drawHeight-100,this.changeX[i],drawHeight-this.y[i]);
		contextBack.strokeStyle='purple';    //������ɫ
	/*	
	//	ħ�Ժ���
		var randomNum=rndScope(0,6);
		contextBack.strokeStyle=color[randomNum];
	*/
	/*
	//	�ʺ��
		contextBack.strokeStyle=color[this.randomColor[i]];
	*/
		contextBack.globalAlpha=0.5;          //����͸����
		contextBack.lineWidth=20;           //�������
		contextBack.lineCap="round"         //����ͷ����Բ��
		contextBack.stroke();              //����ɫͿ��ȥ
	}
	contextBack.restore();
};