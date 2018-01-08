/**
 * Created by wuningjian on 2/22/16.
 */

var LOGIN_ERROR = "There is no server to log in, please wait.";
var DUPLICATE_ERROR = "This name has been used.";

function CreateGameRoom(pparent,param){
	console.log("start create room playerId:" + JSON.stringify(param));
	
	pomelo.request(util.getCreateRoute(), param, function(data) {
		console.log(JSON.stringify(data));
		if(data.error){
			util.showError(pparent,data.error);
			console.log(data.error);
			return ;
		}
		console.log("create room succ");
		pomelo.request(util.getGameRoute(),{
			process:"getRoomInfo"
		},function(data1){
			//玩家的信息
			console.log(JSON.stringify(data1));
			
			//房间的信息
			g_roomData.push(data1["current_chip"]);
			g_roomData.push(data1["all_chip"]);
			g_roomData.push(data1["round"]);
			g_roomData.push(data1["room_num"]);
			g_roomData.push(data1["player_num"]);
			g_roomData.push(data1["is_gaming"]);
			
			g_totalCount = data1["total_round"];
			var cur_player = data1["current_player"];
			if(cur_player == 0){
				g_roomData.push(1);
			}else{
				g_roomData.push(cur_player);
			}
			g_roomMasterName = data1["master_name"];
			var players = data1["players"];
			for(var i = 0;i < players.length;i++){
				var t_player = players[i];
				if(t_player != null && t_player != "null"){
					var player=new Array();
					player.push(t_player["id"]);
					player.push(t_player["location"]);
					player.push(t_player["isGame"]);
					player.push(t_player["nickName"]);
					player.push(t_player["gold"]);
					player.push(t_player["gender"]);
					if(g_gameType == "TDK"){
						player.push(t_player["paiXing"]);
					}
					g_playerData.push(player);
				}
			}
			if(g_gameType == "ZJH"){
				cc.director.runScene(new ZJHGameScene());
			}else if(g_gameType == "TDK"){
				g_fapaiNum = data1["fapai_num"];
				cc.director.runScene(new TDKGameScene());
			}else if(g_gameType == "ZHQ"){
				cc.director.runScene(new ZHQGameScene())
			}
		});
	});
}

function EnterGameRoom(pparent,param){
    pomelo.request(util.getEnterRoute(), param, function(data) {
        if(data.error) {
			util.showError(pparent,data.error);
			console.log(data.error);
			return ;
        }
		pomelo.request(util.getGameRoute(),{
			process:"getRoomInfo"
		},function(data1){
			//玩家的信息
			console.log(JSON.stringify(data1));
			
			//房间的信息
			g_roomData.push(data1["current_chip"]);
			g_roomData.push(data1["all_chip"]);
			g_roomData.push(data1["round"]);
			g_roomData.push(data1["room_num"]);
			g_roomData.push(data1["player_num"]);
			g_roomData.push(data1["is_gaming"]);
			g_totalCount = data1["total_round"];
			var cur_player = data1["current_player"];
			if(cur_player == 0){
				g_roomData.push(1);
			}else{
				g_roomData.push(cur_player);
			}

			g_roomMasterName = data1["master_name"];
			var players = data1["players"];
			for(var i = 0;i < players.length;i++){
				var t_player = players[i];
				if(t_player != null && t_player != "null"){
					var player=new Array();
					player.push(t_player["id"]);
					player.push(t_player["location"]);
					player.push(t_player["isGame"]);
					player.push(t_player["nickName"]);
					player.push(t_player["gold"]);
					player.push(t_player["gender"]);
					if(g_gameType == "TDK"){
						player.push(t_player["paiXing"]);
					}
					g_playerData.push(player);
				}
			}
			if(g_gameType == "ZJH"){
				cc.director.runScene(new ZJHGameScene());
			}else if(g_gameType == "TDK"){
				g_fapaiNum = data1["fapai_num"];
				cc.director.runScene(new TDKGameScene());
			}else if(g_gameType == "ZHQ"){
				cc.director.runScene(new ZHQGameScene())
			}
        });
    });
}