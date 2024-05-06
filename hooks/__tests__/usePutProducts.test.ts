import { renderHook, act } from '@testing-library/react-hooks/native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import usePutProducts from '../usePutProducts';
import { BASE_URL } from '@/constants';

// Mocking axios
const mock = new MockAdapter(axios);

const product = {
    date_release: "2024-05-01",
    date_revision: "2024-05-01",
    description: "Test product",
    id: "1",
    logo: "test.png",
    name: "Test Product",
  };

describe('usePutProducts hook', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should successfully put data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePutProducts());


    mock.onPut(`${BASE_URL}/bp/products`).reply(200);

    act(() => {
      result.current.putData(product);
    });

    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
  });

  it('should handle error during put', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePutProducts());

    mock.onPut(`${BASE_URL}/bp/products`).reply(500);

    act(() => {
      result.current.putData(product);
    });

    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
  });
});
