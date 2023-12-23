import Message from '../models/message';
import { NewLocals, NewRequest } from './new.types';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.render('form', { title: 'Add a new message' } as NewLocals);
});

router.post('/', async (req: NewRequest, res) => {
  const message = new Message({
    text: req.body.text,
    user: req.body.user,
  });

  await message.save();
  res.redirect('/');
});

const newRouter = router;
export default newRouter;
