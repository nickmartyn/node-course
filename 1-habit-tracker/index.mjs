import 'dotenv/config'

import { handle, parseCommandlineArgs } from './controllers/habit.controller.mjs'

const entryData = parseCommandlineArgs();
handle(entryData.operation, entryData.values);