
var PopUpTDKBiPaiFinish = PopUp.extend({
    spriteSelectBack:null,
	spriteBackGround:null,
    m_touchListener:null,
    m_touchListener1:null,
    //menu:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
        var size=cc.director.getWinSize();
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack,3);
		
		this.spriteBackGround = new cc.Sprite(res.TDKbg_png);
		this.spriteBackGround.setPosition(size.width/2,size.height/2);
		this.spriteSelectBack.addChild(this.spriteBackGround,4);
		
        this.m_touchListener=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                }else{
					this.removeFromParent();
					console.log("go back from PopUpTDKBiPaiFinish layer");
				}
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener,this.spriteBackGround);
    },
	setPlayerCards:function(players){
		var size=cc.director.getWinSize();
		for(var i = 0;i < players.length;i++){
			var player = players[i];
			if(player.myCards.length <= 0){
				continue;
			}
			var nameSprite = new cc.LabelTTF(player.myNickName,"Arial",20);
			//玩家名字
			nameSprite.setPosition(nameSprite.getContentSize().width/2 + 35,
				this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
			this.spriteBackGround.addChild(nameSprite);
			//扑克
			for(var j = 0;j < player.myCards.length;j++){
				var s = player.myCards[j].suit;
				var p = player.myCards[j].rank;
				var mySprite = new cc.Sprite("res/tdk_status/" + s + ".png");
				var rankLabel = new cc.LabelTTF(g_Puke[p],"Arial",30,cc.size(30,30));
				rankLabel.setColor(cc.color(160,82,45));
				rankLabel.setPosition(
					mySprite.getContentSize().width/2,
					mySprite.getContentSize().height/2 + rankLabel.getContentSize().height /2);
				mySprite.addChild(rankLabel);
				
				mySprite.setPosition(
					nameSprite.getContentSize().width + 50 + mySprite.getContentSize().width + (mySprite.getContentSize().width + 10) * j,
					this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
				this.spriteBackGround.addChild(mySprite);
				
			}
			
			var FenShuSprite = new cc.LabelTTF(player.myScore.toString(),"Arial",20);
			FenShuSprite.setPosition(this.spriteBackGround.getContentSize().width/1.5 + FenShuSprite.getContentSize().width /2,
				this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
			this.spriteBackGround.addChild(FenShuSprite);
			if(player.statusTag == "loser"){
				var ShengFuSprite = new cc.LabelTTF("负","Arial",20);
				ShengFuSprite.setPosition(this.spriteBackGround.getContentSize().width/1.2 + ShengFuSprite.getContentSize().width /2,
					this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
				this.spriteBackGround.addChild(ShengFuSprite);
			}else if(player.statusTag == "win"){
				var ShengFuSprite = new cc.LabelTTF("胜","Arial",20);
				ShengFuSprite.setPosition(this.spriteBackGround.getContentSize().width/1.2 + ShengFuSprite.getContentSize().width /2,
					this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
				this.spriteBackGround.addChild(ShengFuSprite);
			}else if(player.statusTag == "qi"){
				var ShengFuSprite = new cc.LabelTTF("弃","Arial",20);
				ShengFuSprite.setPosition(this.spriteBackGround.getContentSize().width/1.2 + ShengFuSprite.getContentSize().width /2,
					this.spriteBackGround.getContentSize().height / 8 * (6 - i) - 50);
				this.spriteBackGround.addChild(ShengFuSprite);
			}
		}
	},
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});