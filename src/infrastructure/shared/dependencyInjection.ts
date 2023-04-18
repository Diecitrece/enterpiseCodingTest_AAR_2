import { eventUseCases } from '@core/application/useCases/event.useCases';
import { createContainer, asValue } from 'awilix';
export const dependenciesContainer = createContainer();

dependenciesContainer.register({
  eventUseCases: asValue(eventUseCases),
  //   eventRepository: asValue()
});
