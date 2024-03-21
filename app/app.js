import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
var windowSize = function (withScrollBar) {
  var wid = 0;
  var hei = 0;
  if (typeof window.innerWidth != "undefined") {
    wid = window.innerWidth;
    hei = window.innerHeight;
  }
  else {
    if (document.documentElement.clientWidth == 0) {
      wid = document.body.clientWidth;
      hei = document.body.clientHeight;
    }
    else {
      wid = document.documentElement.clientWidth;
      hei = document.documentElement.clientHeight;
    }
  }
  return { width: wid - (withScrollBar ? (wid - document.body.offsetWidth + 1) : 0), height: hei };
};

var size = windowSize(true);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
var light = new THREE.AmbientLight(0xffffff); 
camera.position.set(0, 0, -5);
scene.add(camera);
scene.add(light);
const colorBackground = new THREE.Color('blue')

scene.background = colorBackground;
// Thêm renderer vào canvas
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});

const loader = new OBJLoader();
var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Stickman/material.lib") } );
//loader.TextureLoader.material = material;
loader.load("Stickman/Stickman.obj", (object) => {
  for(let i=0 ; i<object.children.length;i++){
    object.children[i].material = material
  }
  object.position.z = -10

  //const objfull = new THREE.Mesh(object,material)
  scene.add(object);
  
}, undefined, function ( error ) {

	console.error( error );

} );

// Thiết lập vị trí camera
//camera.position.z = 500;

// Tải mô hình 3D người que

var handler = function (element, type, func) {
  if (element.addEventListener) {
    element.addEventListener(type, func, false);
  } else if (window.attachEvent) {
    element.attachEvent("on" + type, func);
  } else {
    element["on" + type] = func;
  }
};


// NOTE: this function will set the camera to follow the box
handler(canvas, "mousemove", function (event) {

  var offX = 0;
  var offY = 0;
  if (typeof window.pageXOffset != "undefined") {
    offX = window.pageXOffset;
    offY = window.pageYOffset;
  }
  else {
    if (document.documentElement.scrollTop == 0) {
      offX = document.body.scrollLeft;
      offY = document.body.scrollTop;
    }
    else {
      offX = document.documentElement.scrollLeft;
      offY = document.documentElement.scrollTop;
    }
  }
  var x, y;
  if (typeof event.pageX != "undefined") {
    x = event.pageX;
    y = event.pageY;
  }
  else {
    x = event.clientX;
    y = event.clientY;
  }
  x -= offX;
  y -= offY;
  if (x < 0) {
    x = 0;
  }
  if (y < 0) {
    y = 0;
  }

  // NOTE: move the camera
  camera.rotation.x = (y - size.height / 2) / size.width;
  camera.rotation.y = (x - size.width / 2) / size.height;

});

handler(canvas, "mouseout", function (event) {

  camera.rotation.x = camera.rotation.y = 0;

});

// Hàm render
function animate() {
  requestAnimationFrame(animate);
  material.rotation.x = Math.PI / 2;
  renderer.render(scene, camera);
}

animate();
