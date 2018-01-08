/**
 * Created by MQN on 2016/4/7.
 */

var STORE_PAGE_COUNT = 1;

var SMainLayer = cc.Layer.extend({
    mark:null,

    ctor:function(){
        this._super();

        //加载每一页
        this.loadPageView();

        //加载页面值
        this.loadPageMark();

        //加载返回按钮
        this.loadReturnButton();

        this.loadFangKaAndDia();
        this.scheduleUpdate();

        return true;
    },

    loadPageView:function(){
        var pageView = new ccui.PageView();
        this.addChild(pageView);
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.winSize);
        pageView.addEventListener(this.onPageViewEvent, this);

        //添加不同的商品层
        for(var i=0; i<STORE_PAGE_COUNT; i++){
            var node = new StorePage("res/store/chooseItem0.png", i);
            //var node = new StorePage(res.ChooseItem + i + _png, i);
            var layout = new ccui.Layout();
            pageView.addPage(layout);
            layout.setContentSize(cc.winSize);
            layout.addChild(node)
        }
    },

    loadPageMark:function(){
        var size = cc.winSize;
        var node = new PageMark({
            dir         : PageMark.DIR_Horizontal,
            space       : 20,
            count       : STORE_PAGE_COUNT,
            normalImg   : res.PageMark0_png,
            selectedImg : res.PageMark1_png
        });
        this.addChild(node);
        node.setPosition(size.width/2, 50);

        this.mark = node;

    },

    loadReturnButton:function(){

        var node = new ccui.Button();
        this.addChild(node);
        node.loadTextures(
            res.Back_png,
            res.Back_png,
            res.Back_png
        );
        node.setPosition(node.width / 2 + 30, node.height / 2 + 30);
        node.setTouchEnabled(true);
        node.addTouchEventListener(function(sender){
        	var scene = new MainScene();
            cc.director.runScene(new cc.TransitionFade(0.3, scene));
        }.bind(this));
    },

    loadFangKaAndDia:function(){
        //房卡图案
        this.fangKa = new cc.Sprite(res.fangKa_png);
        this.fangKa.x = 640-280;
        this.fangKa.y = 680;
        this.addChild(this.fangKa, 1);

        //用户房卡数
        this.fangKaNum = new cc.LabelTTF(fangka, "Arial", 30);
        this.fangKaNum.x = this.fangKa.x + 100;
        this.fangKaNum.y = this.fangKa.y;
        this.addChild(this.fangKaNum, 2);

        //房卡数底框
        this.fangKa2 = new cc.Sprite(res.lobbyFangka2_png);
        this.fangKa2.x = this.fangKa.x + 100;
        this.fangKa2.y = this.fangKa.y;
        this.addChild(this.fangKa2, 1);

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
    },

    update:function(dt){
        this.fangKaNum.setString(fangka);
        this.diamondNum.setString(diamond);
    },

    onPageViewEvent:function(sender, type){
        switch (type){
            case ccui.PageView.EVENT_TURNING:
                var currIndex = sender.getCurPageIndex().valueOf();
                this.mark.onChangeIndex(currIndex);
                //console.log("page>>" + currIndex);
                break;
            default:
                break;
        }
    }
});