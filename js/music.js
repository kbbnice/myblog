function playerDefult(){
    var player          = document.getElementById("audio");
    var playerMsg       = document.getElementById("playerMsg");
    var playerIcon      = document.getElementsByClassName("player-icon")[0];
    var playerIconStart = document.getElementById("playerIconStart");
    var playerIconPause = document.getElementsByClassName("player-icon-pause")[0];
    var btnGoUp         = document.getElementById("btnGoUp");
    var btnGoDown       = document.getElementById("btnGoDown");
    var btnStart        = document.getElementById("btnStart");
    var volume          = document.getElementsByClassName("volume")[0];
    var volumeLine      = document.getElementsByClassName("volume-line")[0];
    var volumePot       = document.getElementsByClassName("volume-pot")[0];
    var volumeUp        = document.getElementsByClassName("volume-up")[0];
    var volumeDown      = document.getElementsByClassName("volume-down")[0];
    var volumeNo        = document.getElementsByClassName("volume-no")[0];
    var downloadLink    = document.getElementsByClassName("downloadLink")[0];
    var musicName       = playerMsg.children[0];
    var musicAuthor     = playerMsg.children[1];

    var volumeValHis = 0.5;
    var volumeValNew = 0.5;

    var musicIndex = 0;
    var musicList = [
        {
            name: "云烟成雨", 
            author: "房东的猫", 
            musicSrc: "music/yycy.mp3", 
            pictureSrc:"imgs/wechat.png", 
            downloadName: "云烟成雨"
        },
        {
            name: "往后余生", 
            author: "马良", 
            musicSrc: "music/whys.mp3", 
            pictureSrc:"imgs/vue.png", 
            downloadName: "往后余生"
        }
    ]



    player.volume = volumeValHis;
    function musicDefult(){
        player.src                  = musicList[0].musicSrc;
        musicName.innerHTML         = "歌曲名：" + musicList[0].name + " ";
        musicAuthor.innerHTML       = " -- " + musicList[0].author + " ";
        downloadLink.href           = musicList[0].musicSrc;
        downloadLink.download       = musicList[0].downloadName;
        player.pause();
        btnStart.style.background   = "url('imgs/music-icon-play1.png')";
        playerIconStart.src         = musicList[0].pictureSrc;
        playerIconPause.src         = "imgs/music-icon-play.png";
    }
    
    musicDefult();
    //清空所有btn的默认

    //播放、暂停。
    function musicPlay(){
        if(player.paused){
            player.play();
            btnStart.style.background                   = "url('imgs/music-icon-pause1.png')";
            playerIconStart.style.animationPlayState    = "running";
            playerIconPause.src                         = "imgs/music-icon-pause.png";

        } else{
            player.pause();
            btnStart.style.background                   = "url('imgs/music-icon-play1.png')";
            playerIconStart.style.animationPlayState    = "paused";
            playerIconPause.src                         = "imgs/music-icon-play.png";


        }
    }

    btnStart.onclick = musicPlay;
    //点击图标播放：暂停：
    playerIcon.onclick = musicPlay;


    //重新播放
    // var volumeStay = 0;
    btnReset.onclick = function(){
        player.load();
        player.play();
        btnStart.style.background                   = "url('imgs/music-icon-pause1.png')";
        playerIconStart.style.animationPlayState    = "running";
        playerIconPause.src                         = "imgs/music-icon-pause.png";
        isMute();

        //切换动画(重启keyframe)：
        toggleClass("player-icon-reset", "player-icon-start", playerIconStart);
    }

    //添加删除---切换className:
    function toggleClass(classname1, classname2, item){
        if(item.classList.contains(classname1)){
            item.classList.remove(classname1);
            item.classList.add(classname2);
        } else {
            item.classList.remove(classname2);
            item.classList.add(classname1);
        }
    }
    
    //判断歌名、作者是否超出长度（8em):超出：滚动   
    scrollText(musicName);
    scrollText(musicAuthor);


    //是否静音判断：
    function isMute(){
        if(player.volume == 0){
            volumeNo.style.background = "url('imgs/volume-icon-no.png') no-repeat";
        } else {
            volumeNo.style.background = "url('imgs/volume-icon.png') no-repeat";
        }
    }
    //音量条音量：
    var volX = 0;

    
    function setVol(){
        volumePot.style.width   = volX + "px";
        volumeValNew            = Math.ceil(volX/10)*10/100;
        player.volume           = volumeValNew;
        isMute();
        
    }

    volumeLine.onmousedown = function(e){
            volX = Math.round((e.offsetX)/10)*10;
            setVol();
            
        volumeLine.onmouseup = function(){
            setVol();
        }
    }


    //静音:

    var showVulumeNo = false;
    volumeNo.onclick = function(){
        if(player.volume !== 0){    
            volumeNo.style.background       = "url('imgs/volume-icon-no.png') no-repeat";
            volumeValHis                    = volumeValNew
            player.volume                   = 0;
            showVulumeNo                    = false;
            // volumePot.style.width = 0;
        } else {
            if(showVulumeNo == true){
                volumeNo.style.background   = "url('imgs/volume-icon-no.png') no-repeat";
                showVulumeNo                = false;
            } else {
                volumeNo.style.background   = "url('imgs/volume-icon.png') no-repeat";
                showVulumeNo                = true;
            }
            player.volume                   = volumeValHis;
            // volumePot.style.width = volumeValHis*100 + "px";
        }
    }

    //音量键加减：
    volumeUp.onclick = function(){
        var oldPotWidth             = volumePot.offsetWidth;
        var oldVolumePot            = Math.floor(oldPotWidth/10)*10;
        if( oldVolumePot <= 90 ){
            oldVolumePot += 10;
            volumeValNew            = oldVolumePot/100;
            player.volume           = volumeValNew;
            volumePot.style.width   = oldPotWidth + 10 + "px";
            isMute();
        }
    }

    volumeDown.onclick = function(){
        var oldPotWidth             = volumePot.offsetWidth;
        var oldVolumePot            = Math.ceil(oldPotWidth/10)*10;
        if( oldVolumePot >= 10 ) {
            oldVolumePot -= 10;
            volumeValNew            = oldVolumePot/100;
            player.volume           = volumeValNew;
            volumePot.style.width   = oldPotWidth - 10 + "px";
            isMute(); 
            if(volumeValNew == 0){
                showVulumeNo        = false;
            }
        }
    }

/**********************************************/

//折叠播放器：2019.4.15
//上一首，下一首
   

    btnGoUp.onclick = function(){
        console.log("up")
        if(musicIndex >= musicList.length-1){
            musicIndex = 0;
            setMusic(musicIndex);
        } else {
            musicIndex++;
            setMusic(musicIndex);
        }
    }

    btnGoDown.onclick = function(){
        console.log("down")
        if(musicIndex <= 0){
            musicIndex = musicList.length-1;
            setMusic(musicIndex);
        } else {
            musicIndex--;
            setMusic(musicIndex);
        }
    }

        
    function setMusic(index){
        player.src              = musicList[index].musicSrc;
        musicName.innerHTML     = "歌曲名：" + musicList[index].name + " ";
        musicAuthor.innerHTML   = " -- " + musicList[index].author + " ";
        downloadLink.href       = musicList[index].musicSrc;
        downloadLink.download   = musicList[index].downloadName;


        //重启keyframe:
        toggleClass("player-icon-reset", "player-icon-start", playerIconStart);
        //播放音乐
        player.play();
        btnStart.style.background                   = "url('imgs/music-icon-pause1.png')";
        playerIconStart.style.animationPlayState    = "running";
        playerIconStart.src                         = musicList[index].pictureSrc;
        playerIconPause.src                         = "imgs/music-icon-pause.png";


    }


    //播放结束切换：


/**********************************************/



    //禁止双击选中文本；
    function removeDKEvent(obj){
        obj.onselectstart = function(){
            return false;
        }
    }
    removeDKEvent(volume);
}
playerDefult();

//内容超出滚动：
function scrollText(item) {
    if(item.scrollWidth > playerMsg.offsetWidth){
        setInterval(function(){
            var strArr      = item.innerHTML.split("");
            var addStr      = strArr.shift();
            strArr.push(addStr);
            item.innerHTML  = strArr.join("");
        }, 1000);
    }
}   