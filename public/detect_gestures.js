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

  async function main() {

    const video = document.querySelector("video");
    const canvas = document.querySelector("#pose-canvas");
    const ctx = canvas.getContext("2d");

    const resultLayer = document.querySelector("#pose-result");

    // configure gesture estimator
    // add "✌🏻" and "👍" as sample gestures
    const knownGestures = [
      fp.Gestures.VictoryGesture,
      fp.Gestures.ThumbsUpGesture
    ];
    const GE = new fp.GestureEstimator(knownGestures);

    // load handpose model
    const model = await handpose.load();
    console.log("Handpose model loaded");

    // main estimation loop
    const estimateHands = async () => {

      // clear canvas overlay
      ctx.clearRect(0, 0, config.video.width, config.video.height);
      resultLayer.innerText = '';

      // get hand landmarks from video
      // Note: Handpose currently only detects one hand at a time
      // Therefore the maximum number of predictions is 1
      const predictions = await model.estimateHands(video, true);
      for(let i = 0; i < predictions.length; i++) {

        // now estimate gestures based on landmarks
        // using a minimum confidence of 7.5 (out of 10)
        const est = GE.estimate(predictions[i].landmarks, 7.5);

        if(est.gestures.length > 0) {

          // find gesture with highest confidence
          let result = est.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          resultLayer.innerText = gestureStrings[result.name];
          if(result.name == "victory") {
              console.log("victory");
          } else if (result.name == "thumbs_up") {
              console.log("thumbs up");
          }
        }
      }

      // ...and so on
      setTimeout(() => { estimateHands(); }, 1000 / config.video.fps);
    };

    estimateHands();
    console.log("Starting predictions");
  }

  window.addEventListener("DOMContentLoaded", () => {
    
    video.onloadedmetadata = function() {
      main();
    }
    const canvas = document.querySelector("#pose-canvas");
    canvas.width = config.video.width;
    canvas.height = config.video.height;
    console.log("Canvas initialized");
   
  });