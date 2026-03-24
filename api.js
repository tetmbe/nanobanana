export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.APIMART_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: '服务器未配置 APIMART_API_KEY'
    });
  }

  try {
    const {
      prompt,
      size = '1:1',
      model = 'qwen-image-2.0',
      resolution = '1K',
      n = 1,
      imageUrls = [],
      negativePrompt = ''
    } = req.body || {};

    if (!prompt || !String(prompt).trim()) {
      return res.status(400).json({
        error: 'prompt 不能为空'
      });
    }

    if (imageUrls && !Array.isArray(imageUrls)) {
      return res.status(400).json({
        error: 'imageUrls 必须是数组'
      });
    }

    const payload = {
      model,
      prompt: String(prompt).trim(),
      size,
      resolution,
      n
    };

    if (negativePrompt && String(negativePrompt).trim()) {
      payload.negative_prompt = String(negativePrompt).trim();
    }

    if (imageUrls && imageUrls.length > 0) {
      payload.image_urls = imageUrls;
    }

    // 1) 提交生成任务
    const submitResp = await fetch('https://api.apimart.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const submitData = await submitResp.json().catch(() => ({}));

    if (!submitResp.ok) {
      return res.status(submitResp.status).json({
        error:
          submitData?.error?.message ||
          submitData?.message ||
          '提交生成任务失败',
        detail: submitData
      });
    }

    // 兼容不同返回结构
    const taskId =
      submitData?.data?.[0]?.task_id ||
      submitData?.data?.task_id ||
      submitData?.task_id;

    if (!taskId) {
      return res.status(500).json({
        error: '已提交任务，但未拿到 task_id',
        detail: submitData
      });
    }

    // 2) 轮询任务状态
    const maxAttempts = 30; // 约 60 秒
    const intervalMs = 2000;

    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));

      const taskResp = await fetch(`https://api.apimart.ai/v1/tasks/${taskId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const taskData = await taskResp.json().catch(() => ({}));

      if (!taskResp.ok) {
        return res.status(taskResp.status).json({
          error:
            taskData?.error?.message ||
            taskData?.message ||
            '查询任务状态失败',
          taskId,
          detail: taskData
        });
      }

      const task =
        Array.isArray(taskData?.data) ? taskData.data[0] :
        taskData?.data || {};

      const status = task?.status || taskData?.status || '';

      if (status === 'completed' || status === 'succeeded' || status === 'success') {
        const rawImages =
          task?.result?.images ||
          task?.images ||
          task?.output?.images ||
          [];

        const images = normalizeImages(rawImages);

        return res.status(200).json({
          ok: true,
          taskId,
          status,
          images
        });
      }

      if (status === 'failed' || status === 'error') {
        return res.status(500).json({
          error: task?.error || task?.message || '图片生成失败',
          taskId,
          raw: taskData
        });
      }
    }

    return res.status(202).json({
      ok: false,
      taskId,
      status: 'processing',
      message: '任务仍在处理中，请稍后重试'
    });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || '服务器内部错误'
    });
  }
}

function normalizeImages(rawImages) {
  if (!Array.isArray(rawImages)) return [];

  return rawImages
    .map((item) => {
      if (typeof item === 'string') return item;

      if (Array.isArray(item?.url) && item.url.length > 0) {
        return item.url[0];
      }

      if (typeof item?.url === 'string') {
        return item.url;
      }

      if (typeof item?.image_url === 'string') {
        return item.image_url;
      }

      if (typeof item?.src === 'string') {
        return item.src;
      }

      return '';
    })
    .filter(Boolean);
}