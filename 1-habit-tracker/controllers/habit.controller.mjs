import process from 'node:process';
import { addHabit, updateHabit, doHabit, deleteHabit, listHabits, showStats } from '../services/habits.service.mjs';

const OPERATIONS = {
  ADD: 'add',
  LIST: 'list',
  DONE: 'done',
  STATS: 'stats',
  DELETE: 'delete',
  UPDATE: 'update'
};

async function handle(operation, values) {
  console.log('Handling operation:', operation, 'with values:', Object.values(values));
  try {
    if (operation === OPERATIONS.ADD) {
      return addHabit(values);
    }

    if (operation === OPERATIONS.UPDATE) {
      return console.log(await updateHabit(values.id, values));
    }

    if (operation === OPERATIONS.LIST) {
      return console.table(await listHabits(), ['name', 'freq']);
    }

    if (operation === OPERATIONS.DONE) {
      return doHabit(values.id);
    }

    if (operation === OPERATIONS.STATS) {
      const stats = await showStats();
      return console.table(stats, ['name', 'freq', 'percentageDoneInLast7Days', 'percentageDoneInLast30Days']);
    }

    if (operation === OPERATIONS.DELETE) {
      return deleteHabit(values.id);
    }

  } catch (e) {
    console.error('Error handling operation:', operation, e.message);
    process.exit(1);
  }

}

export { handle, OPERATIONS };
