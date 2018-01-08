
var ZHQCard = cc.Node.extend({
    //牌的正面精灵，最好改成洗牌的时候初始化
    sprite : null,
	spriteMenuItem:null,
	spriteBack:null,
    //花色
    suit : null,
    //点数
    rank : null,
	//点击上移 点击下移 flag 标记是上移还是下移
	flag:null,
    ctor : function(){
        this._super();
		this.flag = false;
        var size = cc.director.getWinSize();
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
	
	menuCallbackButton:function(){
		console.log("start move the card......");
		if(this.flag == false){
			var x = this.sprite.getPositionX();
			var y = this.sprite.getPositionY() + 10;
			console.log("start move the card up......x:" + x + " y:" + y);
			var acToUp = cc.moveTo(0.1,cc.p(x,y));
			console.log("start move the card up......");
			this.sprite.runAction(acToUp);
			this.flag = true;
			return 0;
		}else{
			var x = this.sprite.getPositionX();
			var y = this.sprite.getPositionY() - 10;
			var acToDown = cc.moveTo(0.1,cc.p(x,y));
			console.log("start move the card down......x:" + x + " y:" + y);
			this.sprite.runAction(acToDown);
			this.flag = false;
			return 1;
		}
	}
});