import { Subjects, Publisher, TicketCreatedEvent } from '@sgtickets/common';

export class TicketCreatedEvent extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

