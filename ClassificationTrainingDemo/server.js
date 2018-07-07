const express = require('express');


const app = express();
app.use(bodyParser());
app.use(express.static('dragAndDropTest')
)

app.get('/', (req, res) => {
  console.log('requesting root');
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});