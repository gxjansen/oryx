import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { SpyInstance } from 'vitest';
import { DefaultHttpService } from './default-http.service';
import { HttpService } from './http.service';

vi.mock('rxjs/fetch', () => ({
  fromFetch: vi.fn().mockReturnValue(of({ ok: true })),
}));

const mockUrl = 'mockUrl';
const mockHeaders = {
  custom: 'custom',
};
const mockOptions = {
  keepalive: true,
  headers: mockHeaders,
};
const mockBody = {
  test: 'test',
};

describe('DefaultHttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    service = new DefaultHttpService();
    (fromFetch as unknown as SpyInstance).mockReturnValue(of({ ok: true }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('request should throw an error', () =>
    new Promise<void>((done) => {
      service.request(mockUrl, mockOptions).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });
    }));

  it('request method should call `fromFetch` with proper parameters', () => {
    service.request(mockUrl, mockOptions);

    expect(fromFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      headers: mockHeaders,
    });
  });

  it('get method should call `fromFetch` with proper parameters', () => {
    service.get(mockUrl, mockOptions);

    expect(fromFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      method: 'GET',
      headers: mockHeaders,
    });
  });

  it('post method should call `fromFetch` with proper parameters', () => {
    service.post(mockUrl, mockBody, mockOptions);

    expect(fromFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...mockHeaders,
      },
      body: JSON.stringify(mockBody),
    });
  });

  it('patch method should call `fromFetch` with proper parameters', () => {
    service.patch(mockUrl, mockBody, mockOptions);

    expect(fromFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...mockHeaders,
      },
      body: JSON.stringify(mockBody),
    });
  });

  it('delete method should call `fromFetch` with proper parameters', () => {
    service.delete(mockUrl, mockOptions);

    expect(fromFetch).toHaveBeenCalledWith(
      mockUrl,
      expect.objectContaining({
        ...mockOptions,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...mockHeaders,
        },
      })
    );
  });
});
