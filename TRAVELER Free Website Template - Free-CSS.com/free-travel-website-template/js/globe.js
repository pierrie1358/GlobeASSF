









    
// console.log(countries);
// console.log(JSON.stringify(countries.repsonseJSON));


// var countries2=JSON.parse(JSON.stringify(countries.responseJSON));

$.ajaxSettings.async = false;
var countries;
 var country_pings;
 var desired_countries=["Nepal","Sri Lanka","Vietnam","South Africa","Brazil","Australia","Nicaragua","New Zealand","Mexico","United States","United Kingdom","United Arab Emirates","China","Spain","Philippines","Thailand","Zambia","Hong Kong","India","Lithuania"]; // Hier kunnen de landen toegevoegd worden waar pings aan toegevoegd moeten worden, plekken waar we zijn geweest
 var lat = [];
 var lng = [];
 var wdth=window.screen.width;
var hght=window.screen.height;
$.getJSON("https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json", function(json){
countries= json;
country_pings=countries.filter(count => {if(desired_countries.includes(count.name)) return count});

for(let i=0;i<country_pings.length;++i)
 {
   lat.push(country_pings[i].latlng[0]);
   lng.push(country_pings[i].latlng[1]);


 }
});
var globe = planetaryjs.planet();
    // Load our custom `autorotate` plugin; see below.
    globe.loadPlugin(autorotate(10));
    // globe.loadPlugin(goto_australia(100));
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    //
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(planetaryjs.plugins.earth({
      topojson: { file:   'world-110m-withlakes.json' },
      oceans:   { fill:   '#e9f6e5' },
      land:     { fill:   '#7ab630' },
      borders:  { stroke: '#84d1c6' } //#f7931e 08a0cc
    }));
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
      fill: '#e9f6e5'
    }));
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    globe.loadPlugin(planetaryjs.plugins.zoom({
      scaleExtent: [100, 300]
    }));
    // globe.loadPlugin(planetaryjs.plugins.drag({
    //   // Dragging the globe should pause the
    //   // automatic rotation until we release the mouse.
    //   onDragStart: function() {
    //     this.plugins.autorotate.pause();
    //   },
    //   onDragEnd: function() {
    //     this.plugins.autorotate.resume();
    //   }
    // }));
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([200, 175]).rotate([-lng[0], -lat[0], 0]);
  
    // Every few hundred milliseconds, we'll draw another random ping.
   
    

    // var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
    var colors=['white','red']
    
    setInterval(function() {
      var color = colors[Math.floor(Math.random() * colors.length)];
      if((globe.plugins.autorotate.state()) && (lat.includes(-globe.projection.rotate()[1].toFixed(8)))&& (lng.includes(-globe.projection.rotate()[0].toFixed(8))))
      { 
        var pingsloc=globe.projection.rotate();
        globe.plugins.pings.add(-pingsloc[0], -pingsloc[1], { color: color, ttl: 1500, angle: 2 });
      }
      else
      {
        var c=Math.floor(Math.random() * lat.length);
        globe.plugins.pings.add(lng[c], lat[c], { color: color, ttl: 2000, angle: 3 });

      }
      
      
      
      // for (var i=0;i<lat.length;++i){
      //   globe.plugins.pings.add(lng[i], lat[i], { color: color, ttl: 2000, angle: Math.random() * 10 });
      // }
      
    }, 50);
  
    var canvas = document.getElementById('rotatingGlobe');
    
    
    
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio == 2) {
      canvas.width = 800;
      canvas.height = 800;
      context = canvas.getContext('2d');
      context.scale(2, 2);
    }
    // Draw that globe!
    globe.draw(canvas);
    
    // $(window).scroll(function(){
    //   $("#rotatingGlobe").stop().animate({"marginTop": ($(window).scrollTop()) + "px", "marginLeft":($(window).scrollLeft()) + "px"}, "fast" );
    // });
    // This plugin will automatically rotate the globe around its vertical
    // axis a configured number of degrees every second.
    function autorotate(degPerSec) {
      // Planetary.js plugins are functions that take a `planet` instance
      // as an argument...
      return function(planet) {
        var lastTick = null;
        var paused = false;
        planet.plugins.autorotate = {
          speedchange: function(degPS){degPerSec=degPS},
          pause:  function() { paused = true;  },
          resume: function() { paused = false; },
          state: function() { return paused}
        };
        // ...and configure hooks into certain pieces of its lifecycle.
        planet.onDraw(function() {
          if (paused || !lastTick) {
            lastTick = new Date();
          } else {
            var now = new Date();
            var delta = now - lastTick;
            // This plugin uses the built-in projection (provided by D3)
            // to rotate the globe each time we draw it.
            var rotation = planet.projection.rotate();
            rotation[0] += degPerSec * delta / 1000;
            if (rotation[0] >= 180) rotation[0] -= 360;
            planet.projection.rotate(rotation);
            
            lastTick = now;
            // document.getElementById('current_pos').innerHTML=globe.projection.rotate()[0];
            // document.getElementById('current_pos').innerHTML=globe.projection.rotate()[1];
          }
        });
      };
    };
  
    // Dit is de functie om naar een specifiek land te gaan
    function goto_australia(lt) {
                  if(wdth>700){
                  var ltas=lt-1;
                  var finaldest=[];
                  if(ltas>=0){
                  finaldest.push(-lng[ltas]);
                  finaldest.push(-lat[ltas]);
                  finaldest.push(0);
                  globe.plugins.autorotate.pause();
                  var changevelo=5000;
                  var changing=[0,0,0];
                  for (let i=0;i<finaldest.length;++i)
                {
                  changing[i]= (finaldest[i]-globe.projection.rotate()[i])/changevelo;

                }
                  // console.log(finaldest);
                  // console.log(changing);
                  var zoomed_in=300;
                  var zoomed_out=globe.projection.scale();
                  var scaling= (zoomed_in-zoomed_out)/changevelo;
                  for(let r=0; r<changevelo;r++){
                    
                    changecoord(r);
                  }
                }
                else
                {
                    globe.plugins.autorotate.resume();
                }
                 
                function changecoord(k){
                  setTimeout(function(){
                    // This plugin uses the built-in projection (provided by D3)
                    // to rotate the globe each time we draw it.
                  var rotation = globe.projection.rotate();
                  
                  rotation[0] += changing[0];
                  if (rotation[0] >= 180) rotation[0] -= 360;
                  rotation[1] += changing[1];
                  if (rotation[1] >= 180) rotation[1] -= 360;
                  
                  globe.projection.rotate(rotation);
                  // globe.projection.scale((globe.projection.scale())+scaling);
                  // console.log(globe.projection.rotate());
                  if(globe.projection.rotate()==finaldest)
                  {
                    console.log(globe.projection.rotate()+"arrived");
                  }


                  },100);


                }
                   
          
                 return 123; }};
       
    
  
    function goto_australia2() {
      globe.plugins.autorotate.speedchange(0);
    };
    

      


    // This plugin takes lake data from the special
    // TopoJSON we're loading and draws them on the map.
    function lakes(options) {
      options = options || {};
      var lakes = null;
  
      return function(planet) {
        planet.onInit(function() {
          // We can access the data loaded from the TopoJSON plugin
          // on its namespace on `planet.plugins`. We're loading a custom
          // TopoJSON file with an object called "ne_110m_lakes".
          var world = planet.plugins.topojson.world;
          lakes = topojson.feature(world, world.objects.ne_110m_lakes);
        });
  
        planet.onDraw(function() {
          planet.withSavedContext(function(context) {
            context.beginPath();
            planet.path.context(context)(lakes);
            context.fillStyle = options.fill || 'black';
            context.fill();
          });
        });
      };
    };