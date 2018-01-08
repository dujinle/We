//控制层  确定可以触控的地方
var ControlLayer = cc.Node.extend({

	ctor : function () {
		this._super();
		//控制事件
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function (touch,event) {
				var target = event.getCurrentTarget();
				var touchPoint = touch.getLocation();
				
				//点击牌面确定选择的牌并且上移一位
				console.log("touch the layer begin");
				 for(var i=0;i<g_players.length;i++){
					 var player = g_players[i];
					 if(player.positionServer == g_myselfPlayerPos){
						 console.log("set my card selected");
						 player.setSelectCardPos(touchPoint);
						 if(player.statusTag == 3){
							var selectCards = player.selectCards;
							if(selectCards.length > 0){
								var mark = {"p":[],"s":[]};
								for(var i = 0;i < selectCards.length;i++){
									mark["p"].push(selectCards[i].rank);
									mark["s"].push(selectCards[i].suit);
								}
								pomelo.request(util.getGameRoute(),{
									process:"chutip",
									chupai:mark,
									location:g_myselfPlayerPos
								},function(data){
									console.log(data.msg);
								});
							}
						 }
						 break;
					 }
				 }
				return false;
			},
			onTouchMoved:function (touch,event){
				var target = event.getCurrentTarget();
				var touchPoint = touch.getLocation();
				//不是我点的回合
				//右边按钮
				//下面的牌，每张只有约一半可以触控，最后一张可以触控整张
				//第一行
				console.log("touch the layer move");
			},
			onTouchEnded:function (touch,event){
				console.log("touch the layer end");
			}
		});
		cc.eventManager.addListener(listener,this);
		return true;
	}
});