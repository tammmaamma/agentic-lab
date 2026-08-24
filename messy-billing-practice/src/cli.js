// src/cli.js
// 학번 유효성 검사 CLI. src/student-id.js의 validateStudentId()를 그대로 소비한다.
// 사용: node src/cli.js <학번>

const { validateStudentId } = require('./student-id');

const id = process.argv[2];
const result = validateStudentId(id);

if (result.valid) {
  console.log('valid');
} else {
  console.log(`invalid: ${result.reason}`);
}
