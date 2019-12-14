import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

describe(`App`, () => {
  afterEach(cleanup);

  let props;
  beforeEach(() => {
    props = {
      initializeFirebase: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      isReady: true,
      user: null
    };
  });

  it(`should render successfully`, () => {
    const { baseElement } = render(<App {...props} />);
    expect(baseElement).toBeTruthy();
  });
  it(`should initialize Firebase`, () => {
    render(<App {...props} />);
    expect(props.initializeFirebase).toHaveBeenCalled();
  });
  describe(`User`, () => {
    it(`should login successfully`, () => {
      const { getByText } = render(<App {...props} />);
      const btn = getByText('Log in');
      fireEvent.click(btn);
      expect(props.login).toHaveBeenCalled();
    });
    it(`should log out successfully`, () => {
      props.user = {};
      const { baseElement } = render(<App {...props} />);
      const btn = baseElement.querySelector('[title="Log Out"]');
      fireEvent.click(btn);
      expect(props.logout).toHaveBeenCalled();
    });
  });
});
