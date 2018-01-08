var Players = cc.Node.extend({
	nickName:null,
    id:null,
	myGold:null,
    labelId:null,
    //玩家手中的牌
    myCards:null,
    //玩家的位置
    playerPosition:null,
    //手机图片
    spritePhotoMobile:null,
    //玩家照片
    spritePhotoSelf:null,
	//铜币数量
	moneyLabel:null,
    //服务器位置
    positionServer:null,
    //是否有权限（是否参与本牌局）
    isPower:null,
    //状态精灵精灵（看牌放弃公用）
    spriteState:null,
    //是否看牌
    checkCard:false,
    //是否弃牌
    abandon:false,
    //定时器
    counterTimer:null,
   
	loserSprite:null,
	//比牌状态提示精灵
    statusSprite:null,
    //个人信息按钮

    ctor:function(playerInfo){
        this._super();
		console.log("start  create player:" + JSON.stringify(playerInfo));
        this.id = playerInfo[0];
        this.positionServer = playerInfo[1];
        this.isPower = playerInfo[2];
		var myNickName = playerInfo[3];
		this.myGold = playerInfo[4];
        this.labelId = new cc.LabelTTF(myNickName,"Arial",20);
        this.labelId.setColor(cc.color(160,82,45));

        this.spritePhotoMobile = new cc.Sprite(res.Mobile_jpg);

        this.spritePhotoSelf = new cc.Sprite(res.Man_jpg);

		this.spritePhotoSelf.setPosition(this.spritePhotoMobile.x + this.spritePhotoSelf.getContentSize().width/2 + 5,
			this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2);
		console.log("create player Man_jpg success......");
		//铜币图片
		var moneyPicture = new cc.Sprite(res.MoneyPicture_jpg);
		moneyPicture.setPosition(this.spritePhotoSelf.x +
			this.spritePhotoSelf.getContentSize().width +
				moneyPicture.getContentSize().width/2 - 13,
			this.spritePhotoMobile.y+moneyPicture.getContentSize().width/2 + 8);
		//铜币数量
		console.log("player gold:" + this.myGold.toString());
		this.moneyLabel = new cc.LabelTTF(this.myGold.toString(),"Arial",20);
		this.moneyLabel.setColor(cc.color(160,82,45));
		
		this.moneyLabel.setPosition(moneyPicture.x +
				moneyPicture.getContentSize().width + this.moneyLabel.getContentSize().width/2,
			this.spritePhotoMobile.y+moneyPicture.getContentSize().width/2 + 8),
		console.log("create player moneyPicture success......");
		
		this.labelId.setPosition(moneyPicture.x +
			this.labelId.getContentSize().width/2 -
				moneyPicture.getContentSize().width/2,
			this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height-15);
			
		this.spritePhotoMobile.addChild(moneyPicture,5);
		this.spritePhotoMobile.addChild(this.moneyLabel,5);
		this.spritePhotoMobile.addChild(this.labelId,5);

        //定时器
        this.counterTimer = new CounterTimer(this.id);
        this.counterTimer.setCounterTimerPosition(
            cc.p(this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
            this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2));
		
		this.statusSprite = new cc.Sprite(res.LoserSprite_png);
		this.statusSprite.setPosition(
			this.spritePhotoMobile.x + this.spritePhotoSelf.getContentSize().width/2 + 5,
			this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2
        );
		
		//this.statusSprite = new cc.Sprite(res.LoserSprite_png);
		//this.statusSprite.setPosition(
        //    this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
        //    this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2
        //);

        this.spritePhotoMobile.addChild(this.spritePhotoSelf,5);
        this.spritePhotoMobile.addChild(this.counterTimer,5);
        this.spritePhotoMobile.addChild(this.statusSprite,5);
		this.statusSprite.runAction(cc.sequence(cc.hide()));
		
        this.addChild(this.spritePhotoMobile);
		//初始化玩家手中的牌
		if(g_gameType == "ZJH"){
			this.initPlayerCards(3,null);
		}else if(g_gameType == "TDK"){
			this.initPlayerCards(g_fapaiNum,paiXing);
		}
		console.log("create player end......");
    },
	
    initPlayerCards:function(card_num,paiXing){
        this.myCards = new Array();
		if(paiXing == null || paiXing == "null"){
			for(var i = 0;i<card_num;i++){
				var card = new Card();
				this.addChild(card);
				this.myCards.push(card);
			}
		}else{
			for(var i = 1;i < 54;i++){
				var p = paiXing["p" + i];
				var s = paiXing["s" + i];
				console.log("p:" + p + " s:" + s);
				if(p){
					var card = new Card();
					card.initCardSprite(parseInt(s),parseInt(p));
					this.addChild(card);
					this.myCards.push(card);
				}else{
					break;
				}
			}
		}
    },

	addPlayerCard:function(){
		var card = new Card();
		this.addChild(card);
		this.myCards.push(card);
	},

    addSpriteState:function(){
        this.spriteState.setPosition(this.spritePhotoMobile.x,this.spritePhotoMobile.y);
        this.addChild(this.spriteState);
    },

	setSpriteStatus:function(status){
		if(status == "loser"){
			this.statusSprite.setTexture(res.LoserSprite_png);	
		}else if(status == "win"){
			this.statusSprite.setTexture(res.WinnerSprite_png);
		}else if(status == "equal"){
			this.statusSprite.setTexture(res.EqualSprite_png);
		}else if(status == "ready"){
			this.statusSprite.setTexture(res.ReadySprite_png);
		}
		this.statusSprite.runAction(cc.sequence(cc.show()));
	},
	
	resetMoneyLabel:function(money){
		this.moneyLabel.setString(money.toString());
	}
});