//将tools定义为window对象的属性 该属性的值是一个对象
window.tools = {};
//获取鼠标位置
window.tools.getMouse = function (element) {
  //定义一个mouse对象
  let mouse = { x: 0, y: 0 };
  //为传入的元素添加mousemove事件
  element.addEventListener("mousemove", function (event) {
    let x, y;
    //在IE中 event对象是作为window对象的一个属性存在
    let e = event || window.event;
    //获取鼠标当前位置 并作兼容处理
    //兼容Firefox chrome IE9+
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    //兼容IE8- 混杂模式下的chrome和safari
    else {
      x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
    }
    //将当前的坐标值减去canvas元素的偏移值 则x,y为鼠标在canvas中的相对坐标
    x -= element.offsetLeft;
    y -= element.offsetTop;
    mouse.x = x;
    mouse.y = y;
  });
  //返回值为mouse对象
  return mouse;
};
//获取键盘控制方向
window.tools.getKey = function () {
  let key = {};
  window.addEventListener("keydown", function (e) {
    // ↑=38  W=87
    if (e.keyCode == 38 || e.keyCode == 87) {
      key.direction = "up";
    }
    //→=39 D=68
    else if (e.keyCode == 39 || e.keyCode == 68) {
      key.direction = "right";
    }
    //↓=40 S=83
    else if (e.keyCode == 40 || e.keyCode == 83) {
      key.direction = "down";
    }
    //←=37 A=65
    else if (e.keyCode == 37 || e.keyCode == 65) {
      key.direction = "left";
    }
  });
  return key;
};
//循环事件 请求动画帧 兼容处理
window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

//获取随机颜色的函数
window.tools.getRandomColor = function () {
  return (
    "#" +
    (function randomColor(color) {
      return (color += "0123456789abcdef"[Math.floor(Math.random() * 16)]) && color.length == 6 ? color : randomColor(color);
    })("")
  );
};

//碰撞检测-外接矩形判定法
window.tools.checkRect = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x || rectB.x + rectB.width < rectA.x || rectA.y + rectA.height < rectB.y || rectB.y + rectB.height < rectA.y);
};
//碰撞检测-外接圆判定法
window.tools.checkCircle = function (circleA, circleB) {
  let dx = circleA.x - circleB.x;
  let dy = circleA.y - circleB.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circleA.radius + circleB.radius;
  // if (distance < circleA.radius + circleB.radius) {
  //   return true;
  // } else {
  //   return false;
  // }
};
