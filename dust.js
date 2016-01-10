function DustObj()
{
	this.x=[];
	this.y=[];
	this.number=50;          //��������
	this.range=[];            //�񶯷���
	this.alpha=0;            //�Ƕ�
	this.dustPic=[];         //ͼƬ
	this.picNumber=[];        //����Ϊ�ڼ���ͼƬ
}
DustObj.prototype.initDust=function()
{
	for(var i=0;i<7;i++)       //Ԥ����
	{
		this.dustPic[i]=new Image();
		this.dustPic[i].src="src/dust" + i + ".png";
	}
	for(var j=0;j<this.number;j++)
	{
		this.x[j]=Math.random()*drawWidth;      //������峾��x��y���꣬��������
		this.y[j]=Math.random()*drawHeight;
		this.range[j]=Math.random()*50+30;    
		this.picNumber[j]=Math.floor( Math.random()*6 );      //����Ϊ�ڼ���ͼƬ
	}
}
DustObj.prototype.drawDust=function()
{
	this.alpha+=deltaTime * 0.001;
	this.alpha%=Math.PI * 2;
	var temp=Math.sin(this.alpha);         //���������Һ����ƶ�
	
	for(var i=0;i<this.number;i++)
	{
		contextBack.drawImage(this.dustPic[this.picNumber[i]],this.x[i]+this.range[i]*temp,this.y[i]);
	}
}

