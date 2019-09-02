import { getGreeting } from '../support/app.po';

describe('points', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to points!');
  });
});
