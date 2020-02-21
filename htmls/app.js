
// Command - represent command to draw or erase.
class Command {
  constructor(type, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
  }

  get xVal(){
    return this.x;
  }

  get yVal(){
    return this.y;
  }
}


class CanvasPaper {
  constructor(){
    this.commands = [];
    this.commandMarker = -1; // this will tell us a position until which commands are executed.
  }

  initialize(){
    var appWidth = $(document).width() - 50,
      appHeight = $(document).height() - 50;
    // 1. Create a Pixi renderer and define size and a background color
    var renderer = PIXI.autoDetectRenderer(appWidth, appHeight);
    // 2. Append canvas element to the body
    document.body.appendChild(renderer.view);
    var stage = new PIXI.Container();
    // create a manager instance, passing stage and renderer.view
    var manager = new PIXI.interaction.InteractionManager(stage, renderer.view);

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xDE3249);
    graphics.drawRect(0, 0, appWidth, appHeight);
    graphics.endFill();
    stage.addChild(graphics);

    graphics.interactive = true;

    var mouseIn = false;
    var mousedown = false;
    var currX = -1,
      currY = -1;

    graphics.on("mousedown", function(e) {
      mousedown = true;
    });

    graphics.on("mouseup", function(e) {
      mousedown = false;
    });

    graphics.on("mouseover", function(e) {
      mouseIn = true;
    });

    graphics.on("mouseout", function(e) {
      mouseIn = false;
    });

    var that = this;
    graphics.on("mousemove", function(e) {
      var posX = e.data.global.x;
      var posY = e.data.global.y;
      if (mouseIn && mousedown) {
        currX = posX;
        currY = posY;
        that.commands.push(new Command(0, currX, currY));
      }
    });

    const ticker = new PIXI.ticker.Ticker();

    ticker.add(() => {
      //console.log('Ticker..');
      // if (mouseIn && mousedown) {
      //   var thing = new PIXI.Graphics();
      //   thing.beginFill(0x00FF00);
      //   thing.lineStyle(4, 0x00FF00, 1);
      //   thing.drawCircle(currX, currY, 0.05);
      //   thing.closePath();
      //   thing.endFill();
      //   stage.addChild(thing);
      //   renderer.render(stage);
      // }
      var thing = new PIXI.Graphics();
      thing.beginFill(0x00FF00);
      thing.lineStyle(4, 0x00FF00, 1);
      for(var i = this.commandMarker + 1; i < this.commands.length; i++){
          var currCommand = this.commands[i];
          thing.drawCircle(currX, currY, 0.05);
          this.commandMarker++;
      }
      thing.closePath();
      thing.endFill();
      stage.addChild(thing);
      renderer.render(stage);

    });
    ticker.start();
    // add stage to the canvas
    renderer.render(stage);
  }
}



$(document).ready(function() {
   var canvasPaper = new CanvasPaper();
   canvasPaper.initialize();
});
