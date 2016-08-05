function DataObj() {
	this.gameover = false;	//	游戏是否结束标志
	this.score = 0; 			//	分数
	this.alpha = 0;			//	gameover显现时透明度从0到1
}

DataObj.prototype.initData = function () {
	this.score = 0;			
}

DataObj.prototype.drawData = function () {
	contextFront.save();
	contextFront.font = '30px Verdana';	//分数绘制
	contextFront.textAlign = 'center'
	var gradient = contextFront.createLinearGradient(drawWidth / 2 - contextFront.measureText('score :' + this.score).width / 2, 0, 
						drawWidth / 2 + contextFront.measureText('score :' + this.score).width / 2, 0);
	gradient.addColorStop('0', 'red');	
	gradient.addColorStop('0.5', 'orange');
	gradient.addColorStop('1', 'yellow');
	contextFront.fillStyle = gradient;
	contextFront.fillText('score :' + this.score, drawWidth / 2, 50);  //context.measureText(text).width
	contextFront.restore();
}

DataObj.prototype.monitor = function () {
	if (this.gameover == true) {
		drawFront.onmousemove = null;	//死亡后鼠标移动废了
		contextFront.save();
		contextFront.shadowBlur = 10;
		contextFront.shadowColor = 'white';
		contextFront.font = '30px Verdana';
		contextFront.textAlign = 'center';
		this.alpha += deltaTime * 0.0005;	//gameover的透明度
		if (this.alpha >= 1) {
			this.alpha = 1;
		}
		contextFront.fillStyle='rgba(255,255,255,' + this.alpha + ')';
		contextFront.fillText('GameOver', drawWidth / 2, drawHeight / 2);
		contextFront.restore();

		if (fruit.alive.indexOf(true) == -1) {
			pause = true;
			var shade = document.createElement('div');
			shade.id = 'shade';
			document.body.appendChild(shade);

			var modal = document.getElementsByClassName('modal')[0];
			var start = document.getElementById('yes');
			var stop = document.getElementById('no');
			var StringLength = 'positionChange'.length + 1;
			modal.className += ' ' + 'positionChange';
		//	如果设置modal一开始的display为none，改变display 动画无效果
		//	而添加定时器阻塞后有效果，因为display变成block时浏览器还没有渲染成功
		//	modal.style.display = 'block';
		//	setTimeout(function(){modal.className += ' ' + 'positionChange';}, 1) //这样就有效果		
			start.onclick = function() {
				modal.className = modal.className.slice(0, -StringLength);
				document.body.removeChild(shade);
				pause = false;
				init();
				move();
				loop();
			};

			stop.onclick = function() {
				modal.className = modal.className.slice(0, -StringLength);
				document.body.removeChild(shade);
				return null;
			}
		}
	}
}
