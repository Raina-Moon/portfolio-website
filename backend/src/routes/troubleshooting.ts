import { Request, RequestHandler, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { translatePost } from '../utils/translate';

const router = Router();
const prisma = new PrismaClient();

// Get all troubleshooting posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.troubleshooting.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch troubleshooting posts' });
  }
});

// Get a single troubleshooting post by ID
router.get('/:id', (async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.troubleshooting.findUnique({
      where: { id: parseInt(id, 10) }
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the post' });
  }
})as RequestHandler);

// Create a new troubleshooting post
router.post('/', async (req, res) => {
  const { title, content, image_url, tags } = req.body;
  try {
    let translationData = {};
    try {
      const { language, translatedTitle, translatedContent } = await translatePost(title, content);
      translationData = { language, translatedTitle, translatedContent };
    } catch (translateError) {
      console.error('Translation failed, saving without translation:', translateError);
    }

    const newPost = await prisma.troubleshooting.create({
      data: { title, content, image_url, tags, ...translationData }
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create troubleshooting post' });
  }
});

// Update an existing troubleshooting post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, tags } = req.body;
  try {
    let translationData = {};
    try {
      const { language, translatedTitle, translatedContent } = await translatePost(title, content);
      translationData = { language, translatedTitle, translatedContent };
    } catch (translateError) {
      console.error('Translation failed, saving without translation:', translateError);
    }

    const updatedPost = await prisma.troubleshooting.update({
      where: { id: parseInt(id, 10) },
      data: { title, content, image_url, tags, ...translationData }
    });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update troubleshooting post' });
  }
});

// Delete a troubleshooting post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.troubleshooting.delete({
      where: { id: parseInt(id, 10) }
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete troubleshooting post' });
  }
});

export default router;
