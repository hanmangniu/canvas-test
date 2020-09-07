function Ball(x, y, radius, color) {
  //圆形中心x坐标
  this.x = x || 0;
  //圆形中心y坐标
  this.y = y || 0;
  //圆形半径
  this.radius = radius || 12;
  //颜色
  this.color = color || "pink";

  this.scaleX = 1;
  this.scaleY = 1;
}
Ball.prototype = {
  stroke: function (cxt) {
    cxt.save();
    cxt.scale(this.scaleX, this.scaleY);
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  },
  fill: function (cxt) {
    cxt.save();
    cxt.scale(this.scaleX, this.scaleY);
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  },
  getRect: function () {
    let rect = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
    return rect;
  },
  checkMouse: function (mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius;
  },
};
