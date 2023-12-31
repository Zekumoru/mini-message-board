import bodyMiddleware from '../middlewares/body';
import Message from '../models/message';
import { BodyRequest, NewLocals, NewRequest } from './new.types';
import express from 'express';

const router = express.Router();

const title = 'Add a new message';
router.get('/', (_req, res) => {
  res.render('form', { title } as NewLocals);
});

const personalIp = process.env.PERSONAL_IP;
const devName = process.env.DEV_NAME;

router.post(
  '/',
  bodyMiddleware<BodyRequest>((body) => {
    body.user = body.user.trim();
    return body;
  }),
);

router.post('/', (req: NewRequest, res, next) => {
  if (req.app.get('env') === 'development') {
    next();
    return;
  }

  if (req.body.user === devName) {
    const ip = req.headers['x-forwarded-for'];
    if (ip === personalIp) {
      next();
      return;
    }

    res.status(403).render('form', {
      title,
      errorMessage: 'You do not have permission to use that name!',
      user: req.body.user,
      text: req.body.text,
    } as NewLocals);
    return;
  }

  next();
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
