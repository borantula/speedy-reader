import wpmIntervalCalculator from './wpm-interval-calculator';


test('test most obvious: 60 words 1 word per display', () => {
    expect(wpmIntervalCalculator(60, 1)).toBe(1000);
});

test('test : 60 words 1 word per display, but without second param', () => {
    expect(wpmIntervalCalculator(60)).toBe(1000);
});


test('test : 120 words 1 word per display', () => {
    expect(wpmIntervalCalculator(120, 1)).toBe(500);
});

test('test : 120 words 2 word per display', () => {
    expect(wpmIntervalCalculator(120, 2)).toBe(1000);
});

test('test: 300 words 3 word per display', () => {
    expect(wpmIntervalCalculator(300, 3)).toBe(600);
});

test('test: 300 words 7 word per display, weird numbers', () => {
    expect(wpmIntervalCalculator(300, 7)).toBe(1400);
});