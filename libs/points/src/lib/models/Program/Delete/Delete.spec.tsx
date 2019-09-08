import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Delete from './Delete';

describe('Delete', () => {
  afterEach(cleanup);

  const props = {} as any;

  it('should render successfully', () => {
    const { baseElement } = render(<Delete {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
