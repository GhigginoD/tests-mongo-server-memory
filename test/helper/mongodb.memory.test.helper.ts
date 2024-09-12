import { MongoMemoryReplSet } from 'mongodb-memory-server';
import 'dotenv/config';

let mongod: MongoMemoryReplSet;

export async function connect() {
  const mongod = await MongoMemoryReplSet.create({ replSet: { count: 4 } });
  const uri = mongod.getUri();

  process.env.DATABASE_URL = uri;
}

export async function disconnect() {
  if (mongod) {
    await mongod.stop();
  }
}
