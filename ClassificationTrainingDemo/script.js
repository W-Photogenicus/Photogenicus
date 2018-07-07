

let features = ml5.featureExtractor('MobileNet');


// Create a new classifier using those features
const classifier = featureExtractor.asClassifier(video);

// Add a new image with a label
classifier.addImage(document.getElementById('t1') , 'true');
classifier.addImage(document.getElementById('t2') , 'true');
classifier.addImage(document.getElementById('t3') , 'true');
classifier.addImage(document.getElementById('t4') , 'true');
classifier.addImage(document.getElementById('t5') , 'true');
classifier.addImage(document.getElementById('t6') , 'true');
classifier.addImage(document.getElementById('f1') , 'false');
classifier.addImage(document.getElementById('f2') , 'false');
classifier.addImage(document.getElementById('f3') , 'false');
classifier.addImage(document.getElementById('f4') , 'false');
classifier.addImage(document.getElementById('f5') , 'false');



// Retrain the network
classifier.train();

// Get a prediction for that image
classifier.predict(document.getElementById('test1'), function(results) {
  console.log(results) // Should output ['dog']
});
classifier.predict(document.getElementById('test2'), function(results) {
  console.log(results) // Should output ['dog']
});
classifier.predict(document.getElementById('test3'), function(results) {
  console.log(results) // Should output ['dog']
});
classifier.predict(document.getElementById('test4'), function(results) {
  console.log(results) // Should output ['dog']
});