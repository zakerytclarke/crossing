noise.seed(42);

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  color:"#4D97EC",
  dragRotate: true,
});
var scale=10;

var island=new Island();

var islandBase = new Zdog.Group({
  addTo:illo,
  translate:{x:0,y:0,z:0},
});

var islandGroup = new Zdog.Group({
  addTo:islandBase,
  translate:{x:-100,y:-100,z:0},
});

var islandDraw=new Zdog.Shape({
  addTo: islandGroup,
  path: island.island,
  stroke: 10,
  color: '#EBE2B6',
  fill:true

});
islandDraw.copy({
  translate:{x:10,y:10,z:5},
  scale:0.9,
  color: '#5ECA69',

});

var riverDraw=new Zdog.Shape({
  addTo: islandDraw,
  path: island.river,
  stroke: 20,
  color: '#4D97EC',
  fill:true,
  translate:{z:15}

});



for(var i=0;i<island.trees.length;i++){
  generateTree({z:10,x:island.trees[i].x,y:island.trees[i].y});
}


for(var i=0;i<island.rocks.length;i++){
  generateRock({z:5,x:island.rocks[i].x,y:island.rocks[i].y});
}







//setInterval(update,10);


/*

let ticker = 0;
const cycleCount = 150;

function animate() {
let progress = ticker / cycleCount;
// apply easing to rotation
let tween = Zdog.easeInOut( progress % 1, 3 );
illo.rotate.y = tween * Zdog.TAU;
ticker++;
illo.updateRenderGraph();
requestAnimationFrame( animate );
}

animate();
*/
function generateTree(loc){
  var treeGroup = new Zdog.Group({
    addTo:islandGroup,
    translate:loc,
  });

  let trunk = new Zdog.Cylinder({
  addTo: treeGroup,
  diameter: 5,
  length: 20,
  stroke: false,
  color: '#72564c',
  frontFace: '#b39850',
  backface: '#b39850',
  });
  let leaf = new Zdog.Cone({
  addTo: treeGroup,
  diameter: 10,
  length: 10,
  stroke: false,
  color: '#2f8e6b',
  backface: '#2f8e6b',
  translate:{z:10}
  });
  new Zdog.Cone({
  addTo: treeGroup,
  diameter: 12,
  length: 10,
  stroke: false,
  color: '#2f8e6b',
  backface: '#2f8e6b',
  translate:{z:3}
  });
  new Zdog.Cone({
  addTo: treeGroup,
  diameter: 13,
  length: 10,
  stroke: false,
  color: '#2f8e6b',
  backface: '#2f8e6b',
  translate:{z:-4}
  });
  /*
  var leafPaths=[];
  for(var j=0;j<20;j+=3){
    for(var i=0;i<20;i++){
      leafPaths.push({x:0,y:0,z:15-j});
      leafPaths.push({x:20*Math.random()-10,y:20*Math.random()-10,z:(15-j)-5});
    }
  }
  var leaves=new Zdog.Shape({
    addTo: treeGroup,
    path: leafPaths,
    stroke: 1,
    color: '#2f8e6b',
    fill:true

  });
  */

}

function generateRock(loc){
  let rock = new Zdog.Hemisphere({
    addTo: islandGroup,
    diameter: 5,
    stroke: false,
    color: '#9ba5a8',
    backface: '#576c80',
    translate:loc
  });
}


function Island(){
  var len=20;
  this.island=renderPoints();
  this.river=renderRiver();
  this.trees=[];
  this.rocks=[];

  for(var x=20;x<200;x+=10){
    for(var y=20;y<200;y+=10){
      if(noise.simplex2(x,y)>0.8){
        this.trees.push({x:x,y:y,z:15});
      }
    }

  }
  for(var x=20;x<200;x+=10){
    for(var y=20;y<200;y+=10){
      if(noise.simplex2(x+200,y+200)>0.6){
        this.rocks.push({x:x,y:y,z:15});
      }
    }

  }

  var islandTemp;

  function renderPoints(){

    var pts=[{x:len/2,y:len/2}];
    //var pts=[];

    var x=0;
    var y=Math.round(Math.random());
    //Top
    for(var i=0;i<len/2;i++){
      x=x+1;
      var offset=Math.round(2*Math.random())-1;
      if(offset>3){
        offset=3-y;
      }
      if(offset<0){
        offset=0;
      }
      pts.push({x:x,y:y+offset});
      x++;
      pts.push({x:x,y:y+offset});
    }
    //Right
    for(var i=0;i<len/2;i++){
      y=y+1;
      var offset=Math.round(2*Math.random())-1;
      if(offset>3){
        offset=3-x;
      }
      if(offset<0){
        offset=0;
      }
      pts.push({x:x+offset,y:y});
      y++;
      pts.push({x:x+offset,y:y});
    }
    //Bottom
    for(var i=0;i<len/2;i++){
      x=x-1;
      var offset=Math.round(2*Math.random())-1;
      if(offset>3){
        offset=3-y;
      }
      if(offset<0){
        offset=0;
      }
      pts.push({x:x,y:y+offset});
      x--;
      pts.push({x:x,y:y+offset});
    }
    //Left
    for(var i=0;i<len/2;i++){
      y=y-1;
      var offset=Math.round(2*Math.random())-1;
      if(offset>3){
        offset=3-x;
      }
      if(offset<0){
        offset=0;
      }
      pts.push({x:x+offset,y:y});
      y--;
      pts.push({x:x+offset,y:y});
    }
    pts.push(pts[1]);//Connect to Start


    islandTemp=pts;

    pts=pts.map(function(pts){
      return {x:pts.x*scale,y:pts.y*scale,z:pts.z*scale};
    })


    return pts;
  }

  function renderRiver(){
    var x=islandTemp[len/2].x;
    var y=islandTemp[len/2].y;
    var pts=[];
    for(var i=0;i<len/2;i++){
      y=y+1;
      var offset=Math.round(2*Math.random())-1;
      if(offset>3){
        offset=3-x;
      }
      if(offset<0){
        offset=0;
      }
      pts.push({x:x+offset,y:y});
      y++;
      pts.push({x:x+offset,y:y});
    }

    pts=pts.map(function(pts){
      return {x:pts.x*scale,y:pts.y*scale,z:pts.z*scale};
    })
    return pts;
  }

}
