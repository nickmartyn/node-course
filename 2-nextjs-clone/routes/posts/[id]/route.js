import * as postsService from "../../../services/posts.service.js";
import { bodyJSON, successResponse, successResponseBasic, errorResponse, notFoundResponse } from "../../../lib/utils.js";

async function GET(req, res) {
  let data = null;

  if (req.params.id) {
    // Fetching a post by ID
    data = await postsService.getPost(req.params.id);
  } else  {
    // If no ID is provided, fetch all posts
    data = await postsService.listPosts();
  }

  if (data) {
    return successResponse(res, data); 
  } else {
    return notFoundResponse(res);
  }
};

async function PUT(req, res) {
  try {
    const body = await bodyJSON(req);
    const { id } = req.params;
    
    if (body.title || body.content) {
      await postsService.updatePost(id, body);
      return successResponseBasic(res, 200, 'Post updated successfully');
    } else {
      return errorResponse(res, 400, 'Title or content is required');
    } 
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
};

async function DELETE(req, res) {
  const { id } = req.params;
  try {
    await postsService.deletePost(id);
    return successResponseBasic(res, 204, 'Post deleted successfully');
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
};

async function POST(req, res) {
  try {
    const body = await bodyJSON(req);
    if (body.title && body.content) {
      await postsService.createPost(body);
      return successResponseBasic(res, 201,  'Post created successfully');
    } else {
      return errorResponse(res, 400, 'Title and content are required')
    } 
  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
}

export { GET, PUT, DELETE, POST };