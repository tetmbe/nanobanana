做一个图片生成器，使用 apimart ,apikey已经放在.env里了
要求：

-   **不要用 Next.js**
    
-   **只用纯 HTML + JS**
    
-   **越简单越好**
-   超时时间为15分钟
    

----------

# 📌 APIMart 图像生成 API（精简版）

## 🔐 鉴权

所有接口都需要：

`Authorization: Bearer YOUR_API_KEY` 

在项目中用 `APIMART_API_KEY` 代替即可。

----------

# 📤 创建图片生成任务

Request 参数
**POST** `/v1/images/generations`

| 参数         | 类型      | 必须  | 描述                        |
| ---------- | ------- | --- | ------------------------- |
| model      | string  | Yes | 如 `"gpt-4o-image"`        |
| prompt     | string  | Yes | 文本描述                      |
| size       | string  | No  | `"1:1"`, `"2:3"`, `"3:2"` |
| n          | integer | No  | 1、2、4                     |
| image_urls | array   | No  | 参考图                       |
| mask_url   | string  | No  | 遮罩图                       |

### 示例（创建任务）

`fetch("https://api.apimart.ai/v1/images/generations", { method: "POST", headers: { "Authorization": "Bearer " + APIMART_API_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-4o-image", prompt: "A serene lake at sunset with mountains in the background", size: "1:1", n: 1 })
});` 

### 返回示例

`{  "code":  200,  "data":  [  {  "status":  "submitted",  "task_id":  "task_01K8SGYNNNVBQTXNR4MM964S7K"  }  ]  }` 

----------

# 📥 查询任务结果

**GET** `/v1/tasks/{task_id}`

### 返回示例

{"code":200,"data":{"actual_time":48,"completed":1764147612,"created":1764147564,"estimated_time":100,"id":"task_01KAZP73N3XQ0ARPBE49JA8DDV","progress":100,"result":{"images":[{"expires_at":1764234012,"url":["https://upload.apimart.ai/f/image/9998235852389548-368afb3b-2398-4cd8-8cb0-3d73f3e0e565-image_task_01KAZP8GSA88QPF0PF6AS3ZJ2A_0.png"]}]},"status":"completed"}}%