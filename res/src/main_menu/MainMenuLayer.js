/**
 * Created by MQN on 2016/3/31.
 */

var avatarInfoTag = 0;
var qiandaoKey = 0;

//大厅信息层
var MainMenuLayer = cc.Layer.extend({

    storeMu:null,
    storeMenuItem:null,
    avatarLayer:null,
    infoLayer:null,
    feedbackMenuItem:null,

    ctor:function(){
        this._super();
        var size = cc.winSize;
        avatarInfoTag = 0;
        //用户头像
        this.avatar = new cc.MenuItemImage(
        		res.Avatar_png,
        		res.Avatar_png,
        		this.avatarCallback, this);
        this.avatarMu = new cc.Menu(this.avatar);
        this.avatarMu.x = 100;
        this.avatarMu.y = size.height - 100;
        this.addChild(this.avatarMu, 1);

        //玩家基本信息层
        this.infoLayer = new userBaseInfoLayer();
        this.addChild(this.infoLayer, 2);
        
        //商店按钮
        this.storeMenuItem = new cc.MenuItemImage(
            res.Store_png,
            res.Store_png,
            this.storeCallback, this);
        this.storeMu = new cc.Menu(this.storeMenuItem);
        this.storeMu.x = size.width/2 - 300;
        this.storeMu.y = size.height/2 - 320;
        this.addChild(this.storeMu, 1);

        //反馈按钮
        this.feedbackMenuItem = new ccui.Button();
        this.feedbackMenuItem.loadTextures(
            res.Feedback_png,
            res.Feedback_png,
            res.Feedback_png
        );
        this.feedbackMenuItem.setEnabled(true);
        this.feedbackMenuItem.x = this.storeMu.x + 150;
        this.feedbackMenuItem.y = this.storeMu.y;
        this.addChild(this.feedbackMenuItem, 1);
        this.feedbackMenuItem.addTouchEventListener(
            this.feedbackCallback, this
        );
    },
    //点击头像后出现玩家详细信息
    avatarCallback:function(){
    	console.log("start into avatar info layer......");
    	this.avatarLayer = new PopUpAvatarInfoLayer();
    	this.addChild(this.avatarLayer, 3);
    },
    //商店回调函数，跳转至商城页面
    storeCallback:function(){
        cc.director.runScene(new cc.TransitionFade(0.5, new StoreScene()));
    },

    //反馈按钮回调函数，跳转至反馈界面
    feedbackCallback:function(){
        //cc.director.runScene(new FeedbackScene());
    }

});
