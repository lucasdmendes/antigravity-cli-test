import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { STORY_DATA } from '../data/storyData';

describe('App Full Integration & Keyboard Suite', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial stage with cycle counter and all 3 choices', () => {
    render(<App />);

    expect(screen.getByText(/The Drowned Airlock/i)).toBeInTheDocument();
    expect(screen.getByText(/CYCLE:/i)).toHaveTextContent(/01/);

    // Verify all 3 choices are displayed
    STORY_DATA[0].choices.forEach((choice) => {
      expect(screen.getByText(choice.text)).toBeInTheDocument();
    });
  });

  it('progresses to Stage 2 upon clicking the correct choice', () => {
    render(<App />);

    // In Stage 1, Choice 2 is correct
    const correctChoice = screen.getByText(STORY_DATA[0].choices[1].text);
    fireEvent.click(correctChoice);

    expect(screen.getByText(/The Flooded Atrium/i)).toBeInTheDocument();
    expect(screen.getByText(/40%/i)).toBeInTheDocument();
  });

  it('triggers Game Over upon selecting a fatal choice and restarts cleanly to first page', () => {
    render(<App />);

    // Advance to Stage 2 first
    fireEvent.click(screen.getByText(STORY_DATA[0].choices[1].text));
    expect(screen.getByText(/The Flooded Atrium/i)).toBeInTheDocument();

    // In Stage 2, Choice 2 is fatal: "Leap across the floating coolant drums..."
    const fatalChoice = screen.getByText(STORY_DATA[1].choices[1].text);
    fireEvent.click(fatalChoice);

    // Verify Game Over screen
    expect(screen.getByText(/TERMINAL ERROR: GAME OVER/i)).toBeInTheDocument();
    expect(screen.getByText(STORY_DATA[1].choices[1].consequence!)).toBeInTheDocument();

    // Click "Restart from First Page"
    const restartBtn = screen.getByRole('button', { name: /restart from first page/i });
    fireEvent.click(restartBtn);

    // Must be back at Stage 1 with Cycle #02
    expect(screen.getByText(/The Drowned Airlock/i)).toBeInTheDocument();
    expect(screen.getByText(/CYCLE:/i)).toHaveTextContent(/02/);
  });

  it('responds to keyboard shortcuts: 1, 2, 3, Space, and R', () => {
    render(<App />);

    // Press Space to fast forward typewriter
    fireEvent.keyDown(window, { code: 'Space' });
    expect(screen.getByText(/TRANSMISSION COMPLETE/i)).toBeInTheDocument();

    // Press '2' (correct choice for Stage 1)
    fireEvent.keyDown(window, { key: '2' });
    expect(screen.getByText(/The Flooded Atrium/i)).toBeInTheDocument();

    // Press '3' (fatal choice for Stage 2)
    fireEvent.keyDown(window, { key: '3' });
    expect(screen.getByText(/TERMINAL ERROR: GAME OVER/i)).toBeInTheDocument();

    // Press 'r' to restart
    fireEvent.keyDown(window, { key: 'r' });
    expect(screen.getByText(/The Drowned Airlock/i)).toBeInTheDocument();
    expect(screen.getByText(/CYCLE:/i)).toHaveTextContent(/02/);
  });

  it('can navigate through all 5 stages to achieve victory', () => {
    render(<App />);

    // Stage 1 -> Choice 2
    fireEvent.click(screen.getByText(STORY_DATA[0].choices[1].text));

    // Stage 2 -> Choice 1
    fireEvent.click(screen.getByText(STORY_DATA[1].choices[0].text));

    // Stage 3 -> Choice 3
    fireEvent.click(screen.getByText(STORY_DATA[2].choices[2].text));

    // Stage 4 -> Choice 2
    fireEvent.click(screen.getByText(STORY_DATA[3].choices[1].text));

    // Stage 5 -> Choice 2
    fireEvent.click(screen.getByText(STORY_DATA[4].choices[1].text));

    // Verify Victory View
    expect(screen.getByText(/MISSION ACCOMPLISHED \/\/ VICTORY/i)).toBeInTheDocument();
    expect(screen.getByText(/PERFECT RUN \(FLAWLESS\)/i)).toBeInTheDocument();

    // Click "Embark on New Mission"
    fireEvent.click(screen.getByRole('button', { name: /embark on new mission/i }));

    // Back at stage 1
    expect(screen.getByText(/The Drowned Airlock/i)).toBeInTheDocument();
    expect(screen.getByText(/CYCLE:/i)).toHaveTextContent(/01/);
  });

  it('switches terminal themes and toggles scanline display', () => {
    render(<App />);

    // Toggle amber theme
    fireEvent.click(screen.getByText('amber'));
    // Toggle slate theme
    fireEvent.click(screen.getByText('slate'));

    // Toggle CRT scanlines off and on
    const monitorBtn = screen.getByTitle(/toggle crt scanline effect/i);
    fireEvent.click(monitorBtn);
    expect(document.querySelector('.crt-scanlines')).not.toBeInTheDocument();

    fireEvent.click(monitorBtn);
    expect(document.querySelector('.crt-scanlines')).toBeInTheDocument();
  });
});
