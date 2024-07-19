const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const cors = require('cors'); // 导入 cors 中间件
const fs =require('fs')

const app = express();
const upload = multer({ dest: path.join(__dirname, '../files') });


// 使用 cors 中间件
app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const newFileName = `${uuid.v4()}${path.extname(req.file.originalname)}`;
  const newFilePath = path.join(__dirname, './', newFileName);

  // 将文件移动到新的位置
  fs.renameSync(req.file.path, newFilePath);

  res.json({ fileName: newFileName });
});

app.get('/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, './', fileName);
  
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found.' });
    }
  
    // 读取文件并将其传递到前端
    const fileData = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    res.send(fileData);
  });
  app.get('/deleteFile', (req, res) => {
    const fileName = req.query.fileName;
    const filePath = path.join(__dirname, fileName);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(500).json({ error: 'Failed to delete file' });
      } else {
        console.log(`File "${fileName}" has been deleted.`);
        res.json({ message: 'File deleted successfully' });
      }
    });
  });


app.listen(3010, () => {
  console.log('Server is running on port 3010');
});