import React, { useEffect } from 'react';
import * as faceapi from "../dist/face-api.esm";

function WebcamDemo() {

  useEffect(() => {
    const modelPath = '../model/';
    const minScore = 0.2;
    const maxResults = 5;
    let optionsSSDMobileNet;
    let recentTime;
    let pitchList = [];
    let yawList = [];

    function str(json) {
      let text = '<font color="lightblue">';
      text += json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
      text += '</font>';
      return text;
    }

    function log(...txt) {
      console.log(...txt); // eslint-disable-line no-console
      const div = document.getElementById('log');
      if (div) div.innerHTML += `<br>${txt}`;
    }

    function drawFaces(canvas, data, fps) {
      const ctx = canvas.getContext('2d', {willReadFrequently: true});
      const nowTime = new Date();
      if (nowTime - recentTime > 5000) {
        const pitchAverage = pitchList.reduce((a, b) => a + b, 0) / pitchList.length
        const yawAverage = yawList.reduce((a, b) => a + b, 0) / yawList.length
        console.log("pitch average : " + pitchAverage);
        console.log("yaw average : " + yawAverage);
        pitchList = []
        yawList = []
        if (data.length === 0 || pitchAverage < -15 || Math.abs(yawAverage) > 90 || (yawAverage < 40 && pitchAverage < -10))
          console.log("사용자가 집중하지 않습니다.")
        // 0점 부여
        else if (0 < pitchAverage < 10 && yawAverage < 30) {
          console.log("매우 잘 집중 중입니다.")
          // 2점 부여
        } else {
          console.log("집중 중입니다.")
          // 1점 부여
        }
        // else {
        //   const expression = Object.entries(data[0].expressions).sort((a, b) => b[1] - a[1]);
        // console.log(expression[0][0])
        // console.log(`pitch:${data[0].angle.pitch}° yaw:${data[0].angle.yaw}°`)
        // }

        // console.log(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`);
        // console.log(`pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`);
        // console.log(person);
        recentTime = nowTime;
      }
      if (!ctx)
        return;
      afk = false;
      if (data.length !== 0) {
        pitchList.push(data[0].angle.pitch);
        yawList.push(data[0].angle.yaw);
      }
      // console.log(data[0].angle.pitch);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw title
      // ctx.font = 'small-caps 20px "Segoe UI"';
      // ctx.fillStyle = 'white';
      // ctx.fillText(`FPS: ${fps}`, 10, 25);
      // for (const person of data) {
        // draw box around each face
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = 'deepskyblue';
        // ctx.fillStyle = 'deepskyblue';
        // ctx.globalAlpha = 0.6;
        // ctx.beginPath();
        // ctx.rect(person.detection.box.x, person.detection.box.y, person.detection.box.width, person.detection.box.height);
        // ctx.stroke();
        // ctx.globalAlpha = 1;
        // draw text labels
        // const expression = Object.entries(person.expressions).sort((a, b) => b[1] - a[1]);
        // ctx.fillStyle = 'black';
        // ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 59);
        // ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 41);
        // ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 23);
        // ctx.fillText(`roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`, person.detection.box.x, person.detection.box.y - 5);
        // ctx.fillStyle = 'lightblue';
        // ctx.fillText(`gender: ${Math.round(100 * person.genderProbability)}% ${person.gender}`, person.detection.box.x, person.detection.box.y - 60);
        // ctx.fillText(`expression: ${Math.round(100 * expression[0][1])}% ${expression[0][0]}`, person.detection.box.x, person.detection.box.y - 42);
        // ctx.fillText(`age: ${Math.round(person.age)} years`, person.detection.box.x, person.detection.box.y - 24);
        // ctx.fillText(`roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`, person.detection.box.x, person.detection.box.y - 6);
        // draw face points for each face
        // ctx.globalAlpha = 0.8;
        // ctx.fillStyle = 'lightblue';
        // const pointSize = 2;

        // for (let i = 0; i < person.landmarks.positions.length; i++) {
        //   ctx.beginPath();
        //   ctx.arc(person.landmarks.positions[i].x, person.landmarks.positions[i].y, pointSize, 0, 2 * Math.PI);
        //   ctx.fill();
        // }
      // }
    }

    async function detectVideo(video, canvas) {
      // if (!video || video.paused) return false;
      const t0 = performance.now();
      faceapi
          .detectAllFaces(video, optionsSSDMobileNet)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors()
          .withAgeAndGender()
          .then((result) => {
            const fps = 1000 / (performance.now() - t0);
            drawFaces(canvas, result, fps.toLocaleString());
            requestAnimationFrame(() => detectVideo(video, canvas));
            return true;
          })
          .catch((err) => {
            log(`Detect Error: ${str(err)}`);
            return false;
          });
      return false;
    }

// just initialize everything and call main function
      async function setupCamera() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        if (!video || !canvas) return null;

        // log('Setting up camera');
        // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
        // if (!navigator.mediaDevices) {
        //   log('Camera Error: access not supported');
        //   return null;
        // }
        let stream;
        const constraints = { audio: false, video: { facingMode: 'user', resizeMode: 'crop-and-scale' } };
        if (window.innerWidth > window.innerHeight) constraints.video.width = { ideal: window.innerWidth };
        else constraints.video.height = { ideal: window.innerHeight };
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
          // if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') log(`Camera Error: camera permission denied: ${err.message || err}`);
          // if (err.name === 'SourceUnavailableError') log(`Camera Error: camera not available: ${err.message || err}`);
          return null;
        }
        if (stream) {
          video.srcObject = stream;
        } else {
          // log('Camera Error: stream empty');
          return null;
        }
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        if (settings.deviceId) delete settings.deviceId;
        if (settings.groupId) delete settings.groupId;
        if (settings.aspectRatio) settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;
        // log(`Camera active: ${track.label}`);
        // log(`Camera settings: ${str(settings)}`);
        canvas.addEventListener('click', () => {
          if (video && video.readyState >= 2) {
            if (video.paused) {
              video.play();
              detectVideo(video, canvas);
            } else {
              video.pause();
            }
          }
          // log(`Camera state: ${video.paused ? 'paused' : 'playing'}`);
        });
        return new Promise((resolve) => {
          video.onloadeddata = async () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play();
            detectVideo(video, canvas);
            resolve(true);
          };
        });
      }

      async function setupFaceAPI() {
        // load face-api models
        // log('Models loading');
        // await faceapi.nets.tinyFaceDetector.load(modelPath); // using ssdMobilenetv1
        await faceapi.nets.ssdMobilenetv1.load(modelPath);
        await faceapi.nets.ageGenderNet.load(modelPath);
        await faceapi.nets.faceLandmark68Net.load(modelPath);
        await faceapi.nets.faceRecognitionNet.load(modelPath);
        await faceapi.nets.faceExpressionNet.load(modelPath);
        optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: minScore, maxResults });
        // check tf engine state
        // log(`Models loaded: ${str(faceapi.tf.engine().state.numTensors)} tensors`);
      }

      async function main() {
        // initialize tfjs
        // log('FaceAPI WebCam Test');
        recentTime = new Date();
        // if you want to use wasm backend location for wasm binaries must be specified
        // await faceapi.tf?.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${faceapi.tf.version_core}/dist/`);
        // await faceapi.tf?.setBackend('wasm');
        // log(`WASM SIMD: ${await faceapi.tf?.env().getAsync('WASM_HAS_SIMD_SUPPORT')} Threads: ${await faceapi.tf?.env().getAsync('WASM_HAS_MULTITHREAD_SUPPORT') ? 'Multi' : 'Single'}`);

        // default is webgl backend
        await faceapi.tf.setBackend('webgl');
        await faceapi.tf.ready();

        // tfjs optimizations
        if (faceapi.tf?.env().flagRegistry.CANVAS2D_WILL_READ_FREQUENTLY) faceapi.tf.env().set('CANVAS2D_WILL_READ_FREQUENTLY', true);
        if (faceapi.tf?.env().flagRegistry.WEBGL_EXP_CONV) faceapi.tf.env().set('WEBGL_EXP_CONV', true);
        if (faceapi.tf?.env().flagRegistry.WEBGL_EXP_CONV) faceapi.tf.env().set('WEBGL_EXP_CONV', true);

        // check version
        // log(`Version: FaceAPI ${str(faceapi?.version || '(not loaded)')} TensorFlow/JS ${str(faceapi.tf?.version_core || '(not loaded)')} Backend: ${str(faceapi.tf?.getBackend() || '(not loaded)')}`);

        await setupFaceAPI();
        await setupCamera();
      }

    main();
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', background: 'black', color: 'white', fontSize: '16px', lineHeight: '22px', margin: 0, overflow: 'hidden' }}>
      <video id="video" playsInline className="video"></video>
      <canvas id="canvas" className="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}></canvas>
      {/*<div id="log" style={{ overflowY: 'scroll', height: '16.5rem' }}></div>*/}
    </div>
  );
}

export default WebcamDemo;