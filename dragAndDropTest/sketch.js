// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extractor with MobileNet
=== */

// Grab all the DOM elements
var loading = document.getElementById('loading');
var catButton = document.getElementById('catButton');
var dogButton = document.getElementById('dogButton');
var amountOfCatImages = document.getElementById('amountOfCatImages');
var amountOfDogImages = document.getElementById('amountOfDogImages');
var train = document.getElementById('train');
var loss = document.getElementById('loss');
var result = document.getElementById('result');
var predict = document.getElementById('predict');

// A variable to store the total loss
let totalLoss = 0;

// Create a webcam capture


// A function to be called when the model has been loaded
function modelLoaded() {
  loading.innerText = 'Model loaded!';
}

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
// Create a new classifier using those features
const classifier = featureExtractor.classification();

// Predict the current frame.
function predict() {
  classifier.predict(document.getElementById('image'), gotResults);
}

// When the Cat button is pressed, add the current frame
// from the video with a label of cat to the classifier
catButton.onclick = function () {
  classifier.addImage(document.getElementById('image'),'true');
  amountOfCatImages.innerText = Number(amountOfCatImages.innerText) + 1;
}

// When the Cat button is pressed, add the current frame
// from the video with a label of cat to the classifier
dogButton.onclick = function () {
  classifier.addImage(document.getElementById('image'),'false');
  amountOfDogImages.innerText = Number(amountOfDogImages.innerText) + 1;
}

// When the train button is pressed, train the classifier
// With all the given cat and dog images
train.onclick = function () {
  classifier.train(function(lossValue) {
    if (lossValue) {
      totalLoss = lossValue;
      loss.innerHTML = 'Loss: ' + totalLoss;
    } else {
      loss.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
    }
  });
}

// A function to show the results and loop
function gotResults(data) {
  result.innerText = data;
}

// Start predicting when the predict button is clicked
predict.onclick = function () {
  classifier.classify(document.getElementById('image'), gotResults);
}

