import productReducer, { initialState, setProduct, resetProduct } from '../productSlice';

describe('productSlice', () => {
  it('should set product correctly', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      date_release: '2024-01-01',
      date_revision: '2024-01-02',
      logo: 'logo.png',
    };

    const newState = productReducer(initialState, setProduct(product));

    expect(newState).toEqual(product);
  });

  it('should reset product to initial state', () => {
    const newState = productReducer(
      {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        date_release: '2024-01-01',
        date_revision: '2024-01-02',
        logo: 'logo.png',
      },
      resetProduct()
    );

    expect(newState).toEqual(initialState);
  });
});
