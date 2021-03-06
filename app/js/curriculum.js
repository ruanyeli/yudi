var can = document.getElementById("canvas");
var error = document.querySelector(".error");
var msg = document.getElementById("msg");
var cxt = can.getContext("2d");
var w = 35,
	h = 35;
var editorValue = '';
var editor
var curMap; //当前的地图
var curLevel; //当前等级的地图
var curMan; //初始化小人
var iCurlevel = 0; //关卡数
var moveTimes = 0; //移动了多少次
var pushNum = 0;
var editor;
var cursorLocation;
var initTime;
var costTimeMin;
var costTimeSecond;
var errorTime = 0;
var errcode;
var rule1;
var rule2;
var rule3;
var limitTime=0;
var defaultCodeLength;
var standard_codeLength=0;
var totalrule;
var timer = null;

//预加载所有图片
var oImgs = {
	"block": "images/game/block.gif",
	"wall": "images/game/wall.png",
	"box": "images/game/box.png",
	"ball": "images/game/ball.png",
	"up": "images/game/up.png",
	"down": "images/game/down.png",
	"left": "images/game/left.png",
	"right": "images/game/right.png",
}

$(".curriculum-right-center-left-button-left").click(function () {
	cursorLocation = editor.selection.getCursor().column; //获取光标所在列数
	if (cursorLocation != 0) { //如果光标当前不在第一列，则先换行，否则就在光标所在处追加
		editor.insert("\r");
	}
	editor.insert("IronMan.goLeft()");
});

$(".curriculum-right-center-left-button-right").click(function () {
	cursorLocation = editor.selection.getCursor().column; //获取光标所在列数
	if (cursorLocation != 0) { //如果光标当前不在第一列，则先换行，否则就在光标所在处追加
		editor.insert("\r");
	}
	editor.insert("IronMan.goRight()");

});
$(".curriculum-right-center-left-button-up").click(function () {
	cursorLocation = editor.selection.getCursor().column; //获取光标所在列数
	if (cursorLocation != 0) { //如果光标当前不在第一列，则先换行，否则就在光标所在处追加
		editor.insert("\r");
	}
	editor.insert("IronMan.goUp()");
});
$(".curriculum-right-center-left-button-down").click(function () {
	cursorLocation = editor.selection.getCursor().column; //获取光标所在列数
	if (cursorLocation != 0) { //如果光标当前不在第一列，则先换行，否则就在光标所在处追加
		editor.insert("\r");
	}
	editor.insert("IronMan.goDown()");
});
$(".curriculum-right-center-left-button-refresh").click(function () {
	cursorLocation = editor.selection.getCursor().column; //获取光标所在列数
	if (cursorLocation != 0) { //如果光标当前不在第一列，则先换行，否则就在光标所在处追加
		editor.insert("\r");
	}
	editor.insert("IronMan.push()");
})

$("#editor").bind("keydown", function (e) {
	// 兼容FF和IE和Opera
	var theEvent = e || window.event;
	var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	if (code == 13) {
		data = editor.getValue();
		var left = new RegExp("IronMan.goLeft", "g");
		data = data.replace(left, '');
		var up = new RegExp("IronMan.goUp", "g");
		data = data.replace(up, '');
		var down = new RegExp("IronMan.goDown", "g");
		data = data.replace(down, '');
		var right = new RegExp("IronMan.goRight", "g");
		data = data.replace(right, '');
		console.log(data);
		$.ajax({
			url: 'http://47.100.31.94:5000/check_code',
			datatype: "json",
			type: 'post',
			data: {
				id: 'formdata',
				text: data
			},
			success: function (data) {
				console.log(data);
				// alert(data.length);
				//成功后回调      
				if (data[0] != "null") { //有错误或者警告的时候
					for (let i = 0; i < data.length; i++) {
						if (data[i] != null) {
							console.log(data[i]);
							if (data[i].code.substr(0, 1) == "E") {
								var erroeline = data[i].line;
								console.log(erroeline);
								var oldstyle = $("#editor").children("div").eq(0).children("div").eq(0).children("div").eq(erroeline - 1);
								oldstyle.removeAttr("class");
								oldstyle.attr("class", " ace_error");
								oldstyle.addClass("ace_gutter-cell");
							} else if (data[i].code.substr(0, 1) == "W") {
								var erroeline = data[i].line;
								console.log(erroeline);
								var oldstyle = $("#editor").children("div").eq(0).children("div").eq(0).children("div").eq(erroeline - 1);
								oldstyle.removeAttr("class");
								oldstyle.attr("class", " ace_warning");
								oldstyle.addClass("ace_gutter-cell");
							}
						}
					}
				} else { //没有错误或者没有警告
					console.log("OK");
				}
			},
			error: function (e) {
				//失败后回调      
				// alert("服务器请求失败");      
			},
			beforeSend: function () {
				//发送请求前调用，可以放一些"正在加载"之类额话      
				// alert("正在加载");           
			}
		});
	}
});


function imgPreload(srcs, callback) {
	var count = 0,
		imgNum = 0,
		images = {};
	for (src in srcs) {
		imgNum++;
	}
	for (src in srcs) {
		images[src] = new Image();
		images[src].onload = function () {
			//判断是否所有的图片都预加载完成
			if (++count >= imgNum) {
				callback(images);
			}
		}
		images[src].src = srcs[src];
	}
}
var block, wall, box, ball, up, down, left, right;
imgPreload(oImgs, function (images) {
	//console.log(images.block);
	block = images.block;
	wall = images.wall;
	box = images.box;
	ball = images.ball;
	up = images.up;
	down = images.down;
	left = images.left;
	right = images.right;
	init();
});
//初始化游戏
function init() {
	// alert("hh");
	//InitMap();
	//DrawMap(levels[0]);
	initLevel(); //初始化对应等级的游戏
	// showMoveInfo();//初始化对应等级的游戏数据
	
}

//绘制地图
function InitMap() {
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			cxt.drawImage(block, w * j, h * i, w, h);
		}
	}
}

//人物位置坐标
function Point(x, y) {
	this.x = x;
	this.y = y;
	// console.log(this.x)
}
var perPosition = new Point(5, 5); //小人的初始标值
//绘制每个游戏关卡地图
function DrawMap(level) {
	for (var i = 0; i < level.length; i++) {
		for (var j = 0; j < level[i].length; j++) {
			var pic = block; //初始图片
			switch (level[i][j]) {
				case 1: //绘制墙壁
					pic = wall;
					break;
				case 2: //绘制陷进
					pic = ball;
					break;
				case 3: //绘制箱子
					pic = box;
					break;
				case 4: //绘制小人
					pic = curMan; //小人有四个方向 具体显示哪个图片需要和上下左右方位值关联
					//获取小人的坐标位置
					perPosition.x = i;
					perPosition.y = j;
					break;
				case 5: //绘制箱子及陷进位置
					pic = box;
					break;
			}
			//每个图片不一样宽 需要在对应地板的中心绘制地图
			cxt.drawImage(pic, w * j - (pic.width - w) / 2, h * i - (pic.height - h), pic.width, pic.height)
		}
	}
}
// //判断是否推成功
// function checkFinish() {
// 	for (var i = 0; i < curMap.length; i++) {
// 		for (var j = 0; j < curMap[i].length; j++) {
// 			//当前移动过的地图和初始地图进行比较，若果初始地图上的陷进参数在移动之后不是箱子的话就指代没推成功
// 			if (curLevel[i][j] == 2 && curMap[i][j] != 3 || curLevel[i][j] == 5 && curMap[i][j] != 3) {
// 				return false;
// 			}
// 		}
// 	}
// 	return true;
// }



//初始化游戏等级
function initLevel() {
	curMap = copyArray(levels[iCurlevel]); //当前移动过的游戏地图
	console.log(iCurlevel);
	console.log(levels[iCurlevel]);
	// console.log(curMap);
	curLevel = levels[iCurlevel]; //当前等级的初始地图
	curMan = down; //初始化小人
	InitMap(); //初始化地板
	DrawMap(curMap); //绘制出当前等级的地图
}
//下一关
function NextLevel(i) {
	//iCurlevel当前的地图关数
	// $("#dialog").css("display","none");
	// clearInterval(timer);
	$("#dialog").removeClass("visibility");
	$("#dialog").addClass("dialog");
	$(".curriculum-right-top-help-left").css("display","none");
	iCurlevel = iCurlevel + i;
	if (iCurlevel < 0) {
		iCurlevel = 0;
		return;
	}
	var len = levels.length;
	if (iCurlevel > len - 1) {
		iCurlevel = len - 1;
	}
	initLevel(); //初始当前等级关卡
	clearInterval(timer)
	moveTimes = 0; //游戏关卡移动步数清零
	var iCurlevelNew = iCurlevel+1;
	// $(".curriculum-right-top-text").html("");
	$("#text").val("");
	var token=JSON.parse(localStorage.getItem('token'));
	// console.log(token)
	$.ajax({
		url: config.gamesread+iCurlevelNew+"/",
		headers: {"Authorization": 'Token ' + token },
		dataType: 'JSON',
		type: 'GET',
		success: function (data) {
			console.log(data);
			var default_code = data.default_code.replace(/\r\n/g,"\r");
			editor.setValue(default_code);
			defaultCodeLength = default_code.split('\r').length;
			limitTime = data.best_duration;
			var standard_code = data.standard_code.split('\r\n');
			standard_codeLength = standard_code.length;
			console.log("standard_codeLength="+standard_codeLength);

		},
		error: function (data) {
			console.log(data)
		}
	});
}


function NextLevelold(i) {
	//iCurlevel当前的地图关数
	// $("#dialog").css("display","none");
	$(".curriculum-right-top-help-left").css("display","none");
	$("#dialog").removeClass("visibility");
	$("#dialog").addClass("dialog");
	iCurlevel = iCurlevel + i;
	if (iCurlevel < 0) {
		iCurlevel = 0;
		return;
	}
	var len = levels.length;
	if (iCurlevel > len - 1) {
		iCurlevel = len - 1;
	}
	initLevel(); //初始当前等级关卡
}




// 小人移动
function push(dir) {
	var p1, p2;
	switch (dir) {
		case "up":
			curMan = up;
			//获取小人前面的两个坐标位置来进行判断小人是否能够移动
			p1 = new Point(perPosition.x - 1, perPosition.y);
			p2 = new Point(perPosition.x - 2, perPosition.y);
			break;
		case "down":
			curMan = down;
			p1 = new Point(perPosition.x + 1, perPosition.y);
			p2 = new Point(perPosition.x + 2, perPosition.y);
			break;
		case "left":
			curMan = left;
			p1 = new Point(perPosition.x, perPosition.y - 1);
			p2 = new Point(perPosition.x, perPosition.y - 2);
			break;
		case "right":
			curMan = right;
			p1 = new Point(perPosition.x, perPosition.y + 1);
			p2 = new Point(perPosition.x, perPosition.y + 2);
			break;
	}
	//若果小人能够移动的话，更新游戏数据，并重绘地图
	if (Trygo1(p1, p2)) {
		moveTimes++;
		//  showMoveInfo();
	}
	//重绘地板
	InitMap();
	//重绘当前更新了数据的地图
	DrawMap(curMap);
	//若果移动完成了进入下一关
	if (checkFinish()) {
		// clearInterval(timer);
		// var endTime = new Date();
		// costTimeMin = endTime.getMinutes() - initTime.getMinutes();
		// costTimeSecond = endTime.getSeconds() - initTime.getSeconds();
		// console.log(costTimeMin);
		// console.log(costTimeSecond);
		// // $("#minute").html(costTimeMin);
		// $("#second").html(costTimeMin*60+costTimeSecond);
		// $("#errorTimes").html(errorTime);
		// // if(costTimeMin*60+costTimeSecond>60){
		// // 	$("#minute").html(costTimeMin);
		// // }
		// if(costTimeMin*60+costTimeSecond<limitTime){
		// 	rule1 =3;
		// }else if(limitTime<costTimeMin*60+costTimeSecond<2*limitTime){
		// 	rule1 = 2
		// }else {
		// 	rule1 = 1;
		// }
		// if(errorTime/standard_codeLength<0.5){
		// 	rule2 = 3;
		// }else if(0.5<errorTime/standard_codeLength<1){
		// 	rule2 = 2;

		// }else {rule2 = 1;}

		// if((editor.session.getLength()-defaultCodeLength)/standard_codeLength==0){
		// 	rule3 = 3
		// }else if((editor.session.getLength()-defaultCodeLength)/standard_codeLength<1){
		// 	rule3 = 2;
		// }else rule3 =1;

		// totalrule = (rule1+rule2+rule3)/3;
		// console.log("totalrule"+totalrule);
		// if(6<totalrule<9){
		// 	$(".dialog-contnet").find("p").html("");
		// 	$(".dialog-contnet").find("p").html("非常棒：高速度高效率高质量的代码表现，你的前途是星辰大海");
		// }
		// if(3<totalrule<6){
		// 	$(".dialog-contnet").find("p").html("");
		// 	$(".dialog-contnet").find("p").html("干得漂亮：学习能力，思维能力，理解能力满分，加油！");
		// }
		// if(0<totalrule<3){
		// 	$(".dialog-contnet").find("p").html("");
		// 	$(".dialog-contnet").find("p").html("恭喜你通关成功，不过你可以试试用更少的时间，更精简的代码通关");
		// }
		// $("#dialog").removeClass("dialog");
		// $("#dialog").addClass("visibility");
		
		
	}
}


function go(dir) {
	var p1, p2;
	switch (dir) {
		case "up":
			curMan = up;
			//获取小人前面的两个坐标位置来进行判断小人是否能够移动
			p1 = new Point(perPosition.x - 1, perPosition.y);
			p2 = new Point(perPosition.x - 2, perPosition.y);
			break;
		case "down":
			curMan = down;
			p1 = new Point(perPosition.x + 1, perPosition.y);
			p2 = new Point(perPosition.x + 2, perPosition.y);
			break;
		case "left":
			curMan = left;
			p1 = new Point(perPosition.x, perPosition.y - 1);
			p2 = new Point(perPosition.x, perPosition.y - 2);
			break;
		case "right":
			curMan = right;
			p1 = new Point(perPosition.x, perPosition.y + 1);
			p2 = new Point(perPosition.x, perPosition.y + 2);
			break;
	}
	//若果小人能够移动的话，更新游戏数据，并重绘地图
	if (Trygo(p1, p2)) {
		moveTimes++;
		//  showMoveInfo();

	}
	//重绘地板
	InitMap();
	//重绘当前更新了数据的地图
	DrawMap(curMap);
	//若果移动完成了进入下一关
	if (checkFinish()) {
		clearInterval(timer);
		var endTime = new Date();
		
		costTimeMin = endTime.getMinutes() - initTime.getMinutes();
		costTimeSecond = endTime.getSeconds() - initTime.getSeconds();
		
		// $("#minute").html(costTimeMin);
		$("#second").html(costTimeMin*60+costTimeSecond);
		$("#errorTimes").html(errorTime);
		// if(costTimeMin*60+costTimeSecond>60){
		// 	$("#minute").html(costTimeMin);
		// }
		if(costTimeMin*60+costTimeSecond<limitTime){
			rule1 =3;
		}else if(limitTime<costTimeMin*60+costTimeSecond<2*limitTime){
			rule1 = 2
		}else {
			rule1 = 1;
		}
		if(errorTime/standard_codeLength<0.5){
			rule2 = 3;
		}else if(0.5<errorTime/standard_codeLength<1){
			rule2 = 2;

		}else {rule2 = 1;}

		if((editor.session.getLength()-defaultCodeLength)/standard_codeLength==0){
			rule3 = 3
		}else if((editor.session.getLength()-defaultCodeLength)/standard_codeLength<1){
			rule3 = 2;
		}else rule3 =1;

		totalrule = (rule1+rule2+rule3)/3;
		console.log("totalrule"+totalrule);
		if(totalrule>=6&&totalrule<9){
			// alert("1");
			$(".dialog-contnet").find("p").html("");
			$(".dialog-contnet").find("p").html("非常棒：高速度高效率高质量的代码表现，你的前途是星辰大海");
		}
		if(totalrule>3&&totalrule<6){
			
			$(".dialog-contnet").find("p").html("");
			$(".dialog-contnet").find("p").html("干得漂亮：学习能力，思维能力，理解能力满分，加油！");
		}
		if(totalrule>0&&totalrule<=3){
			$(".dialog-contnet").find("p").html("");
			$(".dialog-contnet").find("p").html("恭喜你通关成功，不过你可以试试用更少的时间，更精简的代码通关");
		}
		$("#dialog").removeClass("dialog");
		$("#dialog").addClass("visibility");
		
	}
}


//判断是否推成功
function checkFinish() {
	
	for (var i = 0; i < curMap.length; i++) {
		for (var j = 0; j < curMap[i].length; j++) {
			//当前移动过的地图和初始地图进行比较，若果初始地图上的陷进参数在移动之后不是箱子或者不是人物的话就指代没推成功
			if (curLevel[i][j] == 2 && curMap[i][j] != 3 && curMap[i][j] != 4 || curLevel[i][j] == 5 && curMap[i][j] != 3 && curMap[i][j] != 4) {
				return false;
			}
		}
	}
	return true;
}
//判断小人是否能够移动
function Trygo(p1, p2) {
	console.log(p1, p2)
	if (p1.x < 0) return false; //若果超出地图的上边，不通过
	if (p1.y < 0) return false; //若果超出地图的左边，不通过
	if (p1.x > curMap.length) return false; //若果超出地图的下边，不通过
	if (p1.y > curMap[0].length) return false; //若果超出地图的右边，不通过
	if (curMap[p1.x][p1.y] == 1) {
		error.innerHTML = "小朋友，前方没有路了哦";
		errorTime++;
		return false;
	} //若果前面是墙，不通过
	if (curMap[p1.x][p1.y] == 3) {
		error.innerHTML = "点击推箱子";
		errorTime++;
		return false
	} //当人物前面是箱子，则需要点击推箱子
	if (curMap[p1.x][p1.y] == 3 || curMap[p1.x][p1.y] == 5) //若果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
	//1-墙壁，2-陷阱，3-箱子，4-人物，5-箱子及陷阱位置
	//p1:人物的前1个坐标，p2：人物的前2个坐标
	{
		if (curMap[p2.x][p2.y] == 1 || curMap[p2.x][p2.y] == 3) {
			// alert("前方已无路")
			error.innerHTML = "小朋友，前方没有路了哦";
			errorTime++;
			return false;
		}
		//若果判断不成功小人前面的箱子前进一步
		curMap[p2.x][p2.y] = 3; //更改地图对应坐标点的值
		//console.log(curMap[p2.x][p2.y]);
	}
	//若果都没判断成功小人前进一步
	curMap[p1.x][p1.y] = 4; //更改地图对应坐标点的值
	//若果小人前进了一步，小人原来的位置如何显示
	var v = curLevel[perPosition.x][perPosition.y];
	if (v != 2) //若果刚开始小人位置不是陷进的话
	{
		if (v == 5) //可能是5 既有箱子又陷进
		{
			v = 2; //若果小人本身就在陷进里面的话移开之后还是显示陷进
		} else {
			v = 0; //小人移开之后之前小人的位置改为地板
		}
	}
	//重置小人位置的地图参数
	curMap[perPosition.x][perPosition.y] = v;
	//若果判断小人前进了一步，更新坐标值
	perPosition = p1;
	error.innerHTML = "";
	//若果小动了 返回true 指代能够移动小人
	return true;

}

function Trygo1(p1, p2) {
	console.log(p1, p2)
	if (p1.x < 0) return false; //若果超出地图的上边，不通过
	if (p1.y < 0) return false; //若果超出地图的左边，不通过
	if (p1.x > curMap.length) return false; //若果超出地图的下边，不通过
	if (p1.y > curMap[0].length) return false; //若果超出地图的右边，不通过
	if (curMap[p1.x][p1.y] == 1) {
		error.innerHTML = "小朋友，前方没有路了哦";
		errorTime++;
		return false;
	} //若果前面是墙，不通过
	//if(curMap[p1.x][p1.y]==3){alert("点击推箱子");return false}//当人物前面是箱子，则需要点击推箱子
	if (curMap[p1.x][p1.y] == 3 || curMap[p1.x][p1.y] == 5) //若果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
	//1-墙壁，2-陷阱，3-箱子，4-人物，5-箱子及陷阱位置
	//p1:人物的前1个坐标，p2：人物的前2个坐标
	{
		if (curMap[p2.x][p2.y] == 1 || curMap[p2.x][p2.y] == 3) {
			// alert("前方已无路")
			error.innerHTML = "小朋友，前方没有路了哦";
			errorTime++;
			return false;
		}
		//若果判断不成功小人前面的箱子前进一步
		curMap[p2.x][p2.y] = 3; //更改地图对应坐标点的值
		//console.log(curMap[p2.x][p2.y]);
	}
	//若果都没判断成功小人前进一步
	curMap[p1.x][p1.y] = 0; //更改地图对应坐标点的值
	//若果小人前进了一步，小人原来的位置如何显示
	// var v = curLevel[perPosition.x][perPosition.y];
	// if (v!=2)//若果刚开始小人位置不是陷进的话
	// {
	// 	if (v==5)//可能是5 既有箱子又陷进
	// 	{
	// 		v=2;//若果小人本身就在陷进里面的话移开之后还是显示陷进
	// 	}else{
	// 		v=0;//小人移开之后之前小人的位置改为地板
	// 	}
	// }
	// //重置小人位置的地图参数
	// curMap[perPosition.x][perPosition.y] = v;
	//若果判断小人前进了一步，更新坐标值
	perPosition = p1;
	//若果小动了 返回true 指代能够移动小人
	return true;
}

function promote() {
	//获取人物的坐标
	var cMan = curMan.src.split("/");
	var pMan = cMan[cMan.length - 1].split(".")[0];
	switch (pMan) {
		case 'down':
			{
				push("down");
				trycatch();
				break;
			}
		case 'up':
			{
				push("up");
				trycatch();
				break;
			}
		case 'left':
			{
				push("left");
				trycatch();
				break;
			}
		case 'right':
			{
				push("right");
				trycatch();
				break;
			}
	}
	// return true;
	//获取当前坐标的前后左右是否有箱子
}

//重玩本关
function again() {
	// location.reload();
	init() //初始化游戏
}

//判断是否出错
function trycatch() {
	if (error.innerHTML == "") {
		console.log(arguments.callee.name)
	} else {}
}

function popContent() {
	// alert(editor.getValue());
}


//完善关卡数据及游戏说明
// function showMoveInfo(){
// 	msg.innerHTML = "第" + (iCurlevel+1) +"关 移动次数: "+ moveTimes;
// }
//游戏说明point
var showhelp = false;

function showHelp() {
	showhelp = !showhelp;
	if (showhelp) {
		msg.innerHTML = "根据提示，把箱子全部推到小球的位置即可过关。箱子只可向前推，不能往后拉，并且小人一次只能推动一个箱子。";
	} else {
		//  showMoveInfo();
	}
}
//点击事件
function goDown() {
	// console.log(1)
	// window.setTimeout(go("down"),6000);
	console.log("我在向下走");
	go("down");
	// tips.innerHTML+=arguments.callee.name+"()"+"<br>";
	trycatch()
}

function goUp() {
	go("up");
	trycatch();
}

function goLeft() {
	go("left");
	trycatch();
}



function goRight() {
	go("right");
	trycatch()
}

//克隆二维数组
function copyArray(arr) {
	console.log("aRR"+arr);
	var b = []; //每次移动更新地图数据都先清空再添加新的地图
	for (var i = 0; i < arr.length; i++) {
		b[i] = arr[i].concat(); //链接两个数组
	}
	return b;
}



//点击运行
$(".curricu-right-go").on("click", function () {
	var acecode = editor.getValue();
	console.log(acecode);
	// acecode = acecode.replace(" ","").replace(/[\r\n]/g,"");//去掉回车换行;
	console.log(acecode);
	var codestr = acecode.split("\r");
	// var codestr = codestr1.split("\r\n");
	console.log(codestr);
	
	a:for(var i=0;i<codestr.length;i++){
		console.log(i)
		if(codestr[i]=="IronMan.goRight()"||codestr[i]=="IronMan.goright()"){
			timer = setTimeout(function(){goRight()},i*1000);
		}else if(codestr[i]=="IronMan.goLeft()"||codestr[i]=="IronMan.goleft()"){
			timer = setTimeout(function(){goLeft()},i*1000);
		}else if(codestr[i]=="IronMan.goDown()"||codestr[i]=="IronMan.godown()"){
			timer = setTimeout(function(){goDown()},i*1000);
		}else if(codestr[i]=="IronMan.goUp()"||codestr[i]=="IronMan.goup()"){
			timer = setTimeout(function(){goUp()},i*1000);
		}

		b:for(var j=0;j<acetip.length;j++){
			if(codestr[i]==acetip[j].text){//遇到错误了
				// alert("cw");
				var row = i+1;
				errcode = "第"+row+"行："+acetip[j].caution;
				//  error.innerHTML = "第"+row+"行："+acetip[j].caution;
				error.innerHTML = "哎哟，小朋友，代码出错了,你可以点击“请求帮助”查看解决办法哦";
				errorTime++;
				i=codestr.length;
				 NextLevelold(0);
				$(".curriculum-right-top-help-left").css("display","block");
				break;
			};
		}
		if(i==codestr.length-1){
		timer = setTimeout(function(){
			if(!checkFinish()){//如果还没有走完
				NextLevelold(0);
				// clearInterval(timer)
				var random =Math.random()*3
				 if(parseInt(random)<=1){
					error.innerHTML = "哎呀，小朋友还没走完呢，请重新运行代码哦";
				 }
				 if(parseInt(random)>1&&parseInt(random)<=2){
					error.innerHTML = "小朋友,你离成功只有一步之遥,请重新运行代码哦";
				 }
				 if(parseInt(random)>2&&parseInt(random)<=3){
					error.innerHTML = "加油，小朋友，成功就在眼前，请重新运行代码哦";
				 }	
			}else{
				clearInterval(timer)
			}

		},i*1000);
	}


			// if(i==codestr.length-1){//当执行到代码的最后一步时，做一个校验，看小人有没有走到终点
			// 	if(!checkFinish()){//如果还没有走完
			// 		// clearInterval(timer)
			// 		var random =Math.random()*3
			// 		 if(parseInt(random)<=1){
			// 			error.innerHTML = "哎呀，小朋友还没走完呢";
			// 		 }
			// 		 if(parseInt(random)>1&&parseInt(random)<=2){
			// 			error.innerHTML = "小朋友,你离成功只有一步之遥哦";
			// 		 }
			// 		 if(parseInt(random)>2&&parseInt(random)<=3){
			// 			error.innerHTML = "加油，小朋友，成功就在眼前啦";
			// 		 }	
			// 	}else{
			// 		clearInterval(timer)
			// 	}
			// }
	}
});

function getace(params) {
	var arr2 = []
	for (var i = 0; i < params.length; i++) {
		arr2[i] = 'I' + params[i]
	}
	return arr2
}

function constace(arr, params) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < params.length - i - 1; j++) {
			if (arr[i] == acetip[j].text) {
				result.push(params[j].caution)
			}
		}
	}
	return result
}



$(".curriculum-right-top-help").on("click", function () {
	var token=JSON.parse(localStorage.getItem('token'));
	// console.log(token)
	$.ajax({
		url: config.gamesread+1+"/",
		headers: { "Authorization": 'Token ' + token },
		dataType: 'JSON',
		type: 'GET',
		success: function (data) {
			console.log(data)
			$("#text").val(data.hint)
		},
		error: function (data) {
			console.log(data)
		}
	});
})

$(".curriculum-right-top-help-left").on("click", function () {
	$("#text").val(errcode);
	
});

$(document).ready(function () {
	initTime = new Date();
	var iCurlevelNew = iCurlevel+1;
	var token=JSON.parse(localStorage.getItem('token'));
	// console.log(token)
	$.ajax({
		url: config.gamesread+iCurlevelNew+"/",
		headers: {"Authorization": 'Token ' + token },
		dataType: 'JSON',
		type: 'GET',
		success: function (data) {
			console.log(data);
			var default_code = data.default_code.replace(/\r\n/g,"\r");
			editor.setValue(default_code);
			limitTime = data.best_duration;
			var standard_code = data.standard_code.split('\r\n');
			standard_codeLength = standard_code.length;
			console.log("standard_codeLength="+standard_codeLength);
		},
		error: function (data) {
			console.log(data)
		}
	});
	




});
