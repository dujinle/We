var zhqGameLayer = cc.Layer.extend({

	//当前的玩家位置标记
	currentGetPowerPlayerPosition:null,
	involvementPlayer_Cards:null,
	control_layer:null,
	
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
	//宣牌状态信息
	xuanTag:null,
	//下注信息 回合数
	startDealCardPosition:null,
	startDealCardPosition1:null,
	level:null,
	count:null,
	countFlowing:null,
	bet:null,
	labelBet:null,
	labelSumBet:null,
	labelCountFlowing:null,
	dealCardState:null,
	//用于存放金币精灵的数组
    betPhotoArray:null,
	//上次出牌的数组
	lastPosition:null,
	lastPai:null,
	//广播信息
	text_came:null,
	cliper:null,
	drawNode:null,
	radioMenuBackground:null,
    
    //玩牌操作按钮菜单选项
    readyMenuItem :null,
	startMenuItem:null,
	liangAMenuItem:null,//亮出黑A 寻找盟友 此时底注翻倍
    chuPaiMenuItem:null,
	buChuPaiMenuItem:null,
	touXiangMenuItem:null,
    layerBiPaiSelect:null,
    layerJiaZhuSelect:null,

    ctor:function(){
        this._super();

		this.count=0;
		this.xuanTag = 0;
		this.lastPosition = -1;
		this.lastPai = new Array();
        this.startDealCardPosition=1;
        this.startDealCardPosition1=this.startDealCardPosition;
		this.myselfCards=new Array();
		
		this.betPhotoArray=new Array();
        this.comparableState=false;
        this.myselfCardsReach=false;
        this.dealCardState=false;
        this.bet = g_betArray[0];
		this.countFlowing=g_roomData[2];
		this.roomNum=g_roomData[3];
        this.playerNum=g_roomData[4];
        this.roomState=g_roomData[5];
		this.currentGetPowerPlayerPosition=g_roomData[6];

		this.initGameBackground();
		this.initHeadMenu();
		
		//添加控制层
		this.control_layer = new ControlLayer();
		this.addChild(this.control_layer);
		
		this.initGameMenu();
		this.initPlayers();
		this.initPlayersPosition();
		this.initPersonalMessageMenu();
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
		var logoSprite = new cc.Sprite(res.ZHQLogo_png);
		logoSprite.setPosition(this.backSprite.getContentSize().width/2,this.backSprite.getContentSize().height/2)
		this.backSprite.addChild(logoSprite);
		
		g_dealCardBack.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
		this.addChild(g_dealCardBack);
	},

	initGameMenu:function(){
		var size = cc.director.getWinSize();

		//玩家开始按钮则开始发牌
		var startSprite = new cc.Sprite(res.Start_png);
		var startSprite1 = new cc.Sprite(res.Start1_png);
		var startSprite2 = new cc.Sprite(res.Start1_png);
		this.startMenuItem = new cc.MenuItemSprite(startSprite,startSprite1,startSprite2,
				this.menuCallbackStart,this);
				
		//玩家准备 如果所有人都准备开始出牌
		var readySprite = new cc.Sprite(res.Ready_png);
		var readySprite1 = new cc.Sprite(res.Ready1_png);
		var readySprite2 = new cc.Sprite(res.Ready1_png);
		this.readyMenuItem = new cc.MenuItemSprite(readySprite,readySprite1,readySprite2,
				this.menuCallbackReady,this);
		
		//亮A按钮
		var liangASprite = new cc.Sprite(res.LiangA_png);
		var liangASprite1 = new cc.Sprite(res.LiangA1_png);
		var liangASprite2 = new cc.Sprite(res.LiangA1_png);
		this.liangAMenuItem = new cc.MenuItemSprite(liangASprite,liangASprite1,liangASprite2,
				this.menuCallbackLiangA,this);
				
		//出牌按钮
		var chuPaiSprite = new cc.Sprite(res.ChuPai_png);
		var chuPaiSprite1 = new cc.Sprite(res.ChuPai1_png);
		var chuPaiSprite2 = new cc.Sprite(res.ChuPai1_png);
		this.chuPaiMenuItem = new cc.MenuItemSprite(chuPaiSprite,chuPaiSprite1,chuPaiSprite2,
				this.menuCallbackChuPai,this);
		
		//不出牌按钮
		var buChuPaiSprite = new cc.Sprite(res.BuChu_png);
		var buChuPaiSprite1 = new cc.Sprite(res.BuChu1_png);
		var buChuPaiSprite2 = new cc.Sprite(res.BuChu1_png);
		this.buChuPaiMenuItem = new cc.MenuItemSprite(buChuPaiSprite,buChuPaiSprite1,buChuPaiSprite2,
				this.menuCallbackBuChuPai,this);
		
		//投降按钮
		var touXiangSprite = new cc.Sprite(res.TouXiang_png);
		var touXiangSprite1 = new cc.Sprite(res.TouXiang1_png);
		var touXiangSprite2 = new cc.Sprite(res.TouXiang1_png);
		this.touXiangMenuItem = new cc.MenuItemSprite(touXiangSprite,touXiangSprite1,touXiangSprite2,
				this.menuCallbackTouXiang,this);
				
		var mn = new cc.Menu(this.startMenuItem,this.readyMenuItem,this.liangAMenuItem,this.chuPaiMenuItem,this.buChuPaiMenuItem,this.touXiangMenuItem);
		mn.x=size.width/2;
		mn.y= 35;
		mn.alignItemsHorizontallyWithPadding(20);
		this.addChild(mn,2);
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

		//局数
		var roundSprite=new cc.Sprite(res.HuiHe_png);
		roundSprite.attr({
			x:this.backSpriteHead.getContentSize().width /3+450,
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
		this.startMenuItem.setEnabled(true);
		this.readyMenuItem.setEnabled(false);
		this.liangAMenuItem.setEnabled(false);
		this.chuPaiMenuItem.setEnabled(false);
		this.buChuPaiMenuItem.setEnabled(false);
		this.touXiangMenuItem.setEnabled(false);
    },

	initChuPaiMenuItemCallBack:function(){
		this.startMenuItem.setEnabled(false);
		this.liangAMenuItem.setEnabled(false);
		this.chuPaiMenuItem.setEnabled(true);
		this.buChuPaiMenuItem.setEnabled(true);
		this.readyMenuItem.setEnabled(false);
		this.touXiangMenuItem.setEnabled(false);
	},
    initMenuItemVisibleCallbackAfterDealCard:function(){
        this.startMenuItem.setEnabled(false);
        this.readyMenuItem.setEnabled(true);
        this.liangAMenuItem.setEnabled(true);
    },

    initCounterTimer:function(){
		for(var i=0;i<g_players.length;i++){
    		if(g_players[i].positionServer == g_myselfPlayerPos){
    			g_players[i].counterTimer.startCounterTimer();
    		}
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
    	this.drawNode = new cc.DrawNode();
    	var nodeWidth=this.radioMenuBackground.getContentSize().width-20;
    	var nodeHeight=this.radioMenuBackground.getContentSize().height;
    	console.log("nodeWidth:"+nodeWidth);
    	console.log("nodeHeight:"+nodeHeight);
    	this.drawNode.drawRect(cc.p(0,0),cc.p(700,55),cc.color.WHITE);
    	this.cliper.setStencil(this.drawNode);
    	this.cliper.attr({
    		x: 80,
    		y: this.radioMenuBackground.getContentSize().height/2-15,
    		anchorX:0.5,
    		anchorY:0.5
    	});
    	this.radioMenuBackground.addChild(this.cliper);
    },

	initPlayers:function(){
		for(var i=0;i<g_playerData.length;i++){
			if(g_playerData[i][0] == playerId){
				g_myselfPlayerPos = g_playerData[i][1];
				break;
			}
		}
		for(var i=0;i<g_playerData.length;i++){
			var	player = new ZHQPlayers(g_playerData[i]);
			g_players.push(player);
			this.addChild(player,5);
		}
		console.log("initPlayersAndPlayer_noPower succ:g_players:" + g_players.length);
	},
	
	initPlayersPosition:function(){
		var size=cc.director.getWinSize();
		console.log("initPlayers length:" + g_players.length);
		//寻找玩家自己，确定自己的服务器位置和客户端位置
		for(var i=0;i<g_players.length;i++){
			if(g_players[i].positionServer == g_myselfPlayerPos){
				g_players[i].playerPosition=1;
			}
		}
		console.log("find the myself server pos:" + g_myselfPlayerPos);
		//根据玩家自己的位置确定其他玩家的客户端位置
		for(var i=0;i<g_players.length;i++){
			player = g_players[i];
			if(player.positionServer > g_myselfPlayerPos){
				player.playerPosition= 1 + (player.positionServer-g_myselfPlayerPos);
			}
			else if(player.positionServer < g_myselfPlayerPos){
				player.playerPosition= 1 + (5-g_myselfPlayerPos) + player.positionServer;
			}
			console.log("playerPosition server pos:" + player.positionServer + " player pos:" + player.playerPosition);
		}
		//根据客户端位置信息确定显示所有玩家的位置
		for(var i=0;i<g_players.length;i++){
			player = g_players[i];
			
			//设置玩家的状态
			if(player.isGame == 2){
				player.setSpriteStatus("start");
			}
			//设置玩家的位置
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

	menuCallbackStart:function(){
		pomelo.request(util.getGameRoute(),{
			process:"start",
			location:g_myselfPlayerPos
        },function(data){
            console.log(data.msg);
        });
		this.startMenuItem.setEnabled(false);
	},
	
    menuCallbackReady:function() {
		pomelo.request(util.getGameRoute(),{
			process:"ready",
			location:g_myselfPlayerPos
        },function(data){
            console.log(data.msg);
        });
    },
	
	menuCallbackTouXiang:function() {
		pomelo.request(util.getGameRoute(),{
			process:"touxiang",
			location:g_myselfPlayerPos
        },function(data){
            console.log(data.msg);
        });
		this.touXiangMenuItem.setEnabled(false);
    },

	menuCallbackChuPai:function(){
		var playerPosition = -1;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			if(player.positionServer == g_myselfPlayerPos){
				playerPosition = i;
				break;
			}
		}
		var player = g_players[playerPosition];
		var selectCards = player.selectCards;
		if(selectCards.length > 0){
			this.chuPaiMenuItem.setEnabled(false);
			var mark = {"p":[],"s":[]};
			for(var i = 0;i < selectCards.length;i++){
				mark["p"].push(selectCards[i].rank);
				mark["s"].push(selectCards[i].suit);
			}
			pomelo.request(util.getGameRoute(),{
				process:"chupai",
				chupai:mark,
				location:g_myselfPlayerPos
			},function(data){
				console.log(data.msg);
			});
		}else{
			util.showError(this,"请选择要出的牌");
		}
	},
	
	menuCallbackBuChuPai:function(){
		this.buChuPaiMenuItem.setEnabled(false);
		pomelo.request(util.getGameRoute(),{
			process:"pass",
			location:g_myselfPlayerPos
		},function(data){
			console.log(data.msg);
		});
	},
	
	//宣出黑A的操作
	menuCallbackLiangA:function(){
		var playerPosition = -1;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			if(player.positionServer == g_myselfPlayerPos){
				playerPosition = i;
				break;
			}
		}
		var player = g_players[playerPosition];
		var selectCards = player.selectCards;
		var process = "liangA";
		var mark = {};
		if(selectCards.length == 1){
			var card = selectCards[0];
			if(card.rank == 14 && (card.suit == 2 || card.suit == 4)){
				this.liangAMenuItem.setEnabled(false);
				mark["p"] = [card.rank];
				mark["s"] = [card.suit];
			}else{
				util.showError(this,"请选择一张黑A 或者3张相同大小的牌");
				return false;
			}
		}else if(selectCards.length == 3){
			var pref = selectCards[0].rank;
			for(var j = 1;j < selectCards.length;j++){
				var card = selectCards[j];
				if(card.rank != pref){
					util.showError(this,"请选择一张黑A 或者3张相同大小的牌");
					pref = -1;
					return false;
				}
			}
			mark["p"] = [
				selectCards[0].rank,
				selectCards[1].rank,
				selectCards[2].rank
			];
			mark["s"] = [
				selectCards[0].suit,
				selectCards[1].suit,
				selectCards[2].suit
			];
			this.liangAMenuItem.setEnabled(false);
		}else if(selectCards.length == 2){
			var pref = selectCards[0].rank;
			if(pref == selectCards[1].rank && pref == 14
				&& (selectCards[0].suit == 2 || selectCards[0].suit == 4)){
				this.liangAMenuItem.setEnabled(false);
				mark["p"] = [
					selectCards[0].rank,
					selectCards[1].rank
				];
				mark["s"] = [
					selectCards[0].suit,
					selectCards[1].suit
				];
			}else{
				util.showError(this,"请选择一张黑A 或者3张相同大小的牌");
				return false;
			}
		}else{
			util.showError(this,"请选择一张黑A 或者3张相同大小的牌");
			return false;
		}
		pomelo.request(util.getGameRoute(),{
			process:process,
			mark:mark,
			location:g_myselfPlayerPos
		},function(data){
			console.log(data.msg);
		});
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
            this.readyMenuItem.setEnabled(false);
            this.readyMenuItem.setEnabled(false);
            this.readyMenuItem.setEnabled(false);
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
        console.log("this.cliper.getContentSize().width:"+this.cliper.getContentSize().width);
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
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].id!=playerId){
                var menuSprite1=new cc.Sprite(res.Mobile_jpg);
                var menuSprite2=new cc.Sprite(res.Mobile_jpg);
                var menuSprite3=new cc.Sprite(res.Mobile_jpg);
                var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
                menuItem.setName(g_players[i].playerPosition.toString());
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
                g_players[i].spritePhotoMobile.addChild(menu);
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
						player.spritePhotoMobile.getPositionX() - (5-m)*30 + player.spritePhotoMobile.getContentSize().width/2,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			case 3:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() - (5-m)*30 + player.spritePhotoMobile.getContentSize().width/2,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 4:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30 - player.spritePhotoMobile.getContentSize().width/2 + 40,
						player.spritePhotoMobile.getPositionY() - player.spritePhotoMobile.getContentSize().height - 30
					);
				}
				break;
			case 5:
				for(var m = 0;m < card_len;m++){
					player.myCards[m].spriteBack.setPosition(
						player.spritePhotoMobile.getPositionX() + m*30 - player.spritePhotoMobile.getContentSize().width/2 + 40,
						player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 30
					);
				}
				break;
			default :
				break;
		}
	},
	
	setPlayerCardPosition:function(player,m){
		var x = player.spritePhotoMobile.getPositionX() + 45 *(m) - player.spritePhotoMobile.getContentSize().width /2;
		var y = player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 25;
		player.myCards[m].sprite.setPosition(x,y);
	},

	getPlayerCardPosition:function(player,m){
		var x = player.spritePhotoMobile.getPositionX() + 45 *(m) - player.spritePhotoMobile.getContentSize().width /2;
		var y = player.spritePhotoMobile.getPositionY() + player.spritePhotoMobile.getContentSize().height + 25;
		return cc.p(x,y);
	},
	
    menuCallbackPersonalMessage:function(sender){
    	g_players = g_players.concat(g_players_noPower);

		var playerPosition=parseInt(sender.getName());

		for(var i=0;i<g_players.length;i++){
			if(g_players[i].playerPosition==playerPosition){
				//将玩家Id，玩家的服务器位置，玩家性别，玩家金币，玩家签名，玩家vip级别，玩家收到各个礼物的数量和玩家照片存储位置作为参数传入（目前数据不全）
				var layerInteraction=new PopUpInteractionLayer(
					g_players[i].id,
					g_players[i].positionServer
				);
				this.addChild(layerInteraction,15);
				break;
			}
		}
    },

    pomelo_on:function(){
    	pomelo.on('onFaPai',onFapai_function=function(data){
    		console.log("onFapai" + JSON.stringify(data));
    		var instruction_faPai=data["msg"];
    		var rotationPlayerPositionServer=data["location"];
			this.countFlowing = data["round"];
    		if(instruction_faPai=="fapaile!"){
    			/*更新房间状态和玩家信息*/
    			/*更新房间信息*/

    			//更新房间状态
    			this.roomState=1;
    			this.dealCardState=true;
    			this.bet=g_betArray[0];
				
				//初始化发牌的位置
    			this.currentGetPowerPlayerPosition = rotationPlayerPositionServer;

    			/*更新玩家信息*/
    			for(var i=0;i<g_players.length;i++){
    				//清除玩家手中上一局的牌，
					for(var j = 0;j < g_players[i].myCards.length;j++){
						g_players[i].myCards[j].removeFromParent();
					}
					g_players[i].myCards.splice(g_players[i].myCards,g_players[i].myCards.length);
    				g_players[i].myCards.length=0;
    				//清除玩家状态提示
    				if(g_players[i].statusSprite!=null){
    					g_players[i].statusSprite.runAction(cc.hide());
    				}
    			}

    			for(var i=0;i<g_players.length;i++){
					var player = g_players[i];
					if(player.positionServer == this.currentGetPowerPlayerPosition){
						player.setSpriteStatus("shou");
					}
					//设置标志 表示发牌状态
					player.statusTag = 2;
    			}
    		}
    	}.bind(this));

    	pomelo.on('onAdd',onAdd_function=function(data){
    		console.log("onAdd:" + JSON.stringify(data));
    		if(data["user"] != playerId){
    			var player=null;
    			var playerInfo=data["user"];
				var t_player=new Array();
				t_player.push(playerInfo["id"]);
				t_player.push(playerInfo["location"]);
				t_player.push(playerInfo["isGame"]);
				t_player.push(playerInfo["nickName"]);
				t_player.push(playerInfo["gold"]);
				t_player.push(playerInfo["gender"]);

				player = new ZHQPlayers(t_player);
				this.addChild(player);
				g_players.push(player);
				
    			//确定新加入玩家的客户端位置
    			if(player.positionServer>g_myselfPlayerPos){
    				player.playerPosition=g_myselfPlayerPos+(player.positionServer-g_myselfPlayerPos);
    			}
    			else{
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

    			/*/为新加入的玩家头像添加个人信息按钮
    			var menuSprite1=new cc.Sprite(res.Mobile_jpg);
    			var menuSprite2=new cc.Sprite(res.Mobile_jpg);
    			var menuSprite3=new cc.Sprite(res.Mobile_jpg);
    			var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
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
    		}
    	}.bind(this));

    	pomelo.on('onReady',onReady_function=function(data){
    		console.log("pomelo on Ready:" + data.location+" is ready");
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == data.location){
					player.setSpriteStatus("ready");
					//准备状态表示
					player.statusTag = 3;
					break;
				}
			}
    	}.bind(this));
		
		pomelo.on('onStart',onStart_function=function(data){
    		console.log("pomelo onStart:" + data.location);
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == data.location){
					player.setSpriteStatus("start");
					//准备状态表示
					player.statusTag = 1;
					break;
				}
			}
    	}.bind(this));
		
		pomelo.on('onPass',onPass_function=function(data){
    		console.log("pomelo on Ready:" + data.location+" is ready");
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == data.location){
					player.setSpriteStatus("pass");
					break;
				}
			}
    	}.bind(this));

    	pomelo.on('onHowMany',onHowMany_function=function(data){
    		console.log("onHowMany:" + JSON.stringify(data));
			var location = data.location;
			var painum = data.painum;
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == g_myselfPlayerPos){
					if(player.spriteState != null){
						player.spriteState.removeFromParent();
						player.spriteState = null;
					}
					player.spriteState = new cc.Sprite(res.baoPai_png);
					player.addSpriteState();
					player.spriteState.runAction(cc.fadeOut(2));
				}else{
					var mpainum = painum[player.positionServer];
					if(player.spriteState != null){
						player.spriteState.removeFromParent();
						player.spriteState = null;
					}
					if(mpainum <= 3){
						//报牌 如果牌数小于 3 需要显示剩余牌的数量
						player.spriteState = new cc.Sprite("res/status/painum" + mpainum + ".png");
						player.addSpriteState();
					}else{
						//报牌 如果牌数大于 3 则显示不够报
						player.spriteState = new cc.Sprite(res.noEnoughBao_png);
						player.addSpriteState();
						
					}
					player.spriteState.runAction(cc.fadeOut(2));
				}
			}
    	}.bind(this));

    	pomelo.on('onActBroadcast',onActBroadcast_function=function(data){
    		console.log("onActBroadcast:"+JSON.stringify(data));
    		this.radioMessageScroll(data,cc.color(220,20,60));
    	}.bind(this));

    	pomelo.on('onChuPai',onChuPai_function=function(data){
    		console.log("onChuPai:" + JSON.stringify(data));
			var paiXing = data["pai"];
    		var locationServer = data["location"];
			var status = data["status"];
    		var playerIndexOf=-1;
    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].positionServer == locationServer){
    				playerIndexOf = i;
    				break;
    			}
    		}
    		if(playerIndexOf==-1){
    			console.log("error outside............... pomelo.on('onOpen')");
    			return;
    		}
			//还原上次玩家出的牌并隐藏起来牌
			if(this.lastPosition != -1){
				console.log("start remove last pai......" + this.lastPosition + " lens:" + this.lastPai.length);
				for(var i = 0;i < this.lastPai.length;i++){
					var card = this.lastPai[i];
					card.removeFromParent();
				}
				this.lastPai.splice(0,this.lastPai.length);
			}
			
			this.lastPosition = locationServer;
			var player = g_players[playerIndexOf];
			var size = cc.director.getWinSize();
			//其他玩家出牌动作
			if(locationServer != g_myselfPlayerPos){
				//出牌放在桌面中间显示
				for(var i = 0;i < paiXing["p"].length;i++){
					//移动到桌面位置
					console.log("chupai other :" + JSON.stringify(paiXing));
					var suit = paiXing["s"][i];
					var rank = paiXing["p"][i];
					var card = player.addPlayerCard();
					var position = this.getPlayerCardPosition(player,player.myCards.length - 1);
					card.initCardSprite(suit,rank,position);
					var moveToBiPaiPosition=cc.moveTo(0.5,cc.p(size.width/2-(80*(i)),size.height/2));
					card.sprite.runAction(cc.sequence(cc.show(),moveToBiPaiPosition));
					this.lastPai.push(card);
					player.selectCards.push(card);
				}
				//重新排列牌
				player.removeSelectCards();
			}else{
				//自己出牌动作
				for(var i = 0;i < player.selectCards.length;i++){
					var card = player.selectCards[i];
					//移动到桌面位置
					var moveToBiPaiPosition=cc.moveTo(0.5,cc.p(size.width/2-(80*(i)),size.height/2));
					card.sprite.runAction(cc.sequence(moveToBiPaiPosition));
					this.lastPai.push(card);
				}
				//重新排列牌
				player.removeSelectCards();
				for(var i = 0;i < player.myCards.length;i++){
					this.setPlayerCardPosition(player,i);
				}
			}
			
			if(status == -1){
				player.statusTag = 4;
				player.setSpriteStatus("finish")
			}
    	}.bind(this));

		pomelo.on('onChuPaiTip',onChuPaiTip_function=function(data){
    		console.log("onChuPaiTip:" + JSON.stringify(data));
			var flag = data["flag"];
    		var locationServer = data["location"];
    		var playerIndexOf=-1;

    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].positionServer == g_myselfPlayerPos){
					if(g_players[i].positionServer == locationServer){
						if(flag == true){
							this.chuPaiMenuItem.setEnabled(true);
						}else{
							this.chuPaiMenuItem.setEnabled(false);
						}
					}
    				break;
    			}
    		}
    	}.bind(this));

		pomelo.on('onMarkA',onMarkA_function=function(data){
    		console.log("onMarkA:" + JSON.stringify(data));
			this.liangAMenuItem.setEnabled(false);
			var markPai = data["mark"];
    		var locationServer = data["location"];
			var heiAs = data["heia"];
			this.bet = data["chip"];
			//开始标记宣牌的状态信息
			for(var i = 0;i < heiAs.length;i++){
				var heiLocation = heiAs[i];
				for(var j = 0;j < g_players.length;j++){
					var player = g_players[j];
					if(player.positionServer == heiLocation){
						var card = new Array();
						card.push(14);
						if(i == 1){
							card.push(2);
						}else{
							card.push(4);
						}
						player.markCards.push(card);
						break;
					}
				}
			}
			for(var j = 0;j < g_players.length;j++){
				var player = g_players[j];
				if(player.positionServer == locationServer){
					if(markPai["p"].length >= 3){
						for(var i = 0;i < markPai["p"].length;i++){
							var card = new Array();
							card.push(markPai["p"][i]);
							card.push(markPai["s"][i]);
							player.markCards.push(card);
						}
					}
				}
				player.setXuanStatus();
				player.resetSelectCard();
			}
    	}.bind(this));

    	pomelo.on('onThrow',onThrow_function=function(data){
    		console.log("onThrow:" + JSON.stringify(data));
    		var playerName=data["user"];
    		var playerIndexOf=-1;
    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].id==playerName){
    				g_players[i].abandon=true;
    				playerIndexOf=i;
    				break;
    			}
    		}
    		if(playerIndexOf==-1){
    			console.log("error outside......................pomelo.on('onThrow')");
    			return;
    		}
    		if(playerName==playerId){
    			this.readyMenuItem.setEnabled(false);
    			this.readyMenuItem.setEnabled(false);
    			this.readyMenuItem.setEnabled(false);
    			this.readyMenuItem.setEnabled(false);
    			this.readyMenuItem.setEnabled(false);
    		}
    		//提示弃牌
    		if(g_players[playerIndexOf].spriteState!=null){
    			g_players[playerIndexOf].spriteState.removeFromParent();
				g_players[playerIndexOf].spriteState=null;
    		}
    		g_players[playerIndexOf].spriteState=new cc.Sprite(res.Abandon_png);
    		g_players[playerIndexOf].addSpriteState();
    		g_players[playerIndexOf].abandon=true;

    		//将玩家移到player_noPower数组
    		g_players_noPower.push(g_players[playerIndexOf]);
    		g_players.splice(playerIndexOf,1);
    	}.bind(this));

    	pomelo.on('onEnd',onEnd_function=function(data){
			
    		console.log("onEnd:" + JSON.stringify(data));
    		var playerPositionServer=data["winner"];
    		var playerIndexOf=-1;
    		for(var i=0;i<g_players.length;i++){
    			if(g_players[i].positionServer==playerPositionServer){
    				playerIndexOf=i;
    				break;
    			}
    		}
    		if(playerIndexOf==-1){
    			console.log("error outside.........................pomelo.on('onEnd')");
    			return;
    		}

    		//如果房间属于比牌状态，需要等到比牌动作完成才执行获取金币动作
    		if(this.comparableState==true){
    			var compareTime=4.8-this.progressBoardBiPaiTime.getPercentage()/100*4.8;
    			var waitGetBetTime=new cc.DelayTime(compareTime);
    			var callbackActionWinnerGetBet=
    				cc.callFunc(this.actionWinnerGetBet,this,
    						g_players[playerIndexOf].spritePhotoMobile.getPosition());
    			this.runAction(cc.sequence(waitGetBetTime,callbackActionWinnerGetBet));
    			console.log("compareTime:"+compareTime);
    			console.log("room is comparing...........................................");
    		}
    		else{
    			this.actionWinnerGetBet(g_players[playerIndexOf].spritePhotoMobile.getPosition());
    		}
    		//
    		this.myselfCardsReach=false;
    	}.bind(this));

		pomelo.on('onStartChuPai',onStartChuPai_function=function(data){
			console.log("onStartChuPai:" + JSON.stringify(data));
			var rotationPlayerPositionServer=data["location"];
			//暂停当前玩家定时器,并初始化玩家按钮定时器
			if(this.currentGetPowerPlayerPosition != 0 && this.currentGetPowerPlayerPosition != null){
				for(var i=0;i<g_players.length;i++){
					if(g_players[i].positionServer==this.currentGetPowerPlayerPosition){
						g_players[i].counterTimer.stopCounterTimer();
						break;
					}
				}
			}
            //开启轮换到的玩家 并设置 玩家的状态信息出牌准备 3
			this.currentGetPowerPlayerPosition = rotationPlayerPositionServer;
			var rotationPlayerIndexOf = -1;
			for (var i = 0; i < g_players.length; i++) {
				if (g_players[i].positionServer == rotationPlayerPositionServer) {
					rotationPlayerIndexOf = i;
				}
				g_players[i].statusTag = 3;
				g_players[i].statusSprite.runAction(cc.hide());
			}
			if (rotationPlayerIndexOf == -1) {
				console.log("error outside........................................pomelo.on('onChangePlayer')");
				return;
			}
			//设置红桃四的玩家状态
			var card = new Array();
			card.push(4);
			card.push(3);
			g_players[rotationPlayerIndexOf].markCards.push(card);
			g_players[rotationPlayerIndexOf].setXuanStatus();
			g_players[rotationPlayerIndexOf].setSpriteStatus("chu");
			this.initChuPaiMenuItemCallBack();

        }.bind(this));

    	pomelo.on('onFollow',onFollow_function=function(data){
    		console.log("onFollow:" + JSON.stringify(data));
    		var playerName=data["user"];
    		var allChips=data["all_chip"];
		    var playerIndexOf=-1;
		    for(var i=0;i<g_players.length;i++){
		        if(g_players[i].id==playerName){
		            playerIndexOf=i;
		            break;
		        }
		    }
		    if(playerIndexOf==-1){
		        console.log("error outside..................................... pomelo.on('onFollow')");
		        return;
		    }
		    this.actionFollowBet(g_players[playerIndexOf].spritePhotoMobile.getPosition(),
		        g_players[playerIndexOf].checkCard);
		}.bind(this));
		
		pomelo.on('onLeave',onLeave_function=function(data){
            console.log("onLeave:" + JSON.stringify(data));
            var playerName=data["user"];
            console.log("player_Length:"+g_players.length+"  "+g_players_noPower.length);
            var isFind=false;
            if(isFind==false){
                for(var i=0;i<g_players.length;i++){
                    if(g_players[i].id==playerName){
                        g_players[i].removeFromParent();
                        g_players.splice(i,1);
                        isFind=true;
                    }
                }
            }
            if(isFind==false){
                for(var i=0;i<g_players_noPower.length;i++){
                    if(g_players_noPower[i].id==playerName){
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

			var cardType=data["paixing"];
			var card_len = cardType["p"].length;
			this.count = cardType["p"].length;

			for(var i = 0;i < card_len;i++){
				var suit=cardType["s"][i];
				var rank=cardType["p"][i];
				var card = new Array();
				card.push(suit);
				card.push(rank);
				this.myselfCards.push(card);
			}
			if(this.myselfCardsReach == false){
				for(var i = 0;i < g_players.length;i++){
					var player = g_players[i];
					if(player.positionServer == g_myselfPlayerPos){
						continue;
					}
					player.initPlayerCards(4);
					this.setPlayerCardsBackPosition(player,player.myCards.length);
				}
				this.myselfCardsReach=true;
			}
			this.actionFaPai();
		}.bind(this));

		pomelo.on('onShoupaiFirst',onShoupaiFirst_function=function(data){
			console.log("onShoupaiFirst:" + JSON.stringify(data));
			//初始化myselfCards数组
			this.myselfCards.splice(0,this.myselfCards.length);

			var cardType=data["paixing"];

			for(i = 0;i < 6;i++){
				var suit=cardType["s"][i];
				var rank=cardType["p"][i];
				var card = new Array();
				card.push(suit);
				card.push(rank);
				this.myselfCards.push(card);
			}
			//其他玩家的牌放入Involvement中
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				if(player.positionServer == g_myselfPlayerPos){
					continue;
				}
				player.initPlayerCards();
				this.setPlayerCardsBackPosition(player,player.myCards.length);
				this.myselfCardsReach=true;
			}
			//给玩家发牌动作，由于服务器还没有给开始发牌位置信息，目前默认为从客户端位置最小的开始发牌
			this.actionFapai(6);
    		this.setContinueFapaiMenu();
		}.bind(this));

		pomelo.on('onChangePlayer',onChangePlayer_function=function(data){
			console.log("onChangePlayer:" + JSON.stringify(data));
			var rotationPlayerPositionServer=data["location"];
			//暂停当前玩家定时器,并初始化玩家按钮定时器
			if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
				for(var i=0;i<g_players.length;i++){
					if(g_players[i].positionServer==this.currentGetPowerPlayerPosition){
						g_players[i].counterTimer.stopCounterTimer();
						this.chuPaiMenuItem.setEnabled(false);
						this.buChuPaiMenuItem.setEnabled(false);	
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
                            this.chuPaiMenuItem.setEnabled(true);
                            this.buChuPaiMenuItem.setEnabled(true);
                        }
                        rotationPlayerIndexOf = i;
                        break;
                    }
                }
                if (rotationPlayerIndexOf == -1) {
                    console.log("error outside........................................pomelo.on('onChangePlayer')");
                    return;
                }
				if(g_players[rotationPlayerIndexOf].statusTag == 3){
					for (var i = 0; i < g_players.length; i++) {
						if (g_players[i].positionServer == rotationPlayerPositionServer) {
							g_players[i].setSpriteStatus("chu");
						}else{
							g_players[i].statusSprite.runAction(cc.hide());
						}
					}
				}
                g_players[rotationPlayerIndexOf].counterTimer.startCounterTimer();
            }
        }.bind(this));
    
		pomelo.on('onEndPai',onEndPai_function=function(data){
            console.log("onEndPai:"+JSON.stringify(data));
            //获胜者的牌型
            var winnerCardType=data["winner_pai"];
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
	                for(var j = 0;j < g_players.length;j++){
	                	var player = g_players[j];
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
    	for(var i=0;i<g_players.length;i++){
    		player = g_players[i];
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
    	for(var i=0;i<g_players.length;i++){
    		player = g_players[i];
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
    	for(var i=0;i<g_players.length;i++){
    		player = g_players[i];
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
    	for(var i=0;i<g_players.length;i++){
    		var player = g_players[i];
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
       var y=size.height/2+(size.height/2-50)*Math.random();
       var moveBet=cc.moveTo(0.3,cc.p(x,y));
       counterSprite.runAction(moveBet);
   },
   
    actionFaPai:function(){
		console.log("fapai :" + this.count);
    	var size=cc.director.getWinSize();
		var playerArrayPosition=-1;
		//递归发牌如果this.count == 0 则停止发牌
		if(this.count <= 13){
			this.initMenuItemVisibleCallbackAfterDealCard();
			return true;
		}
		this.count = this.count - 1;
		for(var i = 0;i < g_players.length;i++){
    		console.log(g_players[i].id  + "positionServer:" + g_players[i].positionServer);
    		if(g_players[i].positionServer == g_myselfPlayerPos){
    			playerArrayPosition=i;
    			break;
    		}
    	}
		if(playerArrayPosition == -1){
			return false;
		}
		
    	var player = g_players[playerArrayPosition];
		var card_len = player.myCards.length;
		var card = player.addPlayerCard();
		var position = this.getPlayerCardPosition(player,card_len);
		card.initCardSprite(parseInt(this.myselfCards[card_len][0]),
			parseInt(this.myselfCards[card_len][1]),
			position);
    	var callFunc = cc.callFunc(this.actionFaPai,this);
    	player.myCards[card_len].sprite.runAction(cc.sequence(cc.delayTime(0.45),cc.show(),callFunc));
    },

    actionWinnerGetBet:function(my_this,playerPosition){
        for(var j in this.betPhotoArray){
            var getBetAction=  cc.moveTo(1.0, cc.p(playerPosition));
            this.betPhotoArray[j].runAction(cc.sequence(getBetAction,cc.hide()));
        }
        //置按钮为不可点击
        this.readyMenuItem.setEnabled(false);
        this.readyMenuItem.setEnabled(false);
        this.readyMenuItem.setEnabled(false);
        this.readyMenuItem.setEnabled(false);
        this.readyMenuItem.setEnabled(false);
        //关闭定时器
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer==this.currentGetPowerPlayerPosition){
            	g_players[i].counterTimer.stopCounterTimer();
                break;
            }
        }
        //初始化房间状态为非游戏状态
        this.roomState=0;
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
   
    displayLoser:function(mythis,loserPositionServer){
        for(var i=0;i<g_players.length;i++){
            if(g_players[i].positionServer==loserPositionServer){
				//取消spriteState
				if(g_players[i].spriteState!=null){
					g_players[i].spriteState.removeFromParent();
					g_players[i].spriteState = null;
				}
            	g_players[i].setSpriteStatus("loser");
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
    		this.readyMenuItem.setEnabled(true);
    		this.readyMenuItem.setEnabled(true);
    		this.readyMenuItem.setEnabled(true);
    		this.readyMenuItem.setEnabled(true);
			this.readyMenuItem.setEnabled(true);
    	}
    	else{
    		this.readyMenuItem.setEnabled(false);
    		this.readyMenuItem.setEnabled(false);
    		this.readyMenuItem.setEnabled(false);
			this.readyMenuItem.setEnabled(true);
    	}
    	g_players[rotationPlayerIndexOf].counterTimer.startCounterTimer();
    },
    
    setRoomStateCompare:function (){
        this.comparableState=false;
    },
    
    SetKaiPaireadyMenuItem:function(){
        this.readyMenuItem.setEnabled(true);
        this.readyMenuItem.setEnabled(true);

    },
    
    SetreadyMenuItem:function(){
        this.readyMenuItem.setEnabled(true);
    },
    
	pomelo_removeListener:function(){

        pomelo.removeListener('onReady',onReady_function);
        pomelo.removeListener('onAdd',onAdd_function);
        pomelo.removeListener('onThrow',onThrow_function);
        pomelo.removeListener('onLeave',onLeave_function);
        pomelo.removeListener('onEnd',onEnd_function);
        pomelo.removeListener('onFaPai',onFapai_function);
        pomelo.removeListener('onShoupai',onShoupai_function);
        pomelo.removeListener('onChangePlayer',onChangePlayer_function);
        pomelo.removeListener('onEndPai',onEndPai_function);
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

var ZHQGameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new zhqGameLayer();
        this.addChild(layer);
    }
});
