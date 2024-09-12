import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { PrismaClient } from '@prisma/client';

import 'dotenv/config';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';

const prisma = new PrismaService();
let mongod: MongoMemoryReplSet;

beforeAll(async () => {
  mongod = await MongoMemoryReplSet.create({ replSet: { count: 4 } });

  const uri = mongod.getUri('tests');

  process.env.DATABASE_URL = uri;
});

afterAll(async () => {
  if (mongod) {
    // await prisma
    await prisma.$disconnect();
    await mongod.stop();
  }
});
