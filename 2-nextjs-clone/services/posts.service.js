import * as repo from '../models/posts.model.js';

export const getPost = async (id) => {
  return repo.getOne(id);
}

export const updatePost = async (id, body) => {
  return repo.updatePost(id, body);
}

export const deletePost = async (id) => {
  return repo.deletePost(id);
}

export const createPost = async (body) => {
  return repo.createPost(body);
}

export const listPosts = async () => {
  return repo.getAll()
}