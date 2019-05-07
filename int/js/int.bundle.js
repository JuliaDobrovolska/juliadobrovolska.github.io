/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/int.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/int.js":
/*!***********************!*\
  !*** ./src/js/int.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./modules/mediaRecorder */ "./src/js/modules/mediaRecorder.js");

var main = document.getElementById('main');

window.onload = function getMedia() {
  var settings = document.getElementById('settings');
  var cloneSettings = settings.content.cloneNode(true);
  main.appendChild(cloneSettings);

  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
  navigator.getUserMedia({ audio: true, video: true }, successCallback, errorCallback);

  function successCallback(stream) {
    var settingsButton = document.querySelector('#settingsButton');
    var mainSettings = document.querySelector('.main__settings');

    settingsButton.disabled = !settingsButton.disabled;
    settingsButton.onclick = function viewRulesPage() {

      var rules = document.getElementById('rules');
      var cloneRules = rules.content.cloneNode(true);
      main.appendChild(cloneRules);
      var mainRules = document.querySelector('.main__rules');
      main.replaceChild(mainRules, mainSettings);
      var userCamera = document.querySelector('video');
      window.stream = stream;
      userCamera.srcObject = stream;

      var rulesButton = document.querySelector('#rulesButton');
      rulesButton.onclick = function viewStartPage() {
        var start = document.getElementById('start');
        var cloneStart = start.content.cloneNode(true);
        main.appendChild(cloneStart);
        var mainStart = document.querySelector('.main__start');
        main.replaceChild(mainStart, mainRules);
        var userCamera = document.querySelector('video');
        window.stream = stream;
        userCamera.srcObject = stream;

        var startButton = document.querySelector('#startButton');
        startButton.onclick = function viewQuestionsPage() {
          var questions = document.getElementById('questions');
          var cloneQuestions = questions.content.cloneNode(true);
          main.appendChild(cloneQuestions);
          var mainQuestions = document.querySelector('.main__questions');
          main.replaceChild(mainQuestions, mainStart);
          var userCamera = document.querySelector('video');
          window.stream = stream;
          userCamera.srcObject = stream;
          //   console.log(document.querySelector)


          //  here media recorder start


          var recordButton = document.querySelector('#recordButton');
          var mediaRecorder;
          var recordedBlobs = [];

          recordButton.onclick = function toggleRecording() {
            startRecording();
            var pauseToggle = document.getElementById('pauseResumeToggle');
            var clonePauseToggle = pauseToggle.content.cloneNode(true);
            mainQuestions.appendChild(clonePauseToggle);
            var pauseButton = document.getElementById('pauseButton');

            var stopVideoButton = document.getElementById('stopVideoButton');
            var cloneVideoButton = stopVideoButton.content.cloneNode(true);

            mainQuestions.insertBefore(cloneVideoButton, pauseButton);
            mainQuestions.removeChild(recordButton);
          };

          // function togglePause(){
          //   if (pauseButton.textContent === "Поставить на паузу") {
          //     // функция паузы
          //   } else {
          //     // функция resume
          //     pauseButton.textContent = 'Поставить на паузу';

          //   }
          // }


          function startRecording() {
            var options = { mimeType: 'video/webm;codecs=vp9', bitsPerSecond: 100000 };

            try {
              mediaRecorder = new MediaRecorder(window.stream, options);
            } catch (e0) {
              console.log('Unable to create MediaRecorder with options Object: ', options, e0);
              try {
                options = { mimeType: 'video/webm;codecs=vp8', bitsPerSecond: 100000 };
                mediaRecorder = new MediaRecorder(window.stream, options);
              } catch (e1) {
                console.log('Unable to create MediaRecorder with options Object: ', options, e1);
                try {
                  options = 'video/mp4';
                  mediaRecorder = new MediaRecorder(window.stream, options);
                } catch (e2) {
                  alert('MediaRecorder is not supported by this browser.');
                  console.error('Exception while creating MediaRecorder:', e2);
                  return;
                }
              }
            }
            console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

            function handleDataAvailable(event) {
              if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
              }
            }
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.start(10); // collect 10ms of data
            console.log('MediaRecorder started', mediaRecorder);
          }

          var stopVideo = document.getElementById('stopButton');
          stopVideo.onclick = function stopRecording() {
            mediaRecorder.stop();

            var recordedVideoTemp = document.getElementById('recordedVideoTemp');
            var cloneRecordedVideo = recordedVideoTemp.content.cloneNode(true);
            mainQuestions.appendChild(cloneRecordedVideo);
            var recordFigure = document.getElementById('recordVideoFigure');
            var recordedFigure = document.getElementById('recordedVideoFigure');
            mainQuestions.replaceChild(recordedFigure, recordFigure);

            //поменять кнопки
            var nextQuestionTemp = document.getElementById('nextQuestionTemp');
            var cloneNextQuestion = nextQuestionTemp.content.cloneNode(true);
            mainQuestions.appendChild(cloneNextQuestion);
            mainQuestions.removeChild(stopVideo);
            mainQuestions.removeChild(pauseButton);

            var superBuffer = new Blob(recordedBlobs, { type: 'video/webm' }); //показать записанное видео
            recordedVideo.src = window.URL.createObjectURL(superBuffer);

            // var recordedVideo = document.querySelector('#recordedVideo');
            // recordedVideo.controls = true;                                      ///панель видео


            var play = document.querySelector('.play__img');
            play.onclick = function play() {
              document.querySelector('.play').style.display = "none";
              recordedVideo.play();
              recordedVideo.onended = function () {
                document.querySelector('.play').style.display = "block";
              };
            };
          };

          //  here media recorder end

        };
      };
    };
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }
};

/***/ }),

/***/ "./src/js/modules/mediaRecorder.js":
/*!*****************************************!*\
  !*** ./src/js/modules/mediaRecorder.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })

/******/ });
//# sourceMappingURL=int.bundle.js.map