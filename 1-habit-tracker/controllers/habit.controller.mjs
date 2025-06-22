import process from 'node:process';
import { parseArgs } from 'node:util';
import { addHabit, updateHabit, doHabit, deleteHabit, listHabits, showStats } from '../services/habits.service.mjs';

const OPERATIONS = {
  ADD: 'add',
  LIST: 'list',
  DONE: 'done',
  STATS: 'stats',
  DELETE: 'delete',
  UPDATE: 'update'
};


function parseCommandlineArgs() {
  const config = {
    args: process.argv.slice(2), 
    allowPositionals: true,
    options: {
      name: { 
        type: 'string'
      },
      freq: { 
        type: 'string'
      },
      id: { 
        type: 'string'
      },
    }
  }

  const {
    values,
    positionals,
  } = parseArgs(config);
  console.log('positionals:', positionals);
  return { operation: positionals[0], values };
}


function handle(operation, values) {
  console.log('Handling operation:', operation, 'with values:', values);
  try {
    if (operation === OPERATIONS.ADD) {
      return addHabit(values);
    }

    if (operation === OPERATIONS.UPDATE) {
      return updateHabit(values.id, values);
    }

    if (operation === OPERATIONS.LIST) {
      return listHabits();
    }

    if (operation === OPERATIONS.DONE) {
      return doHabit(values.id);
    }

    if (operation === OPERATIONS.STATS) {
      console.log('Showing stats');
      return showStats();
    }

    if (operation === OPERATIONS.DELETE) {
      return deleteHabit(values.id);
    }

  } catch (e) {
    console.error('Error handling operation:', operation, e.message);
    process.exit(1);
  }

}

export { handle, parseCommandlineArgs, OPERATIONS };
