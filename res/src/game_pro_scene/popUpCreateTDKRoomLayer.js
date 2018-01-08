var PopUpCreateTDKRoomLayer=PopUp.extend({
	m_touchListener:null,
	createRoomBackground:null,
	spriteSelectBack:null,
	roomCardSelectItemSprite1:null,
	roomCardSelectItemSprite2:null,
	roomCardSelectItemSprite3:null,
	roomCardSelectItemSprite4:null,
	roomCardSelectItemSprite5:null,
	roomCardSelectItemSprite6:null,
	roomCardSelectItemSprite7:null,
	roomCardSelectItemSprite8:null,
	jushu:null,
	fangKa:null,
	quChuPai:null,
	
	ctor:function(){
		this._super(cc.color(0,0,0,255),1256,800);
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
		var size=cc.director.getWinSize();
		this.jushu = 20;
		this.fangKa = 1;
		this.quChuPai = 0;
		g_gameType = "TDK";
		this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
		this.spriteSelectBack.setPosition(size.width/2,size.height/2);
		this.addChild(this.spriteSelectBack);
		this.createRoomBackground=new cc.Sprite(res.tdkRoomBg_png);
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
		juShuLabel1.setPosition(this.createRoomBackground.getContentSize().width/4 + 60,
				this.createRoomBackground.getContentSize().height/4 * 3 + 5);
		juShuLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel1);
		//房卡1
		var roomCardItemSprite1 = new cc.Sprite(res.roomCard1_png);
		roomCardItemSprite1.setPosition(this.createRoomBackground.getContentSize().width/4 + 140,
				this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(roomCardItemSprite1);
		
		//选择按钮2
		this.roomCardSelectItemSprite2 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite2.setPosition(this.createRoomBackground.getContentSize().width/2 + 100,
			this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite2);
		//局数2
		var juShuLabel2 = new cc.LabelTTF("40局", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		juShuLabel2.setPosition(this.createRoomBackground.getContentSize().width/2 + 160,
				this.createRoomBackground.getContentSize().height/4 * 3 + 5);
		juShuLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel2);
		//房卡2
		var roomCardItemSprite2 = new cc.Sprite(res.roomCard2_png);
		roomCardItemSprite2.setPosition(this.createRoomBackground.getContentSize().width/2 + 240,
				this.createRoomBackground.getContentSize().height/4 * 3 + 10);
		this.createRoomBackground.addChild(roomCardItemSprite2);
		
		//选择按钮3
		this.roomCardSelectItemSprite3 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite3.setPosition(this.createRoomBackground.getContentSize().width/4,
			this.createRoomBackground.getContentSize().height/4 * 2.6 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite3);
		//局数3
		var juShuLabel3 = new cc.LabelTTF("60局", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		juShuLabel3.setPosition(this.createRoomBackground.getContentSize().width/4 + 60,
				this.createRoomBackground.getContentSize().height/4 * 2.6 + 5);
		juShuLabel3.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(juShuLabel3);
		//房卡3
		var roomCardItemSprite3 = new cc.Sprite(res.roomCard3_png);
		roomCardItemSprite3.setPosition(this.createRoomBackground.getContentSize().width/4 + 140,
				this.createRoomBackground.getContentSize().height/4 * 2.6 + 10);
		this.createRoomBackground.addChild(roomCardItemSprite3);
		
		//底注图标
		var diZhuSprite = new cc.Sprite(res.roomBaseChip_png);
		diZhuSprite.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 2.2 + 5);
		this.createRoomBackground.addChild(diZhuSprite);
		//底注信息
		var diZhuLabel = new cc.LabelTTF("筹码:100", "Arial", 28,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		diZhuLabel.setPosition(this.createRoomBackground.getContentSize().width/4 + 90,
				this.createRoomBackground.getContentSize().height/4 * 2.2);
		diZhuLabel.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(diZhuLabel);

		
		//扣牌选择1张或者2张
		//选择按钮4
		this.roomCardSelectItemSprite4 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite4.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 1.7+ 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite4);
		//扣牌label
		var kouPaiLabel1 = new cc.LabelTTF("1张", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		kouPaiLabel1.setPosition(this.createRoomBackground.getContentSize().width/4 + 60,
				this.createRoomBackground.getContentSize().height/4 * 1.7+ 5);
		kouPaiLabel1.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(kouPaiLabel1);

		//选择按钮5
		this.roomCardSelectItemSprite5 = new cc.Sprite(res.roomSelected_png);
		this.roomCardSelectItemSprite5.setPosition(this.createRoomBackground.getContentSize().width/2,
				this.createRoomBackground.getContentSize().height/4 * 1.7+ 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite5);
		//扣牌label
		var kouPaiLabel2 = new cc.LabelTTF("2张", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		kouPaiLabel2.setPosition(this.createRoomBackground.getContentSize().width/2 + 60,
				this.createRoomBackground.getContentSize().height/4 * 1.7 + 5);
		kouPaiLabel2.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(kouPaiLabel2);
		
		
		//去除选择以下的牌
		//选择按钮6
		this.roomCardSelectItemSprite6 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite6.setPosition(this.createRoomBackground.getContentSize().width/4,
				this.createRoomBackground.getContentSize().height/4 * 1.3+ 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite6);
		//去牌图标
		var quPaiSprite1 = new cc.Sprite(res.room_hua_png);
		quPaiSprite1.setPosition(this.createRoomBackground.getContentSize().width/4 + 50,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 10);
		this.createRoomBackground.addChild(quPaiSprite1);
		//去除牌label
		var quChuLabel3 = new cc.LabelTTF("6以下", "Arial", 26,cc.size(200,40),cc.TEXT_ALIGNMENT_CENTER);
		quChuLabel3.setPosition(this.createRoomBackground.getContentSize().width/4 + 100,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 5);
		quChuLabel3.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(quChuLabel3);
		//选择按钮7
		this.roomCardSelectItemSprite7 = new cc.Sprite(res.roomSelect_png);
		this.roomCardSelectItemSprite7.setPosition(this.createRoomBackground.getContentSize().width/2,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite7);
		//去牌图标
		var quPaiSprite2 = new cc.Sprite(res.room_hua_png);
		quPaiSprite2.setPosition(this.createRoomBackground.getContentSize().width/2 + 50,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 10);
		this.createRoomBackground.addChild(quPaiSprite2);
		//去除牌label
		var quPaiLabel4 = new cc.LabelTTF("7以下", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		quPaiLabel4.setPosition(this.createRoomBackground.getContentSize().width/2 + 100,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 5);
		quPaiLabel4.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(quPaiLabel4);
		
		//选择按钮8
		this.roomCardSelectItemSprite8 = new cc.Sprite(res.roomSelected_png);
		this.roomCardSelectItemSprite8.setPosition(this.createRoomBackground.getContentSize().width/2 + 180,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 10);
		this.createRoomBackground.addChild(this.roomCardSelectItemSprite8);
		//去牌图标
		var quPaiSprite3 = new cc.Sprite(res.room_hua_png);
		quPaiSprite3.setPosition(this.createRoomBackground.getContentSize().width/2 + 225,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 10);
		this.createRoomBackground.addChild(quPaiSprite3);
		//去除牌label
		var quPaiLabel5 = new cc.LabelTTF("不去除", "Arial", 26,cc.size(100,40),cc.TEXT_ALIGNMENT_CENTER);
		quPaiLabel5.setPosition(this.createRoomBackground.getContentSize().width/2 + 275,
				this.createRoomBackground.getContentSize().height/4 * 1.3 + 5);
		quPaiLabel5.setFontFillColor(cc.color.WHITE);
		this.createRoomBackground.addChild(quPaiLabel5);
		
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
					}else if(touchPos.x>750 && touchPos.x<800 && touchPos.y>510 && touchPos.y<540){
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
					if(touchPos.x>480 && touchPos.x<520 && touchPos.y> 320 && touchPos.y<370){
						g_fapaiNum = 2;
						this.roomCardSelectItemSprite4.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite5.setTexture(res.roomSelect_png);
					}else if(touchPos.x>620 && touchPos.x<700 && touchPos.y>320 && touchPos.y<370){
						g_fapaiNum = 3;
						this.roomCardSelectItemSprite5.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite4.setTexture(res.roomSelect_png);
					}
					if(touchPos.x>480 && touchPos.x<520 && touchPos.y>260 && touchPos.y<300){
						this.quChuPai = 6;
						this.roomCardSelectItemSprite6.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite7.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite8.setTexture(res.roomSelect_png);
					}else if(touchPos.x>620 && touchPos.x<700 && touchPos.y>260 && touchPos.y<300){
						this.quChuPai = 7;
						this.roomCardSelectItemSprite7.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite6.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite8.setTexture(res.roomSelect_png);
					}else if(touchPos.x>750 && touchPos.x<880 && touchPos.y>260 && touchPos.y<300){
						this.quChuPai = 0;
						this.roomCardSelectItemSprite8.setTexture(res.roomSelected_png);
						this.roomCardSelectItemSprite6.setTexture(res.roomSelect_png);
						this.roomCardSelectItemSprite7.setTexture(res.roomSelect_png);
					}
				}
				else{
					this.removeFromParent();
					console.log("go back from create room layer");
				}
			}.bind(this)
		});
		cc.eventManager.addListener(this.m_touchListener,this.createRoomBackground);    

	},
	menuCallbackCreatRoom:function(){
		var param = {
			roomType:"TDK",
			playerId:playerId,
			quChuPai:this.quChuPai,
			juShu:this.jushu,
			faPaiNum:g_fapaiNum,
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