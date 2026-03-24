import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 获取 multipart form data
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // 解析 multipart boundary
    const contentType = req.headers['content-type'];
    const boundary = contentType.split('boundary=')[1];
    
    if (!boundary) {
      return res.status(400).json({ error: 'No boundary in content-type' });
    }

    // 简单解析 multipart，提取文件内容
    const parts = buffer.toString('binary').split(`--${boundary}`);
    let fileBuffer = null;
    let fileName = 'reference.jpg';
    let contentTypeFound = 'image/jpeg';

    for (const part of parts) {
      if (part.includes('Content-Disposition') && part.includes('filename=')) {
        // 提取文件名
        const nameMatch = part.match(/filename="([^"]+)"/);
        if (nameMatch) {
          fileName = nameMatch[1];
        }
        
        // 提取 content-type
        const ctMatch = part.match(/Content-Type:\s*([^\r\n]+)/i);
        if (ctMatch) {
          contentTypeFound = ctMatch[1].trim();
        }

        // 提取文件内容（在第一个 \r\n\r\n 之后）
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
          let content = part.substring(headerEnd + 4);
          // 移除末尾的 \r\n
          if (content.endsWith('\r\n')) {
            content = content.slice(0, -2);
          }
          fileBuffer = Buffer.from(content, 'binary');
        }
        break;
      }
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return res.status(400).json({ error: 'No file found in request' });
    }

    // 验证文件大小（5MB）
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large (max 5MB)' });
    }

    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(contentTypeFound)) {
      return res.status(400).json({ error: 'Invalid file type (only JPG, PNG, WEBP)' });
    }

    // 上传到 Vercel Blob
    const blob = await put(fileName, fileBuffer, {
      contentType: contentTypeFound,
      access: 'public',
    });

    return res.status(200).json({
      url: blob.url,
      success: true,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: 'Upload failed: ' + error.message,
    });
  }
}
