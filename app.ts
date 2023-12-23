import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes';
import mongoose from 'mongoose';
import newRouter from './routes/new';

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const app = express();

// connect to db
mongoose.set('strictQuery', false);
(async () => {
  await mongoose.connect(dbConnectionString ?? '');
  console.log('Server has successfully connected to MongoDB');
})().catch((error: { message: string }) => {
  console.error(`Server could not connect to MongoDB: ${error.message}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/new', newRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: {
      message: string;
      status: number;
    },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // set locals, only providing error in development
    const statusCode = err.status || 500;
    res.locals.title = `${statusCode} ${err.message}`;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(statusCode);
    res.render('error');
  },
);

export default app;
