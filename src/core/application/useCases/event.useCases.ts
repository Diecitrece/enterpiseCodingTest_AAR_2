import { dependenciesContainer } from '@infrastructure/shared/dependencyInjection';
import { EventCRUD } from '../ports/input/eventCRUD.port';
import { EventRepository } from '../ports/output/repository.port';
import { Event } from '@core/domain/event.model';

export const eventUseCases = (): EventCRUD => {
  const eventRepository: EventRepository =
    dependenciesContainer.cradle.eventRepository();
  const create = async (event: Event): Promise<Event> => {
    return eventRepository.create(event);
  };
  const getAll = async (
    datetime?: string,
    place?: string
  ): Promise<Event[]> => {
    return eventRepository.getAll(datetime, place);
  };
  const getOne = async (id: string): Promise<Event> => {
    return eventRepository.getOne(id);
  };
  return { create, getAll, getOne };
};
