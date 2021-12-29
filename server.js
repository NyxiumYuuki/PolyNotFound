const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: 'https://admin-polynotfound.herokuapp.com',
  credentials: true
}));

app.use(express.static(__dirname + '/dist/frontend-admin'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+ '/dist/frontend-admin/index.html'));
});

app.listen(port, '0.0.0.0',() => {
  console.log (`listening on port ${port}`);
});
