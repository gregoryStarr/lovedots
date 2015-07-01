 /**
 * Tile Compoenent used for loading in each photo representtion of a pixel value assigned by serv3er
 */
 (function (window) {
     function Tile(w, h,imgSrc,color,titleText)  {
             this.initialize(w,h,imgSrc,color,titleText);
     }
     //Inheritance from Container
     Tile.prototype = new createjs.Container();
     Tile.prototype.Container_initialize = Tile.prototype.initialize;
     Tile.prototype.Container_tick = Tile.prototype._tick;

     Tile.prototype.initialize = function (w,h,imgSrc,color,titleText) {
         //call to initialize() method from parent class
         this.Container_initialize();
         this._width = w;
         this._height = h;
         this._imgSrc = imgSrc;
         this.bitmap;
         this._color = color;
         this._titleText = titleText;
         this.bg;
         this.border;
         this.scaleX = 1;
         this.scaleY = 1;
         this.alpha =  0;
         this.cubicIn = null;

         console.log("Tile initialized");
         //this.loadImage()
         this.createAssets()
         //this.setupTweens()
         this.assignEventHandlers();

     }




     /*
      * Component Assset creation methods
      * =====================================================
      * */


     /*
     * Base Creation Method: Spawn individual creation as needed
     * */
     Tile.prototype.createAssets = function (){
       //console.log("Creating assets...");
       //this.createBG()
       this.createBMImage()
       this.createTileBorder()
       this.assignEventHandlers()
     }

     /*Create Tile Bg
      * */
     Tile.prototype.createBG = function (){
         //console.log(">   drawing background")
         this.graphic = new createjs.Graphics();
         this.graphic.beginFill(this._color);
         this.graphic.drawRoundRect(0,0,this._width,this._height,6);
         this.bg= new createjs.Shape(this.graphic);
         this.addChild(this.bg);
     }


     Tile.prototype.createBMImage = function (){
         //console.log(">   creating bitmap Image");
         //console.log(">     Src: "+this._imgSrc );
         var scope = this;
         var temp_bmp = new createjs.Bitmap(this._imgSrc);
         temp_bmp.image.onload = function(){
             temp_bmp.scaleX = scope._width / temp_bmp.image.width;
             temp_bmp.scaleY = scope._height / temp_bmp.image.height;
             scope.alpha = 1;
             /*scope.showTween = createjs.Tween.get(scope, {loop: false}, true) // get a new tween targeting this object
                 .wait(250)
                 .to({scaleX:.75, scaleY:.75}, 1000, createjs.Ease.elasticInOut) // tween x/y/alpha properties over 1s (1000ms) with ease out
                 .call(console.log, ["done!"], console) */// call console.log("done!");
         }
         this.bitmap = temp_bmp;
         this.addChild(temp_bmp);
     }

     Tile.prototype.createTileBorder = function (){
         //console.log(">   drawing brdr")
         this.graphic = new createjs.Graphics();
         this.graphic.beginFill(this._color);
         this.graphic.beginStroke("#000");
         this.graphic.drawRoundRect(0,0,this._width,this._height,6);
         this.border= new createjs.Shape(this.graphic);
         this.border.alpha = .05;
         this.addChild(this.border);
     }



     /*
     * Event handlers
     * =====================================================
     * */
     Tile.prototype.assignEventHandlers = function(){
         //console.log("assigning handlers")
        var scope = this;
         this.border.addEventListener("click", function(event) {
             parent.showTween = createjs.Tween.get(scope, {loop: false}, true) // get a new tween targeting this object
                 .wait(250)
                 .to({scaleX:.5, scaleY:.5}, 1000, createjs.Ease.elasticInOut) // tween x/y/alpha properties over 1s (1000ms) with ease out
                 .call(console.log, ["click bitch, what!"], console) // call console.log("done!");

             scope.stageRef.showTileInfo(scope);
         })

         this.border.addEventListener("mouseover", function(event) {
             parent.showTween = createjs.Tween.get(scope, {loop: false}, true) // get a new tween targeting this object
                 .wait(250)
                 .to({scaleX:1, scaleY:1}, 250, createjs.Ease.cubicIn) // tween x/y/alpha properties over 1s (1000ms) with ease out
                 .call(console.log, ["mouse over!"], console) // call console.log("done!");
         })
         this.border.addEventListener("mouseout", function(event) {
             parent.showTween = createjs.Tween.get(scope, {loop: false}, true) // get a new tween targeting this object
                 .wait(250)
                 .to({scaleX:.75, scaleY:.75}, 250, createjs.Ease.cubicIn) // tween x/y/alpha properties over 1s (1000ms) with ease out
                 .call(console.log, ["mouseOut!"], console) // call console.log("done!");
         })



         /*this.border.onClick = function(){
             console.log("click "+this.graphics);

         }

         this.border.onMouseOver = function(){
             console.log("mouseOver ");
             *//*this.parent.graphic.clear();
             this.parent.graphic.beginFill(this.parent._color);
             this.parent.graphic.beginStroke(Graphics.getRGB(255,255,255));
             this.parent.graphic.drawRoundRect(0,0,this.parent._width,this.parent._height,6);
             this.graphics = this.parent.graphic;*//*
         }
         this.border.onMouseOut = function(){
             console.log("mouseOut ");
             *//*this.parent.graphic.clear();
             this.parent.graphic.beginFill("#777");
             this.parent.graphic.drawRoundRect(0,0,this.parent._width,this.parent._height,6);
             this.graphics = this.parent.graphic;*//*
         }*/
     }


     /*
      * Utility Methods
      * =====================================================
      * */

     /*
      *
      * */



/*
     Tile.prototype._tick = function () {
         //call to _tick method from parent class
         this.Container_tick();
         //console.log("Tile Ticked");
     }*/


     // Adds this components to the global window object for easy access
     window.Tile= Tile;
 } (window));