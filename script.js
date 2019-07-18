const BALL_RADIUS=20;
const BALL_DEFAULT_X=50;
const BALL_DEFAULT_Y=70;
const BALL_SPEED =2;

const MAPWIDTH = document.getElementById("screenCanvas").offsetWidth;
const MAPHEIGHT = document.getElementById("screenCanvas").offsetHeight;
const CTX=document.getElementById("screenCanvas").getContext("2d");

const BAR_DEFAULT_X= 500;
const BAR_DEFAULT_Y=400;
const BAR_WIDTH =150;
const BAR_HEIGHT = 20;
const BAR_SPEED=20;

let Ball =function () {
    this.radius=BALL_RADIUS;
    this.cx=BALL_DEFAULT_X;
    this.cy=BALL_DEFAULT_Y;
    this.speedX=BALL_SPEED;
    this.speedY=BALL_SPEED;
    this.drawBall=function (ctx,bar) {
        ctx.beginPath();
        ctx.arc(this.cx,this.cy,this.radius,0,2*Math.PI);
        ctx.fillStyle="rgb(242,48,108)";
        ctx.closePath();
        ctx.fill();
        this.checkCollision(bar);
    };
    this.moveBall=function () {
        this.cx+=this.speedX;
        this.cy+=this.speedY;
        this.left=this.cx-this.radius;
        this.top=this.cy-this.radius;
        this.right=this.cx+this.radius;
        this.bottom=this.cy+this.radius;
    };
    this.checkCollision=function (bar) {
        let isTouchBar=(this.bottom>=bar.getY()&&this.right>=bar.getX()&&this.left<=bar.getX()+bar.width && this.top>=bar.getY()+bar.height);
        let crossLeftBoard=this.left <=0;
        let crossRightBoard=this.right >=MAPWIDTH;
        let crossTopBoard=this.top <=0;
        let crossBottom=this.bottom >=MAPHEIGHT;
        if(crossLeftBoard||crossRightBoard){
            this.speedX= -this.speedX;
        }
        if(crossTopBoard || isTouchBar){
            this.speedY=-this.speedY
        }
        if(crossBottom){
            alert("you are lose!");
                this.cx=BALL_DEFAULT_X;
                this.cy=BALL_DEFAULT_Y;
        }

    }

};

let Bar=function () {
    this.x = BAR_DEFAULT_X;
    this.y = BAR_DEFAULT_Y;
    this.width = BAR_WIDTH;
    this.height = BAR_HEIGHT;
    this.getX=function () {
        return this.x;
    };
    this.getY=function () {
        return this.y;
    };
    this.drawBar=function (ctx) {
        ctx.fillStyle="blue";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    };
    this.moveLeft=function () {
        if(this.x<=0){
            this.barSpeed = 0;
        } else {
            this.barSpeed = BAR_SPEED;
        }
        this.x-=this.barSpeed;

    };
    this.moveRight=function () {
        if(this.x+BAR_WIDTH >=MAPWIDTH){
            this.barSpeed=0;
        } else{
            this.barSpeed = BAR_SPEED;
        }
        this.x+=this.barSpeed;
    }

};

