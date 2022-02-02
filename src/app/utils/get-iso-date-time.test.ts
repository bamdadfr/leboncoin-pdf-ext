import {getIsoDateTime} from './get-iso-date-time';

describe('getDate', () => {
  const {date, time} = getIsoDateTime();

  describe('date', () => {
    it('should be defined', () => {
      expect(date).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof date).toBe('string');
    });

    it('should be an ISO date', () => {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('time', () => {
    it('should be defined', () => {
      expect(time).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof time).toBe('string');
    });

    it('should be an ISO time', () => {
      expect(time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });
  });
});
