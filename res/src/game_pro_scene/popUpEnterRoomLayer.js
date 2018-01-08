var PopUpEnterRoomLayer=PopUp.extend({
	m_touchListener:null,
	inputNumBackground:null,
	spriteSelectBack:null,
	numCount:null,
	itemArray:null,
	numArray:null,
	
	ctor:function(){
		this._super(cc.color(0,0,0,255),1256,800);
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
		var size=cc.director.getWinSize();
		console.log("start xuan ran enter room layer......");
		this.numArray = new Array();
		this.itemArray = new Array();
		this.numCount = 0;

		
		this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
		this.spriteSelectBack.setPosition(size.width/2,size.height/2);
		this.addChild(this.spriteSelectBack);
		this.spriteBg = new cc.Sprite(res.enterRoomBg_png);
		this.spriteBg.setPosition(size.width/2,size.height/2);
		this.spriteSelectBack.addChild(this.spriteBg);
		
		//输入数字背景
		this.inputNumBackground=new cc.Sprite(res.inputNumBg_png);
		var inwidth = this.inputNumBackground.getContentSize().width;
		var inheight = this.inputNumBackground.getContentSize().height;
		this.inputNumBackground.setPosition(size.width/2 - inwidth +25,size.height/2 - inheight + 100);
		this.spriteBg.addChild(this.inputNumBackground);

		for(i = 0;i < 12;i++){
			this.initNumItem(i);
		}

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
					console.log("go back from num keybord......");
					this.removeFromParent();
				}
			}.bind(this)
		});
		cc.eventManager.addListener(this.m_touchListener,this.spriteBg);

	},
	initNumItem:function(i){
		var size=cc.director.getWinSize();
		//数字按钮1
		console.log("num pos remove region:" + Math.floor(i%3) * 120 + "," + Math.floor(i/3) * 65 + " ind:" + i);
		var numMenuItem=new cc.MenuItemSprite(new cc.Sprite("res/enter_room/no_" + (i + 1) + ".png"),
				new cc.Sprite("res/enter_room/no_" + (i + 1) + ".png"),
				function(){
					var num = i;
					if(num == 9){
						this.menuCallbackNum('c');
					}else if(num == 10){
						this.menuCallbackNum(0);
					}else if(num == 11){
						this.menuCallbackNum('d');
					}else{
						this.menuCallbackNum(num + 1);
					}
				},
				this);
		var numMenu=new cc.Menu(numMenuItem);
		numMenu.x = size.width/2 - (455 - Math.floor(i%3) * 120);
		numMenu.y = size.height/2 - (25 + Math.floor(i/3) * 65);
		this.spriteBg.addChild(numMenu)
	},
	menuCallbackNum:function(num){
		console.log(num.toString());
		var size=cc.director.getWinSize();
		//如果点击的是取消按钮 清空 文本框数字
		if(num == 'c'){
			console.log("num:"+ this.numCount + " numarray:" + this.numArray.length + " itemarray:" + this.itemArray.length);
			if(this.numCount > 0){
				for(i = 0;i < this.itemArray.length;i++){
					var item = this.itemArray[i];
					item.removeFromParent();
				}
				this.numCount = 0;
				this.numArray.splice(0,this.numArray.length);
				this.itemArray.splice(0,this.itemArray.length);
			}
		}else if(num == 'd'){
			if(this.numCount > 0){
				var item = this.itemArray.pop();
				item.removeFromParent();
				this.numCount = this.numCount - 1;
				this.numArray.pop();
				console.log("num:"+ this.numCount + " numarray:" + this.numArray.length + " itemarray:" + this.itemArray.length);
			}
		}else{
	        //通过数字创建数字精灵
			if(this.numCount < 6){
				var lastNumMenu = new cc.LabelTTF(num.toString(), "Arial", 36,cc.size(40,60),cc.TEXT_ALIGNMENT_CENTER);
				lastNumMenu.x = size.width/2 - (480 - this.numCount * 60);
				lastNumMenu.y = size.height/2 + 30;
				lastNumMenu.setFontFillColor(cc.color.WHITE);
				this.spriteBg.addChild(lastNumMenu,2);
		        this.numCount = this.numCount + 1;
		        this.numArray.push(num);
		        this.itemArray.push(lastNumMenu);
			}
		}
		if(this.numCount == 6){
			console.log("roomnum :" + JSON.stringify(this.numArray));
			var roomNum =  this.numArray.join("");
			console.log("roomnum :" + roomNum);
			var param = {
				playerId: playerId,
				roomNum: roomNum,
				roomType: g_gameType
			};
			EnterGameRoom(this,param);
			this.numCount = 0;
			for(i = 0;i < this.itemArray.length;i++){
				var item = this.itemArray[i];
				item.removeFromParent();
			}
			this.numArray.splice(0,this.numArray.length);
			this.itemArray.splice(0,this.itemArray.length);
		}
	},
	
	destoty:function(){
		this._super();
		cc.eventManager.removeListener(this.m_touchListener);
	}
});