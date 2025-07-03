import 'dotenv/config'
import { parseCommandlineArgs } from './helpers/index.mjs';
import { handle } from './controllers/habit.controller.mjs'

const entryData = parseCommandlineArgs();
handle(entryData.operation, entryData.values);