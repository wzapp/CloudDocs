# API 文档

本文档系统提供了一套简单的 API 来管理文档内容。

## 文档管理 API

### 获取文档

```http
GET /docs/:slug
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| slug | string | 文档的唯一标识符 |

#### 响应

成功响应：
```json
{
  "content": "文档内容",
  "metadata": {
    "title": "文档标题",
    "lastModified": "2024-03-31T12:00:00Z"
  }
}
```

### 更新文档

```http
PUT /docs/:slug
```

#### 请求体

```json
{
  "content": "新的文档内容",
  "metadata": {
    "title": "文档标题"
  }
}
```

#### 响应

```json
{
  "success": true,
  "message": "文档已更新"
}
```

## 错误处理

所有 API 都使用标准的 HTTP 状态码：

- 200: 成功
- 400: 请求参数错误
- 404: 文档不存在
- 500: 服务器内部错误

## 示例

### 获取文档

```bash
curl https://docs.wangzhen.cc/docs/api
```

### 更新文档

```bash
curl -X PUT https://docs.wangzhen.cc/docs/api \
  -H "Content-Type: application/json" \
  -d '{"content": "# 新文档\n\n这是新的文档内容"}'
``` 