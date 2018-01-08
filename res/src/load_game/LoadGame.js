/**
 */

var LOADINGBARPRONUM = 1;

var LOADINGBAR_TAG = 99912;

var LOADINGBARPROALLNUM = 0;

var finishTag = 0;

var GameFrameCache = function () {
    this.flag = 0;
};

//异步加载资源
GameFrameCache.setAllCache = function (obj, objcallback) {

    //异步加载所有游戏资源
	var texCache = cc.textureCache;
	for (var key = 0 in res) {
		LOADINGBARPROALLNUM = LOADINGBARPROALLNUM + 1;
	}
	console.log("start load res resource......" + LOADINGBARPROALLNUM);
    //遍历所有的资源
    for (var key = 0 in res) {
        //开始装载
    	texCache.addImageAsync(res[key], objcallback, obj);
    }
};

//资源加载层
var LoadGameLayer = cc.Layer.extend({
    perNum: null,
    percent: null,

    ctor: function () {

        this._super();
        //初始化进度条
        this.initLoadingBar(this);

        //实时更新百分比
        this.scheduleUpdate();

        //进行异步加载，绑定更新进度条的方法setLoadingBar
        GameFrameCache.setAllCache(this, this.setLoadingBar);

        //蓝色背景
        //var loadBg = new cc.Sprite(res.LoadBg_png);
        //loadBg.x = 640;
        //loadBg.y = 360;
        //this.addChild(loadBg, 1);

        //美女头像
        var loadGirl = new cc.Sprite(res.LoadGirl_png);
        loadGirl.x = 640;
        loadGirl.y = 360;
        this.addChild(loadGirl, 1);

        //光效
        //var loadLight = new cc.Sprite(res.LoadLight_png);
        //loadLight.x = 640;
        //loadLight.y = 360;
        //this.addChild(loadLight, 2);

        //显示资源加载百分比
        this.percent   = new cc.LabelTTF(this.perNum + " %", "Arial", 30);
        this.percent.x = 640;
        this.percent.y = 100;
        this.addChild(this.percent, 2);
    },

    update: function (dt) {
    	this.percent.setString(this.perNum + " %");
    },

    //加载用户信息
    loadUserInfo: function () {
        var self = this;
        console.log("start loadUserInfo......");
        var userId   = 0;//Storage.getUserId();
        var password = 0;//Storage.getPassword();

        var imei     = Storage.getImei();
        //only for test
        if (imei == 0) {
            imei = "imei7";
        }
        console.log("userId:"+ userId + " password:" + password + " imei:" + imei);
        if (!!userId && !!password) {
        	console.log("get getLogin function......");
            Servers.getLogin(userId, password, function (data) {
                console.log("get login info succ:" + JSON.stringify(data));

                var token = data.token;
                Servers.getEntry(token,function(data){
                    self.saveUserInfo(data);
                });
            });
        } else if (!!imei) {
        	console.log("get getRegister function......");
        	Servers.getRegister(imei, function (data) {
            	console.log("get getRegister info succ" + JSON.stringify(data));
                var token = data.token;
                Servers.getEntry(token,function(data){
                    self.saveUserInfo(data);
                });
            });
        } else {
            console.log("load user infolmation failed !!");
        }
    },

    //保存用户信息
    saveUserInfo:function(data){
        console.log("start saveUserInfo......");

        playerId = data.initdata.player.playerId;
        nickName = data.initdata.player.nickName;
        userId = data.initdata.player.userId;
        password = data.initdata.player.password;
        userName = data.initdata.player.userName;
        gender = data.initdata.player.gender;
        signature = data.initdata.player.signature;
        level = data.initdata.player.level;
        vip = data.initdata.player.vip;
        coin = data.initdata.player.gold;
		fangka = data.initdata.player.fangka;
        diamond = data.initdata.player.diamond;
        forbidCard = JSON.stringify(data.initdata.player.jinBiKa);

        continueLoginDaysNew = data.initdata.player.continueLoginDays;
        giftCandy = data.initdata.player.gift01;
        giftRing = data.initdata.player.gift02;
        giftCar = data.initdata.player.gift03;
        giftHouse = data.initdata.player.gift04;
        giftPlane = data.initdata.player.gift05;
        recharge = data.initdata.player.recharge;
        playTimes =  data.initdata.player.playTimes;
        winTimes =  data.initdata.player.winTimes;
        loseTimes =  data.initdata.player.loseTimes;
        winRate =  data.initdata.player.rate;

        Storage.setUserId(userId);
        Storage.setPassword(password);
        this.intoHall();
    },
    //跳转页面
    intoHall:function(){
    	console.log("start got into mainscene......");
        cc.director.runScene(new cc.TransitionFade(1, new MainScene()));
    },

    //进度条的加载
    initLoadingBar: function (sp_loading) {

        console.log("start appear load bar process......");
        //加载Loading条
        var sp_loadingtiao = new cc.Sprite(res.UILoadingBd_png);
        sp_loadingtiao.attr({
            x: sp_loading.getContentSize().width / 2,
            y: sp_loading.getContentSize().height / 2 - 300,
            scale: 1,
            rotation: 0
        });
        sp_loading.addChild(sp_loadingtiao, 2);
        var loadingBar = new cc.ProgressTimer(new cc.Sprite(res.UILoadingBar_png));
        loadingBar.setType(cc.ProgressTimer.TYPE_BAR);
        loadingBar.setMidpoint(cc.p(0, 0.5));       //设置进度条的起始点
        loadingBar.setBarChangeRate(cc.p(1, 0));     //设置进度条动画方向
        loadingBar.x = sp_loading.getContentSize().width / 2;
        loadingBar.y = sp_loading.getContentSize().height / 2 - 300;
        sp_loading.addChild(loadingBar, 3, LOADINGBAR_TAG);
        loadingBar.setPercentage(0);

    },

    //资源loading buffer进度回调
    setLoadingBar:function () {

        this.perNum    = parseInt(LOADINGBARPRONUM / LOADINGBARPROALLNUM * 100);

        LOADINGBARPRONUM++;
        var loadingBar = this.getChildByTag(LOADINGBAR_TAG);
        loadingBar.percentage = this.perNum;
        //进度条加载完毕进行跳转
        if (this.perNum == 100) {
            finishTag = 1;
            //加载完毕
            console.log("load bar finish: " + finishTag);
            //加载用户信息
            this.loadUserInfo();
            //this.intoHall();
        }
    },
   
});

//资源加载场景
var LoadGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        console.log("start load main game scene......");
        var layer = new LoadGameLayer();
        this.addChild(layer);
    }
});

