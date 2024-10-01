const express = require('express');

const PORT = 1245;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
