# HLT PACK 线上部署指南 (Deployment Guide)

这份文档记录了本项目在生产环境（服务器）上的部署路径和标准命令，以防遗忘。

## 📍 服务器部署环境

- **服务器项目根目录**: `/var/www/hltpack`
- **Node.js 进程管理**: `pm2` (进程名: `hltpack`)
- **数据库 ORM**: Prisma

---

## 🚀 标准更新步骤

每次在本地开发完毕并 `git push` 推送到 GitHub 后，请登录您的线上服务器，并**完整执行**以下命令来进行发布：

```bash
# 1. 务必先进入正确的项目目录！
cd /var/www/hltpack

# 2. 从 GitHub 拉取最新代码
git pull

# 3. 同步数据库表结构（如果有修改 prisma/schema.prisma 的话）
npx prisma db push

# 4. 安装可能新增的依赖包
npm install

# 5. 重新构建生产环境的静态文件与前端代码
npm run build

# 6. 重启 PM2 进程，让新版本应用生效
pm2 restart hltpack
```

## 🐛 常见问题排查

- **报错 `prisma/schema.prisma: file not found` 或 `package.json ENOENT`**：
  这说明您当前所在目录不对（例如还在 `/home/admin`）。请确保第一步执行了 `cd /var/www/hltpack`。

- **构建时出现 TypeScript 或 Lint 错误**：
  说明本地提交的代码存在格式或类型问题。需要在本地修复并重新 `git push`，然后再到服务器执行一遍上述步骤。
