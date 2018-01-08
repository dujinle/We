var zjhGameLayer = cc.Layer.extend({

	//当前的玩家位置标记
	currentGetPowerPlayerPosition:null,
	involvementPlayer_Cards:null,
	
	myselfCardsReach:null,
	myselfCards:null,
	backSprite:null,
	backSpriteHead:null,
    // 存放其他按钮选项的按钮菜单
	otherMenu:null,
    roomState:null,
	//绘制加注，比牌菜单.......
	game_menu:null,
	//玩家的位置界面
	roomNum:null,
	playerNum:null,
	
	//下注信息 回合数
	startDealCardPosition:null,
	startDealCardPosition1:null,
	level:null,
	count:null,
	countFlowing:null,
	bet:null,
	sumBet:null,
	labelBet:null,
	labelSumBet:null,
	labelCountFlowing:null,
	dealCardState:null,
	//用于存放金币精灵的数组
    betPhotoArray:null,
    //比牌行为
	menPaiFlag:null,
    comparableState:null,
    progressBoardBiPaiTime:null,
	//广播信息
	text_came:null,
	cliper:null,
	radioMenuBackground:null,
    
    //玩牌操作按钮菜单选项
	zhunBeiMenuItem:null,
    biPaiMenuItem :null,
    kaiPaiMenuItem:null,
    qiPaiMenuItem:null,
    jiaZhuMenuItem:null,
    genZhuMenuItem:null,
    layerBiPaiSelect:null,
    layerJiaZhuSelect:null,

    ctor:function(){
        this._super();

		this.count=0;
		this.level="chuJi";
		this.menPaiFlag = false;
        this.startDealCardPosition=1;
        this.startDealCardPosition1=this.startDealCardPosition;
		this.myselfCards=new Array();
		this.involvementPlayer_Cards = new Array();
		
		this.betPhotoArray=new Array();
        this.comparableState=false;
        this.myselfCardsReach=false;
        this.dealCardState=false;
        this.bet = g_betArray[0];
        this.sumBet = g_roomData[1];
		this.countFlowing=g_roomData[2];
		this.roomNum=g_roomData[3];
        this.playerNum=g_roomData[4];
        this.roomState=g_roomData[5];
		this.currentGetPowerPlayerPosition=g_roomData[6];

		this.initGameBackground();
		this.initHeadMenu();

		this.initGameMenu();
		this.initPlayersAndPlayer_noPower();
		this.initPlayers();
		if(this.roomState == 1){
			/*进来的时候 有玩家正在玩牌 则初始化他们的牌位置*/
			this.initPlayerCardsPosition();
		}
		//this.initPersonalMessageMenu();
		this.initCounterTimer();
		this.pomelo_on();

		this.initRadioDisplayTxtCliper();
		this.initMenuItemVisibleAfterComeInRoom();

		this.schedule(this.showRoomMessageUpdate,1.0/60,cc.REPEAT_FOREVER,0);
    },
	
    // 初始化游戏背景图片
	initGameBackground:function(){
		var size = cc.director.getWinSize();

		// 游戏大背景
		this.backSprite=new cc.Sprite(res.RoomBg_png);
		this.backSprite.setPosition(size.width/2,size.height/2 - 35);
		this.addChild(this.backSprite);

		//游戏头部黑条背景
		this.backSpriteHead=new cc.Sprite(res.BackgroundHead_png);
		console.log("head pos:[" + this.backSprite.getContentSize().width/2 + "," + this.backSprite.getContentSize().height + "]");
		this.backSpriteHead.attr({
			x:this.backSprite.getContentSize().width/2,
			y:this.backSprite.getContentSize().height - 10,
			anchorX:0.5,
			anchorY:0
		});
		this.backSprite.addChild(this.backSpriteHead);
		//添加桌面背景
		var deskSprite = new cc.Sprite(res.DeskBg_png);
		deskSprite.setPosition(this.backSprite.getContentSize().width/2,this.backSprite.getContentSize().height/2)
		this.backSprite.addChild(deskSprite);
		
		//logo
		var logoSprite = new cc.Sprite(res.ZJHLogo_png);
		logoSprite.setPosition(this.backSprite.getContentSize().width/2,this.backSprite.getContentSize().height/2)
		this.backSprite.addChild(logoSprite);
		
		g_dealCardBack.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
		this.addChild(g_dealCardBack);
	},

	initGameMenu:function(){
		var size = cc.director.getWinSize();

		//准备
		var zhunBeiSprite = new cc.Sprite(res.ZhunBei_png);
		var zhunBeiSprite1 = new cc.Sprite(res.ZhunBei1_png);
		var zhunBeiSprite2 = new cc.Sprite(res.ZhunBei1_png);
		this.zhunBeiMenuItem=new cc.MenuItemSprite(zhunBeiSprite,zhunBeiSprite1,zhunBeiSprite2,
				this.menuCallbackZhunBei,this);
				
		//比牌
		var biPaiSprite = new cc.Sprite(res.BiPai_png);
		var biPaiSprite1 = new cc.Sprite(res.BiPai1_png);
		var biPaiSprite2 = new cc.Sprite(res.BiPai1_png);
		this.biPaiMenuItem=new cc.MenuItemSprite(biPaiSprite,biPaiSprite1,biPaiSprite2,
				this.menuCallbackBiPai,this);

		//看牌
		var kaiPaiSprite = new cc.Sprite(res.KaiPai_png);
		var kaiPaiSprite1 = new cc.Sprite(res.KaiPai1_png);
		var kaiPaiSprite2 = new cc.Sprite(res.KaiPai1_png);
		this.kaiPaiMenuItem=new cc.MenuItemSprite(kaiPaiSprite,kaiPaiSprite1,kaiPaiSprite2,
				this.menuCallbackKaiPai,this);

		//弃牌
		var qiPaiSprite = new cc.Sprite(res.QiPai_png);
		var qiPaiSprite1 = new cc.Sprite(res.QiPai1_png);
		var qiPaiSprite2 = new cc.Sprite(res.QiPai1_png);
		this.qiPaiMenuItem=new cc.MenuItemSprite(qiPaiSprite,qiPaiSprite1,qiPaiSprite2,
				function(){
			game_throw();
		},this);

		//加注
		var jiaZhuSprite = new cc.Sprite(res.JiaZhu_png);
		var jiaZhuSprite1 = new cc.Sprite(res.JiaZhu1_png);
		var jiaZhuSprite2 = new cc.Sprite(res.JiaZhu1_png);
		this.jiaZhuMenuItem=new cc.MenuItemSprite(jiaZhuSprite,jiaZhuSprite1,jiaZhuSprite2,
				this.menuCallbackJiaZhu,this);

		//跟注
		var genZhuSprite=new cc.Sprite(res.GenZhu_png);
		var genZhuSprite1 = new cc.Sprite(res.GenZhu1_png);
		var genZhuSprite2 = new cc.Sprite(res.GenZhu1_png);
		this.genZhuMenuItem=new cc.MenuItemSprite(genZhuSprite,genZhuSprite1,genZhuSprite2,
				this.game_follow,this);

		this.mn=new cc.Menu(this.zhunBeiMenuItem,this.biPaiMenuItem,this.kaiPaiMenuItem,
				this.qiPaiMenuItem,this.jiaZhuMenuItem,this.genZhuMenuItem);
		this.mn.x=size.width/2;
		this.mn.y= 35;
		this.mn.alignItemsHorizontallyWithPadding(20);
		this.addChild(this.mn,2);
		console.log("set game menu success......");
	},
	
	initHeadMenu:function(){
		var size=cc.director.getWinSize();
		//设置按钮
		var settingSprite1=new cc.Sprite(res.SettingButton_png);
		var settingSprite2=new cc.Sprite(res.SettingButton_png);
		var settingSprite3=new cc.Sprite(res.SettingButton_png);
		var settingMenuItem=new cc.MenuItemSprite(settingSprite1,settingSprite2,settingSprite3,
				this.menuSettingCallback,this);
		settingMenuItem.x=this.backSpriteHead.getContentSize().width-50;
		settingMenuItem.y=this.backSpriteHead.getContentSize().height/2;
		console.log("setting pos:[" + settingMenuItem.x + "," + settingMenuItem.y + "]");

		//返回按钮
		var gameBackSprite1=new cc.Sprite(res.GameBack_png);
		var gameBackSprite2=new cc.Sprite(res.GameBack_png);
		var gameBackSprite3=new cc.Sprite(res.GameBack_png);
		var gameBackMenuItem=new cc.MenuItemSprite(gameBackSprite1,gameBackSprite2,gameBackSprite3,
				this.menuCallbackGameBack,this);
		gameBackMenuItem.x=40;
		gameBackMenuItem.y=this.backSpriteHead.getContentSize().height/2;
		console.log("game back pos:[" + gameBackMenuItem.x + "," + gameBackMenuItem.y + "]");

		//聊天按钮
		var chatMenuItemSprite1=new cc.Sprite(res.MenuComeInChat_png);
		var chatMenuItemSprite2=new cc.Sprite(res.MenuComeInChat_png);
		var chatMenuItemSprite3=new cc.Sprite(res.MenuComeInChat_png);
		var chatMenuItem=new cc.MenuItemSprite(chatMenuItemSprite1,chatMenuItemSprite2,chatMenuItemSprite3,
				this.menuCallbackGameChat,this);
		chatMenuItem.x=150;
		chatMenuItem.y=this.backSpriteHead.getContentSize().height/2;
		console.log("chating pos:[" + chatMenuItem.x + "," + chatMenuItem.y + "]");
		this.otherMenu=new cc.Menu(settingMenuItem,gameBackMenuItem,
				chatMenuItem
		);
		this.otherMenu.x=0;
		this.otherMenu.y=0;
		this.backSpriteHead.addChild(this.otherMenu,3);

		//房主名称
		var roomMasterSprite = new cc.Sprite(res.RoomMaster_png);
		roomMasterSprite.attr({
			x:this.backSpriteHead.getContentSize().width/3-140,
			y:this.backSpriteHead.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.backSpriteHead.addChild(roomMasterSprite);

		var labelName = new cc.LabelTTF(nickName,"Arial",25);
		labelName.setColor(cc.color(160,82,45));
		labelName.attr({
			x: roomMasterSprite.getContentSize().width+15,
			y: roomMasterSprite.getContentSize().height/2,
			anchorX:0,
			anchorY:0.5
		});
		roomMasterSprite.addChild(labelName);

		//房间号信息
		var roomNumSprite = new cc.Sprite(res.RoomNum_png);
		roomNumSprite.attr({
			x:this.backSpriteHead.getContentSize().width/3 + 80,
			y:this.backSpriteHead.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		var labelNum = new cc.LabelTTF(this.roomNum.toString(),"Arial",25);
		labelNum.setColor(cc.color(160,82,45));
		labelNum.attr({
			x: roomNumSprite.getContentSize().width+15,
			y: roomNumSprite.getContentSize().height/2,
			anchorX:0,
			anchorY:0.5
		});
		roomNumSprite.addChild(labelNum);
		this.backSpriteHead.addChild(roomNumSprite);
		
		//单注
		var betSprite=new cc.Sprite(res.Danzhu_png);
		betSprite.attr({
			x:this.backSpriteHead.getContentSize().width/3+300 ,
			y:this.backSpriteHead.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		var betString=this.bet;
		this.labelBet=new cc.LabelTTF(betString,"Arial",25);
		this.labelBet.setColor(cc.color(160,82,45));
		this.labelBet.attr({
			x: betSprite.getContentSize().width+10,
			y: betSprite.getContentSize().height/2,
			anchorX:0,
			anchorY:0.5
		});
		betSprite.addChild(this.labelBet);
		this.backSpriteHead.addChild(betSprite);

		//总注
		var sumBetSprite=new cc.Sprite(res.ZongZhu_png);
		sumBetSprite.attr({
			x:this.backSpriteHead.getContentSize().width/3 + 450,
			y:this.backSpriteHead.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		var sumBetString=this.sumBet;
		this.labelSumBet=new cc.LabelTTF(sumBetString.toString(),"Arial",25);
		this.labelSumBet.setColor(cc.color(160,82,45));
		this.labelSumBet.attr({
			x:sumBetSprite.getContentSize().width + 45,
			y:sumBetSprite.getContentSize().height/2,
			anchorX:1,
			anchorY:0.5
		});
		sumBetSprite.addChild(this.labelSumBet,2);
		this.backSpriteHead.addChild(sumBetSprite);

		//局数
		var roundSprite=new cc.Sprite(res.HuiHe_png);
		roundSprite.attr({
			x:this.backSpriteHead.getContentSize().width /3+620,
			y:this.backSpriteHead.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		var countFlowingString=this.countFlowing+"/" + g_totalCount;
		this.labelCountFlowing=new cc.LabelTTF(countFlowingString,"Arial",25);
		this.labelCountFlowing.setColor(cc.color(135,206,250));
		this.labelCountFlowing.attr({
			x: betSprite.getContentSize().width+15,
			y: betSprite.getContentSize().height/2,
			anchorX:0,
			anchorY:0.5
		});
		roundSprite.addChild(this.labelCountFlowing,2);
		this.backSpriteHead.addChild(roundSprite);

		//广播按钮
		var radioMenuItemSprite1=new cc.Sprite(res.DisplayTxtBoar_png);
		var radio1=new cc.Sprite(res.Horn_png);
		radio1.attr({
			x:50,
			y:radioMenuItemSprite1.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		radioMenuItemSprite1.addChild(radio1);
		var radioMenuItemSprite2=new cc.Sprite(res.DisplayTxtBoar_png);
		var radio2=new cc.Sprite(res.Horn_png);
		radio2.attr({
			x:50,
			y:radioMenuItemSprite2.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		radioMenuItemSprite2.addChild(radio2);
		var radioMenuItemSprite3=new cc.Sprite(res.DisplayTxtBoar_png);
		var radio3=new cc.Sprite(res.Horn_png);
		radio3.attr({
			x:50,
			y:radioMenuItemSprite3.getContentSize().height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		radioMenuItemSprite3.addChild(radio3);
		var radioMenuItem=new cc.MenuItemSprite(radioMenuItemSprite1,radioMenuItemSprite2,radioMenuItemSprite3,
				this.menuCallbackRadio,this);
		radioMenuItem.x=size.width/2;
		radioMenuItem.y=size.height-radioMenuItemSprite1.getContentSize().height*3/2-10;
		console.log("radio pos:[" + radioMenuItem.x + "," + radioMenuItem.y + "]");
		var radioMenu=new cc.Menu(radioMenuItem);
		radioMenu.x=0;
		radioMenu.y=0;
		this.addChild(radioMenu);
	},

    initMenuItemVisibleAfterComeInRoom:function(){
		//正在游戏中则新加入的玩家不可以准备
		if(this.roomState == 1){
			this.zhunBeiMenuItem.setEnabled(false);
		}else{
			this.zhunBeiMenuItem.setEnabled(true);
		}
        this.biPaiMenuItem.setEnabled(false);
        this.qiPaiMenuItem.setEnabled(false);
        this.kaiPaiMenuItem.setEnabled(false);
        this.jiaZhuMenuItem.setEnabled(false);
        this.genZhuMenuItem.setEnabled(false);
    },

    initMenuItemVisibleCallbackAfterDealCard:function(){
		if(this.currentGetPowerPlayerPosition == g_myselfPlayerPos){
			this.biPaiMenuItem.setEnabled(true);
			this.jiaZhuMenuItem.setEnabled(true);
			this.genZhuMenuItem.setEnabled(true);
		}
		this.qiPaiMenuItem.setEnabled(true);
        this.kaiPaiMenuItem.setEnabled(true);
    },

    initCounterTimer:function(){
    	if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
    		var myself=false;
    		if(myself==false){
    			for(var i=0;i<g_players.length;i++){
    				if(g_players[i].positionServer==this.currentGetPowerPlayerPosition){
    					g_players[i].counterTimer.startCounterTimer();
    					myself=true;
    					break;
    				}
    			}
    		}
    		if(myself==false){
    			for(var i=0;i<g_players_noPower.length;i++){
    				if(g_players_noPower[i].positionServer==this.currentGetPowerPlayerPosition){
    					g_players_noPower[i].counterTimer.startCounterTimer();
    					myself=true;
    					break;
    				}
    			}
    		}
    	}
    	else{
    		console.log("No start Rotation");
    	}
    },

    //初始化广播显示广播信息的窗口
    initRadioDisplayTxtCliper:function(){
    	//背景
    	var size=cc.director.getWinSize();
    	this.radioMenuBackground=new cc.Sprite(res.DisplayTxtBoar_png);
    	this.radioMenuBackground.x=size.width/2;
    	this.radioMenuBackground.y=size.height-this.radioMenuBackground.getContentSize().height*3/2-10;
    	this.addChild(this.radioMenuBackground,3);

    	//初始化滚动字幕成员

    	this.cliper=new cc.ClippingNode();

    	var drawNode = new cc.DrawNode();
    	var nodeWidth=this.radioMenuBackground.getContentSize().width-20;
    	var nodeHeight=this.radioMenuBackground.getContentSize().height;
    	console.log("nodeWidth:"+nodeWidth);
    	console.log("nodeHeight:"+nodeHeight);
    	drawNode.drawRect(cc.p(0,0),cc.p(700,55),cc.color.WHITE);

    	this.cliper.setStencil(drawNode);
    	this.cliper.attr({
    		x: 80,
    		y: this.radioMenuBackground.getContentSize().height/2-15,
    		anchorX:0.5,
    		anchorY:0.5
    	});
    	this.radioMenuBackground.addChild(this.cliper);
    },

	initPlayersAndPlayer_noPower:function(){
		for(var i=0;i<g_playerData.length;i++){
			if(g_playerData[i][0] == playerId){
				g_myselfPlayerPos = g_playerData[i][1];
				break;
			}
		}
		for(var i=0;i<g_playerData.length;i++){
			var	player = new ZJHPlayers(g_playerData[i]);
			if(this.roomState == 1){
				g_players_noPower.push(player);
			}else{
				g_players.push(player);
			}
			this.addChild(player,5);
		}
		console.log("initPlayersAndPlayer_noPower succ:g_players:" + g_players.length + " g_players_noPower:" + g_players_noPower.length);
	},
	
	initPlayers:function(){
		var size=cc.director.getWinSize();
		var tmp_allplayers = g_players_noPower.concat(g_players);
		console.log("initPlayers length:" + tmp_allplayers.length);
		//寻找玩家自己，确定自己的服务器位置和客户端位置
		for(var i=0;i<tmp_allplayers.length;i++){
			if(tmp_allplayers[i].positionServer == g_myselfPlayerPos){
				tmp_allplayers[i].playerPosition=1;
			}
		}
		console.log("find the myself server pos:" + g_myselfPlayerPos);
		//根据玩家自己的位置确定其他玩家的客户端位置
		for(var i=0;i<tmp_allplayers.length;i++){
			player = tmp_allplayers[i];
			if(player.positionServer > g_myselfPlayerPos){
				player.playerPosition= 1 + (player.positionServer-g_myselfPlayerPos);
			}
			else if(player.positionServer < g_myselfPlayerPos){
				player.playerPosition= 1 + (5-g_myselfPlayerPos) + player.positionServer;
			}
			console.log("playerPosition server pos:" + player.positionServer + " player pos:" + player.playerPosition);
		}
		//根据客户端位置信息确定显示所有玩家的位置
		for(var i=0;i<tmp_allplayers.length;i++){
			player = tmp_allplayers[i];
			switch (player.playerPosition){
				case 1:
					player.spritePhotoMobile.setPosition(
						size.width/2 - player.spritePhotoMobile.getContentSize().width,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				case 2:
					player.spritePhotoMobile.setPosition(
						size.width-player.spritePhotoMobile.getContentSize().width/2-36,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				case 3:
					player.spritePhotoMobile.setPosition(
						size.width-player.spritePhotoMobile.getContentSize().width/2-36,
						size.height-player.spritePhotoMobile.getContentSize().height/2-100);
					break;
				case 4:
					player.spritePhotoMobile.setPosition(
						player.spritePhotoMobile.getContentSize().width/2+36,
						size.height-player.spritePhotoMobile.getContentSize().height/2-100);
					break;
				case 5:
					player.spritePhotoMobile.setPosition(
						player.spritePhotoMobile.getContentSize().width/2+36,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				default :break;
			}
		}
	},

   	//刷新房间的底注、总注、回合
	showRoomMessageUpdate:function(){
		var betString=this.bet;
		this.labelBet.setString(betString);

		var sumBetString=this.sumBet;
		this.labelSumBet.setString(sumBetString);

		var countFlowingString=this.countFlowing + "/" + g_totalCount;
		this.labelCountFlowing.setString(countFlowingString);
	},
    
    menuSettingCallback:function(){
    	console.log("enter menuSettingCallback:function(),please start setting");
    	var layerSetting=new PopUpSettingLayer();
    	this.addChild(layerSetting,3);
    },
    menuCallbackGameBack:function(){
        var layerBack=new PopUpGameBackLayer();
        this.addChild(layerBack,3);
    },
    menuCallbackGameChat:function(){
        console.log("enter menuCallbackGameChat.....");
        var layerChat=new PopUpChatLayer();
        this.addChild(layerChat,3);
    },
    menuCallbackRadio:function(){
    	console.log("welcome coming menuCallbackRadio");
    	var layerRadio=new PopUpRadioLayer();
    	this.addChild(layerRadio,3);
    },

    menuCallbackBiPai:function() {
        if (g_players.length >= 2) {
            if (g_players.length == 2) {
                this.biPaiMenuItem.setEnabled(false);
                this.jiaZhuMenuItem.setEnabled(false);
                this.genZhuMenuItem.setEnabled(false);

                if (g_players[0].positionServer == g_myselfPlayerPos) {
                    g_playerPositionServer1 = g_players[0].positionServer;
                    g_playerPositionServer2 = g_players[1].positionServer;
                }
                else {
                    g_playerPositionServer1 = g_players[1].positionServer;
                    g_playerPositionServer2 = g_players[0].positionServer;
                }

                pomelo.request(util.getGameRoute(), {
                    process: "bipai",
                    location1: g_playerPositionServer1,
                    location2: g_playerPositionServer2
                }, function (data) {
                    cc.log(JSON.stringify(data));
                });
            }
            else {
                g_menuBiPaiSelect = new cc.Menu();
                g_menuBiPaiSelect.x = 0;
                g_menuBiPaiSelect.y = 0;
                g_biPaiRing = new Array();

                this.addChild(g_menuBiPaiSelect, 20);
                this.layerBiPaiSelect = new PopUpBiPaiSelect();
                this.addChild(this.layerBiPaiSelect, 15);
                this.biPaiSelectGUI();
            }
        }
    },

    biPaiSelectGUI:function(){
        var size=cc.director.getWinSize();
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer != g_myselfPlayerPos){
                var ring=new cc.Sprite(res.Ring_png);
                var biString=new cc.Sprite(res.BiString_png);
                var biString1=new cc.Sprite(res.BiString_png);
                var biString2=new cc.Sprite(res.BiString_png);
                var biMenuItem=new cc.MenuItemSprite(biString,biString1,biString2,this.getAndSetPlayerPosition,this);
                this.addChild(ring,4);
                g_biPaiRing.push(ring);
                var ringSmallAction=cc.scaleTo(0.5,0.5,0.5);
                var ringBigAction=cc.scaleTo(0.5,2,2);
                var ringSeqAction=cc.sequence(ringSmallAction,ringBigAction);
                var ringRepeatAction=cc.repeatForever(ringSeqAction);
                ring.runAction(ringRepeatAction);
                switch (g_players[i].playerPosition){
                    case 2:
                        biMenuItem.x=size.width-100;
                        biMenuItem.y=200;
                        biMenuItem.setName(g_players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(size.width-100,200);
                        break;
                    case 3:
                        biMenuItem.x=size.width-100;
                        biMenuItem.y=size.height-200;
                        biMenuItem.setName(g_players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(size.width-100,size.height-200);
                        break;
                    case 4:
                        biMenuItem.x=100;
                        biMenuItem.y=size.height-200;
                        biMenuItem.setName(g_players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(100,size.height-200);
                        break;
                    case 5:
                        biMenuItem.x=100;
                        biMenuItem.y=200;
                        biMenuItem.setName(g_players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(100,200);
                        break;
                    default:
                        break;

                }
            }
        }
    },

    getAndSetPlayerPosition:function(sender){
        console.log("选择的比牌的玩家位置.........................."+sender.getName());
        //
        this.layerBiPaiSelect.destoty();
        g_menuBiPaiSelect.removeFromParent();
        this.layerBiPaiSelect.removeFromParent();
        for(var i=0;i<g_biPaiRing.length;i++){
            g_biPaiRing[i].removeFromParent();
        }
        g_menuBiPaiSelect=null;
        g_biPaiRing.length=0;
        this.layerBiPaiSelect=null;
        //获取比牌玩家的服务器位置
        g_playerPositionServer1=g_myselfPlayerPos
        g_playerPositionServer2=parseInt(sender.getName());
        var biPaiPlayerIndexOf1=-1;
        var biPaiPlayerIndexOf2=-1;
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer==g_playerPositionServer1){
                biPaiPlayerIndexOf1=i;
            }
            if(g_players[i].positionServer==g_playerPositionServer2){
                biPaiPlayerIndexOf2=i;
            }
        }
        if(biPaiPlayerIndexOf1!=-1&&biPaiPlayerIndexOf2!=-1){
            this.biPaiMenuItem.setEnabled(false);
            this.jiaZhuMenuItem.setEnabled(false);
            this.genZhuMenuItem.setEnabled(false);
            pomelo.request(util.getGameRoute(),{
                process:"bipai",
                location1:g_playerPositionServer1,
                location2:g_playerPositionServer2
            },function(data){
                cc.log(JSON.stringify(data));
            });
        }
        else{
            console.log("No power to compare, because the opposite side or yourself have no power");
        }
    },

    menuCallbackKaiPai:function(){
    	var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i<tmp_allplayers.length;i++){
            if(tmp_allplayers[i].positionServer == g_myselfPlayerPos){
                if(tmp_allplayers[i].myCards[0].sprite!=null){
                    pomelo.request(util.getGameRoute(),{
                        process:"open",
                        location:g_myselfPlayerPos
                    },function(data){
                        console.log(data.msg);
                    });
                }
                else{
                    console.log("error:front sprite of card had not been initialized,you can not open the card.....menuCallbackKaiPai:function()");
                    return;
                }
                break;
            }
        }
    },
	
	menuCallbackZhunBei:function(){
		pomelo.request(util.getGameRoute(),{
			process:"ready",
			location:g_myselfPlayerPos
		},function(data){
			console.log(data.msg);
		});
    },

    menuCallbackJiaZhu:function(){
		console.log("go into menuCallbackJiaZhu......");
        g_spritePlaceJiaZhuMenuSelect=new cc.Sprite(res.JiaZhuSprite);
        this.addChild(g_spritePlaceJiaZhuMenuSelect,20);
        this.layerJiaZhuSelect=new PopUpJiaZhuSelect();
        this.addChild(this.layerJiaZhuSelect,15);
        this.setJiaZhuMenuSelect();
        this.addListenerTo_g_spritePlaceJiaZhuMenuSelect();
    },

    setJiaZhuMenuSelect:function(){
		console.log("start go into setJiaZhuMenuSelect......");
        //按钮初始化
        var size=cc.director.getWinSize();
        //var countSprite=new cc.Sprite(res.Chips_png);
        //第一级别按钮初始化
        var usablePicture=new cc.Sprite(res.Chips1_png);
        var usableString=new cc.Sprite(res.ChuJiString_png1);
        usableString.setPosition(usablePicture.getPositionX()+usablePicture.getContentSize().width/2,
            usablePicture.getPositionY()+usablePicture.getContentSize().height/2);
        usablePicture.addChild(usableString);

        var usablePicture1=new cc.Sprite(res.Chips1_png);
        var usableString1=new cc.Sprite(res.ChuJiString_png1);
        usableString1.setPosition(usablePicture1.getPositionX()+usablePicture1.getContentSize().width/2,
                usablePicture1.getPositionY()+usablePicture1.getContentSize().height/2);
        usablePicture1.addChild(usableString1);

        var unusablePicture=new cc.Sprite(res.Chips1_png);
        var unusableString=new cc.Sprite(res.ChuJiString_png1);
        var unusableProhibit=new cc.Sprite(res.ChipsProhibit_png);
        unusableString.setPosition(unusablePicture.getPositionX()+unusablePicture.getContentSize().width/2,
            unusablePicture.getPositionY()+unusablePicture.getContentSize().height/2);
        unusableProhibit.setPosition(unusablePicture.getPositionX()+unusablePicture.getContentSize().width/2,
            unusablePicture.getPositionY()+unusablePicture.getContentSize().height/2);
        unusablePicture.addChild(unusableString);
        unusablePicture.addChild(unusableProhibit);

        //第二级别按钮初始化
        var usablePicture_1=new cc.Sprite(res.Chips2_png);
        var usableString_1=new cc.Sprite(res.ChuJiString_png2);
        usableString_1.setPosition(usablePicture_1.getPositionX()+usablePicture_1.getContentSize().width/2,
            usablePicture_1.getPositionY()+usablePicture_1.getContentSize().height/2);
        usablePicture_1.addChild(usableString_1);

        var usablePicture1_1=new cc.Sprite(res.Chips2_png);
        var usableString1_1=new cc.Sprite(res.ChuJiString_png2);
        usableString1_1.setPosition(usablePicture1_1.getPositionX()+usablePicture1_1.getContentSize().width/2,
            usablePicture1_1.getPositionY()+usablePicture1_1.getContentSize().height/2);
        usablePicture1_1.addChild(usableString1_1);

        var unusablePicture_1=new cc.Sprite(res.Chips2_png);
        var unusableString_1=new cc.Sprite(res.ChuJiString_png2);
        var unusableProhibit_1=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_1.setPosition(unusablePicture_1.getPositionX()+unusablePicture_1.getContentSize().width/2,
            unusablePicture_1.getPositionY()+unusablePicture_1.getContentSize().height/2);
        unusableProhibit_1.setPosition(unusablePicture_1.getPositionX()+unusablePicture_1.getContentSize().width/2,
            unusablePicture_1.getPositionY()+unusablePicture_1.getContentSize().height/2);
        unusablePicture_1.addChild(unusableString_1);
        unusablePicture_1.addChild(unusableProhibit_1);

        //第三级别按钮初始化
        var usablePicture_2=new cc.Sprite(res.Chips3_png);
        var usableString_2=new cc.Sprite(res.ChuJiString_png3);
        usableString_2.setPosition(usablePicture_2.getPositionX()+usablePicture_2.getContentSize().width/2,
            usablePicture_2.getPositionY()+usablePicture_2.getContentSize().height/2);
        usablePicture_2.addChild(usableString_2);

        var usablePicture1_2=new cc.Sprite(res.Chips3_png);
        var usableString1_2=new cc.Sprite(res.ChuJiString_png3);
        usableString1_2.setPosition(usablePicture1_2.getPositionX()+usablePicture1_2.getContentSize().width/2,
            usablePicture1_2.getPositionY()+usablePicture1_2.getContentSize().height/2);
        usablePicture1_2.addChild(usableString1_2);

        var unusablePicture_2=new cc.Sprite(res.Chips3_png);
        var unusableString_2=new cc.Sprite(res.ChuJiString_png3);
        var unusableProhibit_2=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_2.setPosition(unusablePicture_2.getPositionX()+unusablePicture_2.getContentSize().width/2,
            unusablePicture_2.getPositionY()+unusablePicture_2.getContentSize().height/2);
        unusableProhibit_2.setPosition(unusablePicture_2.getPositionX()+unusablePicture_2.getContentSize().width/2,
            unusablePicture_2.getPositionY()+unusablePicture_2.getContentSize().height/2);
        unusablePicture_2.addChild(unusableString_2);
        unusablePicture_2.addChild(unusableProhibit_2);

        //第四级别按钮初始化
        var usablePicture_3=new cc.Sprite(res.Chips4_png);
        var usableString_3=new cc.Sprite(res.ChuJiString_png4);
        usableString_3.setPosition(usablePicture_3.getPositionX()+usablePicture_3.getContentSize().width/2,
            usablePicture_3.getPositionY()+usablePicture_3.getContentSize().height/2);
        usablePicture_3.addChild(usableString_3);

        var usablePicture1_3=new cc.Sprite(res.Chips4_png);
        var usableString1_3=new cc.Sprite(res.ChuJiString_png4);
        usableString1_3.setPosition(usablePicture1_3.getPositionX()+usablePicture1_3.getContentSize().width/2,
            usablePicture1_3.getPositionY()+usablePicture1_3.getContentSize().height/2);
        usablePicture1_3.addChild(usableString1_3);

        var unusablePicture_3=new cc.Sprite(res.Chips4_png);
        var unusableString_3=new cc.Sprite(res.ChuJiString_png4);
        var unusableProhibit_3=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_3.setPosition(unusablePicture_3.getPositionX()+unusablePicture_3.getContentSize().width/2,
            unusablePicture_3.getPositionY()+unusablePicture_3.getContentSize().height/2);
        unusableProhibit_3.setPosition(unusablePicture_3.getPositionX()+unusablePicture_3.getContentSize().width/2,
            unusablePicture_3.getPositionY()+unusablePicture_3.getContentSize().height/2);
        unusablePicture_3.addChild(unusableString_3);
        unusablePicture_3.addChild(unusableProhibit_3);

        //第五级别按钮初始化
        var usablePicture_4=new cc.Sprite(res.Chips5_png);
        var usableString_4=new cc.Sprite(res.ChuJiString_png5);
        usableString_4.setPosition(usablePicture_4.getPositionX()+usablePicture_4.getContentSize().width/2,
            usablePicture_4.getPositionY()+usablePicture_4.getContentSize().height/2);
        usablePicture_4.addChild(usableString_4);

        var usablePicture1_4=new cc.Sprite(res.Chips5_png);
        var usableString1_4=new cc.Sprite(res.ChuJiString_png5);
        usableString1_4.setPosition(usablePicture1_4.getPositionX()+usablePicture1_4.getContentSize().width/2,
            usablePicture1_4.getPositionY()+usablePicture1_4.getContentSize().height/2);
        usablePicture1_4.addChild(usableString1_4);

        var unusablePicture_4=new cc.Sprite(res.Chips5_png);
        var unusableString_4=new cc.Sprite(res.ChuJiString_png5);
        var unusableProhibit_4=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_4.setPosition(unusablePicture_4.getPositionX()+unusablePicture_4.getContentSize().width/2,
            unusablePicture_4.getPositionY()+unusablePicture_4.getContentSize().height/2);
        unusableProhibit_4.setPosition(unusablePicture_4.getPositionX()+unusablePicture_4.getContentSize().width/2,
            unusablePicture_4.getPositionY()+unusablePicture_4.getContentSize().height/2);
        unusablePicture_4.addChild(unusableString_4);
        unusablePicture_4.addChild(unusableProhibit_4);


        var firstJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture,usablePicture1,unusablePicture,
            this.game_add,this);
        firstJiaZhuMenuItem.setName("first");
        var secondJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_1,usablePicture1_1,unusablePicture_1,
            this.game_add,this);
        secondJiaZhuMenuItem.setName("second");
        var thirdJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_2,usablePicture1_2,unusablePicture_2,
            this.game_add,this);
        thirdJiaZhuMenuItem.setName("third");
        var fourthJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_3,usablePicture1_3,unusablePicture_3,
            this.game_add,this);
        fourthJiaZhuMenuItem.setName("fourth");
        var fifthJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_4,usablePicture1_4,unusablePicture_4,
                this.game_add,this);
        fifthJiaZhuMenuItem.setName("fifth");


        var jiaZhuMenu=new cc.Menu(firstJiaZhuMenuItem,secondJiaZhuMenuItem,thirdJiaZhuMenuItem,fourthJiaZhuMenuItem,fifthJiaZhuMenuItem);
        jiaZhuMenu.alignItemsHorizontallyWithPadding(10);
        jiaZhuMenu.x=g_spritePlaceJiaZhuMenuSelect.getContentSize().width/2;
        jiaZhuMenu.y=g_spritePlaceJiaZhuMenuSelect.getContentSize().height/2;
        //this.addChild(jiaZhuMenu,5);
        g_spritePlaceJiaZhuMenuSelect.addChild(jiaZhuMenu);
        g_spritePlaceJiaZhuMenuSelect.setPosition(size.width/2,
                g_spritePlaceJiaZhuMenuSelect.getContentSize().height/2 + 200);
		console.log("leave from setJiaZhuMenuSelect");
    },

    game_add:function(sender){
        console.log("click menuItem is: "+sender.getName());
        this.layerJiaZhuSelect.removeFromParent();
        cc.eventManager.removeListener(g_jiaZhu_touchListener);
        g_spritePlaceJiaZhuMenuSelect.removeFromParent();
        //g_spritePlaceJiaZhuMenuSelect.release();
        this.layerJiaZhuSelect=null;
        g_spritePlaceJiaZhuMenuSelect=null;
        switch (sender.getName()){
            case  "first":
                g_AddChipSize=g_betArray[0];
                console.log("g_AddChipSize:"+g_AddChipSize);
                break;
            case "second":
                g_AddChipSize=g_betArray[1];
                console.log("g_AddChipSize:"+g_AddChipSize);
                break;
            case  "third":
                g_AddChipSize=g_betArray[2];
                console.log("g_AddChipSize:"+g_AddChipSize);
                break;
            case "fourth":
                g_AddChipSize=g_betArray[3];
                console.log("g_AddChipSize:"+g_AddChipSize);
                break;
            case  "fifth":
                g_AddChipSize=g_betArray[4];
                console.log("g_AddChipSize:"+g_AddChipSize);
                break;
            default:
                break;
        }
        pomelo.request(util.getGameRoute(),{
            process:"add",
            add_chip:g_AddChipSize,
            location:g_myselfPlayerPos
        },function(data){
            console.log(data.msg);

        });
    },
   
	game_follow:function(sender){
		this.genZhuMenuItem.setEnabled(false);
		pomelo.request(util.getGameRoute(),{
			process:"follow",
			location:g_myselfPlayerPos
		},function(data){
			console.log(data.msg);
		});
	},
	
    addListenerTo_g_spritePlaceJiaZhuMenuSelect:function(){
        g_jiaZhu_touchListener=new cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    console.log("Select the available buttons,please.......");
                }
                else{
                    this.layerJiaZhuSelect.removeFromParent();
                    cc.eventManager.removeListener(g_jiaZhu_touchListener);
                    g_spritePlaceJiaZhuMenuSelect.removeFromParent();
                    this.layerJiaZhuSelect=null;
                    g_spritePlaceJiaZhuMenuSelect=null;
                }
            }.bind(this)
        });
        cc.eventManager.addListener(g_jiaZhu_touchListener,g_spritePlaceJiaZhuMenuSelect);
    },

	//广播窗口信息推送滚动
    radioMessageScroll:function(inputString,color){
        //将广播字符串压入广播字符串记录数组，保存起来
        //最多保存的广播记录数，暂时定为15条
        var recordMax=g_recordMax;
        //记录数组超过15条，先删除最先进入的一条
        if(g_radioMessageArray.length>recordMax){
            g_radioMessageArray.splice(0,1);
            g_radioMessageArray.push(inputString);
        }
        else{
            g_radioMessageArray.push(inputString);
        }

        //移除现在广播窗口的文本（如果存在）
        if(this.text_came!=null){
            this.text_came.stopAllActions();
            var temporary=this.text_came;
            this.text_came=null;
            temporary.runAction(cc.sequence(cc.moveBy(0.5,0,50),cc.hide(),cc.callFunc(function(){
                temporary.removeFromParent();
                temporary=null;
            })));
        }
        //加入新的广播信息
        this.text_came = new cc.LabelTTF(inputString,"Arial",30);
        console.log('text width:'+this.text_came.width);
        this.text_came.setColor(color?color:cc.color.BLUE);
        this.text_came.attr({
            x:700,
            y:0,
            anchorX:0,
            anchorY:0
        });
        this.cliper.addChild(this.text_came);
        //向左滚动动画
        this.text_came.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.001,0,0),cc.callFunc(function(){
            this.text_came.x=this.text_came.x-2.5;
            if(this.text_came.x<=-this.text_came.getContentSize().width){
                this.text_came.stopAllActions();
                this.text_came.removeFromParent();
                this.text_came=null;
                console.log("end........")
            }
        }.bind(this)))));
    },

	initPersonalMessageMenu:function(){
		var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i<tmp_allplayers.length;i++){
            if(tmp_allplayers[i].id!=playerId){
                var menuSprite1=new cc.Sprite(res.Mobile_jpg);
                var menuSprite2=new cc.Sprite(res.Mobile_jpg);
                var menuSprite3=new cc.Sprite(res.Mobile_jpg);
                var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
                menuItem.setName(tmp_allplayers[i].playerPosition.toString());
                menuItem.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                var menu=new cc.Menu(menuItem);
                menu.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                tmp_allplayers[i].spritePhotoMobile.addChild(menu);
            }
        }
    },
	   
	setPlayerCardsBackPosition:function(player,card_len){
		switch (player.playerPosition){
			case 1:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() +
							player.spritePhotoMobile.getContentSize().width +
							g_dealCardBack.getContentSize().width/2*(m),
						player.spritePhotoMobile.getPositionY());
				}
				break;
			case 2:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() - (5-m)*30,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			case 3:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() - (5-m)*30,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 4:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 5:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			default :
				break;
		}
	},
	
	setPlayerCardBackPosition:function(player,m){
		console.log("set player pos:" + player.playerPosition + " idx:" + m);
		switch (player.playerPosition){
			case 1:
				player.myCards[m].spriteBack.setPosition(
					player.spritePhotoMobile.getPositionX() +
						player.spritePhotoMobile.getContentSize().width +
						g_dealCardBack.getContentSize().width/2*(m),
					player.spritePhotoMobile.getPositionY());
				break;
			case 2:
				player.myCards[m].spriteBack.setPosition(
					player.spritePhotoMobile.getPositionX() - (5-m)*30,
					player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
				);
				break;
			case 3:
				player.myCards[m].spriteBack.setPosition(
					player.spritePhotoMobile.getPositionX() - (5-m)*30,
					player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
				);
				break;
			case 4:
				player.myCards[m].spriteBack.setPosition(
					player.spritePhotoMobile.getPositionX() + m*30,
					player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
				);
				break;
			case 5:
				player.myCards[m].spriteBack.setPosition(
					player.spritePhotoMobile.getPositionX() + m*30,
					player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
				);
				break;
			default :
				break;
		}
	},

	setPlayerCardsPosition:function(player,card_len){
		switch (player.playerPosition){
			case 1:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() +
						player.spritePhotoMobile.getContentSize().width +
						g_dealCardBack.getContentSize().width/2*(m),
					player.spritePhotoMobile.getPositionY());
				}
				break;
			case 2:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() - (5-m)*30,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			case 3:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() - (5-m)*30,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 4:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 5:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			default :
				break;
		}
	},
	
	setPlayerCardPosition:function(player,m){
		switch (player.playerPosition){
			case 1:
				player.myCards[m].sprite.setPosition(
						player.spritePhotoMobile.getPositionX() +
						player.spritePhotoMobile.getContentSize().width +
						g_dealCardBack.getContentSize().width/2*(m),
					player.spritePhotoMobile.getPositionY());
				break;
			case 2:
				player.myCards[m].sprite.setPosition(
					player.spritePhotoMobile.getPositionX() - (5-m)*30,
					player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
				);
				break;
			case 3:
				player.myCards[m].sprite.setPosition(
					player.spritePhotoMobile.getPositionX() - (5-m)*30,
					player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
				);
				break;
			case 4:
				player.myCards[m].sprite.setPosition(
					player.spritePhotoMobile.getPositionX() + m*30,
					player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
				);
				break;
			case 5:
				player.myCards[m].sprite.setPosition(
					player.spritePhotoMobile.getPositionX() + m*30,
					player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
				);
				break;
			default :
				break;
		}
	},

    //玩家进入房间时，初始化参与本牌局的玩家手中牌的位置
    initPlayerCardsPosition:function(){
		var size=cc.director.getWinSize();
		var all_players = g_players.concat(g_players_noPower);
        for(var i=0;i < all_players.length;i++){
			var player = all_players[i];
            if(player.isPower == 2){
				switch (player.playerPosition){
					case 1:
						for(var m = 0;m < 3;m++){
							player.myCards[m].spriteBack.setPosition(
								player.spritePhotoMobile.getPositionX() +
									player.spritePhotoMobile.getContentSize().width +
									g_dealCardBack.getContentSize().width/2*(m),
								player.spritePhotoMobile.getPositionY());
						}
						break;
					case 2:
						for(var m = 0;m < 3;m++){
							player.myCards[m].spriteBack.setPosition(
								player.spritePhotoMobile.getPositionX() - (5-m)*30,
								player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
							);
						}
						break;
					case 3:
						for(var m = 0;m < 3;m++){
							player.myCards[m].spriteBack.setPosition(
								player.spritePhotoMobile.getPositionX() - (5-m)*30,
								player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
							);
						}
						break;
					case 4:
						for(var m = 0;m < 3;m++){
							player.myCards[m].spriteBack.setPosition(
								player.spritePhotoMobile.getPositionX() + m*30,
								player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
							);
						}
						break;
					case 5:
						for(var m = 0;m < 3;m++){
							player.myCards[m].spriteBack.setPosition(
								player.spritePhotoMobile.getPositionX() + m*30,
								player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
							);
						}
						break;
					default :
						break;
				}
            }
        }
	},
    
    menuCallbackPersonalMessage:function(sender){
    	tmp_allplayers = g_players_noPower.concat(g_players);

		var playerPosition=parseInt(sender.getName());

		for(var i=0;i<tmp_allplayers.length;i++){
			if(tmp_allplayers[i].playerPosition==playerPosition){
				//将玩家Id，玩家的服务器位置，玩家性别，玩家金币，玩家签名，玩家vip级别，玩家收到各个礼物的数量和玩家照片存储位置作为参数传入（目前数据不全）
				var layerInteraction=new PopUpInteractionLayer(
					tmp_allplayers[i].id,
					tmp_allplayers[i].positionServer
				);
				this.addChild(layerInteraction,15);
				break;
			}
		}
    },

    pomelo_on:function(){
    	pomelo.on('onFapai',onFapai_function=function(data){
    		console.log("onFapai" + JSON.stringify(data));
    		var instruction_faPai=data["msg"];
			this.countFlowing = data["round"];
    		if(instruction_faPai=="fapaile!"){
    			/*更新房间状态和玩家信息*/
				//初始化发牌的位置
    			this.currentGetPowerPlayerPosition = data["location"];
				this.startDealCardPosition1 = data["location"];;
				this.startDealCardPosition = data["location"];;
				
    			//更新房间状态
    			this.roomState=1;
    			this.dealCardState=true;
				for(var i=0;i<this.betPhotoArray.length;i++){
					this.betPhotoArray[i].removeFromParent();
				}
				this.betPhotoArray.length=0;
				//更新玩家信息
    			for(var i=0;i<g_players.length;i++){
    				//清除玩家手中上一局的牌，
    				if(g_players[i].myCards != null){
    					g_players[i].myCards[0].removeFromParent();
    					g_players[i].myCards[1].removeFromParent();
    					g_players[i].myCards[2].removeFromParent();
    					g_players[i].myCards.length=0;
    					g_players[i].myCards = null;
    				}
    			}
    			this.bet = g_betArray[0];
    			this.sumBet=data["all_chip"];

    			/*初始化玩家手中的牌（背面），权限isPower,开牌checkCard弃牌abandon,失败提示精灵loserSprite*/
    			for(var i=0;i < g_players.length;i++){
					console.log("init player card: onfapai");
    				g_players[i].initPlayerCards();
    				g_players[i].isPower = 2;
    				g_players[i].checkCard=false;
    				g_players[i].abandon=false;
    				g_players[i].statusSprite.runAction(cc.sequence(cc.hide()));
    			}
    			//玩家收牌状态更新
    			for(var i=0;i<g_players.length;i++){
					var player = g_players[i];
					this.actionBottomBet(player.spritePhotoMobile.getPosition());
					player.resetMoneyLabel(player.myGold - this.bet);
					if(player.positionServer == this.currentGetPowerPlayerPosition){
						player.setSpriteStatus("shou");
					}
    			}
    		}
    	}.bind(this));

    	pomelo.on('onAdd',onAdd_function=function(data){
    		console.log("onAdd:" + JSON.stringify(data));
			var player = null;
			var playerInfo=data["user"];

			var t_player=new Array();
			t_player.push(playerInfo["id"]);
			t_player.push(playerInfo["location"]);
			t_player.push(playerInfo["isGame"]);
			t_player.push(playerInfo["nickName"]);
			t_player.push(playerInfo["gold"]);
			t_player.push(playerInfo["gender"]);
			
			if(this.roomState==0){
				player = new ZJHPlayers(t_player);
				g_players.push(player);
			}else{
				player = new ZJHPlayers(t_player);
				g_players_noPower.push(player);
			}
    		console.log("this.roomState:"+this.roomState);

			//确定新加入玩家的客户端位置
			if(player.positionServer>g_myselfPlayerPos){
				player.playerPosition=g_myselfPlayerPos+(player.positionServer-g_myselfPlayerPos);
			}else{
				player.playerPosition=1 + (5-g_myselfPlayerPos)+player.positionServer;
			}
			console.log("playerPOsition:"+player.playerPosition);
			var size=cc.director.getWinSize();
			switch (player.playerPosition){
				case 1:
					player.spritePhotoMobile.setPosition(
						size.width/2 - player.spritePhotoMobile.getContentSize().width,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				case 2:
					player.spritePhotoMobile.setPosition(
						size.width-player.spritePhotoMobile.getContentSize().width/2-36,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				case 3:
					player.spritePhotoMobile.setPosition(
						size.width-player.spritePhotoMobile.getContentSize().width/2-36,
						size.height-player.spritePhotoMobile.getContentSize().height/2-100);
					break;
				case 4:
					player.spritePhotoMobile.setPosition(
						player.spritePhotoMobile.getContentSize().width/2+36,
						size.height-player.spritePhotoMobile.getContentSize().height/2-100);
					break;
				case 5:
					player.spritePhotoMobile.setPosition(
						player.spritePhotoMobile.getContentSize().width/2+36,
						player.spritePhotoMobile.getContentSize().height/2+100);
					break;
				default :break;
			}
			this.addChild(player,5);
			/*
			//为新加入的玩家头像添加个人信息按钮
			var menuSprite1=new cc.Sprite(res.Mobile_jpg);
			var menuSprite2=new cc.Sprite(res.Mobile_jpg);
			var menuSprite3=new cc.Sprite(res.Mobile_jpg);
			var menuItem = new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
			menuItem.setName(player.playerPosition.toString());
			menuItem.attr({
				x : 0,
				y : 0,
				anchorX : 0,
				anchorY : 0
			});
			var menu=new cc.Menu(menuItem);
			menu.attr({
				x : 0,
				y : 0,
				anchorX : 0,
				anchorY : 0
			});
			player.spritePhotoMobile.addChild(menu);
			*/
			this.playerNum++;
    	}.bind(this));

    	pomelo.on('onReady',onReady_function=function(data){
			console.log("pomelo on Ready:" + data.location+" is ready");
			if(g_myselfPlayerPos == data.location){
				this.zhunBeiMenuItem.setEnabled(false);
			}
			/*如果玩家进来时正在游戏中则准备后 放入g_players中*/
			for(var i = 0;i < g_players_noPower.length;i++){
				var player = g_players_noPower[i];
				if(player.positionServer == data.location){
					g_players.push(player);
					g_players_noPower.splice(i,1);
					break;
				}
			}
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == data.location){
					player.isPower = 1;
					player.setSpriteStatus("ready");
					//准备状态表示
					break;
				}
			}
    	}.bind(this));

    	pomelo.on('onInit',onInit_function=function(data){
    		console.log("onInit:" + JSON.stringify(data));
    	}.bind(this));

    	pomelo.on('onActBroadcast',onActBroadcast_function=function(data){
    		console.log("onActBroadcast:"+JSON.stringify(data));
    		this.radioMessageScroll(data,cc.color(220,20,60));
    	}.bind(this));

    	pomelo.on('onOpen',onOpen_function=function(data){
    		console.log("onOpen:" + JSON.stringify(data));
			var all_players = g_players.concat(g_players_noPower);
    		var playerName = data["user"];
    		for(var i = 0;i < all_players.length;i++){
				var player = all_players[i];
    			if(player.id == playerName){
    				player.checkCard = true;
					if(playerName == playerId){
						//如果是自己则执行翻牌动作
						for(var j=0;j<3;j++){
							var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
							var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
							var backSpawn=cc.spawn(backCardSeq,backCamera);
							var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
							var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
							var frontSpawn=cc.spawn(frontSeq,frontCamera);
							player.myCards[j].spriteBack.runAction(backSpawn);
							player.myCards[j].sprite.runAction(frontSpawn);
						}
						this.kaiPaiMenuItem.setEnabled(false);
					}
					//重置定时器
					if(player.positionServer == this.currentGetPowerPlayerPosition){
						player.counterTimer.stopCounterTimer();
						player.counterTimer.startCounterTimer();
					}
					player.setSpriteStatus("kan");
					break;
				}
    		}
    	}.bind(this));

    	pomelo.on('onThrow',onThrow_function=function(data){
    		console.log("onThrow:" + JSON.stringify(data));
			var all_players = g_players.concat(g_players_noPower);
    		var playerName = data["user"];
    		for(var i = 0;i < all_players.length;i++){
				var player = all_players[i];
    			if(player.id == playerName){
    				player.abandon = true;
					if(playerName==playerId){
						this.biPaiMenuItem.setEnabled(false);
						this.qiPaiMenuItem.setEnabled(false);
						this.kaiPaiMenuItem.setEnabled(false);
						this.jiaZhuMenuItem.setEnabled(false);
						this.genZhuMenuItem.setEnabled(false);
						this.zhunBeiMenuItem.setEnabled(false);
					}
					player.setSpriteStatus("qi");					
					//将玩家移到player_noPower数组
					g_players_noPower.push(player);
					g_players.splice(i,1);
    				break;
    			}
    		}
    	}.bind(this));

    	pomelo.on('onBipai',onBipai_function=function(data){
    		console.log("onBipai:" + JSON.stringify(data));
    		var winnerPositionServer=data["winner"];
			this.sumBet = data["all_chip"];
    		var playerPositionServer1=data["position1"];
    		var playerPositionServer2=data["position2"];

    		var loserPositionServer=null;
    		if(playerPositionServer1==winnerPositionServer){
    			loserPositionServer=playerPositionServer2;
    		}
    		else{
    			loserPositionServer=playerPositionServer1;
    		}
    		g_loserPositionServer=loserPositionServer;
    		console.log("loserPositionServer:"+loserPositionServer);

    		//置房间状态为比牌状态并定时重置回来
    		this.comparableState=true;
    		var delayCompare=new cc.DelayTime(4.8);
    		var callbackSetRoomStateCompare=cc.callFunc(this.setRoomStateCompare,this);
    		this.runAction(cc.sequence(delayCompare,callbackSetRoomStateCompare));

    		//停止当前定时器进度条
    		var tmp_allplayers = g_players_noPower.concat(g_players);
    		if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
    			for(var i=0;i<tmp_allplayers.length;i++){
    				if(tmp_allplayers[i].positionServer == this.currentGetPowerPlayerPosition){
    					tmp_allplayers[i].counterTimer.stopCounterTimer();
    					break;
    				}
    			}
    		}
    		else{
    			console.log("No start Rotation");
    		}

    		//和自己相关的比牌时，为避免影响比牌的动作动画，先关闭开牌和弃牌按钮，比牌完毕再通过回调函数回复
    		if(playerPositionServer1 == g_myselfPlayerPos ||playerPositionServer2 == g_myselfPlayerPos){
    			if(playerPositionServer1== g_myselfPlayerPos){
    				this.biPaiMenuItem.setEnabled(false);
    				this.jiaZhuMenuItem.setEnabled(false);
    				this.genZhuMenuItem.setEnabled(false);
    			}
    			if(this.kaiPaiMenuItem.isEnabled()==true){
    				this.kaiPaiMenuItem.setEnabled(false);
    				this.qiPaiMenuItem.setEnabled(false);
    				if(g_myselfPlayerPos == winnerPositionServer&&g_players.length>2){
    					var delay=new cc.DelayTime(4.8);
    					var callbackSetKaiPaiQiPaiMenuItem=cc.callFunc(SetKaiPaiQiPaiMenuItem,this);
    					this.runAction(cc.sequence(delay,callbackSetKaiPaiQiPaiMenuItem));
    				}
    			}
    			else {
    				if(this.qiPaiMenuItem.isEnabled()==true){
    					this.qiPaiMenuItem.setEnabled(false);
    					if(g_myselfPlayerPos==winnerPositionServer&&g_players.length>2){
    						var delay=new cc.DelayTime(4.8);
    						var callbackSetQiPaiMenuItem=cc.callFunc(SetQiPaiMenuItem,this);
    						this.runAction(cc.sequence(delay,callbackSetQiPaiMenuItem));
    					}
    				}
    			}
    		}

    		//初始化比牌时间计算器
    		if(this.progressBoardBiPaiTime==null){
    			this.progressBoardBiPaiTime=new cc.ProgressTimer(null);
    			this.progressBoardBiPaiTime.setPercentage(0);
    			var ac=new cc.ProgressTo(4.8,100);
    			this.progressBoardBiPaiTime.runAction(ac);
    			this.addChild(this.progressBoardBiPaiTime);
    		}
    		else{
    			this.progressBoardBiPaiTime.removeFromParent();
    			this.progressBoardBiPaiTime=new cc.ProgressTimer(null);
    			this.progressBoardBiPaiTime.setPercentage(0);
    			var ac=new cc.ProgressTo(4.8,100);
    			this.progressBoardBiPaiTime.runAction(ac);
    			this.addChild(this.progressBoardBiPaiTime);
    		}


    		//发起比牌的玩家执行跟注动作
			console.log("start 发起比牌的玩家执行跟注动作" + tmp_allplayers.length);
    		for(var i=0;i<tmp_allplayers.length;i++){
				var player = tmp_allplayers[i];
    			if(player.positionServer==playerPositionServer1){
					player.resetMoneyLabel(parseInt(data["my_gold"]));
    				this.actionAddBet(player.spritePhotoMobile.getPosition(),player.checkCard);	
    				break;
    			}
    		}
    		//执行比牌动画
    		this.actionBiPai(playerPositionServer1,playerPositionServer2,loserPositionServer);
    	}.bind(this));

    	pomelo.on('onEnd',onEnd_function=function(data){
    		console.log("onEnd:" + JSON.stringify(data));
			var all_players = g_players.concat(g_players_noPower);
    		var playerPositionServer=data["winner"];
    		for(var i = 0;i < all_players.length;i++){
				var player = all_players[i];
    			if(player.positionServer == playerPositionServer){
					//如果房间属于比牌状态，需要等到比牌动作完成才执行获取金币动作
					if(this.comparableState==true){
						var compareTime=4.8-this.progressBoardBiPaiTime.getPercentage()/100*4.8;
						var waitGetBetTime=new cc.DelayTime(compareTime);
						var callbackActionWinnerGetBet=
							cc.callFunc(this.actionWinnerGetBet,this,player.spritePhotoMobile.getPosition());
						this.runAction(cc.sequence(waitGetBetTime,callbackActionWinnerGetBet));
						console.log("compareTime:"+compareTime);
						console.log("room is comparing...........................................");
					}else{
						this.actionWinnerGetBet(this,player.spritePhotoMobile.getPosition());
					}
					player.resetMoneyLabel(player.myGold + parseInt(data["all_chip"]));
					this.myselfCardsReach=false;
    				break;
    			}
    		}
			/* 结束则把玩家放入noPower中*/
			for(var i = 0;i < g_players.length;i++){
				g_players_noPower.push(g_players[i]);
			}
			g_players.splice(0,g_players.length);
    	}.bind(this));

    	pomelo.on('onFollow',onFollow_function=function(data){
    		console.log("onFollow:" + JSON.stringify(data));
    		var m_playerId = data["player_id"];
    		this.sumBet = data["all_chip"];;
			var all_players = g_players.concat(g_players_noPower);
		    for(var i=0;i < all_players.length;i++){
				var player = all_players[i];
		        if(player.id == m_playerId){
					player.resetMoneyLabel(parseInt(data["my_gold"]));
					this.actionFollowBet(player.spritePhotoMobile.getPosition(),player.checkCard);
		            break;
		        }
		    }
		}.bind(this));

		pomelo.on('onAddChip',onAddChip_function=function(data){
            console.log("onAddChip:" + JSON.stringify(data));
            var m_playerId = data["player_id"];
            this.bet = data["current_chip"];
            this.sumBet = data["all_chip"];
			var all_players = g_players.concat(g_players_noPower);
		    for(var i=0;i < all_players.length;i++){
				var player = all_players[i];
		        if(player.id == m_playerId){
					player.resetMoneyLabel(parseInt(data["my_gold"]));
					this.actionFollowBet(player.spritePhotoMobile.getPosition(),player.checkCard);
		            break;
		        }
		    }
        }.bind(this));
		
		pomelo.on('onLeave',onLeave_function=function(data){
            console.log("onLeave:" + JSON.stringify(data));
            var playerName=data["user"];
            console.log("player_Length:"+g_players.length+"  "+g_players_noPower.length);
            var isFind=false;

			for(var i = 0;i < g_players.length;i++){
				if(g_players[i].id == playerName){
					console.log("quit from room g_players");
					g_players[i].removeFromParent();
					g_players.splice(i,1);
					isFind=true;
				}
			}
            if(isFind==false){
                for(var i = 0;i < g_players_noPower.length;i++){
                    if(g_players_noPower[i].id==playerName){
						console.log("quit from room g_players_noPower");
                        g_players_noPower[i].removeFromParent();
                        g_players_noPower.splice(i,1);
                        isFind=true;
                    }
                }
            }
            console.log("player_Length1:"+g_players.length+"  "+g_players_noPower.length);
            //玩家数量减1
            this.playerNum--;

        }.bind(this));
		
		pomelo.on('onShoupai',onShoupai_function=function(data){
			console.log("onShoupai:" + JSON.stringify(data));

			//初始化myselfCards数组
			this.myselfCards.splice(0,this.myselfCards.length);
			this.myselfCards=new Array();

			var cardType=data["paixing"];
			this.myselfCards=new Array();
			for(i = 1;i < 4;i++){
				var suit=cardType["s" + i];
				var rank=cardType["p" + i];
				var card = new Array();
				card.push(suit);
				card.push(rank);
				this.myselfCards.push(card);
			}

			//初始化玩家自己的正面牌并放好位置
			var size=cc.director.getWinSize();
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				console.log("start shoupai card ......." + player.id);
				if(player.id == playerId){
					console.log("start open the tail card ......." + playerId);
					for(j = 0; j < 3;j++){
						var card = this.myselfCards[j];
						player.myCards[j].initCardSprite(parseInt(card[0]),parseInt(card[1]));
					}
					break;
				}
			}
			
			this.myselfCardsReach=true;
			//给玩家发牌动作，由于服务器还没有给开始发牌位置信息，目前默认为从客户端位置最小的开始发牌
			var size=cc.director.getWinSize();
			var acMoveDown=cc.moveTo(0.5,cc.p(size.width/2,size.height));
			console.log("startFaPaiPosition:" + this.currentGetPowerPlayerPosition);
			var callFuncActionDealCard=cc.callFunc(this.actionFaPai,this);
			g_dealCardBack.runAction(cc.sequence(new cc.EaseOut(acMoveDown,20),callFuncActionDealCard));
		}.bind(this));

		pomelo.on('onChangePlayer',onChangePlayer_function=function(data){
			console.log("onChangePlayer:" + JSON.stringify(data));
			console.log("onChangePlayer:g_players:" + g_players.length);
			var rotationPlayerPositionServer=data["location"];
			//暂停当前玩家定时器,并初始化玩家按钮定时器
			var tmp_allplayers = g_players_noPower.concat(g_players);
			if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
				for(var i=0;i<tmp_allplayers.length;i++){
					if(tmp_allplayers[i].positionServer==this.currentGetPowerPlayerPosition){
						if(this.currentGetPowerPlayerPosition==g_myselfPlayerPos){
							this.biPaiMenuItem.setEnabled(false);
							this.jiaZhuMenuItem.setEnabled(false);
							this.genZhuMenuItem.setEnabled(false);
						}
						tmp_allplayers[i].counterTimer.stopCounterTimer();
						break;
					}
				}
			}
            //开启轮换到的玩家
            if(g_players.length>=2) {
                this.currentGetPowerPlayerPosition = rotationPlayerPositionServer;
                var rotationPlayerIndexOf = -1;
                for (var i = 0; i < g_players.length; i++) {
                    if (g_players[i].positionServer == rotationPlayerPositionServer) {
                        if (rotationPlayerPositionServer == g_myselfPlayerPos) {
                            this.biPaiMenuItem.setEnabled(true);
                            this.jiaZhuMenuItem.setEnabled(true);
                            this.genZhuMenuItem.setEnabled(true);
                        }
                        rotationPlayerIndexOf = i;
                        break;
                    }
                }
                if (rotationPlayerIndexOf == -1) {
                    console.log("error outside........................................pomelo.on('onChangePlayer')");
                    return;
                }
                g_players[rotationPlayerIndexOf].counterTimer.startCounterTimer();
            }
        }.bind(this));
    
		pomelo.on('onEndPai',onEndPai_function=function(data){
            console.log("onEndPai:"+JSON.stringify(data));
            //获胜者的牌型
            var winnerCardType=data["winner_pai"];
			var tmp_allplayers = g_players_noPower.concat(g_players);
            //位置1的牌型
            for(i = 1; i < 6; i++){
            	var cardString = data["location" + i];
            	if(cardString != null&& cardString !="null" && g_myselfPlayerPos != i){
            		console.log("location:num:" + i);
            		cardString=JSON.parse(cardString);
	                var suit1=cardString["s1"];
	                var rank1=cardString["p1"];
	                var suit2=cardString["s2"];
	                var rank2=cardString["p2"];
	                var suit3=cardString["s3"];
	                var rank3=cardString["p3"];
	                for(var j = 0;j < tmp_allplayers.length;j++){
	                	var player = tmp_allplayers[j];
	                	if(player.positionServer == i){
	                		player.myCards[0].setCardSpritePosition(player.positionServer,parseInt(suit1),parseInt(rank1));
	                		player.myCards[1].setCardSpritePosition(player.positionServer,parseInt(suit2),parseInt(rank2));
	                		player.myCards[2].setCardSpritePosition(player.positionServer,parseInt(suit3),parseInt(rank3));
	                        break;
	                    }
	                }
            	}
            }
            /*打开所有牌的*/
            //如果房间属于比牌状态，需要等到比牌动作完成才执行打开所有牌的动作
            if(this.comparableState==true){
                var compareTime=1.5+4.8-this.progressBoardBiPaiTime.getPercentage()/100*4.8;
                var waitGetBetTime=new cc.DelayTime(compareTime);
                var callbackOpenAllCard=cc.callFunc(this.openAllCard,this,winnerCardType);
                this.runAction(cc.sequence(waitGetBetTime,callbackOpenAllCard));
                console.log("compareTime:"+compareTime);
                console.log("room is comparing...........................................");
            }
            else{
                this.openAllCard(null,winnerCardType);
            }
        }.bind(this));
	   
		pomelo.on('onChatInGame',onChatInGame_function=function(data){
            console.log("onChatInGame:"+JSON.stringify(data));
            var chatType=data["chatType"];
            var position1=data["position1"];
            var position2=data["position2"];
            var chatContent=data["chatContent"];
            console.log("chatType:"+chatType);
            switch (chatType){
                case "Face":
                    console.log("Enter Face!");
                    this.sendAFace(position1,chatContent);
                    break;
                case  "StaticTacking":
                    console.log("Enter StaticTacking!");
                    this.sendAStaticTack(position1,chatContent);
                    break;
                case "DynamicTacking":
                    console.log("Enter DynamicTacking!");
                    this.sendDynamicTack(position1,chatContent);
                    break;
                case "Interaction":
                    console.log("Enter Interaction!");
                    this.sendInteractionFace(position1,position2,chatContent);
                    break;
                default              :
                    console.log("No chat");
                    break;
            }
        }.bind(this));
    
		pomelo.on('onUserBroadcast',onUserBroadcast_function=function(data){
			console.log("onUserBroadcast:"+JSON.stringify(data));
			var string=data["content"];
			this.radioMessageScroll(string,cc.color(220,20,60));
		}.bind(this));
    
    },

  //根据服务器信息展示个人表情
    sendAFace:function(position,faceNumber){
    	//在玩家数组中查找玩家
    	console.log("摆动sendAFace:function");
    	var tmp_allplayers = g_players_noPower.concat(g_players);
    	for(var i=0;i<tmp_allplayers.length;i++){
    		player = tmp_allplayers[i];
    		if(player.positionServer == position){
    			console.log("摆动起来！！！！！");
    			var faceSprite=new cc.Sprite("res/chat/face/"+faceNumber.toString()+".png");
    			faceSprite.setPosition(player.spritePhotoMobile.getPosition());
    			this.addChild(faceSprite,10);
    			//上下摆动动作

    			var upAction=cc.moveBy(0.5,cc.p(0,20));
    			var downAction=cc.moveBy(0.5,cc.p(0,-20));
    			var seqAction=cc.sequence(upAction,downAction);
    			var repeatUqDownAction=cc.repeat(seqAction,3);
    			faceSprite.runAction(cc.sequence(repeatUqDownAction,cc.hide(),cc.callFunc(function(){
    				faceSprite.removeFromParent();
    				console.log("faceSprite.removeFromParent()");
    			})));
    			break;
    		}
    	}
    },

    //根据服务器信息展示个人静态聊天信息和对应的语音
    sendAStaticTack:function(position,staticTackNumber){
    	var tmp_allplayers = g_players_noPower.concat(g_players);
    	for(var i=0;i<tmp_allplayers.length;i++){
    		player = tmp_allplayers[i];
    		if(player.positionServer==position){
    			var chatString=g_staticTackStringArray[parseInt(staticTackNumber)-1];
    			//聊天文本显示的背景（分三段背景，头部，中间，尾部）
    			var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
    			var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
    			var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
    			var labelString=new cc.LabelTTF(chatString,"Arial",30);
    			switch (player.playerPosition){
    			case 1:
    				//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
    				labelStringMidBackSprite.attr({
    					x:-15,
    					y:player.spritePhotoMobile.getContentSize().height,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 2:
    				labelStringMidBackSprite.attr({
    					x:0,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 3:
    				labelStringMidBackSprite.attr({
    					x:0,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 4:
    				labelStringMidBackSprite.attr({
    					x:player.spritePhotoMobile.getContentSize().width,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:0,
    					anchorY:0
    				});
    				break;
    			case 5:
    				labelStringMidBackSprite.attr({
    					x:player.spritePhotoMobile.getContentSize().width,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:0,
    					anchorY:0
    				});
    				break;
    			default :
    				break;
    			}

    			player.spritePhotoMobile.addChild(labelStringMidBackSprite);
    			labelString.attr({
    				x:labelStringMidBackSprite.getContentSize().width/2,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:0.5,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelString);
    			labelStringHeadBackSprite.attr({
    				x:labelStringMidBackSprite.getContentSize().width,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:0,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
    			labelStringHailBackSprite.attr({
    				x:0,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:1,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelStringHailBackSprite);
    			var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
    			var big=cc.scaleTo(0,bigY,1);
    			labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
    				labelStringMidBackSprite.removeFromParent();
    			})));
    			labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
    			var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
    			var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
    			var headScale=cc.scaleTo(0,1/bigY,1);
    			var hailScale=cc.scaleTo(0,1/bigY,1);
    			var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
    			var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
    			var headSpawn=cc.spawn(headOrbit,headScale,headMove);
    			var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
    			labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
    			labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));
    		}
    	}
    },

    //根据服务器信息展示个人动态聊天信息
    sendDynamicTack:function(position,dynamicTackString){
    	var tmp_allplayers = g_players_noPower.concat(g_players);
    	for(var i=0;i<tmp_allplayers.length;i++){
    		player = tmp_allplayers[i];
    		if(player.positionServer==position){
    			//聊天文本显示的背景（分三段背景，头部，中间，尾部）
    			var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
    			var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
    			var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
    			var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
    			switch (player.playerPosition){
    			case 1:
    				//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
    				labelStringMidBackSprite.attr({
    					x:-15,
    					y:player.spritePhotoMobile.getContentSize().height,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 2:
    				labelStringMidBackSprite.attr({
    					x:0,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 3:
    				labelStringMidBackSprite.attr({
    					x:0,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:1,
    					anchorY:0
    				});
    				break;
    			case 4:
    				labelStringMidBackSprite.attr({
    					x:player.spritePhotoMobile.getContentSize().width,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:0,
    					anchorY:0
    				});
    				break;
    			case 5:
    				labelStringMidBackSprite.attr({
    					x:player.spritePhotoMobile.getContentSize().width,
    					y:player.spritePhotoMobile.getContentSize().height+5,
    					anchorX:0,
    					anchorY:0
    				});
    				break;
    			default :
    				break;
    			}

    			player.spritePhotoMobile.addChild(labelStringMidBackSprite);
    			labelString.attr({
    				x:labelStringMidBackSprite.getContentSize().width/2,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:0.5,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelString);
    			labelStringHeadBackSprite.attr({
    				x:labelStringMidBackSprite.getContentSize().width,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:0,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
    			labelStringHailBackSprite.attr({
    				x:0,
    				y:labelStringMidBackSprite.getContentSize().height/2,
    				anchorX:1,
    				anchorY:0.5
    			});
    			labelStringMidBackSprite.addChild(labelStringHailBackSprite);
    			var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
    			var big=cc.scaleTo(0,bigY,1);
    			labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
    				labelStringMidBackSprite.removeFromParent();
    			})));
    			labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
    			var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
    			var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
    			var headScale=cc.scaleTo(0,1/bigY,1);
    			var hailScale=cc.scaleTo(0,1/bigY,1);
    			var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
    			var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
    			var headSpawn=cc.spawn(headOrbit,headScale,headMove);
    			var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
    			labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
    			labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));
    		}
    	}
    },
    
    //根据服务器信息展示互动表情及其动画
    sendInteractionFace:function(position1,position2,interactionFaceNumber){
    	var playerPosition1=null;
    	var playerPosition2=null;
    	var tmp_allplayers = g_players_noPower.concat(g_players);
    	for(var i=0;i<tmp_allplayers.length;i++){
    		var player = tmp_allplayers[i];
    		if(player.positionServer == position1 && playerPosition1 == null){
    			playerPosition1=player.spritePhotoMobile.getPosition();
    		}
    		if(player.positionServer == position2 && playerPosition2 == null){
    			playerPosition2= player.spritePhotoMobile.convertToWorldSpace(
    					player.spritePhotoSelf.getPosition());
    		}
    	}
    	console.log("playerPosition1:"+playerPosition1);
    	console.log("playerPosition2:"+playerPosition2);
    	switch (parseInt(interactionFaceNumber)){
    	case 1:
    		this.sendFlower(playerPosition1,playerPosition2);
    		break;
    	case 2:
    		this.sendCheers(playerPosition1,playerPosition2);
    		break;
    	case 3:
    		this.sendKiss(playerPosition1,playerPosition2);
    		break;
    	case 4:
    		this.sendEgg(playerPosition1,playerPosition2);
    		break;
    	case 5:
    		this.sendShoe(playerPosition1,playerPosition2);
    		break;
    	case 6:
    		this.sendBomb(playerPosition1,playerPosition2);
    		break;
    	default :
                break;

        }

    },
    
  //送花动画
    sendFlower:function(playerPosition1,playerPosition2){
        var sendFlowerAnimation=new cc.Animation();
        for(var i=1;i<=20;i++){
            var frameName="flower"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendFlowerAnimation.addSpriteFrame(spriteFrame);

        }
        sendFlowerAnimation.setDelayPerUnit(0.15);
        sendFlowerAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendFlowerAction=cc.animate(sendFlowerAnimation);
        var runSprite=new cc.Sprite("#flower1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendFlowerAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));

    },
    //送赞动画
    sendCheers:function(playerPosition1,playerPosition2){
        var sendCheersAnimation=new cc.Animation();
        for(var i=1;i<=16;i++){
            var frameName="cheers"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendCheersAnimation.addSpriteFrame(spriteFrame);
        }
        sendCheersAnimation.setDelayPerUnit(0.15);
        sendCheersAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendCheersAction=cc.animate(sendCheersAnimation);
        var runSprite=new cc.Sprite("#cheers1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendCheersAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //送吻动画
    sendKiss:function(playerPosition1,playerPosition2){
        var sendKissAnimation=new cc.Animation();
        for(var i=1;i<=25;i++){
            var frameName="kiss"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendKissAnimation.addSpriteFrame(spriteFrame);
        }
        sendKissAnimation.setDelayPerUnit(0.15);
        sendKissAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendKissAction=cc.animate(sendKissAnimation);
        var runSprite=new cc.Sprite("#kiss1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendKissAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //仍鸡蛋动画
    sendEgg:function(playerPosition1,playerPosition2){
        var sendEggAnimation=new cc.Animation();
        for(var i=1;i<=16;i++){
            var frameName="egg"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendEggAnimation.addSpriteFrame(spriteFrame);
        }
        sendEggAnimation.setDelayPerUnit(0.15);
        sendEggAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendEggAction=cc.animate(sendEggAnimation);
        var runSprite=new cc.Sprite("#egg1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendEggAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //仍鞋动画
    sendShoe:function(playerPosition1,playerPosition2){
        var sendShoeAnimation=new cc.Animation();
        for(var i=1;i<=17;i++){
            var frameName="shoe"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendShoeAnimation.addSpriteFrame(spriteFrame);
        }
        sendShoeAnimation.setDelayPerUnit(0.15);
        sendShoeAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendShoeAction=cc.animate(sendShoeAnimation);
        var runSprite=new cc.Sprite("#shoe1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendShoeAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    
    //仍炸弹动画
    sendBomb:function(playerPosition1,playerPosition2){
        var sendBombAnimation=new cc.Animation();
        for(var i=1;i<=12;i++){
            var frameName="bomb"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendBombAnimation.addSpriteFrame(spriteFrame);
        }
        sendBombAnimation.setDelayPerUnit(0.15);
        sendBombAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendBombAction=cc.animate(sendBombAnimation);
        var runSprite=new cc.Sprite("#bomb1.png");
        runSprite.attr({
            anchorX:0.44,
            anchorY:0.43
        });
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendBombAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
   },
    
   	actionBottomBet:function(playerPosition){
       var size=cc.director.getWinSize();
       var countNumber=-1;
       for(var j=0;j<g_betArray.length;j++){
           if(this.bet==g_betArray[j]){
               j++;
               countNumber=j;
               break;
           }
       }
       if(countNumber==-1){
           console.log("error........outside actionBottomBet:function");
           return;
       }
       var counterSprite=new cc.Sprite("res/chips/chips"+countNumber+".png");
       var counterString=new cc.Sprite("res/chips/"+this.level+"String"+countNumber+".png");
       counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
           counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
       counterSprite.addChild(counterString);
       counterSprite.setPosition(playerPosition);
       this.addChild(counterSprite,10);
       this.betPhotoArray.push(counterSprite);
       var x=size.width/3+size.width/3*Math.random();
       var y=size.height/2 + 150 *Math.random();
       var moveBet=cc.moveTo(0.3,cc.p(x,y));
       counterSprite.runAction(moveBet);
   },
   
    actionFaPai:function (){
    	var size=cc.director.getWinSize();
    	var isFind=false;
    	var playerArrayPosition=-1;
    	console.log("start into actionDealCards........startDealCardPosition1:" + this.startDealCardPosition1);
		console.log("start into actionDealCards........startDealCardPosition:" + this.startDealCardPosition);
    	if(this.startDealCardPosition1==this.startDealCardPosition){this.count++}
    	if(this.count>3){
			var tmp_allplayers = g_players_noPower.concat(g_players);
			for(var i=0;i<tmp_allplayers.length;i++){
				var player = tmp_allplayers[i];
				if(player.id == playerId){
					this.setPlayerCardsPosition(player,3);
					this.setPlayerCardsBackPosition(player,3);
					break;
				}
			}
    		this.count=0;
    		this.startDealCardPosition1=this.startDealCardPosition;
    		this.dealCardState=false;
    		var acMoveUp=cc.moveBy(0.5,cc.p(0,g_dealCardBack.getContentSize().height/2));
    		var acMoveUp1=new cc.EaseIn(acMoveUp,10);
    		var acInitMenuItemCallback=cc.callFunc(this.initMenuItemVisibleCallbackAfterDealCard,this);
    		g_dealCardBack.runAction(cc.sequence(acMoveUp1, acInitMenuItemCallback));
    		//开启第一个轮换位置
    		this.startFirstRotationPosition();
    		return;
    	}
    	for(var i=0;i<g_players.length;i++){
    		console.log(g_players[i].id  + "positionServer:" + g_players[i].positionServer);
    		if(g_players[i].positionServer==this.startDealCardPosition1){
    			playerArrayPosition=i;
    			isFind=true;
    			break;
    		}
    	}
    	console.log("find startDealCardPosition1:" + playerArrayPosition + isFind);
    	if(isFind==true){
    		this.startDealCardPosition1++;
    		this.startDealCardPosition1=this.startDealCardPosition1%5;
    		if(this.startDealCardPosition1==0){
    			this.startDealCardPosition1=5;
    		}
    		if(playerArrayPosition==-1){
    			console.log("outside error.......................actionDealCards:function()");
    			return;
    		}
			var x = y = 0;
			var player = g_players[playerArrayPosition];
    		if(player.playerPosition == 1){
				x = player.spritePhotoMobile.getPositionX() +
						player.spritePhotoMobile.getContentSize().width +
						g_dealCardBack.getContentSize().width/2*(this.count-1);
				y = player.spritePhotoMobile.getPositionY();
			}else if(player.playerPosition == 2){
				x = player.spritePhotoMobile.getPositionX() - (6 - this.count)*30;
				y =	player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30;
			}else if(player.playerPosition == 3){
				x = player.spritePhotoMobile.getPositionX() - (6 - this.count)*30;
				y =	player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30;
			}else if(player.playerPosition == 4){
				x = player.spritePhotoMobile.getPositionX() + (this.count-1)*30;
				y =	player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30;
			}else if(player.playerPosition == 5){
				x = player.spritePhotoMobile.getPositionX() + (this.count-1)*30;
				y =	player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30;
			}

    		var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
    		var acToCardPlayer=cc.moveTo(0.1,cc.p(x,y));
    		var callFunc=cc.callFunc(this.actionFaPai,this);
    		g_players[playerArrayPosition].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
    	}
    	else{
    		this.startDealCardPosition1++;
    		this.startDealCardPosition1=this.startDealCardPosition1%5;
    		if(this.startDealCardPosition1==0){
    			this.startDealCardPosition1=5;
    		}
    		this.actionFaPai();
    	}
    },

    actionBiPai:function (playerPositionServer1,playerPositionServer2,loserPositionServer){
		console.log("go into actionBiPai .......");
    	var size=cc.director.getWinSize();
    	//随机确定比牌位置
    	g_biPaiPlayerIndexOf1[0]=playerPositionServer1;
    	g_biPaiPlayerIndexOf2[0]=playerPositionServer2;
    	if(parseInt(Math.random()*10)<5){
    		g_biPaiPlayerIndexOf1[1]=1;
    		g_biPaiPlayerIndexOf2[1]=2;
    	}
    	else{
    		g_biPaiPlayerIndexOf1[1]=2;
    		g_biPaiPlayerIndexOf2[1]=1;
    	}

    	var playerIndexOf1=-1;
    	var playerIndexOf2=-1;
    	//和自己有关比牌动画表现
    	if(g_myselfPlayerPos ==playerPositionServer1||g_myselfPlayerPos==playerPositionServer2){
    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].positionServer==playerPositionServer1){
    				if(g_players[i].positionServer==g_myselfPlayerPos){
    					playerIndexOf1=i;//自己的坐标
    				}
    				else{
    					playerIndexOf2=i;//别人的坐标
    				}
    			}
    			if(g_players[i].positionServer==playerPositionServer2){
    				if(g_players[i].positionServer==g_myselfPlayerPos){
    					playerIndexOf1=i;//自己的坐标
    				}
    				else{
    					playerIndexOf2=i;//别人的坐标
    				}
    			}
    		}

    		if(playerIndexOf1==-1||playerIndexOf2==-1){
    			console.log("error........没有找到比牌对象");
    			return;
    		}
			console.log("playerIndexOf1:" + playerIndexOf1 + " playerIndexOf2:" + playerIndexOf2);
    		//获取三张牌的位置，供以后用
    		var cardPosition=new Array(3);
    		cardPosition[0]=g_players[playerIndexOf1].myCards[0].spriteBack.getPosition();
    		cardPosition[1]=g_players[playerIndexOf1].myCards[1].spriteBack.getPosition();
    		cardPosition[2]=g_players[playerIndexOf1].myCards[2].spriteBack.getPosition();
    		var cardPositionOther=new Array(3);
    		cardPositionOther[0]=g_players[playerIndexOf2].myCards[0].spriteBack.getPosition();
    		cardPositionOther[1]=g_players[playerIndexOf2].myCards[1].spriteBack.getPosition();
    		cardPositionOther[2]=g_players[playerIndexOf2].myCards[2].spriteBack.getPosition();
    		//如果看牌了，比牌时的动画表现
    		if(g_players[playerIndexOf1].checkCard==true){
				console.log("start 自己的动画表现");
    			//自己的动画表现
    			for(var j=0;j<3;j++){
    				//关牌动作
    				var frontSeq=cc.sequence(cc.delayTime(0.9),cc.hide());
    				var frontCamera=cc.orbitCamera(0.9,1,0,0,-90,0,0);
    				var frontSpawn=cc.spawn(frontSeq,frontCamera);
    				var backCardSeq=cc.sequence(cc.delayTime(0.9),cc.show());
    				var backCamera=cc.orbitCamera(1.2,1,0,0,-360,0,0);
    				var backSpawn=cc.spawn(backCardSeq,backCamera);

    				//移动到比牌位置动作
    				var moveToBiPaiPosition=null;
    				var moveToBiPaiPosition1=null;
    				if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    					if(g_biPaiPlayerIndexOf1[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    						moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    						moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ (30*(2-j)-50),size.height/2));
    					}
    				}
    				else{
    					if(g_biPaiPlayerIndexOf2[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    						moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    						moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ (30*(2-j)-50),size.height/2));
    					}
    				}


    				//前半段整合动作
    				var frontCombinationAction_=cc.spawn(frontSpawn,moveToBiPaiPosition);
    				var backCombinationAction_=cc.spawn(backSpawn,moveToBiPaiPosition1);

    				//移动到原来的位置
    				var moveToOriginPosition=cc.moveTo(1.5,cardPosition[j]);
    				var moveToOriginPosition1=cc.moveTo(1.5,cardPosition[j]);
    				//翻牌动作
    				var backCardSeq1=cc.sequence(cc.delayTime(1),cc.hide());
    				var backCamera1=cc.orbitCamera(1,1,0,0,-90,0,0);
    				var backSpawn1=cc.spawn(backCardSeq1,backCamera1);

    				var frontSeq1=cc.sequence(cc.delayTime(1),cc.show());
    				var frontCamera1=cc.orbitCamera(1.25,1,0,0,-360,0,0);
    				var frontSpawn1=cc.spawn(frontSeq1,frontCamera1);

    				//后半段动作组合
    				var _frontCombinationAction=cc.spawn(moveToOriginPosition,frontSpawn1);
    				var _backCombinationAction=cc.spawn(moveToOriginPosition1,backSpawn1);

    				var _seqBack=cc.sequence(backCombinationAction_,cc.delayTime(2),_backCombinationAction);
    				var _seqFront=cc.sequence(frontCombinationAction_,cc.delayTime(2),_frontCombinationAction);

    				g_players[playerIndexOf1].myCards[j].sprite.runAction(_seqFront);
    				g_players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
    			}
    			//对方的动画表现
				console.log("start 对方的动画表现");
    			for(var j=0;j<3;j++){
    				//移动到比牌的位置
    				var moveToBiPaiPosition=null;
    				if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    					if(g_biPaiPlayerIndexOf2[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}
    				else{
    					if(g_biPaiPlayerIndexOf1[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}

    				//移动到原来的位置
    				var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther[j]);

    				var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

    				g_players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
    			}
    		}
    		//没有看牌时，比牌的动画表现
    		else{
    			//自己的动画表现
    			for(var j=0;j<3;j++){

    				//移动到比牌位置动作
    				var moveToBiPaiPosition=null;
    				//var moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ 30*(2-j),size.height/2));
    				if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    					if(g_biPaiPlayerIndexOf1[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}
    				else{
    					if(g_biPaiPlayerIndexOf2[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}
    				//移动到原来的位置
    				var moveToOriginPosition=cc.moveTo(1.5,cardPosition[j]);
    				//var moveToOriginPosition1=cc.moveTo(1.5,cardPosition[j]);

    				//var _seqFront=cc.sequence(moveToBiPaiPosition1,cc.delayTime(2),moveToOriginPosition1);
    				var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

    				//g_players[playerIndexOf1].myCards[j].sprite.runAction(_seqFront);
    				g_players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
    			}
    			//对方的动画表现
    			for(var j=0;j<3;j++){
    				//移动到比牌的位置
    				var moveToBiPaiPosition=null;
    				if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    					if(g_biPaiPlayerIndexOf2[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}
    				else{
    					if(g_biPaiPlayerIndexOf1[1]==1){
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    					}
    					else{
    						moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    					}
    				}
    				//移动到原来的位置
    				var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther[j]);

    				var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

    				g_players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
    			}
    		}
    	}

    	//和自己无关的比牌动画表现
    	else{
    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].positionServer==playerPositionServer1){
    				playerIndexOf1=i;
    			}
    			if(g_players[i].positionServer==playerPositionServer2){
    				playerIndexOf2=i;
    			}
    		}
    		if(playerIndexOf1==-1||playerIndexOf2==-1){
    			console.log("error........没有找到比牌对象");
    			return;
    		}
			console.log("playerIndexOf1:" + playerIndexOf1 + " playerIndexOf2:" + playerIndexOf2);
    		//获取三张牌的位置，供以后用
    		var cardPositionOther1=new Array(3);
    		cardPositionOther1[0]=g_players[playerIndexOf1].myCards[0].spriteBack.getPosition();
    		cardPositionOther1[1]=g_players[playerIndexOf1].myCards[1].spriteBack.getPosition();
    		cardPositionOther1[2]=g_players[playerIndexOf1].myCards[2].spriteBack.getPosition();
    		var cardPositionOther2=new Array(3);
    		cardPositionOther2[0]=g_players[playerIndexOf2].myCards[0].spriteBack.getPosition();
    		cardPositionOther2[1]=g_players[playerIndexOf2].myCards[1].spriteBack.getPosition();
    		cardPositionOther2[2]=g_players[playerIndexOf2].myCards[2].spriteBack.getPosition();
    		//一个玩家的比牌动画表现
    		for(var j=0;j<3;j++){
    			//移动牌到比牌的位置
    			var moveToBiPaiPosition=null;
    			if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    				if(g_biPaiPlayerIndexOf1[1]==1){
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    				}
    				else{
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    				}
    			}
    			else{
    				if(g_biPaiPlayerIndexOf2[1]==1){
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    				}
    				else{
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    				}
    			}
    			//移动到原来的位置
    			var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther1[j]);

    			var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

    			g_players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
    		}

    		//另一个玩家比牌动画表现
    		for(var j=0; j<3;j++){
    			//移动牌到比牌的位置
    			var moveToBiPaiPosition=null;
    			if(g_players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
    				if(g_biPaiPlayerIndexOf2[1]==1){
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    				}
    				else{
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    				}
    			}
    			else{
    				if(g_biPaiPlayerIndexOf1[1]==1){
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
    				}
    				else{
    					moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
    				}
    			}
    			//移动到原来的位置
    			var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther2[j]);

    			var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

    			g_players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
    		}

    	}
		console.log("start go into setBiPaiBackground ........");
    	/*添加比牌的背景和闪电动画*/
    	var waitTime=new cc.DelayTime(1.3);
    	var setBiPaiBackgroundCallback=cc.callFunc(this.setBiPaiBackground,this,loserPositionServer);
    	this.runAction(cc.sequence(waitTime,setBiPaiBackgroundCallback));

    	/*回调提示比牌失败者*/
		console.log("start go into displayLoser .......");
    	var displayWaitTime=new cc.DelayTime(4.8);
    	var setDisplayLoserCallback=cc.callFunc(this.displayLoser,this,loserPositionServer);
    	this.runAction(cc.sequence(displayWaitTime,setDisplayLoserCallback));
		console.log("end go into displayLoser .......");
    },

    actionWinnerGetBet:function(my_this,playerPosition){
        for(var j in this.betPhotoArray){
            var getBetAction=  cc.moveTo(1.0, cc.p(playerPosition));
            this.betPhotoArray[j].runAction(cc.sequence(getBetAction,cc.hide()));
        }
		//初始化房间状态为非游戏状态
        this.roomState=0;
        //置按钮为不可点击
		this.initMenuItemVisibleAfterComeInRoom();

        //关闭定时器
        var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i<tmp_allplayers.length;i++){
            if(tmp_allplayers[i].positionServer==this.currentGetPowerPlayerPosition){
            	tmp_allplayers[i].counterTimer.stopCounterTimer();
                break;
            }
        }
    },
    
    actionFollowBet:function(playerPosition,isCheckCard){
		console.log("go into actionFollowBet......" + playerPosition + " " + isCheckCard);

        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<g_betArray.length;j++){
            if(this.bet==g_betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
		var chipNum = 1;
		if(isCheckCard == true){
			chipNum = 2;
		}
		//如果等于-1 说明没有单独的筹码符合 需要组合筹码
        if(countNumber==-1){
			console.log("error........outside actionFollowBet:function");
			return;
        }
        
        while(chipNum>0){
            var counterSprite=new cc.Sprite("res/chips/chips" + countNumber +".png");
            var counterString=new cc.Sprite("res/chips/"+this.level+"String"+ countNumber +".png");
            counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
                counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
            counterSprite.addChild(counterString);
            counterSprite.setPosition(playerPosition);
            this.addChild(counterSprite,10);
            this.betPhotoArray.push(counterSprite);
            var x=size.width/3+size.width/3*Math.random();
            var y=size.height/2+ 150 * Math.random();
            var moveBet=cc.moveTo(0.3,cc.p(x,y));
            counterSprite.runAction(moveBet);
            chipNum--;
        }
    },
    
	actionAddBet:function(playerPosition,isCheckCard){
        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<g_betArray.length;j++){
            if(this.bet==g_betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
        if(countNumber==-1){
            console.log("error........outside actionAddBet:function");
            return;
        }
        var chipNum=1;
        if(isCheckCard==true){
            chipNum=2;
        }
        while(chipNum>0){
            var counterSprite=new cc.Sprite("res/chips/chips"+countNumber+".png");
            var counterString=new cc.Sprite("res/chips/"+this.level+"String"+countNumber+".png");
            counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
                counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
            counterSprite.addChild(counterString);
            counterSprite.setPosition(playerPosition);
            this.addChild(counterSprite,10);
            this.betPhotoArray.push(counterSprite);
            var x=size.width/3+size.width/3*Math.random();
            var y=size.height/2+ 150 *Math.random();
            var moveBet=cc.moveTo(0.3,cc.p(x,y));
            counterSprite.runAction(moveBet);

            //this.sumBet=this.sumBet+this.bet;
            chipNum--;
        }
		console.log("leave from actionAddBet.......");
    },
	
    openAllCard:function(mythis,winnerCardType){
        //打开自己的牌
		var tmp_allplayers = g_players_noPower.concat(g_players);
		for(var i=0;i<tmp_allplayers.length;i++){
			var player = tmp_allplayers[i];
			if(player.positionServer == g_myselfPlayerPos){
				if(player.checkCard==false && player.isPower==2){
                    for(var j=0;j<3;j++){
                        var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                        var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
                        var backSpawn=cc.spawn(backCardSeq,backCamera);
                        var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                        var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
                        var frontSpawn=cc.spawn(frontSeq,frontCamera);
                        player.myCards[j].spriteBack.runAction(backSpawn);
                        player.myCards[j].sprite.runAction(frontSpawn);
                    }
                }
                break;
            }
        }

        for(var i=0;i<tmp_allplayers.length;i++){
			var player = tmp_allplayers[i];
            console.log(player.id);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRR");
            if(player.positionServer!= g_myselfPlayerPos && player.isPower==2){
            	for(var j=0;j<3;j++){
            		var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
            		var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
            		var backSpawn=cc.spawn(backCardSeq,backCamera);
            		var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
            		var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
            		var frontSpawn=cc.spawn(frontSeq,frontCamera);
            		player.myCards[j].spriteBack.runAction(backSpawn);
            		player.myCards[j].sprite.runAction(frontSpawn);
            	}
            }
        }

        //牌局结束的庆祝动画
        this.actionCongratulation(winnerCardType);
    },
    
    actionCongratulation:function(winnerCardType){
    	console.log("获胜者的牌型："+winnerCardType);
    	switch (winnerCardType){
    	case 1:
    		console.log("散牌动画！！！！！");
    		break;
    	case 2:
    		console.log("对子动画！！！！！");
    		break;
    	case 3:
    		console.log("顺子动画！！！！！");
    		break;
    	case 4:
    		console.log("金花动画！！！！！");
    		break;
    	case 5:
    		console.log("豹子动画！！！！！");
    		break;
    	default :
    		console.log("不存在此牌型或动画！！！！！");
			break;
    	}
    },
    
    setBiPaiBackground:function(mythis,loserPositionServer){
		console.log("got into setBiPaiBackground.......");
        var playerIndexOf1=-1;
        var playerIndexOf2=-1;
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer==g_biPaiPlayerIndexOf1[0]){
                playerIndexOf1=i;
            }
            if(g_players[i].positionServer==g_biPaiPlayerIndexOf2[0]){
                playerIndexOf2=i;
            }
        }
        if(playerIndexOf1==-1||playerIndexOf2==-1){
            console.log("error outside..................................setBiPaiBackground:function");
            return;
        }
        //比牌背景
        var size=cc.director.getWinSize();
        var vsBack=new cc.Sprite(res.VsBack_png);
        var vs=new cc.Sprite(res.Vs_png);
        //用户头像（目前没有找到好的办法，只能直接使用资源）
        var playerPhoto1=new cc.Sprite(res.Man_jpg);
        var playerPhoto2=new cc.Sprite(res.Woman_jpg);
        var labelPlayerId1=new cc.LabelTTF(g_players[playerIndexOf1].id,"Arial",38);
        var labelPlayerId2=new cc.LabelTTF(g_players[playerIndexOf2].id,"Arial",38);
        labelPlayerId1.setColor(cc.color(160,82,45));
        labelPlayerId2.setColor(cc.color(160,82,45));
        labelPlayerId1.x=playerPhoto1.getPositionX()+playerPhoto1.getContentSize().width/2;
        labelPlayerId1.y=playerPhoto1.getPositionY()+playerPhoto1.getContentSize().height/2;
        labelPlayerId2.x=playerPhoto2.getPositionX()+playerPhoto2.getContentSize().width/2;
        labelPlayerId2.y=playerPhoto2.getPositionY()+playerPhoto2.getContentSize().height/2;
        playerPhoto1.addChild(labelPlayerId1);
        playerPhoto2.addChild(labelPlayerId2);
        vs.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/2,
            vsBack.getPositionY()+vsBack.getContentSize().height/2);
        if(g_biPaiPlayerIndexOf1[1]==1){
            playerPhoto1.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
            playerPhoto2.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4*3,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
        }
        else{
            playerPhoto1.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4*3,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
            playerPhoto2.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
        }
        vsBack.addChild(vs);
        vsBack.addChild(playerPhoto1);
        vsBack.addChild(playerPhoto2);
        vsBack.setPosition(size.width/2,size.height/5*3);
        this.addChild(vsBack,15);

        //比牌闪电动画
        //var frameCache=cc.spriteFrameCache;
        //frameCache.addSpriteFrames(res.BiPaiAnimation_plist,res.BiPaiAnimation_png);
        var biPaiAnimation=new cc.Animation();
        for(var i=1;i<4;i++){
            var frameName="bp"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            biPaiAnimation.addSpriteFrame(spriteFrame);
        }
        biPaiAnimation.setDelayPerUnit(0.15);
        biPaiAnimation.setRestoreOriginalFrame(true);
        biPaiAnimation.setLoops(5);
        var biPaiAction=cc.animate(biPaiAnimation);
        var runSprite=new cc.Sprite("#bp1.png");
        runSprite.setPosition(size.width/2,size.height/2);
        this.addChild(runSprite,20);
        //还需要添加电击失败者动画，目前没有资源



        runSprite.runAction(cc.sequence(cc.delayTime(2.0),cc.hide()));
        vsBack.runAction(cc.sequence(cc.delayTime(2.0),cc.hide()));
        runSprite.runAction(biPaiAction);

        //需要在此处将失败者移到player_noPower数组中
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer==loserPositionServer){
                g_players_noPower.push(g_players[i]);
                g_players.splice(i,1);
                break;
            }
        }
        console.log("loserPositionServer:"+loserPositionServer);
        console.log("g_players.length:"+g_players.length);
    },
    
    displayLoser:function(mythis,loserPositionServer){
    	var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i<tmp_allplayers.length;i++){
            if(tmp_allplayers[i].positionServer==loserPositionServer){
				/*/取消spriteState
				if(tmp_allplayers[i].spriteState!=null){
					tmp_allplayers[i].spriteState.removeFromParent();
					tmp_allplayers[i].spriteState = null;
				}
				*/
            	tmp_allplayers[i].setSpriteStatus("loser");
                break;
            }
        }
    },
    
    startFirstRotationPosition:function (){
    	var rotationPlayerIndexOf=-1;
    	for(var i=0;i<g_players.length;i++){
    		if(g_players[i].positionServer==this.currentGetPowerPlayerPosition){
    			rotationPlayerIndexOf=i;
    			break;
    		}
    	}
    	if(rotationPlayerIndexOf==-1){
    		console.log("error outside........................................pomelo.on('onChangePlayer')");
    		return;
    	}
    	if(this.currentGetPowerPlayerPosition==g_myselfPlayerPos){
    		this.biPaiMenuItem.setEnabled(true);
    		this.jiaZhuMenuItem.setEnabled(true);
    		this.genZhuMenuItem.setEnabled(true);
    		this.kaiPaiMenuItem.setEnabled(true);
			this.qiPaiMenuItem.setEnabled(true);
    	}
    	else{
    		this.biPaiMenuItem.setEnabled(false);
    		this.jiaZhuMenuItem.setEnabled(false);
    		this.genZhuMenuItem.setEnabled(false);
			this.qiPaiMenuItem.setEnabled(true);
    	}
    	g_players[rotationPlayerIndexOf].counterTimer.startCounterTimer();
    },
    
    setRoomStateCompare:function (){
        this.comparableState=false;
    },
    
    SetKaiPaiQiPaiMenuItem:function(){
        this.kaiPaiMenuItem.setEnabled(true);
        this.qiPaiMenuItem.setEnabled(true);

    },
    
    SetQiPaiMenuItem:function(){
        this.qiPaiMenuItem.setEnabled(true);
    },
    
	pomelo_removeListener:function(){

        pomelo.removeListener('onReady',onReady_function);
        pomelo.removeListener('onFollow',onFollow_function);
        pomelo.removeListener('onAddChip',onAddChip_function);
        pomelo.removeListener('onAdd',onAdd_function);
        pomelo.removeListener('onOpen',onOpen_function);
        pomelo.removeListener('onThrow',onThrow_function);
        pomelo.removeListener('onBipai',onBipai_function);

        pomelo.removeListener('onLeave',onLeave_function);
        pomelo.removeListener('onEnd',onEnd_function);
        pomelo.removeListener('onFapai',onFapai_function);
        pomelo.removeListener('onShoupai',onShoupai_function);
        pomelo.removeListener('onChangePlayer',onChangePlayer_function);
        pomelo.removeListener('onEndPai',onEndPai_function);
        pomelo.removeListener('onInit',onInit_function);
        pomelo.removeListener('onChatInGame',onChatInGame_function);
        pomelo.removeListener('onActBroadcast',onActBroadcast_function);
        pomelo.removeListener('onUserBroadcast',onUserBroadcast_function);
    },

	onExit:function(){
        this._super();
        g_dealCardBack.removeFromParent(true);
        g_countSprite.removeFromParent(true);
        g_playerData.splice(0,g_playerData.length);
        g_roomData.splice(0,g_roomData.length);
		g_players.splice(0,g_players.length);
		g_players_noPower.splice(0,g_players_noPower.length);
		console.log("exit from the room......");
        //释放资源
        //this.releaseMember();

        //注销监听接口
        this.pomelo_removeListener();

    },
	
    onEnterTransitionDidFinish:function(){
		this._super();
		cc.audioEngine.setEffectsVolume(0.5);
		cc.audioEngine.setMusicVolume(0.5);
		cc.audioEngine.playMusic(res_other.BackgroundMusic_ogg ,true);
		//cc.audioEngine.playMusic(res.Ttt ,true);
	},
    onExitTransitionDidStart:function(){
		this._super();
		cc.audioEngine.stopMusic()
	}
});

var ZJHGameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new zjhGameLayer();
        this.addChild(layer);
    }
});
