import { asCircle, Circle, circleFunctions, mixin, RoundButton } from "../code/figures_and_buttons";

describe('Principles Of Object Oriented Javascript: Object Patterns: Mixins', function () {
  describe('Classic Mixin Pattern via a function', function () {
    let firstButton;
    beforeEach(() => {
      firstButton = new RoundButton(5, 'circular');
    });

    it('first button has not mixed in methods', function () {
      expect(() => { firstButton.area() }).toThrow(TypeError);
    });

    it('second button has the mixed in methods', function () {
      mixin(RoundButton.prototype, circleFunctions);
      let secondButton = new RoundButton(10, 'circular');
      expect(secondButton.radius).toBe(10);
      secondButton.grow();
      expect(secondButton.radius).toBe(11);
      secondButton.shrink();
      expect(secondButton.radius).toBe(10);
      expect(secondButton.area().toFixed(2)).toBe('314.16');
    });
  });

  describe('Functional Mixin', function () {
    let circle;
    beforeEach(() => {
      circle = new Circle(5);
    });

    it('circle has no inherited methods', function () {
      expect(() => { circle.area() }).toThrow(TypeError);
    });

    it('functional mixin adds the methods', function () {
      asCircle.call(Circle.prototype);
      circle = new Circle(5);
      expect(circle.area().toFixed(2)).toBe('78.54');
    });
  });
});