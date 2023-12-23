import './index.types';
import express from 'express';
import { IndexLocals } from './index.types';
import Message from '../models/message';

const router = express.Router();

router.get('/', async (req, res, next) => {
  // currently very inefficient, needs to implement loading and paging
  // however, that is outside of the scope of this project
  const messages = await Message.find().sort({ added: -1 });
  res.render('index', { title: 'Mini Message Board', messages } as IndexLocals);
});

const indexRouter = router;
export default indexRouter;
