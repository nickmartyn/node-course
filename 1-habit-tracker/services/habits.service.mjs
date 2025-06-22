import * as repo from '../models/habit.model.mjs';

export const addHabit     = (body) => repo.create(body);
export const updateHabit  = (id, body) => repo.update(id, body);
export const doHabit  = (id) => repo.done(id);
export const deleteHabit  = (id) => repo.remove(id);

export const listHabits   = () => repo.getAll();
export const showStats = () => repo.showStats();