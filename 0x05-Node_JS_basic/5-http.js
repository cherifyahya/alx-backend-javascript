const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
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
      const studentGroups = {};
      const dbFieldNames = lines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      for (const line of lines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(studentGroups).includes(field)) {
          studentGroups[field] = [];
        }
        const studentEntries = studentPropNames.map((propName, idx) => [
          propName,
          studentPropValues[idx],
        ]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object.values(studentGroups).reduce(
        (pre, cur) => (pre || []).length + cur.length,
      );
      reportParts.push(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentGroups)) {
        reportParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      }
      resolve(reportParts.join('\n'));
    })
    .catch(() => {
      reject(new Error('Cannot load the database'));
    });
});

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    const responseText = 'Hello Holberton School!';
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(responseText),
    });
    res.end(responseText);
  } else if (req.url === '/students') {
    try {
      const report = await countStudents(csvPath);
      const responseText = `This is the list of our students\n${report}`;
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(responseText),
      });
      res.end(responseText);
    } catch (err) {
      const responseText = `This is the list of our students\n${err.message}`;
      res.writeHead(500, {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(responseText),
      });
      res.end(responseText);
    }
  } else {
    const responseText = 'Not Found';
    res.writeHead(404, {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(responseText),
    });
    res.end(responseText);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
