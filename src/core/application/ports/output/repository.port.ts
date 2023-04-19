import { Event } from '@core/domain/event.model';
export interface EventRepository {
  create: (item: Event) => Promise<Event>;
  getAll: (datetime?: string, place?: string) => Promise<Event[]>;
  getOne: (id: string) => Promise<Event>;
}
