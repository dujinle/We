var MainLayer = cc.Layer.extend({
	background: null,
	qiandaoMu: null,
	qiandaoMenuItem: null,
	qiandaoLabel: null,
	yesMu: null,

	ctor: function () {

		this._super();
		var size = cc.winSize;


		this.background = new cc.Sprite(res.Bg_png);
		this.background.attr({
			x: size.width / 2,
			y: size.height / 2
		});
		console.log("main scene add backgroud");
		this.addChild(this.background, 0);


		//炸金花按钮
		var ZJHItem = new cc.MenuItemImage(
				res.Zhajinhua_png,
				res.Zhajinhua_png,
				function () {
					console.log("perss zhajinhua button......");
					this.entryGame("ZJH");
				}, this);

		ZJHItem.attr({
			x: 420,
			y: 360,
			anchorX: 1,
			anchorY: 0.5
		});

//		//填大坑按钮
		var TDKItem = new cc.MenuItemImage(
				res.Tiandakeng_png,
				res.Tiandakeng_png,
				function () {
					console.log("press tian da keng button......");
					this.entryGame("TDK");
				}, this);

		TDKItem.attr({
			x: 840,
			y: 360,
			anchorX: 1,
			anchorY: 0.5
		});

//		//拙黑枪 按钮
		var ZHQItem = new cc.MenuItemImage(
				res.Zhuoheiqiang_png,
				res.Zhuoheiqiang_png,
				function () {
					console.log("press zhuo hei qiang button......");
					this.entryGame("ZHQ");
				}, this);

		ZHQItem.attr({
			x: 1260,
			y: 360,
			anchorX: 1,
			anchorY: 0.5
		});

		var gameMenu = new cc.Menu(ZJHItem);
		gameMenu.x   = 0;
		gameMenu.y   = 0;
		this.background.addChild(gameMenu, 1);
		
		gameMenu = new cc.Menu(TDKItem);
		gameMenu.x   = 0;
		gameMenu.y   = 0;
		this.background.addChild(gameMenu, 1);
		
		gameMenu = new cc.Menu(ZHQItem);
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
		this.mainMenuUI = new MainMenuLayer();
		this.addChild(this.mainMenuUI, 3);

		return true;
	},

	entryGame: function (type) {
		g_gameType = type;
		this.roomLayer = new GameRoomScene(playerId,type);
		this.addChild(this.roomLayer, 4);
		console.log("go into room layer succ......");
		//返回按钮
		var backBtn = new cc.MenuItemImage(
				res.Back_png,
				res.Back_png,
				function(){
					this.removeChild(this.roomLayer);
				},this);
		var backMenu = new cc.Menu(backBtn);
		backMenu.x = 100;
		backMenu.y = 60;
		this.addChild(backMenu, 4);
	}
});

var MainScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		console.log("start enter main scene......");
		var layer = new MainLayer();
		this.addChild(layer);
	}
});

