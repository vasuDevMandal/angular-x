const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './data.json';
function readData() {
  if (!fs.existsSync(DATA_FILE)) return { users: [], jobs: [] };
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const user = data.users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  if (data.users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, message: 'User exists' });
  }
  const newUser = { username, password };
  data.users.push(newUser);
  writeData(data);
  res.json({ success: true, user: newUser });
});

app.get('/api/jobs', (req, res) => {
  const data = readData();
  res.json(data.jobs);
});
app.post('/api/jobs', (req, res) => {
  const job = req.body;
  const data = readData();
  job.id = Date.now();
  data.jobs.push(job);
  writeData(data);
  res.json(job);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
