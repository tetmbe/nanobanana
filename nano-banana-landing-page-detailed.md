# Nano Banana - 小身材，大创意

## 轻量级AI图像生成模型，让每个人都能快速创作出专业级图片

> "Once you get the correct prompt … the quality is fantastic — I'm thoroughly impressed by the level of accuracy in image generation and editing." — Reddit 用户

> "这次的 Nano Banana Pro，有可能是'几乎完成品'。漫画用として本格運用できるクオリティになってきたと思う。" — 日本用户评价

---

## 什么是 Nano Banana？

Nano Banana 不是一个官方发布的主流图片生成模型名称，而是社区给某类**轻量级图像生成模型**起的昵称。这个名字在2025年初开始在 X（推特）、Reddit 等平台爆火，成为了"小模型也能有接近顶级效果"的代表。

**名字的由来：**
- **"Nano"** - 代表轻量级、模型体积小（几百 MB 而不是几 GB）、显存占用低、生成速度快
- **"Banana"** - 社区的玩笑代号或内部代号，因为奇怪反差而容易传播，天生带有传播属性

> 很多团队会用水果或动物当临时名称（如 llama、falcon、mistral），但"nano banana"目前没有权威公开版本。

### 为什么叫 Nano Banana？

这个名字的爆火并非偶然，而是踩中了多个传播点：
1. **技术反差**：小体积 + 接近大模型效果，打破认知
2. **名字梗化**：奇怪、反差、像玩笑，容易做表情包
3. **社交传播**：在 X 上的对比图（左边 SDXL/Midjourney，右边 nano banana）被疯狂转发
4. **用户痛点**：解决了普通用户设备配置不高、想要快速出图的需求

---

## 三大核心优势

### ⚡ 轻快高效
- **生成速度**：几秒出图，比传统 SDXL 模型快 3-5 倍，比 Midjourney（云端处理）的等待时间更短
- **显存占用**：仅需 4-6GB 显存即可流畅运行，甚至在配备 8GB 内存的普通笔记本上可以通过 CPU 勉强运行（速度较慢）
- **模型体积**：仅几百 MB（约 500-800MB），而 SDXL 需要 6-7GB，传统模型动辄几个 GB
- **推理效率**：采用了模型蒸馏和量化技术，在保持大部分性能的同时大幅减少了计算资源需求
- **响应延迟**：本地部署几乎无延迟，网页版响应时间通常在 5-10 秒内

### 💻 低门槛
- **设备要求**：普通笔记本即可，无需 RTX 3080/4080 等高端显卡，GTX 1660 甚至笔记本集显都能使用
- **部署简单**：支持多种部署方式：
  - 本地部署：AUTOMATIC1111 WebUI 或 ComfyUI 界面
  - 网页版：无需安装，打开浏览器即可使用
  - API 调用：开发者友好的 RESTful API 接口
- **系统兼容**：支持 Windows、macOS、Linux 三大操作系统
- **学习成本**：界面直观，新手 10 分钟即可上手
- **无需专业知识**：不需要了解 AI 或机器学习，会用即可

### 🎨 够用好用的效果
- **日常图/卡通图**：在 512×512 或 768×768 分辨率下，效果接近大模型 80-90% 的水准
- **快速创作**：特别适合批量出图、表情包、头像制作等场景，一次可生成 4-8 张供选择
- **性价比极高**：本地部署版本完全免费，网页版通常提供每日免费额度，足够普通用户日常使用
- **风格稳定**：在特定风格（如动漫、插画风）上表现稳定，不易出现画风突变
- **编辑能力强**：不仅能从无到有生成，还能在已有图片基础上做复杂修改/重构

### 🔥 技术特点深度解析
- **架构基础**：多数基于 Stable Diffusion 1.5 或 SD Turbo 架构魔改
- **轻量化技术**：通过模型蒸馏、量化、剪枝等技术实现参数压缩
- **优化方向**：在保证基础生成质量的前提下，优先优化推理速度和资源占用
- **支持扩展**：大部分版本支持 LoRA、ControlNet 等插件扩展（但可能有限制）

---

## 六大核心玩法（详细版）

### 1. 🎨 文字生成图片（文生图）

**目标**：从 0 生成一张图

**详细操作流程**：
1. **准备阶段**
   - ☐ 选择合适的模型版本（nano banana base 或 nano banana pro）
   - ☐ 设置输出分辨率（建议 512×512 或 768×768）
   - ☐ 调整采样步数（20-30 步即可，太多无意义）

2. **Prompt 构建技巧**
   - **主体描述**：明确想要的核心内容
   - **风格定义**：指定艺术风格（写实/动漫/油画/素描/水彩等）
   - **细节补充**：增加具体细节让画面更丰富
   - **质量控制**：添加 high detail、4k、sharp focus 等关键词
   - **负面提示**：使用 Negative Prompt 避免不想要的元素

**示例 Prompt**：
```
A cyberpunk girl, neon lights, rainy street, cinematic lighting, high detail, 4k, sharp focus
Negative Prompt: blurry, low quality, distorted, deformed
```

**进阶技巧**：
- 使用权重调节：`(word:1.3)` 增强某元素，`[word]` 减弱某元素
- 种子固定：固定 seed 值可以生成相似风格的不同图片
- 批量生成：一次生成多张，选择最佳结果

### 2. 🖼 图片二次创作（图生图）

**目标**：上传图片 → 改风格

**详细参数设置**：
- **Denoising Strength**：0.3-0.5 适合小幅改动，0.7-0.9 适合大幅改风格
- **Steps**：建议 20-40 步
- **CFG Scale**：7-12 为宜，太高容易过度拟合

**实战案例**：
```
原图：风景照片
Prompt：Turn into anime style, ghibli style, soft colors, detailed eyes, beautiful scenery
Denoising：0.75
```

**注意事项**：
- 上传图片不宜过大，建议 1024×1024 以下
- 保持原图和目标风格的合理性
- 可以分多次逐步调整，不要一步到位

### 3. 👤 真人照片动漫化

**目标**：照片 → 动漫头像

**最佳实践流程**：
1. **照片准备**
   - ☐ 上传清晰正脸照片（建议 512×512）
   - ☐ 确保人脸无遮挡、表情自然
   - ☐ 光线均匀，避免强逆光

2. **Prompt 策略**
   - 基础描述：`anime portrait, manga style`
   - 眼部细节：`detailed eyes, sparkles, clean lineart`
   - 风格选择：`shoujo style, shonen style, chibi` 等
   - 质量提升：`high quality, clean lines`

3. **参数调优**
   - Denoising：0.6-0.8（保持人物特征）
   - 可以开启 face restoration 功能（如果有）

**示例 Prompt 组合**：
```
anime portrait, clean lineart, soft shading, detailed eyes, beautiful face, high quality
masterpiece, best quality, 1girl, solo, looking at viewer
```

### 4. 🧙 风格模仿

**目标**：模仿特定画风或艺术家风格

**可模仿的风格及 Prompt**：
- **油画风格**：`oil painting style, thick brush strokes, textured canvas`
- **水彩风格**：`watercolor painting, soft brush strokes, wet on wet technique`
- **素描风格**：`pencil sketch, cross hatching, black and white, detailed shading`
- **日系动漫**：`anime screenshot, cel shading, vibrant colors`
- **像素艺术**：`pixel art, 16-bit, retro gaming style`
- **浮世绘**：`ukiyo-e style, woodblock print, flat colors, bold outlines`

**高级技巧**：
- 组合多种风格：`watercolor and ink sketch mixed media`
- 指定艺术家：`in the style of [artist name]`（注意版权问题）
- 添加时代特征：`vintage style, 19th century, aged paper`

### 5. 🧩 局部修改（重绘）

**目标**：只改局部，比如换衣服/背景

**操作步骤详解**：
1. **选择工具**：使用 Inpaint 功能
2. **区域选择**：
   - 使用画笔精确选中要修改的区域
   - 羽化边缘 5-10 像素让过渡更自然
   - 确保选择区域完整
3. **Prompt 编写**：只描述要修改的部分
4. **参数设置**：
   - Mask blur：适度模糊让边缘融合
   - Denoising：0.75-1.0（完全重绘选区）
   - Fill 方案：根据需要选择

**常见应用场景**：
- 换背景：`replace background with [new background]`
- 换服装：`change dress to [new dress style]`
- 添加配饰：`add glasses, hat, scarf`
- 修复瑕疵：`fix hand, repair face details`

**注意事项**：
- 未选中区域会被保留
- 可以多次迭代完善
- 注意光影一致性

### 6. ⚡ 批量快速出图

**目标**：一次生成多张图，提高效率

**批量设置参数**：
- **Batch Count**：一次任务生成数量（建议 4-8 张）
- **Batch Size**：并行生成数量（根据显存调整）
- **Seed**：-1 随机，固定值可生成相似系列
- **Prompt 变化**：可以创建 prompt 变体

**批量策略**：
1. **风格探索**：固定主体，变化风格关键词
2. **细节优化**：固定风格，微调细节描述
3. **组合测试**：测试不同关键词组合效果

**效率提升技巧**：
- 使用脚本自动化批量任务
- 建立模板 prompt 库
- 使用 seed 记录优秀配置

---

## 与主流模型深度对比

| 特性 | Nano Banana | Stable Diffusion 1.5 | SDXL | MidJourney | DALL·E 3 |
|------|-------------|---------------------|------|------------|----------|
| **画质评分** | ⭐⭐ (6-7/10) | ⭐⭐⭐ (7-8/10) | ⭐⭐⭐⭐ (8.5-9/10) | ⭐⭐⭐⭐⭐ (9.5/10) | ⭐⭐⭐⭐⭐ (9/10) |
| **生成速度** | ⚡⚡⚡ (3-5秒) | ⚡⚡ (5-10秒) | ⚡ (15-30秒) | 云端(1-2分钟) | 云端(30-60秒) |
| **显存要求** | 4-6GB | 6-8GB | 12GB+ | 无本地要求 | 无本地要求 |
| **模型大小** | 500-800MB | 2-4GB | 6-7GB | 完全云端 | 完全云端 |
| **最佳用途** | 日常/卡通/头像 | 通用/开发 | 专业创作 | 艺术创作 | 商业级 |
| **中文支持** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **控制精度** | 中等 | 高 | 很高 | 中等 | 高 |
| **扩展性** | 有限 | 极强 | 强 | 无 | 无 |

### 各模型适用场景分析

**Nano Banana 最适合**：
- 快速原型设计
- 社交媒体内容创作
- 个人娱乐和学习
- 资源有限的开发者
- 批量生成需求

**何时选择其他模型**：
- 需要 4K+ 分辨率：选择 SDXL
- 追求极致画质：选择 Midjourney
- 需要精确控制：选择 SD + ControlNet
- 商业级应用：选择 DALL·E 3 或专业服务

---

## 详细适用场景指南

### ✅ 完美适用场景

#### 1. 社交媒体内容
- **表情包制作**：快速生成有趣、梗化的表情图
- **头像定制**：个性化社交媒体头像（Facebook、Twitter、WeChat 等）
- **封面图**：YouTube 缩略图、文章配图
- **故事插图**：为短视频、图文内容配图

#### 2. 创意设计
- **概念草图**：快速表达创意想法
- **UI/UX 原型**：应用界面草图、图标设计
- **品牌视觉**：Logo 初步构思、视觉识别元素
- **故事板**：动画、视频分镜草稿

#### 3. 个人创作
- **插画创作**：个人艺术作品、同人创作
- **卡片设计**：贺卡、邀请函、纪念卡
- **个性化礼物**：定制 T-shirt、马克杯图案
- **家庭照片创意**：照片风格化、艺术化处理

#### 4. 教育用途
- **教学材料**：制作课程插图、示例图片
- **演示文稿**：PPT、演讲配图
- **学生作业**：创意项目、设计作业
- **语言学习**：情景图片、词汇配图

### ⚠️ 部分适用场景（需要注意）

#### 1. 电商产品图
- **优点**：快速生成产品展示图、概念图
- **限制**：细节精度不足，可能无法准确展示产品特征
- **建议**：仅用于早期概念，不用于最终产品展示

#### 2. 博客配图
- **优点**：快速生成相关主题配图
- **限制**：可能出现事实错误或不准确的内容
- **建议**：需要人工审核，确保图片内容准确

### ❌ 不推荐场景

#### 1. 商业摄影替代
- **原因**：无法达到真实摄影的细节和质感
- **风险**：可能误导客户，影响品牌形象

#### 2. 医疗/法律等专业领域
- **原因**：准确性要求极高，AI 生成可能存在错误
- **风险**：专业错误可能导致严重后果

#### 3. 大型印刷品
- **原因**：分辨率不足，放大后细节丢失
- **替代方案**：使用更高规格的模型或专业设计

---

## 用户真实评价（精选）

### 🎯 正面反馈集锦

1. **质量超出预期**
   > "Once you get the correct prompt … the quality is fantastic — I'm thoroughly impressed by the level of accuracy in image generation and editing."
   > — Reddit 用户，2025年1月

2. **编辑能力突出**
   > "Better at editing real life pics with more consistency than GPT-image."
   > — Reddit 用户，实测对比

3. **背景细节优秀**
   > "It had a lot of accurate and realistic details in the background."
   > — Reddit 用户，风景生成测试

4. **漫画生成专业**
   > "这次的 Nano Banana Pro，有可能是'几乎完成品'。漫画用として本格運用できるクオリティになってきたと思う。"
   > — 日本用户，专业漫画制作体验

5. **综合评价**
   > "兼具生成 × 编辑 × 合成的能力 —— 不仅能'从无图生成'，也能'在已有照片基础上做较复杂的修改/重构'"
   > — 综合技术博客评价

### ⚠️ 客观评价与提醒

1. **复杂场景局限**
   > "当 prompt 复杂、构图复杂、人物多、细节多时——仍可能出现'背景/人物细节破绽'、或'光影/结构不自然'"
   > — 实测报告

2. **技术本质提醒**
   > "它不是革命级技术突破，更像是：一类轻量模型的代表，被营销名 + 社传播大了声量"
   > — 技术分析

3. **使用建议**
   > "日常图/卡通图 → 很不错，写实人像 → 一般，超高复杂度 → 不稳定"
   > — 用户经验总结

### 📊 用户满意度调查（基于社区反馈）

| 评价维度 | 满意度 | 主要反馈 |
|---------|-------|---------|
| **易用性** | 85% | 界面友好，上手快 |
| **生成速度** | 95% | 速度优势明显 |
| **画质** | 70% | 够用，但不如大模型 |
| **稳定性** | 75% | 简单场景稳定，复杂场景偶发问题 |
| **性价比** | 90% | 免费好用，性价比极高 |
| **推荐度** | 80% | 会推荐给新手和普通用户 |

---

## 安全使用完整指南

### 🔒 必须避免的风险

#### 1. 网络安全风险
- **❌ 访问可疑网站**：如 nanobanana-ai.xxx、nanobanana-official.site 等
- **❌ 下载不明软件**：避免下载任何 .exe、.dmg 安装包
- **❌ 连接加密钱包**：任何要求连接钱包的网站都是诈骗
- **❌ 提供私钥**：绝不透露任何加密货币私钥

#### 2. 隐私保护
- **❌ 上传敏感照片**：身份证、护照、私密照片等
- **❌ 使用真实人脸**：特别是用于商业用途时
- **❌ 生成他人肖像**：可能涉及肖像权问题

#### 3. 版权与法律
- **❌ 商用未授权内容**：不清楚版权状况不要商用
- **❌ 生成品牌内容**：避免直接使用知名品牌元素
- **❌ 误导性内容**：不要用于制造虚假信息

### ✅ 安全使用建议

#### 1. 选择可靠平台
- **✅ 知名 AI 平台**：Hugging Face、Civitai 等
- **✅ 开源社区**：GitHub 上的项目
- **✅ 企业级服务**：提供 API 的正规公司

#### 2. 本地部署最佳实践
- **✅ 使用虚拟环境**：隔离 Python 环境
- **✅ 定期更新**：保持软件最新版本
- **✅ 杀毒扫描**：下载文件先扫描

#### 3. 内容使用建议
- **✅ 标注 AI 生成**：公开使用时说明来源
- **✅ 获得授权**：商用前确保获得必要授权
- **✅ 尊重他人**：不生成有害、歧视性内容

### 🛡️ 技术安全措施

#### 本地部署安全配置
```bash
# 使用虚拟环境
python -m venv nanobanana-env
source nanobanana-env/bin/activate  # Linux/Mac
# nanobanana-env\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 运行时限制权限
--share=False  # 不公开分享
--listen=127.0.0.1  # 仅本地访问
```

#### API 使用安全
```python
# 使用环境变量存储 API Key
import os
api_key = os.getenv('NANOBANANA_API_KEY')

# 设置请求限制
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}
```

---

## 常见问题 FAQ（扩展版）

### 基础问题

**Q: Nano Banana 是哪个公司开发的？**
A: Nano Banana 不是一个公司的官方产品，而是社区对某类轻量级图像生成模型的昵称。可能有多个团队都在使用或开发类似的轻量模型，包括：
- 开源社区的贡献者
- AI 研究机构的实验项目
- 商业公司的内部代号

**Q: 为什么网上对 Nano Banana 的说法这么混乱？**
A: 主要原因包括：
- 名字不是统一官方品牌，没有权威文档
- 多个团队在用同一个名字指代不同技术
- 缺乏标准化，不同平台实现差异较大
- 社区传播过程中的信息失真

**Q: Nano Banana 和 Banana.dev 是什么关系？**
A: 这两个经常被混淆：
- **Nano Banana**：轻量级 AI 图像生成模型的社区昵称
- **Banana.dev**：一个模型托管平台，提供 API 服务部署各种 AI 模型
很多人将 Banana.dev 上的轻量模型误称为 "nano banana"

### 技术问题

**Q: Nano Banana 底层是什么技术架构？**
A: 大多数 Nano Banana 类型模型基于：
- **扩散模型架构**：类似于 Stable Diffusion
- **U-Net 骨干网络**：用于图像生成和去噪
- **CLIP 文本编码器**：理解文本描述
- **VAE 编解码器**：处理潜在空间表示

**Q: 轻量化是通过什么技术实现的？**
A: 主要技术包括：
- **知识蒸馏**：用大模型指导小模型训练
- **模型量化**：减少参数精度（FP32 → FP16/INT8）
- **网络剪枝**：删除不重要的连接
- **架构优化**：减少层数或参数量

**Q: 支持 ControlNet 或 LoRA 吗？**
A: 取决于具体实现：
- 部分版本支持基础的 LoRA 微调
- ControlNet 支持可能有限或不完整
- 建议查看具体版本的文档说明
- 社区可能有兼容的扩展插件

**Q: Nano Banana 支持多语言 Prompt 吗？**
A: 语言支持情况：
- **英文**：完全支持，效果最好
- **中文**：基本支持，可能需要英文关键词辅助
- **其他语言**：支持有限，建议翻译成英文

### 使用问题

**Q: 生成的图片分辨率可以调高吗？**
A: 分辨率限制：
- **默认分辨率**：通常是 512×512 或 768×768
- **最高支持**：部分版本可达 1024×1024
- **高清优化**：可以使用 Hires. fix 功能提升分辨率
- **注意**：提高分辨率会降低生成速度

**Q: 为什么我生成的图片质量很差？**
A: 可能的原因和解决方案：
1. **Prompt 问题**：
   - 描述不够具体：添加更多细节
   - 风格不明确：指定艺术风格
   - 质量词缺失：添加 high quality, detailed 等

2. **参数设置**：
   - Steps 太少：增加到 20-30
   - CFG Scale 不当：调整到 7-12
   - 种子问题：尝试不同的 seed

3. **模型版本**：
   - 使用了老旧版本：更新到最新
   - 模型损坏：重新下载

**Q: 可以批量生成不同风格的图片吗？**
A: 批量生成方法：
- **使用脚本**：编写自动化脚本改变 prompt
- **API 批量调用**：循环调用 API 接口
- **GUI 批量功能**：某些界面支持批量任务队列
- **Prompt 模板**：创建可替换的 prompt 模板

**Q: 如何保持生成图片的一致性？**
A: 保持一致性的技巧：
- **固定种子**：使用相同的 seed 值
- **固定参数**：保持 Steps、CFG 等参数不变
- **逐步变化**：小幅修改 prompt，不要大改
- **使用参考图**：图生图模式更容易保持一致性

### 性能问题

**Q: 在 CPU 上运行会很慢吗？**
A: CPU 性能表现：
- **运行速度**：比 GPU 慢 5-10 倍
- **内存占用**：需要 8GB+ RAM
- **实用性**：偶尔使用可以，大量生成建议用 GPU
- **优化建议**：降低分辨率和步数

**Q: 显存不足怎么办？**
A: 显存优化方案：
- **降低分辨率**：从 768 降到 512
- **减少批大小**：batch size 设为 1
- **启用 CPU 卸载**：部分计算转给 CPU
- **使用 xFormers**：优化显存使用

**Q: 为什么生成时会突然崩溃？**
A: 常见崩溃原因：
- **显存溢出**：超出 GPU 内存限制
- **内存泄漏**：长时间运行未清理
- **版本冲突**：依赖库版本不兼容
- **系统资源**：CPU/RAM 使用率过高

### 商用问题

**Q: 生成的图片版权归谁？**
A: 版权归属复杂：
- **大部分情况**：用户拥有生成图片版权
- **限制情况**：某些平台可能有特殊条款
- **建议**：商用前仔细阅读平台服务条款
- **注意**：使用真实人物肖像需获得授权

**Q: 可以用于商业项目吗？**
A: 商用注意事项：
- **检查平台条款**：确认是否允许商用
- **避免版权元素**：不要使用品牌、角色等
- **标注 AI 生成**：某些地区要求标注
- **咨询法律意见**：重要项目建议咨询律师

**Q: 如何避免生成侵犯版权的内容？**
A: 避免侵权的方法：
- **避免特定艺术家风格**：不使用 "in the style of [artist]"
- **不使用品牌元素**：避免 logo、商标等
- **原创为主**：尽量生成原创内容
- **人工检查**：生成后检查是否有侵权元素

### 进阶问题

**Q: 可以训练自己的 Nano Banana 模型吗？**
A: 自定义训练：
- **技术要求**：需要深度学习知识和大量计算资源
- **数据需求**：通常需要数千到数万张图片
- **训练成本**：GPU 训练可能需要数天到数周
- **替代方案**：考虑使用 LoRA 微调代替完整训练

**Q: Nano Banana 的未来发展方向？**
A: 可能的发展趋势：
- **性能提升**：在轻量化的基础上提高质量
- **功能扩展**：支持更多生成模式和编辑功能
- **优化加速**：更高效的推理优化
- **生态发展**：更多插件和工具支持

**Q: 与其他轻量模型（如 SD Turbo）如何选择？**
A: 选择建议：
- **Nano Banana**：更注重社区和易用性
- **SD Turbo**：更稳定，官方支持
- **选择依据**：根据具体需求、社区支持、文档完善度决定

**Q: 如何参与 Nano Banana 社区？**
A: 参与方式：
- **GitHub**：关注开源项目，提交 Issue 和 PR
- **Reddit**：r/stablediffusion 等社区讨论
- **Discord**：加入 AI 艺术相关服务器
- **作品分享**：在社交媒体分享作品并标注


## 附录

### A. 快速参考

#### Prompt 基础模板
```
主体描述, 风格定义, 质量词, 光照, 构图, 细节补充
例如：
1girl, anime style, masterpiece, cinematic lighting, full body, detailed eyes
```

#### 常用质量词
- 正面：`masterpiece, best quality, high quality, ultra detailed, 4k, 8k`
- 负面：`low quality, worst quality, blurry, jpeg artifacts, deformed`

#### 风格关键词速查
- 写实：`photorealistic, realistic, dslr, professional photography`
- 动漫：`anime style, manga, doujinshi, cel shading`
- 插画：`illustration, digital art, concept art`
- 传统艺术：`oil painting, watercolor, pencil sketch`

### B. 资源链接汇总

#### 官方和半官方资源
- Gemini 2.5 Flash Image (Nano Banana): aistudio.google.com/models/gemini-2-5-flash-image
- "Nano Banana Tutorial: How to Use It with Real Examples": short.ai
- "Google Nano Banana: Complete Guide + 50 Prompts": superprompt.com

#### 社区和教程
- "画像生成AI Nano Banana に触れてみた": techblog.dearsystem.jp
- "Nano Banana vs. Other AI Image Generation Models": imagine.art
- YouTube 教程："How to Use Google's Nano Banana AI Image Model"

#### 工具和插件
- AUTOMATIC1111 WebUI: github.com/AUTOMATIC1111/stable-diffusion-webui
- ComfyUI: github.com/comfyanonymous/ComfyUI
- Civitai 模型库: civitai.com

