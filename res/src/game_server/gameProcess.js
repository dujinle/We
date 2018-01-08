
function game_ready(){
    pomelo.request(util.getGameRoute(),{
        process:"ready",
        location:g_myselfPlayerPos
    },function(data){
        console.log(data.msg);
    });
}

function game_open(){
    pomelo.request(util.getGameRoute(),{
        process:"open",
        location:g_myselfPlayerPos
    },function(data){
        console.log(data.msg);
    });
}

function game_throw(){
    pomelo.request(util.getGameRoute(),{
        process:"throw",
        location:g_myselfPlayerPos
    },function(data){
        console.log(data.msg);
    });
}

function game_allin(){
    console.log("all in");
    console.log(g_myselfPlayerPos);
    pomelo.request(util.getGameRoute(),{
        process:"allin",
        location:g_myselfPlayerPos,
        param:"null"
    },function(data){
        console.log(data.msg);

    });
}

function game_bipai(){
    pomelo.request(util.getGameRoute(),{
        process:"bipai",
        location1:1,
        location2:2
    },function(data){
        cc.log(JSON.stringify(data));
    });
}

function game_follow_always(){
    pomelo.request(util.getGameRoute(),{
        process:"null",
        param:"null"
    },function(data){
        cc.log(JSON.stringify(data));

    });
}

function game_get_roomInfo(){
    pomelo.request(util.getGameRoute(),{
        process:"getRoomInfo"
    },function(data){
        cc.log(JSON.stringify(data));
    });
}

function game_get_roomPlayersInfo(){
    pomelo.request(util.getGameRoute(),{
        process:"getRoomPlayersInfo"
    },function(data){
        cc.log(JSON.stringify(data));
    });
}