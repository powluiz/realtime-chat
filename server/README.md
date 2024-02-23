## How to Run

You will need Node.js and Docker installed on your machine.

```bash
# create .env file based on .env.example
cp .env.example .env
```

```bash
npm i
docker compose up -d
npx prisma migrate dev
npm run dev
```

- [AWS S3](https://aws.amazon.com/pt/free/storage/s3/)
- [How to host images on Cloud](https://www.youtube.com/watch?v=g5tqEh8wAio)
- [Prisma Tutorial](https://www.youtube.com/watch?v=uApCW1gcpdE)
