import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks';
import useGetIdVerification from '../useGetIdVerification';
import { BASE_URL } from '@/constants';

const mockAxios = new MockAdapter(axios);

describe('useGetIdVerification', () => {
  it('should successfully verify ID', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetIdVerification());
    const id = '123';

    mockAxios.onGet(`${BASE_URL}/bp/products/verification?id=${id}`).reply(200, { valid: true });

    act(() => {
      result.current.verificateId(id);
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should handle error when verifying ID', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetIdVerification());
    const id = '123';

    mockAxios.onGet(`${BASE_URL}/bp/products/verification?id=${id}`).reply(500);

    act(() => {
      result.current.verificateId(id);
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
