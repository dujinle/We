//根据服务器信息展示个人动态聊天信息
function sendDynamicTack(position,dynamicTackString){
	var find=false;
	if(find==false){
		for(var i=0;i<this.players.length;i++){
			if(this.players[i].positionServer==position){
				//根据发送信息的玩家位置确定信息位置
				switch (this.players[i].playerPosition){
				case 1:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:-15,
						y:this.players[i].spritePhotoMobile.getContentSize().height,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


					break;
				case 2:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 3:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 4:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:this.players[i].spritePhotoMobile.getContentSize().width,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:0,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headSpawn=cc.spawn(headScale);
					var hailSpawn=cc.spawn(hailScale);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 5:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:this.players[i].spritePhotoMobile.getContentSize().width,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:0,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headSpawn=cc.spawn(headScale);
					var hailSpawn=cc.spawn(hailScale);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				default :
					break;
				}
				find=true;
				break;
			}
		}
	}
	if(find==false){
		for(var i=0;i<this.players_noPower.length;i++){
			if(this.players_noPower[i].positionServer==position){
				switch (this.players_noPower[i].playerPosition){
				case 1:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:-15,
						y:this.players_noPower[i].spritePhotoMobile.getContentSize().height,
						anchorX:1,
						anchorY:0
					});
					this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


					break;
				case 2:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 3:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 4:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
						y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:0,
						anchorY:0
					});
					this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headSpawn=cc.spawn(headScale);
					var hailSpawn=cc.spawn(hailScale);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 5:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
						y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:0,
						anchorY:0
					});
					this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headSpawn=cc.spawn(headScale);
					var hailSpawn=cc.spawn(hailScale);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				default :
					break;
				}
				find=true;
				break;
			}
		}
	}
	if(find==false){
		console.log("error: No found player who send a face!..................sendDynamicTack:function");
		return;
	}
}

//根据服务器信息展示个人静态聊天信息和对应的语音
function sendAStaticTack(position,staticTackNumber){
	//
	var find=false;
	if(find==false){
		for(var i=0;i<this.players.length;i++){
			if(this.players[i].positionServer==position){
				var chatString=g_staticTackStringArray[parseInt(staticTackNumber)-1];
				switch (this.players[i].playerPosition){
				case 1:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(chatString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:-15,
						y:this.players[i].spritePhotoMobile.getContentSize().height,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


					break;
				case 2:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(chatString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 3:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(chatString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:0,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:1,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelString);
					labelStringHeadBackSprite.attr({
						x:labelStringMidBackSprite.getContentSize().width,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
					labelStringHailBackSprite.attr({
						x:0,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:1,
						anchorY:0.5
					});
					labelStringMidBackSprite.addChild(labelStringHailBackSprite);
					var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
					var big=cc.scaleTo(0,bigY,1);
					labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
						labelStringMidBackSprite.removeFromParent();
					})));
					labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
					var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
					var headScale=cc.scaleTo(0,1/bigY,1);
					var hailScale=cc.scaleTo(0,1/bigY,1);
					var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
					var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
					var headSpawn=cc.spawn(headOrbit,headScale,headMove);
					var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
					labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
					labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

					break;
				case 4:
					//聊天文本显示的背景（分三段背景，头部，中间，尾部）
					var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
					var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
					var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
					var labelString=new cc.LabelTTF(chatString,"Arial",30);
					//拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
					labelStringMidBackSprite.attr({
						x:this.players[i].spritePhotoMobile.getContentSize().width,
						y:this.players[i].spritePhotoMobile.getContentSize().height+5,
						anchorX:0,
						anchorY:0
					});
					this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
					labelString.attr({
						x:labelStringMidBackSprite.getContentSize().width/2,
						y:labelStringMidBackSprite.getContentSize().height/2,
						anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players[i].spritePhotoMobile.getContentSize().width,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==position){
                    var chatString=g_staticTackStringArray[parseInt(staticTackNumber)-1];
                    switch (this.players_noPower[i].playerPosition){
                        case 1:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:-15,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


                            break;
                        case 2:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 3:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 4:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            console.log("error: No found player who send a face!..................sendAStaticTack:function");
            return;
        }
}
   
