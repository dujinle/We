/**
 * Created by guowanfu on 2016/3/22.
 */
/**
 * Created by guowanfu on 2016/2/2.
 */
var CounterTimer = cc.Node.extend({
    sprite:null,
    progressBoard:null,
    sumTime:10,
    ctor:function(pid){
        this._super();
        this.sprite=new cc.Sprite(res.CounterTimer_png);
        this.progressBoard=new cc.ProgressTimer(this.sprite);
    },
    setCounterTimerPosition:function(position){
        this.progressBoard.setPosition(position);
        this.addChild(this.progressBoard);
    },
    startCounterTimer:function(){
        var percent=arguments[0]?arguments[0]:0;
        this.progressBoard.setPercentage(percent);
        var ac=new cc.ProgressTo(this.sumTime,100);
        this.progressBoard.runAction(ac);
    },
    stopCounterTimer:function(){
        if(this.progressBoard.getPercentage()>0){
            this.progressBoard.stopAllActions();
            this.progressBoard.setPercentage(0);
        }
    }
});
