var Puke = ["0","0","2","3","4","5","6","7","8","9","10","J","Q","K","A"];

var ZHQPlayers = cc.Node.extend({
	nickName:null,
    id:null,
    labelId:null,
    //玩家手中的牌
    myCards:null,
	markCards:null,
	selectCards:null,
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
	xuanSprite:null,
	xuanCount:null,
    //当前玩家的游戏状态
    isGame:null,
    //定时器
    counterTimer:null,
	statusTag:null,
    statusSprite:null,

    ctor:function(playerInfo){
        this._super();
		console.log("start  create player:" + JSON.stringify(playerInfo));
		this.statusTag = -1;
		this.xuanCount = 0;
		this.myCards = new Array();
		this.selectCards = new Array();
		this.markCards = new Array();
		this.id = playerInfo[0];
        this.positionServer = playerInfo[1];
        this.isGame = playerInfo[2];
		var myNickName = playerInfo[3];
		this.myGold = playerInfo[4];

        this.labelId = new cc.LabelTTF(myNickName,"Arial",20);
        this.labelId.setColor(cc.color(160,82,45));

        this.spritePhotoMobile = new cc.Sprite(res.Mobile_jpg);

        this.spritePhotoSelf = new cc.Sprite(res.Man_jpg);

		this.spritePhotoSelf.setPosition(this.spritePhotoMobile.x + this.spritePhotoSelf.getContentSize().width/2 + 5,
			this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2);

		//铜币图片
		var moneyPicture = new cc.Sprite(res.MoneyPicture_jpg);
		moneyPicture.setPosition(this.spritePhotoSelf.x +
			this.spritePhotoSelf.getContentSize().width +
				moneyPicture.getContentSize().width/2 - 13,
			this.spritePhotoMobile.y+moneyPicture.getContentSize().width/2 + 8);
		//铜币数量

		this.moneyLabel = new cc.LabelTTF(this.myGold.toString(),"Arial",20);
		this.moneyLabel.setColor(cc.color(160,82,45));
		
		this.moneyLabel.setPosition(moneyPicture.x +
				moneyPicture.getContentSize().width + this.moneyLabel.getContentSize().width/2,
			this.spritePhotoMobile.y+moneyPicture.getContentSize().width/2 + 8),

		
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
			
		this.statusSprite = new cc.Sprite(res.StartSprite_png);
		this.statusSprite.setPosition(
			this.spritePhotoMobile.x + this.spritePhotoSelf.getContentSize().width/2 + 5,
			this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2
        );

        this.spritePhotoMobile.addChild(this.spritePhotoSelf,5);
        this.spritePhotoMobile.addChild(this.counterTimer,5);
        this.spritePhotoMobile.addChild(this.statusSprite,5);
		if(this.isGame != 1){
			this.statusSprite.runAction(cc.sequence(cc.hide()));
		}
		
        this.addChild(this.spritePhotoMobile);
    },

	initPlayerCards:function(card_num){
		this.myCards = new Array();
		for(var i = 0;i<card_num;i++){
			var card = new ZHQCard();
			this.addChild(card,6);
			this.myCards.push(card);
		}
    },
	
	removeSelectCards:function(){
		for(var i = 0;i < this.selectCards.length;i++){
			var selectCard = this.selectCards[i];
			for(var j = 0;j < this.myCards.length;j++){
				if(selectCard == this.myCards[j]){
					this.myCards.splice(j,1);
					break;
				}
			}
		}
		this.selectCards.splice(0,this.selectCards.length);
	},
	
	addPlayerCard:function(){
		var card = new ZHQCard();
		this.addChild(card,6);
		this.myCards.push(card);
		return card;
	},

	setXuanStatus:function(){
		var size = cc.director.getWinSize();
		if(this.markCards.length > 0){
			if(this.xuanSprite == null){
				this.xuanSprite = new cc.Sprite(res.BaiDiSprite_png);
				if(this.playerPosition == 1){
					this.xuanSprite.setPosition(
						this.spritePhotoMobile.getContentSize().width + this.xuanSprite.getContentSize().width /2 + 5,
						this.spritePhotoMobile.getContentSize().height /2
					);
				}else if(this.playerPosition == 2){
					this.xuanSprite.setPosition(this.xuanSprite.getContentSize().width /2 + 10,
						-5 - this.xuanSprite.getContentSize().height /2);
				}else if(this.playerPosition == 3){
					this.xuanSprite.setPosition(this.xuanSprite.getContentSize().width /2 + 10,
						-5 - this.xuanSprite.getContentSize().height /2);
				}else if(this.playerPosition == 4){
					this.xuanSprite.setPosition(this.xuanSprite.getContentSize().width /2 - 10,
						-5 - this.xuanSprite.getContentSize().height /2);
				}else if(this.playerPosition == 5){
					this.xuanSprite.setPosition(this.xuanSprite.getContentSize().width /2 - 10,
						-5 - this.xuanSprite.getContentSize().height /2);
				}
				this.spritePhotoMobile.addChild(this.xuanSprite);
			}
			for(var i = 0;i < this.markCards.length;i++){
				var card = this.markCards[i];
				var p = card[0];
				var s = card[1];
				var mySprite = new cc.Sprite("res/tdk_status/" + s + ".png");
				var rankLabel = new cc.LabelTTF(Puke[p],"Arial",30,cc.size(30,30));
				rankLabel.setColor(cc.color(160,82,45));
				rankLabel.setPosition(
					mySprite.getContentSize().width/2,
					mySprite.getContentSize().height/2 + rankLabel.getContentSize().height /2);
				mySprite.addChild(rankLabel);
				mySprite.setPosition(
					mySprite.getContentSize().width / 2 + 5 + mySprite.getContentSize().width * i,
					mySprite.getContentSize().height / 2 + 5
				);
				this.xuanSprite.addChild(mySprite);
				this.xuanCount = this.xuanCount + 1;
			}
		}
	},
    
	setSpriteStatus:function(status){
		console.log("set status sprite:" + status + this.id);
		if(status == "loser"){
			this.statusSprite.setTexture(res.LoserSprite_png);	
		}else if(status == "win"){
			this.statusSprite.setTexture(res.WinnerSprite_png);
		}else if(status == "equal"){
			this.statusSprite.setTexture(res.EqualSprite_png);
		}else if(status == "ready"){
			this.statusSprite.setTexture(res.ReadySprite_png);
		}else if(status == "finish"){
			this.statusSprite.setTexture(res.FinishSprite_png);
		}else if(status == "shou"){
			this.statusSprite.setTexture(res.ShouSprite_png);
		}else if(status == "chu"){
			this.statusSprite.setTexture(res.ChuPaiSprite_png);
		}else if(status == "start"){
			this.statusSprite.setTexture(res.StartSprite_png);
		}else{
			console.log("error status set......");
		}
		this.statusSprite.runAction(cc.sequence(cc.show()));
	},
	
	setSelectCardPos:function(touchPos){
		console.log("setSelectCardPos:" + this.statusTag);
		if(this.statusTag >= 2){
			var x = this.spritePhotoMobile.getPositionX() - this.spritePhotoMobile.getContentSize().width/2;
			var y = this.spritePhotoMobile.getPositionY() + this.spritePhotoMobile.getContentSize().height + 25;
			console.log("card pos x:" + x + " y:" + y + " touch:x" + touchPos.x + " y:" + touchPos.y);

			if(touchPos.y >= y - 60 && touchPos.y <= y + 65){
				if(x - 50 <= touchPos.x && (x + 50 + 45 * 13) >= touchPos.x){
					var index = Math.round(Math.abs(touchPos.x - x) / 45);
					if(index < 0 || index >= this.myCards.length){
						return false;
					}
					var action = this.myCards[index].menuCallbackButton();
					var card = this.myCards[index];
					if(action == 0){
						this.selectCards.push(card);
					}else{
						for(var i = 0;i < this.selectCards.length;i++){
							var card_t = this.selectCards[i];
							if(card_t == card){
								if(action == 1){
									this.selectCards.splice(i,1);
								}
							}
						}
					}
				}
			}
		}
		console.log("select cards length:" + this.selectCards.length);
	},

	resetSelectCard:function(){
		for(var i = 0;i < this.selectCards.length;i++){
			var card_t = this.selectCards[i];
			card_t.menuCallbackButton();
		}
		this.selectCards.splice(0,this.selectCards.length);
	},
	
	resetMoneyLabel:function(money){
		this.moneyLabel.setString(money.toString());
	}
});