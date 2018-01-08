var PopUpCreateRoomLayer=PopUp.extend({
	m_touchListener:null,
	chatBackground:null,
	spriteSelectBack:null,
	
	ctor:function(){
		this._super(cc.color(0,0,0,255),1256,800);
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
		var size=cc.director.getWinSize();

		this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
		this.spriteSelectBack.setPosition(size.width/2,size.height/2);
		this.addChild(this.spriteSelectBack);
		this.chatBackground=new cc.Sprite(res.ChatBackground_png);
		this.chatBackground.setPosition(size.width/2,size.height/2);
		this.spriteSelectBack.addChild(this.chatBackground);
		
		//发送按钮
		var sendMenuItemSprite1=new cc.Sprite(res.SendItem_png);
		var sendMenuItemSprite2=new cc.Sprite(res.SendItem_png);
		var sendMenuItemSprite3=new cc.Sprite(res.SendItem_png);
		var sendMenuItem=new cc.MenuItemSprite(sendMenuItemSprite1,sendMenuItemSprite2,sendMenuItemSprite3,
		this.menuCallbackSend,this);
		var sendMenu=new cc.Menu(sendMenuItem);
		sendMenu.x=this.chatBackground.getContentSize().width-sendMenuItem.getContentSize().width+25;
		sendMenu.y=sendMenuItem.getContentSize().height-10;
		this.chatBackground.addChild(sendMenu);

	
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
					//console.log("Yes");
				}
				else{
					//this.destoty();
					this.removeFromParent();
					console.log("go back from create room layer");
				}
			}.bind(this)
		});
		cc.eventManager.addListener(this.m_touchListener,this.chatBackground);    

	},
	
	//点击发送按钮时回调的函数，向服务器发送聊天内容
	menuCallbackSend:function(){
		console.log("start create room for player:" + playerId);
		CreateGameRoom(this,null);
	},

	destoty:function(){
		this._super();
		cc.eventManager.removeListener(this.m_touchListener);
	}
});