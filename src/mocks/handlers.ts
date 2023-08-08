import { rest } from 'msw';
import { UserEvent } from '../lib/services';

const API_BASE_URL = 'http://localhost:3001';

export const handlers = [
  rest.get(`${API_BASE_URL}/events`, async (req, res, ctx) => {
    const userEvents: UserEvent[] = [
      // Define your mocked user events here
      // Example:
      {
        id: 1,
        title: 'Event 1',
        dateStart: '2023-08-04T12:00:00Z',
        dateEnd: '2023-08-04T14:00:00Z',
      },
    ];

    return res(ctx.json(userEvents), ctx.delay(150));
  }),

  rest.post(`${API_BASE_URL}/events`, async (req, res, ctx) => {
    const body = await req.json();
    const newEvent: UserEvent = {
      id: 2, // Mocked ID
      title: 'New event',
      ...body.dto,
    };

    return res(ctx.json(newEvent), ctx.delay(150));
  }),

  rest.put(`${API_BASE_URL}/events/:id`, async (req, res, ctx) => {
    const updatedEvent: UserEvent = {
      id: 1,
      title: 'New Event title',
      dateStart: '2023-08-04T12:00:00Z',
      dateEnd: '2023-08-04T14:00:00Z',
    };

    return res(ctx.json(updatedEvent));
  }),

  rest.delete(`${API_BASE_URL}/events/:id`, async (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
