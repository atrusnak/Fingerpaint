// sketch.js

/* global describe handpose tf io THREE*/
var handposeModel = null; // this will be loaded with the handpose model

var videoDataLoaded = false; // is webcam capture ready?

var statusText = "Loading handpose model...";

var myHands = []; // hands detected
// currently handpose only supports single hand, so this will be either empty or singleton

var handMeshes = []; // array of threejs objects that makes up the hand rendering

// html canvas for drawing debug view
var dbg = document.createElement("canvas").getContext("2d");
dbg.canvas.style.position = "absolute";
dbg.canvas.style.left = "0px";
dbg.canvas.style.top = "0px";
dbg.canvas.style.zIndex = 100; // "bring to front"
dbg.canvas.style.display = "block";
document.body.appendChild(dbg.canvas);

//for testing raycaster against mouse
//document.addEventListener("mousemove", onDocumentMouseMove, false);

// boilerplate to initialize threejs scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//add scene light for phong material
const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
light.position.set(0, 1, 0);
scene.add(light);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearAlpha(0.0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//var effect = new THREE.StereoEffect(renderer);
//effect.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", onWindowResize, false);
// read video from webcam
var capture = document.getElementById("video");

//set scene background to video
var videoTexture = new THREE.VideoTexture(capture);
videoTexture.minFilter = THREE.LinearFilter;

scene.background = videoTexture;

//check permission
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  var constraints = {
    video: {
      facingMode: "environment" //,
      //frameRate: { ideal: 10, min: 5, max: 25 } if this starts crashing on mobile uncomment
    }
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      // apply the stream to the video element used in the texture

      capture.srcObject = stream;
      capture.play();
    })
    .catch(function(error) {
      console.error("Unable to access the camera/webcam.", error);
    });
} else {
  console.error("MediaDevices interface not available.");
}

// hide the video element
capture.style.position = "absolute";
//capture.style.opacity = 0;
capture.style.zIndex = -1; // "send to back"

//threejs
var texture = new THREE.VideoTexture(capture);

var geometry = new THREE.PlaneBufferGeometry(
  window.innerWidth,
  window.innerHeight
);
var material = new THREE.MeshBasicMaterial({ map: texture });

// signal when capture is ready and set size for debug canvas
capture.onloadeddata = function() {
  console.log("video initialized");
  videoDataLoaded = true;
  dbg.canvas.width = capture.videoWidth / 2; // half size
  dbg.canvas.height = capture.videoHeight / 2;

  camera.position.z = capture.videoWidth / 2 - 30; // rough estimate for suitable camera distance based on FOV
};

//create a catmull rom curve
//mediapipe keypoints
var handPoints = [];
//curve using deCastlejau
var handCurve = [];

var curve = new THREE.SplineCurve(handPoints);
//var points = curve.getPoints(50);
var handGeometry = new THREE.BufferGeometry().setFromPoints(handPoints);
var handMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
var splineObject = new THREE.LineLoop(handGeometry, handMaterial);

splineObject.geometry.dynamic = true;
//scene.add(splineObject);

var handSpheres = [];
var linePoints = [];
var clickList = [];

linePoints.push(new THREE.Vector3(0, 0, 0));
linePoints.push(new THREE.Vector3(10, 10, 0));

var lineMat = new THREE.LineBasicMaterial({ color: 0x0000ff });
var lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
const line = new THREE.Line(lineGeo, lineMat);
line.geometry.dynamic = true;
scene.add(line);

/*var clickSphere = new THREE.Object3D();
var clickSphereGeometry = new THREE.SphereGeometry(10, 32, 32);
var clickSphereMaterial = new THREE.MeshPhongMaterial({ color: 0 });
var clickSphereMesh = new THREE.Mesh(clickSphereGeometry, clickSphereMaterial);
clickSphere.add(clickSphereMesh);*/

const clickSphereGeometry = new THREE.CircleGeometry(10, 32);
//remove center vertex
clickSphereGeometry.vertices.shift();
const clickSphereMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
//circle line loop instead of mesh
const clickSphere = new THREE.LineLoop(
  clickSphereGeometry,
  clickSphereMaterial
);
scene.add(clickSphere);

for (var i = 0; i < 21; i++) {
  // 21 keypoints
  var { isPalm, next } = getLandmarkProperty(i);

  var obj = new THREE.Object3D(); // a parent object to facilitate rotation/scaling
  var sphereObj = new THREE.Object3D();
  // we make each bone a cylindrical shape, but you can use your own models here too
  var geometry = new THREE.CylinderGeometry(3, 3, 1);
  var sphereGeometry = new THREE.SphereGeometry(6, 32, 32);
  //var material = new THREE.MeshNormalMaterial();
  // another possible material (after adding a light source):
  var material = new THREE.MeshPhongMaterial({ color: 0x3242a8 });

  switch (true) {
    case i < 1:
      material = new THREE.MeshPhongMaterial({ color: 0xfffcfc });
      break;
    case i < 5:
      material = new THREE.MeshPhongMaterial({ color: 0x3242a8 });
      break;
    case i < 9:
      material = new THREE.MeshPhongMaterial({ color: 0x329ea8 });
      break;
    case i < 13:
      material = new THREE.MeshPhongMaterial({ color: 0x32a84c });
      break;
    case i < 17:
      material = new THREE.MeshPhongMaterial({ color: 0xa89e32 });
      break;
    case i < 21:
      material = new THREE.MeshPhongMaterial({ color: 0xa83232 });
      break;
    default:
      material = new THREE.MeshPhongMaterial({ color: 0xa232a8 });
      break;
  }

  var mesh = new THREE.Mesh(geometry, material);
  var sphereMesh = new THREE.Mesh(sphereGeometry, material);
  mesh.rotation.x = Math.PI / 2;

  obj.add(mesh);
  sphereObj.add(sphereMesh);

  scene.add(obj);
  scene.add(sphereObj);

  handSpheres.push(sphereObj);
  handMeshes.push(obj);
}

const boxgeometry = new THREE.BoxBufferGeometry(20, 20, 20);
const spheregeometry = new THREE.SphereGeometry(10, 32, 32);
//can't include first 45 objects since they're the hand
//just build a new array of intersectable objects; revised scene children
var revisedChildren = [];

/*
for (let i = 0; i < 5; i++) {
  const object = new THREE.Mesh(
    boxgeometry,
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );

  object.position.x = Math.random() * 400 - 200;
  object.position.y = Math.random() * 40 - 20;
  object.position.z = Math.random() * -100;

  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;

  object.scale.x = Math.random() + 4;
  object.scale.y = Math.random() + 4;
  object.scale.z = Math.random() + 2;

  revisedChildren.push(object);
  scene.add(object);
}*/

var clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = function() {
  while(scene.children.length > 44){ 
    scene.remove(scene.children[scene.children.length-1]); 
  }
}

var cubeBtn = document.getElementById('cubeBtn');
cubeBtn.onclick = function() {
  const object = new THREE.Mesh(
    boxgeometry,
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );

  object.position.x = Math.random() * 400 - 200;
  object.position.y = Math.random() * 40 - 20;
  object.position.z = Math.random() * -100;

  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;

  object.scale.x = Math.random() + 4;
  object.scale.y = Math.random() + 4;
  object.scale.z = Math.random() + 2;

  revisedChildren.push(object);
  scene.add(object);
}

var sphereBtn = document.getElementById('sphereBtn');
sphereBtn.onclick = function() {
  const object = new THREE.Mesh(
    spheregeometry,
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );

  object.position.x = Math.random() * 400 - 200;
  object.position.y = Math.random() * 40 - 20;
  object.position.z = Math.random() * -100;

  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;

  object.scale.x = Math.random() + 4;
  object.scale.y = Math.random() + 4;
  object.scale.z = Math.random() + 2;

  revisedChildren.push(object);
  scene.add(object);
}

var raycaster = new THREE.Raycaster();
var currentMidpoint = new THREE.Vector3(0, 0, 0);
const mouse = new THREE.Vector2();
var pinch = 0;
var INTERSECTED;
// update threejs object position and orientation from the detected hand pose
// threejs has a "scene" model, so we don't have to specify what to draw each frame,
// instead we put objects at right positions and threejs renders them all
//async function
function updateMeshes(hand) {
  //top of thumb
  let po = webcam2space(...hand.landmarks[4]);
  //top of pointer finger
  let pn = webcam2space(...hand.landmarks[8]);

  //open Float64 array and modify
  line.geometry.attributes.position.array[0] = po.x;
  line.geometry.attributes.position.array[1] = po.y;
  line.geometry.attributes.position.array[2] = po.z;
  line.geometry.attributes.position.array[3] = pn.x;
  line.geometry.attributes.position.array[4] = pn.y;
  line.geometry.attributes.position.array[5] = pn.z;

  let pX = po.x - pn.x;
  let pY = po.y - pn.y;
  let pZ = po.z - pn.z;

  let dist = Math.sqrt(pX * pX + pY * pY + pZ * pZ);

  currentMidpoint = new THREE.Vector3(
    (po.x + pn.x) / 2,
    (po.y + pn.y) / 2,
    (po.z + pn.z) / 2
  );
  //set virtual mouse
  //mouse.x = currentMidpoint.x;
  //mouse.y = currentMidpoint.y;

  clickSphere.position.set(
    currentMidpoint.x,
    currentMidpoint.y,
    currentMidpoint.zt
  );

  let div = dist / 30; //scale down
  clickSphere.scale.x = div;
  clickSphere.scale.y = div;
  clickSphere.scale.z = div;

  //check distance between pointer and thumb
  if (dist / 10 < 9) {
    clickList.push(currentMidpoint);
    //check point list

    pinch = 1;
  } else {
    pinch = 0;
    //mouseAction = null;
    clickList = [];
  }
  //set needsupdate
  line.geometry.attributes.position.needsUpdate = true;
  splineObject.geometry.attributes.position.needsUpdate = true;
  var index = 0;
  for (var i = 0; i < handMeshes.length; i++) {
    var { isPalm, next } = getLandmarkProperty(i);
    //console.log(hand.landmarks[i]);
    var p0 = webcam2space(...hand.landmarks[i]); // one end of the bone
    var p1 = webcam2space(...hand.landmarks[next]); // the other end of the bone

    // compute the center of the bone (midpoint)
    var mid = p0.clone().lerp(p1, 0.5);
    handSpheres[i].position.set(p0.x, p0.y, p0.z);
    handMeshes[i].position.set(mid.x, mid.y, mid.z);
    // compute the length of the bone
    handMeshes[i].scale.z = p0.distanceTo(p1);

    // compute orientation of the bone
    handMeshes[i].lookAt(p1);

    //update spline
    handPoints.push(new THREE.Vector3(p0.x, p0.y, 0));
  }

  /*for (var i = 0; i < 50; i++) {
   handCurve.push(new THREE.Vector2(de.casteljau(handPoints,
            //value between 0 and 1, 0 - the beginning of the curve, 1 - the end
            i/50
        )));
  }*/

  //curve = new THREE.SplineCurve(handCurve);
  curve = new THREE.SplineCurve(handPoints);

  geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  splineObject.geometry.dispose();
  splineObject.geometry = geometry;
  //console.log(handCurve);
  handPoints = [];
}

// Load the MediaPipe handpose model assets.
handpose.load().then(function(_model) {
  console.log("model initialized.");
  statusText = "Model loaded.";
  handposeModel = _model;
});

// compute some metadata given a landmark index
// - is the landmark a palm keypoint or a finger keypoint?
// - what's the next landmark to connect to if we're drawing a bone?
function getLandmarkProperty(i) {
  var palms = [0, 1, 2, 5, 9, 13, 17]; //landmark indices that represent the palm

  var idx = palms.indexOf(i);
  var isPalm = idx != -1;
  var next; // who to connect with?
  if (!isPalm) {
    // connect with previous finger landmark if it's a finger landmark
    next = i - 1;
  } else {
    // connect with next palm landmark if it's a palm landmark
    next = palms[(idx + 1) % palms.length];
  }
  return { isPalm, next };
}

// transform webcam coordinates to threejs 3d coordinates
function webcam2space(x, y, z) {
  return new THREE.Vector3(
    x - capture.videoWidth / 2,
    -(y - capture.videoHeight / 2), // in threejs, +y is up
    z
  ).multiplyScalar(1.2);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

/*
//for testing the raycasting
function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}*/

var intersects = [];

var start_pinch_x, start_pinch_y, end_x, end_y;
var selected;

start_pinch_x = currentMidpoint.x;
start_pinch_y = currentMidpoint.y;

var point = new THREE.Vector3 (0,0,0);
var geometry = new THREE.Geometry();
var strokeMaterial = new THREE.LineBasicMaterial ( {color:0xffffff, depthWrite:false, linewidth : 30 } );
geometry.vertices.push(point);
var bline = new THREE.Line (geometry, strokeMaterial);
scene.add(bline);
selected = bline;
//cursor history location array, always has last 5 locations
var cursor_history = new Array();
//stroke color
var stroke_color = 0xffffff;

function render() {
  //set raycast intersections empty
  intersects = [];
  requestAnimationFrame(render); // this creates an infinite animation loop
  if (handposeModel && videoDataLoaded) {
    // model and video both loaded

    //check pinch
    if (pinch) {

      if (INTERSECTED) {
        if ("position" in INTERSECTED) {
          INTERSECTED.position.x = currentMidpoint.x;
          INTERSECTED.position.y = currentMidpoint.y;

          /*var point = new THREE.Vector3 (start_pinch_x,start_pinch_y,0);
          var geometry = new THREE.Geometry();
          var strokeMaterial = new THREE.LineBasicMaterial ( {color:0xffffff, depthWrite:false, linewidth : 10 } );
          geometry.vertices.push (point);
          var line = new THREE.Line (geometry, strokeMaterial);
          scene.add(line);
          selected = line;*/
        }
      }
      else {
        if (selected == null) {
          let lastpoint = cursor_history[cursor_history.length-1];
          var point = new THREE.Vector3 (lastpoint[0],lastpoint[1],0);
          var geometry = new THREE.Geometry();
          var strokeMaterial = new THREE.LineBasicMaterial ( {color:stroke_color, depthWrite:false, linewidth : 100 } );
          geometry.vertices.push (point);
          var bline = new THREE.Line (geometry, strokeMaterial);
          scene.add(bline);
          selected = bline;
        }
        var line = selected;
        var point = new THREE.Vector3 (currentMidpoint.x,currentMidpoint.y,0);
        var oldgeometry = line.geometry;
        var newgeometry = new THREE.Geometry();
        newgeometry.vertices = oldgeometry.vertices;
        newgeometry.vertices.push (point);
        line.geometry = newgeometry;
        selected = line;
      }
    }
    else {
      selected = null;
      let lastpoint = [currentMidpoint.x,currentMidpoint.y];
      cursor_history.push(lastpoint);
      if (cursor_history.length > 5) {
        cursor_history.shift();
      }
    }
    //handpose model
    handposeModel.estimateHands(capture).then(function(_hands) {
      // we're handling an async promise
      // best to avoid drawing something here! it might produce weird results due to racing

      myHands = _hands; // update the global myHands object with the detected hands
      if (!myHands.length) {
        // haven't found any hands
        statusText = "Show some hands!";
      } else {
        // display the confidence, to 3 decimal places
        statusText =
          "Confidence: " +
          Math.round(myHands[0].handInViewConfidence * 1000) / 1000;

        // update 3d objects
        updateMeshes(myHands[0]);
      }

      for(let i = 0; i < myHands.length; i++) {

        // now estimate gestures based on landmarks
        // using a minimum confidence of 7.5 (out of 10)
        const est = GE.estimate(myHands[i].landmarks, 7.5);

        if(est.gestures.length > 0) {

          // find gesture with highest confidence
          let result = est.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          //resultLayer.innerText = gestureStrings[result.name];
          if(result.name == "victory") {
              console.log("victory");
              stroke_color = 0x333CFF;
          } else if (result.name == "thumbs_up") {
              console.log("thumbs up");
              stroke_color = 0x000000;
          }
        }
      }
    });

    // find intersections
    let mousesim = new THREE.Vector2(
      (3 * currentMidpoint.x) / window.innerWidth,
      (3 * currentMidpoint.y) / window.innerHeight
    );
    //console.log("mid: x: " + mousesim.x + "y: " + mousesim.y);

    raycaster.setFromCamera(mousesim, camera);
    //slower but tells us closest intersection
    //intersects = raycaster.intersectObjects(revisedChildren);

    //just check for first case of intersection regardless of how far away it is
    for (var i = 0; i < revisedChildren.length; i++) {
      if (
        raycaster.intersectObject(revisedChildren[i], false, intersects)
          .length > 0
      ) {
        break;
      }
    }
    if (!pinch) {
      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
          if (INTERSECTED)
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

          INTERSECTED = intersects[0].object;
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
          INTERSECTED.material.color.setHex(0xff0000);
        }
      } else {
        if (INTERSECTED)
          INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;
      }
    }
  }

  // render the 3D scene!
  renderer.render(scene, camera);
}

render(); // kick off the rendering loop!


const config = {
    video: { width: 640, height: 480, fps: 30 }
  };

const landmarkColors = {
  thumb: 'red',
  indexFinger: 'blue',
  middleFinger: 'yellow',
  ringFinger: 'green',
  pinky: 'pink',
  palmBase: 'white'
};

const gestureStrings = {
  'thumbs_up': '👍',
  'victory': '✌🏻'
};

const knownGestures = [
  fp.Gestures.VictoryGesture,
  fp.Gestures.ThumbsUpGesture
];
const GE = new fp.GestureEstimator(knownGestures);