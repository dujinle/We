var PopUpAvatarInfoLayer=PopUp.extend({
	spriteBg:null,
	m_touchListener:null,
	inputNumBackground:null,
	spriteSelectBack:null,
	editText:null,
	CancelSprite:null,
	OKSprite:null,
	
	ctor:function(){
		this._super(cc.color(0,0,0,255),1256,800);
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(255*(0));
		var size=cc.director.getWinSize();
		console.log("avatar info layer......");
		this.editText = "";
		this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
		this.spriteSelectBack.setPosition(size.width/2,size.height/2);
		this.addChild(this.spriteSelectBack);
		this.spriteBg = new cc.Sprite(res.userInfoBG_png);
		this.spriteBg.setPosition(size.width/2,size.height/2);
		this.spriteSelectBack.addChild(this.spriteBg);
		
		//用户头像背景
		var touxiangBg = new cc.Sprite(res.userTouxBG_png);
		touxiangBg.setPosition(this.spriteBg.getContentSize().width/2 - touxiangBg.getContentSize().width,
			this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height / 2);
		this.spriteBg.addChild(touxiangBg);
		
		//昵称
		var nickNameLabel = new cc.LabelTTF("昵称：", "Arial", 20);
		nickNameLabel.setFontFillColor(cc.color.WHITE);
		nickNameLabel.setPosition(this.spriteBg.getContentSize().width/2 - 50,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 6 / 7);
		this.spriteBg.addChild(nickNameLabel);
		var nikeNameT = new cc.LabelTTF(nickName, "Arial", 20);
		nikeNameT.setFontFillColor(cc.color.WHITE);
		nikeNameT.setPosition(nickNameLabel.x + nickNameLabel.getContentSize().width / 2 +
				nikeNameT.getContentSize().width / 2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 6 /7);
		this.spriteBg.addChild(nikeNameT);
		
		//账号
		var acountLabel = new cc.LabelTTF("账号：", "Arial", 20);
		acountLabel.setFontFillColor(cc.color.WHITE);
		acountLabel.setPosition(this.spriteBg.getContentSize().width/2 - 50,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 4/7);
		this.spriteBg.addChild(acountLabel);
		var acountT = new cc.LabelTTF("12345678", "Arial", 20);
		acountT.setFontFillColor(cc.color.WHITE);
		acountT.setPosition(acountLabel.x + acountLabel.getContentSize().width/2 +
				acountT.getContentSize().width / 2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 4/7);
		this.spriteBg.addChild(acountT);

		//等级
		var levelLabel = new cc.LabelTTF("等级：", "Arial", 20);
		levelLabel.setFontFillColor(cc.color.WHITE);
		levelLabel.setPosition(this.spriteBg.getContentSize().width/2 - 50,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height* 2/7);
		this.spriteBg.addChild(levelLabel);
		console.log("player  level:" + level);
		var levelT = new cc.LabelTTF(level.toString(), "Arial", 20);
		levelT.setFontFillColor(cc.color.WHITE);
		levelT.setPosition(levelLabel.x + levelLabel.getContentSize().width /2 +
				levelT.getContentSize().width/2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 2/7);
		this.spriteBg.addChild(levelT);
		
		//房卡
		var FangkaSprite = new cc.Sprite(res.fangKa_png);
		FangkaSprite.setPosition(this.spriteBg.getContentSize().width/2 - 60,
				this.spriteBg.getContentSize().height/2);
		this.spriteBg.addChild(FangkaSprite);

		//用户房卡数
		var fangKaNum = new cc.LabelTTF(":   " + fangka, "Arial", 20);
		fangKaNum.setPosition(FangkaSprite.x + FangkaSprite.getContentSize().width/2 +
				fangKaNum.getContentSize().width/2,
				this.spriteBg.getContentSize().height/2);
		this.spriteBg.addChild(fangKaNum);
		
		//iD
		var idLabel = new cc.LabelTTF("用户ID：", "Arial", 20);
		idLabel.setFontFillColor(cc.color.WHITE);
		idLabel.setPosition(this.spriteBg.getContentSize().width/2 + touxiangBg.getContentSize().width,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 6/7);
		this.spriteBg.addChild(idLabel);
		var playerIdT = new cc.LabelTTF(playerId.toString(), "Arial", 20);
		playerIdT.setPosition(idLabel.x + idLabel.getContentSize().width/2 +
				playerIdT.getContentSize().width/2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 6/7);
		this.spriteBg.addChild(playerIdT);
		
		//性别
		var sexLabel = new cc.LabelTTF("  性别：", "Arial", 20);
		sexLabel.setFontFillColor(cc.color.WHITE);
		sexLabel.setPosition(this.spriteBg.getContentSize().width/2 + touxiangBg.getContentSize().width,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 4/7);
		this.spriteBg.addChild(sexLabel);
		var sexT = new cc.LabelTTF("男", "Arial", 20);
		if(gender == 1){
			sexT.setString("女");
		}
		sexT.setFontFillColor(cc.color.WHITE);
		sexT.setPosition(sexLabel.x + sexLabel.getContentSize().width/2 +
				sexT.getContentSize().width/2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 4/7);
		this.spriteBg.addChild(sexT);
		//vip
		var vipLabel = new cc.LabelTTF("   VIP：", "Arial", 20);
		vipLabel.setFontFillColor(cc.color.WHITE);
		vipLabel.setPosition(this.spriteBg.getContentSize().width/2 + touxiangBg.getContentSize().width,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 2/7);
		this.spriteBg.addChild(vipLabel);
		var vipT = new cc.LabelTTF("是", "Arial", 20);
		if(vip == 0){
			vipT.setString("否");
		}
		vipT.setFontFillColor(cc.color.WHITE);
		vipT.setPosition(vipLabel.x + vipLabel.getContentSize().width/2 +
				vipT.getContentSize().width/2 + 5,
				this.spriteBg.getContentSize().height/2 + touxiangBg.getContentSize().height * 2/7);
		this.spriteBg.addChild(vipT);
		
		//钻石
		var ZuanshiSprite = new cc.Sprite(res.zuanShi_png);
		ZuanshiSprite.setPosition(this.spriteBg.getContentSize().width/2 + touxiangBg.getContentSize().width,
				this.spriteBg.getContentSize().height/2);
		this.spriteBg.addChild(ZuanshiSprite);

		//钻石数
		var zuanShiNum = new cc.LabelTTF(" :   " + diamond.toString(), "Arial", 20);
		zuanShiNum.setFontFillColor(cc.color.WHITE);
		zuanShiNum.setPosition(ZuanshiSprite.x + ZuanshiSprite.getContentSize().width/2 +
				zuanShiNum.getContentSize().width/2,
				this.spriteBg.getContentSize().height/2);
		this.spriteBg.addChild(zuanShiNum);
		
		//个性签名editbox
		var SignLabel = new cc.LabelTTF("个性签名：", "Arial", 20);
		SignLabel.setFontFillColor(cc.color.WHITE);
		SignLabel.setPosition(touxiangBg.x - SignLabel.getContentSize().width/2,touxiangBg.y - touxiangBg.getContentSize().height);
		this.spriteBg.addChild(SignLabel);
		var normal9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
		var press9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
		var disabled9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
		editbox = new cc.EditBox(cc.size(300,40),normal9SpriteBg,press9SpriteBg,disabled9SpriteBg);
		editbox.setFontSize(30);
		if(signature == ""){
			editbox.setPlaceHolder("输入签名");
		}else{
			editbox.setPlaceHolder(signature);
		}
		editbox.setMaxLength(30);
		editbox.setFontColor(cc.color(255,255,255,100));
		editbox.setPosition(SignLabel.x + SignLabel.getContentSize().width/2 + normal9SpriteBg.getContentSize().width/2,
				SignLabel.y);
		editbox.setDelegate(this);
		this.spriteBg.addChild(editbox);
		
		var EditLabel = new cc.Sprite(res.editBg_png);
		EditLabel.setPosition(editbox.x + editbox.getContentSize().width /2 + EditLabel.getContentSize().width,
				editbox.y);
		this.spriteBg.addChild(EditLabel);
		
		//确定按钮 返回按钮
		this.OKSprite = new cc.Sprite(res.infoOk_png);
		this.OKSprite.setPosition(this.spriteBg.getContentSize().width /2 + this.OKSprite.getContentSize().width,
				editbox.y - this.OKSprite.getContentSize().height * 1.5);
		this.spriteBg.addChild(this.OKSprite);

		this.CancelSprite = new cc.Sprite(res.infoCancel_png);
		this.CancelSprite.setPosition(this.spriteBg.getContentSize().width /2 - this.CancelSprite.getContentSize().width,
				editbox.y - this.CancelSprite.getContentSize().height * 1.5);
		this.spriteBg.addChild(this.CancelSprite);

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
					console.log("touchPos" + touchPos.x + " " + touchPos.y);
					if(touchPos.x >= 500 && touchPos.x <= 570 && touchPos.y >= 220 && touchPos.y <= 250){
						//cancel
						this.removeFromParent();
					}else if(touchPos.x >= 750 && touchPos.x <= 820 && touchPos.y >= 220 && touchPos.y <= 250){
						//ok
						if(this.editText != "" && this.editText.length > 0 && this.editText != signature){
							Servers.getUpdateInfo(playerId,this.editText, gender, nickName,function(data){
								console.log("返回修改昵称数据");
								console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
							});
						}
						this.removeFromParent();
					}
				}
				else{
					console.log("go back from create room layer");
				}
			}.bind(this)
		});
		cc.eventManager.addListener(this.m_touchListener,this.spriteBg);    
	},
	editBoxEditingDidBegin: function (editBox) {
		cc.log("editBox  DidBegin !");
	},
	editBoxEditingDidEnd: function (editBox) {
		cc.log("editBox  DidEnd !");
	},
	editBoxTextChanged: function (editBox, text) {
		cc.log("editBox  TextChanged, text: " + text);
		this.editText = text;
	},
	editBoxReturn: function (editBox) {
		cc.log("editBox " + editBox.getTag() + " was returned !");
	},
	destoty:function(){
		this._super();
		cc.eventManager.removeListener(this.m_touchListener);
	}
});