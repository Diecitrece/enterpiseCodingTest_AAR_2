import { EventRepository } from '@core/application/ports/output/repository.port';
import { Event } from '@core/domain/event.model';
import { errorMaker } from '@core/application/errorMaker';
import eventCollection from '@infrastructure/shared/database/schemas/eventSchema';
export const eventRepository = (): EventRepository => {
  const create = async (event: Event): Promise<Event> => {
    try {
      const exists = await eventCollection.findOne({ name: event.name });
      if (exists) errorMaker('alreadyExists', 'Event name already exists');
      const newEvent = new eventCollection(event);
      return await newEvent.save();
    } catch (e) {
      throw e;
    }
  };
  const getOne = async (id: string): Promise<Event> => {
    try {
      const event = await eventCollection.findById(id);
      if (!event) errorMaker('notFound', 'Event not found');
      return event;
    } catch (e) {
      throw e;
    }
  };
  const getAll = async (
    datetime?: string,
    place?: string
  ): Promise<Event[]> => {
    try {
      type conditions = {
        datetime?: string;
        place?: string;
      };
      const conditions: conditions = {};
      if (datetime) conditions['datetime'] = datetime;
      if (place) conditions['place'] = place;
      const events: Event[] = await eventCollection.find(conditions);
      return events;
    } catch (e) {
      throw e;
    }
  };
  return { create, getAll, getOne };
};
