function injectJS() {
  const c2 = document.createElement("script");
  const c4 = document.createElement("script");
  c2.src =
    "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js";
  c4.src =
    "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js";
  document.head.insertBefore(c2, document.head.firstChild);
  document.head.insertBefore(c4, document.head.firstChild);
  const style = document.createElement("style");
  style.innerHTML = `#canvas {
    position: fixed;
    right: 0;
    bottom: 0;
  }`;
  document.head.appendChild(style);

  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  document.body.appendChild(canvas);
}

async function useModel() {
  const PIXI = require("pixi.js");
  window.PIXI = PIXI;
  const { Live2DModel } = require("pixi-live2d-display");
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    width: 300,
    height: 600,
    transparent: true,
  });
  const model = await Live2DModel.from("./l_103300401/model.json");
  app.stage.addChild(model);
  model.x = 150;
  model.y = 300;
  model.rotation = Math.PI;
  model.skew.x = Math.PI;
  model.scale.set(0.1, 0.1);
  model.anchor.set(0.5, 0.5);

  // 交互
  model.on("hit", (hitAreas) => {
    if (hitAreas.includes("body")) {
      model.motion("tap_body");
    }
  });
}

async function main() {
  injectJS();
  setTimeout(() => {
    useModel();
  }, 2000);
}

main();
