/**
 * Created by gstarr on 4/18/15.
 */
/**
 * Created by gstarr on 4/18/15.
 */
LoveDotsApp.controller('TilesUIController', function() {

        //ENV DEPENDENT - if local use '/'
        var urlBase = "http://localhost:8080/";
        var tilesUI = this;

        var breakPoint = function(data){
            console.log(data);
        }

        tilesUI.showDetails = false;
        tilesUI.showModal = false;
        tilesUI.showSideBar = false;
        tilesUI.showSideBarClass = 'sideBarOn';

        tilesUI.selectedUser = "starrIT.io"
        tilesUI.imageDescription = "Explore your world, build your reality...";
        tilesUI.lat = 26.1286818;
        tilesUI.lon = -80.1449157;


        tilesUI.acceptPhoto = function() {
            var canvas = document.getElementById('canvas');
            var data = canvas.toDataURL('image/png');
            var userImage = document.getElementById('userImage');
            userImage.setAttribute('src', data);

        };

        tilesUI.toggleSideBar = function(){
            tilesUI.showSideBar = tilesUI.showSideBar?false:true;
            if(tilesUI.showSideBar == false){
                $("#sideBar").addClass('sideBarOff')
            }else{
                $("#sideBar").removeClass('sideBarOff')
            }
        };

        tilesUI.toggleDetails = function(){
            tilesUI.showDetails = tilesUI.showDetails?false:true;
            if(tilesUI.showDetails == false){
                $("#imageDetails").addClass('detailsOff')
            }else{
                $("#imageDetails").removeClass('detailsOff')
            }
        };

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x333333);

        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(1024, 1024);

        tilesUI.init = function(){
            console.log('angular has called init')
            // show welcome screen
            $(".preloader").removeClass('trans')
            $(".screen").hide();
            $(".welcome").show();


            $("#continueButton").hide();


            // Make a connection to socket server
            // ============================
           tilesUI.createWebSocket();


            // Stage settings:
            // ============================
            this.padding = 0;
            this.tileCnt = 0;
            this.tiles = [];

            // add the renderer view element to the DOM
            //document.body.appendChild(renderer.view);
            document.getElementById('canvasContainer').appendChild(renderer.view)

            requestAnimFrame(animate);

            this.getFeed();

            function animate() {
                requestAnimFrame(animate);
                // render the stage
                renderer.render(stage);
            }


        }

        tilesUI.createWebSocket = function() {
            //ENV DEPENDENT
            var ws = new WebSocket('ws://localhost:8080', 'echo-protocol');
            ws.onerror=function(event){
                console.log("Error obtaining web socket");
                setTimeout(function() {
                    tilesUI.createWebSocket();
                }, 2000);
            };
            ws.onopen=function(event) {
                console.log("web socket opened");
                ws.addEventListener("message", function(e) {
                    // Update the appropraite image identified in the data object sent by the socket
                    tilesUI.updateImage(JSON.parse(e.data))
                });
            };
        };

        var check;


        tilesUI.createTiles = function(){
            var rCnt = 0;
            var cCnt = 0;

            /*var rows = 40;
             var cols = 40;*/

            this.colWidth = Number((1024) / tilesUI.cols)
            this.rowHeight = Number((1024) / tilesUI.rows)
            //console.log(rCnt)
            for(rCnt ; rCnt<tilesUI.rows ; rCnt++ ) {
                for (cCnt; cCnt < tilesUI.cols; cCnt++) {
                    this.createTile(this.padding+((cCnt+1)*this.colWidth),
                            this.padding+(this.rowHeight*(rCnt+1)),
                        this.colWidth,
                        this.rowHeight,
                        this.srcImages[this.tileCnt].smallRelative,
                        this.srcImages[this.tileCnt].mediumRelative,
                        this.srcImages[this.tileCnt]);

                    this.tileCnt++

                }

                cCnt = 0;

            }
        }

        tilesUI.createTile = function(x,y,w,h,smallImg, bigImg, vo){
            var scope = this
            console.log('creating tile');
            //var urlBase = "";
            //var texture = PIXI.Texture.fromImage(urlBase+smallImg);

            var tile = new PIXI.DisplayObjectContainer();
            tile.vo = vo;
            tile.interactive = true;
            tile.bigImage = bigImg;
            tile.smallImage = smallImg;

            // create a new Sprite using the texture
            var tileImage = new PIXI.Sprite.fromImage(urlBase+smallImg);
            tileImage.width = w;
            tileImage.height = h;


            var bkg =new PIXI.Graphics();

            var border =new PIXI.Graphics();
            border.lineStyle(10,0xff00ff);

            //tile.addChild(bkg);
            tile.addChild(tileImage);
            tile.addChild(border);


            tile.mousedown = tile.touchstart = function(data) {
                console.log('Click: '+urlBase+this.bigImage);
                this.isdown = true;
                tilesUI.showImageDetails(this)
            };


            // center the sprites anchor point
            tileImage.anchor.x = 0.5;
            tileImage.anchor.y = 0.5;

            // move the sprite to the center of the screen
            tile.position.x = x - (w/2);
            tile.position.y = y - (h/2);

            tile.width = w;
            tile.height = h;
            tile.w=w;
            tile.h=h;


            border.lineStyle(3,0xffffff)
            border.drawRect((w/2)*-1,(h/2)*-1,w, h);
            border.alpha=0

            tile.border = border;
            tile.bkg = bkg;
            tile.image = tileImage;

            stage.addChild(tile);


            this.tiles.push(tile);
            stage.addChild(tile);
            //tilesUI.preloadAssets(tilesUI.srcImages)
        }


        // retrieves source feed of images from api
        tilesUI.getFeed = function(){
            var scope = this;
            //ENV DEPENDENT
            $.getJSON("http://localhost:8080/tiles", function (data) {
                scope.srcImages = data.tiles;
                scope.rows = data.height;
                scope.cols = data.width;
                scope.preloadAssets(data.tiles);
            }).error(function() {
                console.log("failed to get feed, retrying");
                setTimeout(function() {
                    tilesUI.getFeed();
                }, 1000);
            });
        };

        tilesUI.postImage = function(){
            tilesUI.toggleSideBar();
            $.ajax({
                //ENV DEPENDENT
                url: 'http://localhost:8080/add?'+
                        'name='+$("#username").attr('value')+'.png'+
                        '&author='+$("#username").attr('value')+
                        '&description='+$("#imageDesc").attr('value')+
                        '&latitude='+$('#lat').attr('value')+
                        '&longitude='+$('#lon').attr('value'),


                type: 'POST',
                dataType: 'json',
                data: {
                    file: document.getElementById('canvas').toDataURL('image/png').replace('data:image/png;base64,', '')},
                success: function(data){
                    console.log('Success: '+ data);
                    tilesUI.updateImage(data);

                },
                error: function(data){
                    console.log("Error: "+ data);
                }
            });

        };

        tilesUI.updateImage = function(data){
            console.log("Updating Image: " + data.square)
            var tt = tilesUI.tiles[data.square];
            tt.vo = data;
            stage.swapChildren(tt,stage.getChildAt(stage.children.length-1))


            tt.border.alpha=1;
            tt.removeChild(tt.image);
            tt.image  = new PIXI.Sprite.fromImage(urlBase+data.smallRelative);
            tt.image.width = tt.image.height = 1
            tt.image.anchor.x = tt.image.anchor.y = 0.5;

            tt.addChild(tt.image);
            /*TweenLite.to(tt.border,.5, {ease: Bounce.easeOut,width:tt.width*2,height: tt.height*2});
            TweenLite.to(tt.border, 1, {ease: Bounce.easeOut,width:tt.w,height: tt.h, delay:1});
            TweenLite.to(tt.border, 1, {alpha:0, delay:2});*/

            var tl = new TimelineLite();
            tl.to(tt.border,1, {ease:Bounce.easeOut,width:tt.w*30,height:tt.h*30})
                .to(tt.image, .5, {ease:Bounce.easeOut,width:tt.w*12,height:tt.h*12})
                .to(tt.image,.5, {ease:Bounce.easeOut,width:tt.w,height: tt.h})
                .to(tt.border, 1, {ease:Bounce.easeOut,width:tt.w,height: tt.h})
                .to(tt.border, 1, {alpha:0});

            tilesUI.showImageDetails(tt);
        }


        tilesUI.showImageDetails = function(tile){
            angular.element('.detailsPhotoContainer').attr("style","background: url('"+urlBase+tile.vo.mediumRelative+"') !important;");

            tilesUI.username = tile.vo.author;
            tilesUI.imageDescription = tile.vo.description;
            tilesUI.showGEO(tilesUI.lat,tilesUI.lon);

            // Show the Details Pane if it sin't already expanded
            if(!tilesUI.showDetails){
                tilesUI.toggleDetails();
            }

        };




        tilesUI.doGEO = function () {
            var output = document.getElementById("out");

            if (!navigator.geolocation){
                alert("Geolocation is not supported by your browser");
                return;
            }

            function success(position) {
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;
                $("#lat").attr('value', latitude);
                $("#lon").attr('value', longitude);
            };

            function error(data){
                console.log(data.errmsg);
                alert("We can't get your lat/lon. <br>Make sure you accept the use of your location! <br>TRY AGAIN!")
            }

            output.innerHTML = "<p>Locating…</p>";

            navigator.geolocation.getCurrentPosition(success, error);
        }

        tilesUI.showGEO = function(lat, lon){
            var img = $('#out img')

            img.attr("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=250x200&sensor=false");

            //output.appendChild(img);
        }

        tilesUI.showView = function(v){
            $('.screen').hide();
            $('.'+v).show();
        }


        tilesUI.preloadAssets = function(data){
            console.log("   >> Preloading routine")

            tilesUI.loaded = false;

            var urls = [];
            data.forEach(function(element, index, array) {
                    urls.push(urlBase+array[index].smallRelative);
            })

            tilesUI.loader = new PIXI.AssetLoader(urls,false)
            tilesUI.loader.addEventListener('onProgress', function(e){

                var total = this.assetURLs.length
                var percent = (100*(total - this.loadCount) / total);
                $(".progress").attr('style','width: '+percent+'%');
                //console.log(percent);

                if(this.loaded >= this.assetURLs.length-1 || percent>=99 ){
                    tilesUI.onPreloadComplete();
                }

            });

            //loader.onLoaded = $("#continueButton").show();



            tilesUI.loader.load();
            //return addAssets;
        }


        tilesUI.onPreloadComplete = function(){
             //alert("Pre Load Complete")
            if(tilesUI.loaded ==true){
                return
            }



             $(".preloader").hide();
            tilesUI.createTiles();

            tilesUI.loader.removeEventListener("onProgress")
            tilesUI.loaded =true;


        };


        tilesUI.init();
    });

