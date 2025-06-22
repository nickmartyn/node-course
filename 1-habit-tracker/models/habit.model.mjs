import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

const read = async () => JSON.parse(await readFile(DB, 'utf8'));
const save = async (data) =>
  writeFile(DB, JSON.stringify(data, null, 2));

export async function create(payload) {
  console.log('Creating habit', payload);
  const db = await read();
  const id = randomUUID();
  const user = { id, ...payload, done: [] };
  await save([...db, user]);
  return user;
}

export async function update(id, payload) {
  console.log('Updating habit', id, payload);
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  db[index] = { ...db[index], ...payload };
  await save(db);
  return db[index];
}

export async function remove(id) {
  console.log('Deleting habit', id);
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  db.splice(index, 1);
  await save(db);
  return console.log(`Habit with id ${id} deleted successfully`);
}

export async function getAll() {
  return console.table(await read(), ['name', 'freq']);
}

export async function done(id) {
  console.log('Doing habit', id);
  let now = Date.now();
  
  if (process.env.DAY_OFFSET >= 1) {
    now = now - process.env.DAY_OFFSET  * 24 * 60 * 60 * 1000;
  }
  const db = await read();
  const index = db.findIndex((item) => item.id === id);
  if (db[index].done === undefined) { 
    db[index].done = [];
  }
  if (index === -1) {
    throw new Error(`Habit with id ${id} not found`);
  }
  await save(db);
}

export async function showStats() {
  const db = await read();
  const last30Days = [];

  for (let i = 0; i <= 29; i++) {
    const date = Date.now() - (i * 24 * 60 * 60 * 1000);
    const dayOfMonth = `${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;
    last30Days.push({ dayOfMonth });
  }

  db.forEach((habit, index) => {
    const habitLast30Days = last30Days.map((day) => {
      const isDone = habit.done.findIndex((doneDay) => day.dayOfMonth === `${new Date(doneDay).getMonth() + 1}-${new Date(doneDay).getDate()}`);
      if (isDone !== -1) {
        day.done = true;
      } else {
        day.done = false;
      }
      return day;
    });

    let percentageDoneInLast30Days = 0;
    let percentageDoneInLast7Days = 0;

    if (habit.freq === 'daily') {
      percentageDoneInLast30Days = habitLast30Days.filter((day) => day.done).length / last30Days.length * 100;
      percentageDoneInLast7Days = habitLast30Days.slice(0, 7).filter((day) => day.done).length / 7 * 100;
    } else if (habit.freq === 'weekly') {
      // Assume 4 weeks in a month
      const week4 = habitLast30Days.slice(0, 7).filter((day) => day.done).length >= 1 ? [1] : [];
      const week3 = habitLast30Days.slice(7, 14).filter((day) => day.done).length >= 1 ? [1] : [];
      const week2 = habitLast30Days.slice(14, 21).filter((day) => day.done).length >= 1 ? [1] : [];
      const week1 = habitLast30Days.slice(21, 28).filter((day) => day.done).length >= 1 ? [1] : [];

      percentageDoneInLast30Days = (
        week1.length + week2.length + week3.length + week4.length
      ) / 4 * 100;

      percentageDoneInLast7Days = habitLast30Days.slice(0, 7).filter((day) => day.done).length / 7 * 100;
    } else if (habit.freq === 'monthly') {
      percentageDoneInLast30Days = (habitLast30Days.filter((day) => day.done).length > 1 ? 1 : habitLast30Days.filter((day) => day.done).length) / 1 * 100;
      percentageDoneInLast7Days = habitLast30Days.slice(0, 7).filter((day) => day.done).length / 7 * 100;
    }

    habit.percentageDoneInLast30Days = `${percentageDoneInLast30Days.toFixed(2)}%`;
    habit.percentageDoneInLast7Days = `${percentageDoneInLast7Days.toFixed(2)}%`;
  });

  console.table(db, ['name', 'freq', 'percentageDoneInLast7Days', 'percentageDoneInLast30Days']);
}