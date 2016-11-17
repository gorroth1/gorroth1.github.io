var C = {
  "game":{
    "width": 320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 0,
    "yspeed": 700,
    "file": "assets/background.png"
  },
  "p": {
    "file": "assets/player.png",
    "width": 46,
    "height": 64,
    "frames": 2
    "startx": 160,
    "starty": 500
  }
}

  class Boot {
      preload() {
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.pageAlignHorizontally = true;
          this.scale.pageAlignVertically = true;
        }
    
    create() {
      this.state.start("Load")
    }
  }

  class Load {
    preload() {
      console.log("Loading...");
      this.load.image("bg","assets/background.png") 
    }
  create() {
    console.log("Loaded");
    this.state.start("Play")
  }
}

class Play {
  create() {
    console.log("Entered Play State");
    this.background = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
    this.background.autoScroll(0,700);
    this.player = this.add.sprite(C.bg.xspeed,C.bg.yspeed);
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = fales;
    this.player.scale.set(1);
  }
}

function restart() {
  game.state.start("Boot");
}

var game = new Phaser.Game(320,568);  
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");


