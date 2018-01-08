/**
 * Created by guowanfu on 2016/3/25.
 */
var Player_cards=cc.Node.extend({
    id:null,
    //玩家手中的牌
    myCards:null,
    //玩家的位置
    playerPosition:null,
    //服务器位置
    positionServer:null,
    ctor:function(id,playerPosition,positionServer){
        this._super();
		this.myCards=new Array();
        this.id=id;
        this.playerPosition=playerPosition;
        this.positionServer=positionServer;
		this.initPlayerCards();
    },
	
    initPlayerCards:function(){
        for(var i=0;i<4;i++){
            var card = new Card();
            this.addChild(card);
            this.myCards.push(card);
        }
    },
	
	addPlayerCard:function(){
		var card = new Card();
		this.addChild(card);
		this.myCards.push(card);
	}
});