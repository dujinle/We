/**
 * Created by MQN on 2016/4/7.
 */

var STORE_ROW = 3; //行
var STORE_COL = 4; //列

var StorePage = cc.Node.extend({
    bgName:null,
    page:0,
    bg:null,

    ctor:function(bgName, page){
        this._super();
        this.loadConfig(bgName, page);
        this.loadBg();
        this.loadSelectItem(page);

        return true;
    },

    loadConfig:function(bgName, page){
        this.bgName = bgName;
        this.page = page;
    },

    loadBg:function(){
        var size = cc.winSize;
        var node = new cc.Sprite(this.bgName);
        //var node = new cc.Sprite("res/chooseItem1.png");
        this.addChild(node);
        //console.log("loadBg");
        node.setPosition(size.width/2, size.height/2);

        this.bg = node;
    },



    loadSelectItem:function(page){
        var size = new cc.Sprite(res.ItemBg_png).getContentSize();
        var offset = size.width / 4;

        var winSize = cc.winSize;

        // TODO
        var startX = (winSize.width - (STORE_COL * size.width + (STORE_COL - 1) * offset)) / 2 + size.width / 2;
        var startY = (winSize.height - (STORE_ROW * size.height + (STORE_ROW - 1) * offset)) / 2 + (STORE_ROW - 1) * (size.height + offset) + size.height / 2;

        var menuItem = [];
        for (var row = 0; row < STORE_ROW; row++){
            var y =  startY - (size.height + offset) * row;

            for (var col = 0; col < STORE_COL; col++){
                var x = startX + (size.width + offset) * col;

                var nodeNormal = new cc.Sprite("res/store/item" + this.page + row + col +".png");
                var nodeSelected = new cc.Sprite("res/store/item" + this.page + row + col +".png");
                var nodeDisabled = new cc.Sprite("res/store/item" + this.page + row + col +".png");

                this.node = new cc.MenuItemSprite(
                    nodeNormal,
                    nodeSelected,
                    nodeDisabled,
                    this.buyItemCallback,
                    this
                );

                this.node.setTag(page*100 + row*10 + col);
                console.log("nodeSetTag>>" + this.node.getTag());
                menuItem.push(this.node);
                this.node.setPosition(x, y);
            }
        }

        var menu = new cc.Menu(menuItem);
        this.addChild(menu);
        menu.setPosition(0, 0);
    },

    buyItemCallback:function(sender){
    }

});