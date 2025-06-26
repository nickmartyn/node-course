import * as postsService from "../../../services/posts.service.js";
import { bodyJSON } from "../../../lib/utils.js";

export const route = {
  async GET(req, res) {
    console.log('GET request for post with ID:', req.params.id);

    let data = null;

    if (req.params.id) {
      // Fetching a post by ID
      data = await postsService.getPost(req.params.id);
    } else  {
      // If no ID is provided, fetch all posts
      data = await postsService.listPosts();
    }

    if (data) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Post not found' })); 
    }
  },

  async PUT(req, res) {
    try {
      const body = await bodyJSON(req);
      const { id } = req.params;
      
      if (body.title || body.content) {
        await postsService.updatePost(id, body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post updated successfully' }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Title or content is required' }));
      } 
    } catch (error) {
      console.error('Error updating post:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
  },

  async DELETE(req, res) {
    const { id } = req.params;
    try {
      await postsService.deletePost(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
  },

  async POST(req, res) {
    try {
      const body = await bodyJSON(req);
      if (body.title && body.content) {
        await postsService.createPost(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post created successfully' }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Title and content are required' }));
      } 
    } catch (error) {
      console.error('Error creating post:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
  }
}