import { Event } from '@core/domain/event.model';
export interface EventCRUD {
  create: (item: Event) => Promise<Event>;
  getAll: (datetime?: string, place?: string) => Promise<Event[]>;
  getOne: (id: string) => Promise<Event>;
}
