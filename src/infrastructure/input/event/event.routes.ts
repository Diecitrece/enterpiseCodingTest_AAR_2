import { Request, Response, Router, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { dependenciesContainer } from '@infrastructure/shared/dependencyInjection';
import { Event } from '@core/domain/event.model';
import { EventCRUD } from '@core/application/ports/input/eventCRUD.port';
import { datetimeSchema, eventSchema, placeSchema } from './event.validation';
const eventUseCases: EventCRUD = dependenciesContainer.cradle.eventUseCases();
export const eventRouter = Router();
eventRouter.use(bodyParser.json());
eventRouter
  .route('/')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        let events: Event[];
        let datetime: string | undefined;
        let place: string | undefined;
        if (req.query.datetime && typeof req.query.datetime === 'string') {
          const validation = datetimeSchema.validate(req.query.datetime);
          if (validation && validation.error) {
            res.status(400).send(validation.error?.details[0].message);
            return;
          }
          datetime = req.query.datetime;
        }
        if (req.query.place && typeof req.query.place === 'string') {
          const validation = placeSchema.validate(req.query.place);
          if (validation && validation.error) {
            res.status(400).send(validation.error?.details[0].message);
            return;
          }
          place = req.query.place;
        }
        events = await eventUseCases.getAll(datetime, place);
        res.status(200).json(events);
        return;
      } catch (e) {
        next(e);
      }
    }
  )
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const validation = eventSchema.validate(req.body);
        if (validation && validation.error) {
          res.status(400).send(validation.error?.details[0].message);
          return;
        }
        const newEvent: Event = await eventUseCases.create(req.body);
        res.status(201).json(newEvent);
        return;
      } catch (e) {
        next(e);
      }
    }
  );
eventRouter
  .route('/:eventID')
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        if (typeof req.params.eventID !== 'string') {
          res.status(400).send('Invalid event ID');
          return;
        }
        const eventID: string = req.params.event;
        const event: Event = await eventUseCases.getOne(eventID);
        res.status(200).send(event);
      } catch (e) {
        next(e);
      }
    }
  );
