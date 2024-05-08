import { http, HttpResponse } from "msw";
import { AbstractDataType } from "../handlers";

interface ParamsWithId {
  id: string;
}

const createEchoHandlers = <T extends AbstractDataType>(
  url: string,
  mockGetObj: T
) => [
  http.get(url, () => {
    return HttpResponse.json({
      ...mockGetObj,
    });
  }),
  http.get<ParamsWithId, T, T>(`${url}/:id`, async ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      ...mockGetObj,
      id: id,
    });
  }),
  http.post<ParamsWithId, T, T>(url, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({
      ...data,
    });
  }),
  http.put<ParamsWithId, T, T>(`${url}/:id`, async ({ request, params }) => {
    const data = await request.json();
    const { id } = params;
    return HttpResponse.json({
      ...data,
      id: id,
    });
  }),
  http.delete<ParamsWithId>(`${url}/:id`, async ({ params }) => {
    return HttpResponse.json({});
  }),
];

export { createEchoHandlers };
