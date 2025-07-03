
import { read, save } from '../helpers/index.mjs';

export async function create(user) {
  console.log('Creating habit', user);
  const db = await read();
  await save([...db, user]);
  return user;
}

export async function update(id, payload) {
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  db[index] = { ...db[index], ...payload };
  await save(db);
  return db[index].id;
}

export async function remove(id) {
  console.log('Deleting habit', id);
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  db.splice(index, 1);
  return await save(db);
}

export async function getAll() {
  return read();
}

export async function done(id, time) {
  console.log('Doing habit', id);
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (db[index].done === undefined) { 
    db[index].done = [];
  }
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  db[index].done.push(time);
  await save(db);
}