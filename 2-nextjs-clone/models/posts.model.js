import { readData, saveData } from '../lib/utils.js';

export async function getOne(id) {
  console.log('Model: getting Post', id);
  const db = await readData();
  const post = db['posts'].find((item) => item.id === Number(id));

  return post;
}

export async function getAll() {
  console.log('Model: getting all Posts');
  const db = await readData();
  const post = db['posts'];

  return post;
}

export async function createPost(post) {
  console.log('Model: creating Post', post);
  const db = await readData();
  const id = db['posts'].length + 1;
  const newPost = { id, ...post };
  db['posts'].push(newPost);
  await saveData(db);

  return newPost;
}

export async function updatePost(id, post) {
  console.log('Model: updating Post', id, post);
  const db = await readData();
  const index = db['posts'].findIndex((item) => item.id === Number(id));
  
  if (index === -1) {
    throw new Error(`Post with id ${id} not found`);
  }
  
  db['posts'][index] = { ...db['posts'][index], ...post };
  await saveData(db);

  return db['posts'][index];
}

export async function deletePost(id) {
  console.log('Model: deleting Post', id);
  const db = await readData();
  const index = db['posts'].findIndex((item) => item.id === Number(id));
  
  if (index === -1) {
    throw new Error(`Post with id ${id} not found`);
  }
  
  db['posts'].splice(index, 1);
  await saveData(db);

  return id;
}
