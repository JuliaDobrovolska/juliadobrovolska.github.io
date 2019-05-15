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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/interview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/interview.js":
/*!*****************************!*\
  !*** ./src/js/interview.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var questionsArray = [];
var numberQuestion = 0;
var main = document.getElementById('main');

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('GET', './json/questions.json');
xhr.onload = function () {
    questionsArray = this.response;
};
xhr.send();

window.onload = function getMedia() {
    var settings = document.getElementById('settings');
    var cloneSettings = settings.content.cloneNode(true);
    main.appendChild(cloneSettings);

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia({ audio: true, video: { width: 300, height: 300 } }, successCallback, errorCallback);

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
                var isRecordAgain = false;
                startButton.onclick = function viewQuestionsPage() {
                    var questions = document.getElementById('questions');
                    var cloneQuestions = questions.content.cloneNode(true);
                    main.appendChild(cloneQuestions);
                    var mainQuestions = document.querySelector('.main__questions');
                    main.appendChild(mainQuestions);

                    var mainContentQuestions = document.getElementById('mainContentQuestions');
                    var questionContent = document.getElementById('questionContent');
                    var remember = document.querySelector('.remember');
                    if (questionsArray.length != 0) {
                        if (isRecordAgain === false) {
                            var elem = questionsArray[numberQuestion];
                        } else {
                            var elem = questionsArray[numberQuestion];
                        }
                        var currentTpl = questionContent.content.cloneNode(true);
                        currentTpl.querySelector('#title').textContent = elem.title;
                        currentTpl.querySelector('#subtitle').textContent = elem.subtitle;
                        var listItems = currentTpl.querySelectorAll(".question__list__item");
                        for (var i = 0; i < listItems.length; i++) {
                            listItems[i].textContent = elem.questions[i].question;
                        }

                        mainContentQuestions.insertBefore(currentTpl, remember);
                    }

                    if (main.contains(mainStart)) {
                        main.removeChild(mainStart);
                    }
                    var userCamera = document.querySelector('video');
                    window.stream = stream;
                    userCamera.srcObject = stream;

                    var recordButton = document.querySelector('#recordButton');
                    var mediaRecorder;
                    var recordedBlobs = [];

                    recordButton.onclick = function toggleRecording() {

                        var pauseToggle = document.getElementById('pauseResumeToggle');
                        var clonePauseToggle = pauseToggle.content.cloneNode(true);
                        mainQuestions.appendChild(clonePauseToggle);

                        var stopVideoButton = document.getElementById('stopButtonTemp');
                        var cloneVideoButton = stopVideoButton.content.cloneNode(true);
                        mainQuestions.insertBefore(cloneVideoButton, pauseButton);
                        mainQuestions.removeChild(recordButton);

                        var videoLink = document.getElementById('videoLink');
                        var pulsePoint = document.getElementById('pulsePoint');
                        videoLink.textContent = "Идет запись";
                        videoLink.style.color = "#fff";
                        videoLink.style.left = "20%";
                        videoLink.style.backgroundColor = "#ff5d5d";
                        pulsePoint.style.display = "block";

                        var countdown = document.getElementById("countdown");
                        countdown.innerHTML = 'Остаток времени <span id="time" class="countdown__time"></span>';

                        startRecording();

                        var timeForFunction;
                        var timeoutHandle = undefined;
                        function timer(minutes, seconds) {
                            if (!timeoutHandle) {
                                var tick = function tick() {
                                    var counter = document.getElementById("time");

                                    counter.innerHTML = (minutes < 10 ? "0" : "") + minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
                                    timeForFunction = [minutes, seconds - 1];

                                    seconds--;
                                    if (seconds >= 0) {
                                        timeoutHandle = setTimeout(tick, 1000);
                                    } else {
                                        if (minutes >= 1) {
                                            setTimeout(function () {
                                                timer(minutes - 1, 59);
                                            }, 1000);
                                        } else {
                                            stopRecording();
                                        }
                                    }
                                };

                                tick();
                            }
                        }

                        timer(1, 30);

                        var pauseButton = document.getElementById('pauseButton');
                        var pauseImg = document.getElementById('pauseImg');
                        var pauseSpan = document.getElementById('pauseSpan');

                        pauseButton.onclick = function togglePauseResume() {
                            if (pauseSpan.textContent === "Поставить на паузу") {
                                mediaRecorder.pause();
                                videoLink.textContent = "Пауза";
                                videoLink.style.backgroundColor = "#dde2e6";
                                videoLink.style.color = "#4b4e4f";
                                videoLink.style.left = "7%";
                                pulsePoint.style.display = "none";

                                clearTimeout(timeoutHandle);
                                timeoutHandle = undefined;
                                pauseSpan.textContent = "Продолжить запись";
                                pauseImg.src = './img/stream.svg';
                            } else {
                                mediaRecorder.resume();
                                videoLink.textContent = "Идет запись";
                                videoLink.style.color = "#fff";
                                videoLink.style.left = "20%";
                                videoLink.style.backgroundColor = "#ff5d5d";
                                pulsePoint.style.display = "block";
                                timer(timeForFunction[0], timeForFunction[1]);
                                pauseSpan.textContent = "Поставить на паузу";
                                pauseImg.src = './img/pause.svg';
                            }
                        };

                        var stopButton = document.getElementById('stopButton');

                        stopButton.addEventListener('click', stopRecording);
                        function stopRecording() {
                            clearTimeout(timeoutHandle);
                            mainQuestions.removeChild(countdown);
                            mediaRecorder.stop();

                            var recordedVideoTemp = document.getElementById('recordedVideoTemp');
                            var cloneRecordedVideo = recordedVideoTemp.content.cloneNode(true);
                            mainQuestions.appendChild(cloneRecordedVideo);
                            var recordFigure = document.getElementById('recordVideoFigure');
                            var recordedFigure = document.getElementById('recordedVideoFigure');
                            mainQuestions.replaceChild(recordedFigure, recordFigure);

                            var nextQuestionTemp = document.getElementById('nextQuestionTemp');
                            var cloneNextQuestion = nextQuestionTemp.content.cloneNode(true);
                            mainQuestions.appendChild(cloneNextQuestion);
                            mainQuestions.removeChild(stopButton);
                            mainQuestions.removeChild(pauseButton);

                            var superBuffer = new Blob(recordedBlobs, { type: 'video/webm' }); //показать записанное видео
                            recordedVideo.src = window.URL.createObjectURL(superBuffer);

                            var play = document.querySelector('.play__img');
                            play.onclick = function play() {
                                document.querySelector('.play').style.display = "none";
                                recordedVideo.play();
                                recordedVideo.onended = function () {
                                    document.querySelector('.play').style.display = "flex";
                                };
                            };

                            var recordAgain = document.getElementById('recordAgain');
                            recordAgain.onclick = function recordVideoAgain() {
                                main.removeChild(mainQuestions);
                                isRecordAgain = true;
                                viewQuestionsPage();
                            };

                            var nextQuestion = document.getElementById('nextQuestion');
                            var finishButtonTemp = document.getElementById('finishButtonTemp');
                            var cloneFinishButton = finishButtonTemp.content.cloneNode(true);
                            if (numberQuestion === 4) {
                                mainQuestions.appendChild(cloneFinishButton);
                                mainQuestions.removeChild(nextQuestion);
                            } else {
                                nextQuestion.onclick = function nextQuestionsFunction() {
                                    main.removeChild(mainQuestions);
                                    isRecordAgain = false;
                                    numberQuestion++;
                                    viewQuestionsPage();
                                };
                            }
                        }
                    };

                    function startRecording() {
                        var options = { mimeType: 'video/webm;codecs=vp9', bitsPerSecond: 128000 };

                        try {
                            mediaRecorder = new MediaRecorder(window.stream, options);
                        } catch (e0) {
                            console.log('Unable to create MediaRecorder with options Object: ', options, e0);
                            try {
                                options = { mimeType: 'video/webm;codecs=vp8', bitsPerSecond: 128000 };
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

                        function handleDataAvailable(event) {
                            if (event.data && event.data.size > 0) {
                                recordedBlobs.push(event.data);
                            }
                        }
                        mediaRecorder.ondataavailable = handleDataAvailable;
                        mediaRecorder.start(10); // collect 10ms of data
                    }
                };
            };
        };
    }

    function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
    }
};

/***/ })

/******/ });
//# sourceMappingURL=interview.bundle.js.map