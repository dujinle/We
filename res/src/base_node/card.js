/**
 * Created by guowanfu on 2016/3/15.
 */
var Card = cc.Node.extend({
    //牌的正面精灵，最好改成洗牌的时候初始化
    sprite : null,
    //牌的背面精灵，最好改成洗牌的时候初始化
    spriteBack:null,
    //花色
    suit : null,
    //点数
    rank : null,
    ctor : function(){
        this._super();
        var size=cc.director.getWinSize();
        this.spriteBack=new cc.Sprite(res.CardBack_png);
        this.spriteBack.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
        this.addChild(this.spriteBack);
    },
	
    initCardSprite:function(suit,rank,position){
        var size = cc.director.getWinSize();
        this.suit = suit;
        this.rank = rank;
        var cardNumber=(this.rank-2)*4+this.suit;
        var strCard="res/cards/"+cardNumber+".png";
		console.log("initCardSprite:" + this.sprite);
		var callBack = cc.callFunc(this.initCardSpritePosition,this,position);
		if(this.sprite == null){
			this.sprite = new cc.Sprite(strCard);
			this.sprite.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
			this.addChild(this.sprite);
		}else{
			this.sprite.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
			this.sprite.setTexture(strCard);
		}
		this.sprite.runAction(cc.sequence(cc.hide(),callBack));
    },
	
	initCardSpritePosition:function(my_this,position){
		console.log("initCardSpritePosition ........");
		this.sprite.setPosition(position);
	},
	
    setCardSpritePosition:function(positionClient,suit,rank){
        var size=cc.director.getWinSize();
        this.suit=suit;
        this.rank=rank;
        var cardNumber=(this.rank-2)*4+this.suit;
        var strCard="res/cards/"+cardNumber+".png";
		if(this.sprite == null){
			this.sprite=new cc.Sprite(strCard);
			this.sprite.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
			this.sprite.runAction(cc.hide());
			this.addChild(this.sprite);
		}else{
			this.sprite.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
			this.sprite.setTexture(strCard);
			this.sprite.runAction(cc.hide());
		}
        this.sprite.setPosition(this.spriteBack.getPosition());
    }
});