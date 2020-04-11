var haloObj=function(){
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
}
haloObj.prototype.num=5;
haloObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}
haloObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="rgba(203,91,0,1)";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//draw
			this.r[i]+=deltaTime*0.05;
			if(this.r[i]>100){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/100;
			ctx1.beginPath();//开始路径
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();//闭合路径
			ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";//画好路径就描边,颜色
			ctx1.stroke();//描边
		}
	}
	ctx1.restore();
}
haloObj.prototype.born=function(x,y){
	//碰撞检测，大鱼跟小鱼碰撞的时候出生
	//找一个闲置的物体来执行任务
	for(var i=0;i<this.num;i++){
		if(!this.alive[i])//它是闲置的
		{
			this.x[i]=x;
			this.y[i]=y;
			this.r[i]=10;
			this.alive[i]=true;
			return;
		}
	}
}