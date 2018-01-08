/**
 * Created by MQN on 2016/3/31.
 */

//玩家信息层，用于显示玩家详细信息，其中调用了玩家基本信息层
var avatarInfoLayer = cc.Layer.extend({
    avatarBg:null,
    signature:null,
    pen:null,
    sigBg:null,

    genderBox1:null,
    genderBox0:null,
    genderSelect:null,

    forbidCard:null,
    exchangeCard:null,
    doubleCard:null,
    forbidCardNum:null,
    exchangeCardNum:null,
    doubleCardNum:null,

    gift1:null,
    gift1Num:null,
    gift2:null,
    gift2Num:null,
    gift3:null,
    gift3Num:null,
    gift4:null,
    gift4Num:null,
    gift5:null,
    gift5Num:null,

    ctor:function(){
        this._super();
        this.scheduleUpdate();

        avatarInfoTag = 1;
        var size = cc.winSize;

        //背景
        this.avatarBg = new cc.Sprite(res.AvatarBg_png);
        this.avatarBg.x = size.width/2;
        this.avatarBg.y = size.height/2;
        this.addChild(this.avatarBg, 5);

        //添加用户基本信息层
        this.avatarUserBaseInfoLayer = new userBaseInfoLayer();
        this.avatarUserBaseInfoLayer.x = 50;
        this.avatarUserBaseInfoLayer.y = -150;
        this.avatarBg.addChild(this.avatarUserBaseInfoLayer, 3);

        //编辑昵称
        var nameBg = new cc.MenuItemImage(
            res.LobbyCoin2_png,
            res.LobbyCoin2_png,
            this.editName, this
        );
        var editNameMenu = new cc.Menu(nameBg);
        editNameMenu.x = 330;
        editNameMenu.y = 510;
        this.avatarBg.addChild(editNameMenu, 1);

        var pen0 = new cc.Sprite(res.Pen_png);
        pen0.x = 230;
        pen0.y = editNameMenu.y;
        this.avatarBg.addChild(pen0, 2);

        //选择性别
        var gender0 = new cc.Sprite(res.Gender0_png);
        gender0.x = 500;
        gender0.y = 450;
        this.avatarBg.addChild(gender0, 1);

        this.genderBox0 = new cc.Sprite(res.GenderBox_png);
        this.genderBox0.x = gender0.x + 50;
        this.genderBox0.y = gender0.y;
        this.avatarBg.addChild(this.genderBox0, 1);

        var gender1 = new cc.Sprite(res.Gender1_png);
        gender1.x = gender0.x + 150;
        gender1.y = gender0.y;
        this.avatarBg.addChild(gender1, 1);

        this.genderBox1 = new cc.Sprite(res.GenderBox_png);
        this.genderBox1.x = gender0.x + 200;
        this.genderBox1.y = gender0.y;
        this.avatarBg.addChild(this.genderBox1, 1);

        this.genderSelect = new cc.Sprite(res.GenderSelect_png);
        if(gender == 2){
            this.genderSelect.x = this.genderBox0.x;
        }else if(gender == 1){
            this.genderSelect.x = this.genderBox1.x;
        }
        this.genderSelect.y = this.genderBox0.y;
        this.avatarBg.addChild(this.genderSelect, 2);

        //编辑签名
        this.sigBg = new cc.MenuItemImage(
            res.SigBg_png,
            res.SigBg_png,
            this.editSig, this
        );
        var editSigMenu = new cc.Menu(this.sigBg);
        editSigMenu.x = size.width/2 + 40;
        editSigMenu.y = 350;
        this.avatarBg.addChild(editSigMenu, 1);

        this.pen = new cc.Sprite(res.Pen_png);
        this.pen.x = 130;
        this.pen.y = editSigMenu.y;
        this.avatarBg.addChild(this.pen, 2);

        this.signature = new cc.LabelTTF(signature, "黑体", 30);
        this.signature.setFontFillColor(cc.color.YELLOW);
        this.signature.x = this.pen.x + 30;
        this.signature.y = editSigMenu.y;
        this.signature.setAnchorPoint(cc.p(0, 0.5));
        this.avatarBg.addChild(this.signature, 2);

    },

    update:function(dt){
        this.signature.setString(signature);
        this.avatarUserBaseInfoLayer.name.setString(nickName);

        if(gender == 2){
            this.genderSelect.x = this.genderBox0.x;
        }else if(gender == 1){
            this.genderSelect.x = this.genderBox1.x;
        }
    },

    //编辑签名回调函数
    editSig:function(){
        console.log("start edit Signature......");

        //添加编辑个性签名层
        this.editSigLayer = new editSigLayer();
        this.avatarBg.addChild(this.editSigLayer, 4);

        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {
                signature = this.editSigLayer.editbox.getString();
                console.log("start update Signature:" + signature);

                //更新用户签名，性别，昵称   不更新的传原有数据
                Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                    console.log("返回修改个性签名数据");
                    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                });

                this.avatarBg.removeChild(this.editSigLayer);
                this.avatarBg.removeChild(yesMenu);
            }, this);
        yesItem.attr({
            x: 640,
            y: 200
        });

        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.avatarBg.addChild(yesMenu,5);
    },

    //编辑昵称回调函数
    editName:function(){
        console.log("start edit nickname ......");

        //添加编辑玩家昵称层
        this.editNameLayer = new editNameLayer();
        this.avatarBg.addChild(this.editNameLayer, 4);

        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {
                nickName = this.editNameLayer.editbox.getString();
                console.log("start update the nickname:" + nickName);
                //更新用户签名，性别，昵称   不更新的传原有数据
                Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                    console.log("返回修改昵称数据");
                    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                });

                this.avatarBg.removeChild(this.editNameLayer);
                this.avatarBg.removeChild(yesMenu);
            }, this);

        yesItem.attr({
            x: 640,
            y: 200
        });

        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.avatarBg.addChild(yesMenu,5);
    }
});
