import * as repo from '../models/habit.model.mjs';
import { randomUUID } from 'node:crypto';

export const addHabit     = (body) => {
  const id = randomUUID();
  const user = { id, ...body, done: [] };

  return repo.create(user);
}
export const updateHabit  = (id, body) => repo.update(id, body);

export const doHabit  = (id) => {
  let now = Date.now();
  
  if (process.env.DAY_OFFSET >= 1) {
    now = now - process.env.DAY_OFFSET  * 24 * 60 * 60 * 1000;
  }

  repo.done(id, now);
}
export const deleteHabit  = (id) => repo.remove(id);

export const listHabits   = () => repo.getAll();

export const showStats = async () => {

  const db = await repo.getAll();

  const last30Days = [];

  for (let i = 0; i <= 29; i++) {
    const date = Date.now() - (i * 24 * 60 * 60 * 1000);
    const dayOfMonth = `${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;
    last30Days.push({ dayOfMonth });
  }

  db.forEach((habit) => {
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

  return db;
}