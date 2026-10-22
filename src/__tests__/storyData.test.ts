import { describe, it, expect } from 'vitest';
import { STORY_DATA } from '../data/storyData';

describe('Story Data Integrity & Specification Tests', () => {
  it('should have at least 5 story parts', () => {
    expect(STORY_DATA.length).toBeGreaterThanOrEqual(5);
  });

  it('each story part should be calibrated to approximately 500 characters', () => {
    STORY_DATA.forEach((part) => {
      const length = part.text.length;
      // Allow a reasonable window around 500 characters (480 - 520 chars)
      expect(length).toBeGreaterThanOrEqual(480);
      expect(length).toBeLessThanOrEqual(520);
    });
  });

  it('each story part must have exactly 3 choices', () => {
    STORY_DATA.forEach((part) => {
      expect(part.choices.length).toBe(3);
    });
  });

  it('each story part must have exactly 1 correct choice and 2 wrong choices', () => {
    STORY_DATA.forEach((part) => {
      const correctChoices = part.choices.filter((c) => c.isCorrect);
      const wrongChoices = part.choices.filter((c) => !c.isCorrect);

      expect(correctChoices.length).toBe(1);
      expect(wrongChoices.length).toBe(2);
    });
  });

  it('every wrong choice must have an explanatory consequence for game over', () => {
    STORY_DATA.forEach((part) => {
      const wrongChoices = part.choices.filter((c) => !c.isCorrect);
      wrongChoices.forEach((choice) => {
        expect(choice.consequence).toBeDefined();
        expect(choice.consequence?.trim().length).toBeGreaterThan(10);
      });
    });
  });

  it('choice texts must not be empty', () => {
    STORY_DATA.forEach((part) => {
      part.choices.forEach((choice) => {
        expect(choice.text.trim().length).toBeGreaterThan(5);
      });
    });
  });
});
