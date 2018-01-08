/**
 * Created by MQN on 2016/3/31.
 */

//玩家基本信息层，用于提高代码复用率
var userBaseInfoLayer = cc.Layer.extend({
    face:null,
    name:null,
    user_name:null,

    level:null,

    vip:null,

    gender:null,

    lobbyFangka:null,
    fangKaNum:null,
    coin_number:null,
    lobbyFangka2:null,
    fangKaAddMu:null,

    lobbyDiamond:null,
    diamondNum:null,
    diamond_number:null,
    lobbyDiamond2:null,
    diamondAddMu:null,

    setting:null,
    ctor:function(){

        this._super();
        this.scheduleUpdate();
       
        var size = cc.winSize;

        //用户头像框
        this.face = new cc.Sprite(res.Face_png);
        this.face.x = 100;
        this.face.y = size.height-100;
        this.addChild(this.face, 2);


        //用户昵称
        this.name = new cc.LabelTTF(nickName, "黑体", 30);
        this.name.x = this.face.x + 100;
        this.name.y = this.face.y + 40;
        this.name.setAnchorPoint(cc.p(0,0.5));
        this.name.setFontFillColor(cc.color.YELLOW);
        this.addChild(this.name, 1);

        //用户性别
        if(gender==2){
            this.gender = new cc.Sprite(res.Gender0_png);
        }else{
            this.gender = new cc.Sprite(res.Gender1_png);
        }
        this.gender.x = this.face.x + 50;
        this.gender.y = this.face.y - 30;
        if(avatarInfoTag == 0){
            this.addChild(this.gender, 2);
        }
/*
        //用户等级
        this.level = new cc.LabelTTF("level  " + level, "Arial", 30);
        this.level.x = this.name.x;
        this.level.y = this.name.y - 30;
        this.level.setAnchorPoint(cc.p(0, 0.5));
        this.level.setFontFillColor(cc.color.YELLOW);
        this.addChild(this.level, 1);

        //用户vip
        switch(vip){
            case 1: this.vip = new cc.Sprite(res.Vip1_png);
                break;
            case 2: this.vip = new cc.Sprite(res.Vip2_png);
                break;
            case 3: this.vip = new cc.Sprite(res.Vip3_png);
                break;
            case 4: this.vip = new cc.Sprite(res.Vip4_png);
                break;
            case 5: this.vip = new cc.Sprite(res.Vip5_png);
                break;
            case 6: this.vip = new cc.Sprite(res.Vip6_png);
                break;
            case 7: this.vip = new cc.Sprite(res.Vip7_png);
                break;
            case 8: this.vip = new cc.Sprite(res.Vip8_png);
                break;
            default: this.vip = new cc.LabelTTF("vip "+vip, "Arial", 30);
                this.vip.setFontFillColor(cc.color.YELLOW);
                break;
        }

        //this.vip = new cc.Sprite("res/lobbyInfo/vip"+vip+".png");
        this.vip.x = this.name.x;
        this.vip.y = this.name.y - 70;
        this.vip.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this.vip, 1);
*/
        //房卡图案
        this.lobbyFangka = new cc.Sprite(res.fangKa_png);
        this.lobbyFangka.x = this.face.x + 330;
        this.lobbyFangka.y = this.face.y + 40;
        this.addChild(this.lobbyFangka, 1);

        //用户房卡数
        this.fangKaNum = new cc.LabelTTF(fangka, "Arial", 30);
        this.fangKaNum.x = this.lobbyFangka.x + 100;
        this.fangKaNum.y = this.lobbyFangka.y;
        this.addChild(this.fangKaNum, 2);

        //房卡数底框
        this.lobbyFangka2 = new cc.Sprite(res.lobbyFangka2_png);
        this.lobbyFangka2.x = this.lobbyFangka.x + 100;
        this.lobbyFangka2.y = this.lobbyFangka.y;
        this.addChild(this.lobbyFangka2, 1);

        //房卡数充值按钮
        var fangKaAddImage = new cc.MenuItemImage(
            res.Lobby_add1_png,
            res.Lobby_add2_png,
            this.addFangKa, this);
        this.fangKaAddMu = new cc.Menu(fangKaAddImage);
        this.fangKaAddMu.x = this.lobbyFangka.x + 200;
        this.fangKaAddMu.y = this.lobbyFangka.y;
        this.addChild(this.fangKaAddMu, 2);

        //钻石图案
        this.lobbyDiamond = new cc.Sprite(res.LobbyDiamond_png);
        this.lobbyDiamond.x = this.fangKaNum.x + 250;
        this.lobbyDiamond.y = this.fangKaNum.y;
        this.addChild(this.lobbyDiamond, 2);

        //用户钻石数
        this.diamondNum = new cc.LabelTTF(diamond, "Arial", 30);
        this.diamondNum.x = this.lobbyDiamond.x + 100;
        this.diamondNum.y = this.lobbyDiamond.y;
        this.addChild(this.diamondNum, 2);

        //钻石数底框
        this.lobbyDiamond2 = new cc.Sprite(res.lobbyFangka2_png);
        this.lobbyDiamond2.x = this.lobbyDiamond.x + 100;
        this.lobbyDiamond2.y = this.lobbyDiamond.y;
        this.addChild(this.lobbyDiamond2, 1);

        //钻石充值按钮
        var diamondAddImage = new cc.MenuItemImage(
            res.Lobby_add1_png,
            res.Lobby_add2_png,
            this.addDiamond, this
        );
        this.diamondAddMu = new cc.Menu(diamondAddImage);
        this.diamondAddMu.x = this.lobbyDiamond.x + 200;
        this.diamondAddMu.y = this.lobbyDiamond.y;
        this.addChild(this.diamondAddMu, 2);
    },

    update:function(dt){
        this.fangKaNum.setString(coin);
        this.diamondNum.setString(diamond);
    },

    addFangKa:function(){
    	cc.director.runScene(new cc.TransitionFade(0.5, new StoreScene()));
    	/*
        console.log("addFangKa");
        this.dTcLayer = new diaToCoinLayer();
        this.dTcLayer.x = 0;
        this.dTcLayer.y = 0;
        this.addChild(this.dTcLayer, 3);

        //关闭按钮
        var closeItem = new cc.MenuItemImage(
            res.Yes2_png,
            res.Yes2_png,
            function () {
                this.removeChild(this.dTcLayer);
                this.removeChild(closeMenu);
            }, this);
        if(avatarInfoTag == 0){
            closeItem.attr({
                x: 730,
                y: 350
            });
        }else if(avatarInfoTag == 1){
            closeItem.attr({
                x: 680,
                y: 510
            });
        }
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x = 0;
        closeMenu.y = 0;
        this.addChild(closeMenu, 4);
        */
    },

    addDiamond:function(){
    	cc.director.runScene(new cc.TransitionFade(0.5, new StoreScene()));
    	/*
        console.log("addDiamond");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsScoreCount", "(I)V",1);
        */

    }
});
