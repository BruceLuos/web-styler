This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 流程

```
bunx create-next-app@latest .
bunx --bun shadcn-ui@latest init add

```
资源上传，权限校验，主题配置
```
bun add uploadthing @uploadthing/react
npm install @clerk/nextjs
npm install @clerk/themes
```
sub domain子域名页面设置，中间件配置相关跳转
```
[domain]/[path]

  if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url) // 子域名存在的时候，会走[domain]/[path]
      )
    }
```
prisma 配置关联数据库
初始化prisma 数据库，这里选用mysql
```
bun add prisma @prisma/client
bunx prisma init --datasource-provider mysql
bunx prisma db push 
bunx prisma generate

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run ‘prisma db pull’ to turn your database schema into a Prisma schema.
3. Run ‘prisma generate’ to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

```
bun add @tanstack/react-table

```

```
bun add react-beautiful-dnd
```

stripe支付
```
bun add stripe
bun add @stripe/stripe-js     
bun add @stripe/react-stripe-js
```

stripe webhook监听支付等事件,本地测试
https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
```
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger payment_intent.succeeded

```
线上测试stripe webhook监听支付事件需要用到的环境变量
```
# 线上测试支付时webhook监听使用,目前没有使用
PRO_STRIPE_WEBHOOK_SECRET
```

google search console 401 maybe reason
https://github.com/clerk/javascript/issues/2720