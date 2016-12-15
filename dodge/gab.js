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
    "fps": 3,
    "startx": 160,
    "starty": 500,
    "speed": 5
  },
  "d": {
    "file": "assets/poop.png",
    "width": 32,
    "height": 32,
    "frames": 4,
    "fps": 10,
    "startx": 160,
    "starty":-32,
    "speed": 5
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
      this.load.spritesheet("poop",C.d.file,C.d.width,C.d.height,C.d.frames);
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
    this.player.scale.set(2);
    this.player.animations.add("anim");
    this.player.animations.play("anim",C.p.fps,true);
    console.log(this.player)
    
    this.gab = this.add.sprite(C.d.startx,C.d.starty,"poop");
    this.gab.anchor.set(0.5,0.5);
    this.gab.smoothed = false;
    this.gab.scale.set(2);
    this.gab.animations.add("anim");
    this.gab.animations.play("anim",C.d.fps,true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update(){
    if (this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
       
    }
    if (this.gab.y > this.game.height) {
      this.gab.y = C.d.starty
      let px = (C.d.width * this.gab.scale.x) / 2;
      let max = C.game.width - px
      let min = 0 + px
      let newx = randInt(max);
      if (newx < min){ newx = min }
      this.gab.x = newx
    }
    if (this.gab.y == C.d.starty) {
    }
    this.gab.y += C.d.speed;
  }


    render() {
      game.debug.text("x: " + this.gab.x + ", y: " + this.gab.y, 4, 16); 
    }
  }


    function restart() {
  game.state.start("Boot");
    }

    function randInt(max) {
      return Math.floor(Math.random() * max);
    }


var game = new Phaser.Game(320,568);  
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
  
  
