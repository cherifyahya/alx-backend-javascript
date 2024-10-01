const fs = require('fs');

const countStudents = (csvPath) => {
  if (!fs.existsSync(csvPath)) {
    throw new Error('Cannot load the database');
  }

  const data = fs.readFileSync(csvPath, 'utf8');
  const lines = data.trim().split('\n');

  const count = lines.length - 1;
  console.log(`Number of students: ${count}`);

  const CS = [];
  const SWE = [];

  for (let i = 1; i <= count; i += 1) {
    const line = lines[i].split(',');
    const studentName = line[0].trim();
    const studentClass = line[3].trim();

    if (studentClass === 'CS') {
      CS.push(studentName);
    } else if (studentClass === 'SWE') {
      SWE.push(studentName);
    }
  }

  console.log(`Number of students in CS: ${CS.length}. List: ${CS.join(', ')}`);
  console.log(`Number of students in SWE: ${SWE.length}. List: ${SWE.join(', ')}`);
};

module.exports = countStudents;
