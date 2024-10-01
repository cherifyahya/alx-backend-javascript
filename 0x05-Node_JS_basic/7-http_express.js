const express = require('express');
const fs = require('fs').promises;

const PORT = 1245;
const app = express();
const csvPath = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(dataPath, 'utf-8')
    .then((data) => {
      const reportParts = [];
      const lines = data.trim().split('\n');
      const count = lines.length - 1;

      reportParts.push(`Number of students: ${count}`);

      const swe = [];
      const cs = [];
      for (let i = 1; i <= count; i += 1) {
        const student = lines[i].trim();
        if (student) {
          const studentFields = student.split(',');
          const firstname = studentFields[0];
          const field = studentFields[3];
          if (field === 'CS') {
            cs.push(firstname);
          } else if (field === 'SWE') {
            swe.push(firstname);
          }
        }
      }

      reportParts.push(`Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`);
      reportParts.push(`Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
      resolve(reportParts.join('\n'));
    })
    .catch(() => {
      reject(new Error('Cannot load the database'));
    });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const report = await countStudents(csvPath);
    const responseText = `This is the list of our students\n${report}`;
    res.set('Content-Type', 'text/plain');
    res.set('Content-Length', Buffer.byteLength(responseText));
    res.send(responseText);
  } catch (err) {
    const responseText = `This is the list of our students\n${err.message}`;
    res.set('Content-Type', 'text/plain');
    res.set('Content-Length', Buffer.byteLength(responseText));
    res.send(responseText);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
