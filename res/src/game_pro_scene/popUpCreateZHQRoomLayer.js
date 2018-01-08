var PopUpCreateZHQRoomLayer=PopUp.extend({
	m_touchListener:null,
	createRoomBackground:null,
	spriteSelectBack:null,
	roomCardSelectItemSprite1:null,
	roomCardSelectItemSprite2:null,
	roomCardSelectItemSprite3:null,
	renShuSelectItemSprite4:null,
	renShuSelectItemSprite5:null,
	tianXuanSelectItemSprite:null,
	tianXuanSelectItemSprite1:null,
	jushu:null,
	maxChip:null,
	renShu:null,
	fangKa:null,
	tianXuan:null,
	
	ctor:function(){
		this._super(cc.color(0,0,0,255),1256,800);
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
		var size=cc.director.getWinSize();
		this.jushu = 20;
		this.fangKa = 1;
		this.maxChip = 300;
		this.renShu = 2;
		this.tianXuan = 0;
		this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
		this.spriteSelectBack.setPosition(size.width/2,size.height/2);
		this.addChild(this.spriteSelectBack);
		this.createRoomBackground=new cc.Sprite(res.zhqRoomBg_png);
		this.createRoomBackground.setPosition(size.width/2,size.height/2);
		this.spriteSelectBack.addChild(this.createRoomBackground);
		
		//局数选项排列
		var backSize = this.spriteSelectBack.getContentSize();
	
		//选择按钮1
		this.roomCardSelectItemSprite1 = new cc.Sprite(res.roomSelected_png);
		console.log(backSize.width + "  " + backSize.height);
		console.log(this.createRoomBackground.getContentSize().width + "  " + this.createRoomBackground.getContentSize().height);
		this.roomCardSelectItemSprite1.setPosition(this.createRoomBackground.getContentSize().width/4,
			this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite1);
		//局数1
		var juShuLabel1 = new cc.LabelTTF("20局", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		juShuLabel1.setPosition(this.createRoomBackground.getContentSize().width/4 + 70,
				this.createRoomBackground.getContentSize().height/4 * 3 + 5);
		juShuLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel1);
		//房卡1
		var roomCardItemSprite1 = new cc.Sprite(res.roomCard1_png);
		roomCardItemSprite1.setPosition(this.createRoomBackground.getContentSize().width/4 + 150,
				this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(roomCardItemSprite1);
		
		//选择按钮2
		this.roomCardSelectItemSprite2 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite2.setPosition(this.createRoomBackground.getContentSize().width/2 + 100,
			this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite2);
		//局数2
		var juShuLabel2 = new cc.LabelTTF("40局", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		juShuLabel2.setPosition(this.createRoomBackground.getContentSize().width/2 + 170,
				this.createRoomBackground.getContentSize().height/4 * 3 + 5);
		juShuLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel2);
		//房卡2
		var roomCardItemSprite2 = new cc.Sprite(res.roomCard2_png);
		roomCardItemSprite2.setPosition(this.createRoomBackground.getContentSize().width/2 + 250,
				this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(roomCardItemSprite2);
		
		//选择按钮3
		this.roomCardSelectItemSprite3 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite3.setPosition(this.createRoomBackground.getContentSize().width/4,
			this.createRoomBackground.getContentSize().height/4 * 2.5 + 15);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite3);
		//局数3
		var juShuLabel3 = new cc.LabelTTF("60局", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		juShuLabel3.setPosition(this.createRoomBackground.getContentSize().width/4 + 70,
				this.createRoomBackground.getContentSize().height/4 * 2.5 + 10);
		juShuLabel3.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel3);
		//房卡3
		var roomCardItemSprite3 = new cc.Sprite(res.roomCard3_png);
		roomCardItemSprite3.setPosition(this.createRoomBackground.getContentSize().width/4 + 150,
				this.createRoomBackground.getContentSize().height/4 * 2.5 + 15);
		this.createRoomBackground.addChild(roomCardItemSprite3);
		
		//参与人数
		//选择按钮4
		this.renShuSelectItemSprite4 = new cc.Sprite(res.roomSelected_png);
		this.renShuSelectItemSprite4.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 2.1 + 15);
		this.createRoomBackground.addChild(this.renShuSelectItemSprite4);
		//参与人数label
		var renShuLabel1 = new cc.LabelTTF("2个", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		renShuLabel1.setPosition(this.createRoomBackground.getContentSize().width/4 + 70,
				this.createRoomBackground.getContentSize().height/4 * 2.1 + 10);
		renShuLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(renShuLabel1);
		
		//选择按钮5
		this.renShuSelectItemSprite5 = new cc.Sprite(res.roomSelect_png);
		this.renShuSelectItemSprite5.setPosition(this.createRoomBackground.getContentSize().width/4 + 150,
				this.createRoomBackground.getContentSize().height/4 * 2.1 + 15);
		this.createRoomBackground.addChild(this.renShuSelectItemSprite5);
		//参与人数label
		var renShuLabel2 = new cc.LabelTTF("4个", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		renShuLabel2.setPosition(this.createRoomBackground.getContentSize().width/4 + 210,
				this.createRoomBackground.getContentSize().height/4 * 2.1 + 10);
		renShuLabel2.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(renShuLabel2);
		
		//底注图标
		var diZhuSprite = new cc.Sprite(res.roomBaseChip_png);
		diZhuSprite.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 1.6 + 15);
		this.createRoomBackground.addChild(diZhuSprite);
		//底注信息
		var diZhuLabel = new cc.LabelTTF("筹码:100", "Arial", 28,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		diZhuLabel.setPosition(this.createRoomBackground.getContentSize().width/4 + 100,
				this.createRoomBackground.getContentSize().height/4 * 1.6 + 10);
		diZhuLabel.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(diZhuLabel);

		
		
		//是否可以天宣
		//选择按钮6
		this.tianXuanSelectItemSprite = new cc.Sprite(res.roomSelected_png);
		this.tianXuanSelectItemSprite.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 1.2+ 15);
		this.createRoomBackground.addChild(this.tianXuanSelectItemSprite);
		//限注label
		var tianXuanLabel = new cc.LabelTTF("是", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		tianXuanLabel.setPosition(this.createRoomBackground.getContentSize().width/4 + 70,
				this.createRoomBackground.getContentSize().height/4 * 1.2+ 10);
		tianXuanLabel.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(tianXuanLabel);

		
		//选择按钮7
		this.tianXuanSelectItemSprite1 = new cc.Sprite(res.roomSelect_png);
		this.tianXuanSelectItemSprite1.setPosition(this.createRoomBackground.getContentSize().width/4 + 150,
				this.createRoomBackground.getContentSize().height/4 * 1.2+ 15);
		this.createRoomBackground.addChild(this.tianXuanSelectItemSprite1);
		//限注label
		var tianXuanLabel1 = new cc.LabelTTF("否", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		tianXuanLabel1.setPosition(this.createRoomBackground.getContentSize().width/4 + 210,
				this.createRoomBackground.getContentSize().height/4 * 1.2 + 10);
		tianXuanLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(tianXuanLabel1);
		
		//创建房间按钮
		var creatRoomMenuItemSprite1 = new cc.Sprite(res.creatRoomButton_png);
		var creatRoomMenuItemSprite2 = new cc.Sprite(res.creatRoomButton_png);
		var creatRoomMenuItemSprite3 = new cc.Sprite(res.creatRoomButton_png);
		var creatRoomMenuItem=new cc.MenuItemSprite(creatRoomMenuItemSprite1,creatRoomMenuItemSprite2,creatRoomMenuItemSprite3,
				this.menuCallbackCreatRoom,this);
		var creatRoomMenu=new cc.Menu(creatRoomMenuItem);
		creatRoomMenu.setPosition(this.createRoomBackground.getContentSize().width/2,
				this.createRoomBackground.getContentSize().height/5);
		this.createRoomBackground.addChild(creatRoomMenu);		
		
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
					var touchPos = touch.getLocation();
					console.log("touch the region[" + touchPos.x + "," + touchPos.y + "]......");
					if(touchPos.x>480 && touchPos.x<520 && touchPos.y> 510 && touchPos.y<560){
						this.jushu = 20;
						this.roomCardSelectItemSprite1.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite2.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite3.setTexture(res.roomSelect_png);
					}else if(touchPos.x>750 && touchPos.x<800 && touchPos.y>510 && touchPos.y<560){
						this.roomCardSelectItemSprite2.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite1.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite3.setTexture(res.roomSelect_png);
						this.fangKa = 2;
						this.jushu = 40;
					}else if(touchPos.x>480 && touchPos.x<520 && touchPos.y>440 && touchPos.y<500){
						this.roomCardSelectItemSprite3.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite2.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite1.setTexture(res.roomSelect_png);
						this.fangKa = 3;
						this.jushu = 60;
					}
					if(touchPos.x>480 && touchPos.x<520 && touchPos.y> 400 && touchPos.y<420){
						this.renShu = 2;
						this.renShuSelectItemSprite4.setTexture(res.roomSelected_png);
						this.renShuSelectItemSprite5.setTexture(res.roomSelect_png);
					}else if(touchPos.x>620 && touchPos.x<680 && touchPos.y>400 && touchPos.y<420){
						this.renShu = 4;
						this.renShuSelectItemSprite5.setTexture(res.roomSelected_png);
						this.renShuSelectItemSprite4.setTexture(res.roomSelect_png);
					}
					if(touchPos.x>480 && touchPos.x<520 && touchPos.y>260 && touchPos.y<290){
						this.tianXuan = 1;
						this.tianXuanSelectItemSprite.setTexture(res.roomSelected_png);
						this.tianXuanSelectItemSprite1.setTexture(res.roomSelect_png);
					}else if(touchPos.x>620 && touchPos.x<680 && touchPos.y>260 && touchPos.y<290){
						this.tianXuan = 0;
						this.tianXuanSelectItemSprite1.setTexture(res.roomSelected_png);
						this.tianXuanSelectItemSprite.setTexture(res.roomSelect_png);
					}
				}
				else{
					this.removeFromParent();
					console.log("go back from create room layer");
				}
				console.log("renshu:" + this.renShu + " tianxuan:" + this.tianXuan + " juShu:" + this.jushu);
			}.bind(this)
		});
		cc.eventManager.addListener(this.m_touchListener,this.createRoomBackground);    

	},
	menuCallbackCreatRoom:function(){
		var param = {
			playerId:playerId,
			roomType:"ZHQ",
			maxChip:this.maxChip,
			renShu:this.renShu,
			tianXuan:this.tianxuan,
			juShu:this.jushu,
			fangKa:this.fangKa
		};
		CreateGameRoom(this,param);
		console.log("press create room button.....");
	},

	destoty:function(){
		this._super();
		cc.eventManager.removeListener(this.m_touchListener);
	}
});