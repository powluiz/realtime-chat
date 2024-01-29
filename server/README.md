```bash
# init prisma with config files
npx prisma init

# To create a new migration with the sql queries (based in schema.prisma)
npx prisma migrate dev

# To see the database
npx prisma studio

# pull info from existing database to schema.prisma (useful when working with old databases)
npx prisma db pull

# After updating schema.prisma (only in dev mode):
npx prisma generate
npx prisma db push
```

- [AWS S3](https://aws.amazon.com/pt/free/storage/s3/)
- [How to host images on Cloud](https://www.youtube.com/watch?v=g5tqEh8wAio)
- [Prisma Tutorial](https://www.youtube.com/watch?v=uApCW1gcpdE)
