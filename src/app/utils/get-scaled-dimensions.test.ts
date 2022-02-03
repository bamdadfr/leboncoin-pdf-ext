import {defaultProps, getScaledDimensions} from './get-scaled-dimensions';

describe('getScaledDimensions', () => {
  it('should be defined', () => {
    expect(getScaledDimensions).toBeDefined();
  });

  describe('square input', () => {
    it('should scale to the canvas dimensions minus default margin', () => {
      const target = 200;
      const dimensions = getScaledDimensions(100, 100, target, target);
      expect(dimensions.width).toEqual(dimensions.height);
      expect(dimensions.height).toEqual(target - 2 * defaultProps.margin);
    });

    it('should scale to the canvas dimensions minus the margin', () => {
      const target = 200;
      const margin = 10;
      const dimensions = getScaledDimensions(100, 100, target, target, margin);
      expect(dimensions.width).toEqual(dimensions.height);
      expect(dimensions.height).toEqual(target - 2 * margin);
    });
  });

  describe('portrait dimensions', () => {
    it('should scale to the canvas dimensions', () => {
      const sourceW = 100;
      const sourceH = 200;
      const targetW = 200;
      const targetH = 100;
      const margin = 10;
      const dimensions = getScaledDimensions(sourceW, sourceH, targetW, targetH, margin);
      expect(dimensions.width).toEqual(40);
      expect(dimensions.height).toEqual(80);
    });
  });
});
