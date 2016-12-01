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
    "width": 32,
    "height": 32,
    "frames": 2,
    "startx": 160,
    "starty": 500,
    "speed": 5
  },
  "d": {
    "file": "assets/dodge.png",
    "width": 64,
    "hright": 64,
    "frames": 2,
    "fps": 10,
    "startx": 160,
    "starty": 32
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
      this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
      //this.load.spritesheet("dodge",C.d.file,C.d.width,C.d.height,C.d.frames);
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
    
    this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = false;
    this.player.scale.set(1);
    this.player.animations.add("anim");
    this.player.animations.play("anim",C.p.fps,true);
/*
    this.gab = this.add.sprite(C.d.startx,C.d.starty,"dodge");
    this.gab.anchor.set(0.5,0.5);
    this.gab.smoothed = false;
    this.gab.scale.set(1);
    this.gab.animations.add("anim");
    this.gab.animations.play("anim",C.d.fps,true);
*/
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update(){
    if (this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
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


