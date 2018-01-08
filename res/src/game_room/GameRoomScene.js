
var GameRoomScene = cc.Layer.extend({
	playerIdz:null,
	background: null,
	yesMu: null,
	userMenuUI:null,

	ctor: function (playerId,type) {

		this._super();
		var size = cc.winSize;
		this.initGlobalParams();
		this.playerId = playerId;
		this.type = type;

		this.background = new cc.Sprite(res.Bg_png);
		this.background.attr({
			x: size.width / 2,
			y: size.height / 2
		});
		console.log("game room scene add backgroud" + size);
		this.addChild(this.background, 0);


		//创建房间
		var creatRoom = new cc.MenuItemImage(
				res.CreateRoom_png,
				res.CreateRoom_png,
				function () {
					console.log("perss create room button......");
					this.creatRoom();
				}, this);

		creatRoom.attr({
			x: 420,
			y: 360,
			anchorX: 0.5,
			anchorY: 0.5
		});

//		//进入房间
		var enterRoom = new cc.MenuItemImage(
				res.EnterRoom_png,
				res.EnterRoom_png,
				function () {
					console.log("press enter room button......");
					this.enterRoom();
				}, this);

		enterRoom.attr({
			x: 840,
			y: 360,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var gameMenu = new cc.Menu(creatRoom);
		gameMenu.x   = 0;
		gameMenu.y   = 0;
		this.background.addChild(gameMenu, 1);
		
		gameMenu = new cc.Menu(enterRoom);
		gameMenu.x   = 0;
		gameMenu.y   = 0;
		this.background.addChild(gameMenu, 1);
		
		//关闭按钮
		var closeItem = new cc.MenuItemImage(
				res.CloseNormal_png,
				res.CloseSelected_png,
				function () {
					cc.director.end();
				}, this);
		closeItem.attr({
			x: size.width - 50,
			y: size.height - 50,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var closeMenu = new cc.Menu(closeItem);
		closeMenu.x   = 0;
		closeMenu.y   = 0;
		this.addChild(closeMenu, 1);

		//添加用户信息层
		this.userMenuUI = new MainMenuLayer();
		this.addChild(this.userMenuUI, 3);
		return true;
	},
	initGlobalParams:function(){
		g_playerData.splice(0, g_playerData.length);
		g_roomData.splice(0,g_roomData.length);
		g_players.splice(0,g_players.length);
		g_players_noPower.splice(0,g_players_noPower.length);
		g_myselfPlayerPos = -1;
		g_roomMasterName = "";
	},
	enterRoom: function (){
		console.log("start create PopUpEnterRoomLayer");
		var enterScene = new PopUpEnterRoomLayer();
		this.addChild(enterScene,4);
	},
	creatRoom: function () {
		if(this.type=="ZJH"){
			console.log("start go into PopUpCreateZJHRoomLayer");
			var enterScene = new PopUpCreateZJHRoomLayer();
			this.addChild(enterScene,4);
		}else if(this.type=="TDK"){
			console.log("start go into PopUpCreateTDKRoomLayer");
			var enterScene = new PopUpCreateTDKRoomLayer();
			this.addChild(enterScene,4);
		}else if(this.type=="ZHQ"){
			console.log("start go into PopUpCreateTDKRoomLayer");
			var enterScene = new PopUpCreateZHQRoomLayer();
			this.addChild(enterScene,4);
		}
	}
});
