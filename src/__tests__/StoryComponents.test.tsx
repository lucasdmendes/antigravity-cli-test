import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoryPassage } from '../components/StoryPassage';
import { ChoicePrompt } from '../components/ChoicePrompt';
import { GameOverView } from '../components/GameOverView';
import { VictoryView } from '../components/VictoryView';
import { TerminalHeader } from '../components/TerminalHeader';
import { TerminalProgress } from '../components/TerminalProgress';
import { STORY_DATA } from '../data/storyData';

describe('Story Component Unit Tests', () => {
  const samplePart = STORY_DATA[0];

  describe('<StoryPassage />', () => {
    it('displays chapter heading, live character counter, and text', () => {
      render(
        <StoryPassage
          part={samplePart}
          displayedText="The hydraulic seals hiss violently..."
          isTyping={true}
          onSkipTyping={vi.fn()}
          theme="green"
        />
      );

      expect(screen.getByText(samplePart.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${samplePart.text.length}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(/~500 CHARS/i)).toBeInTheDocument();
      expect(screen.getByText(/The hydraulic seals hiss violently\.\.\./i)).toBeInTheDocument();
      expect(screen.getByText(/Click text or press \[SPACE\] to fast-forward/i)).toBeInTheDocument();
    });

    it('triggers onSkipTyping when clicked', () => {
      const onSkipTyping = vi.fn();
      render(
        <StoryPassage
          part={samplePart}
          displayedText="Sample"
          isTyping={true}
          onSkipTyping={onSkipTyping}
          theme="green"
        />
      );

      fireEvent.click(screen.getByText(samplePart.title));
      expect(onSkipTyping).toHaveBeenCalledTimes(1);
    });
  });

  describe('<ChoicePrompt />', () => {
    it('renders all 3 choices with 01, 02, 03 badges', () => {
      render(
        <ChoicePrompt
          choices={samplePart.choices}
          onSelectChoice={vi.fn()}
          isTyping={false}
          theme="green"
        />
      );

      expect(screen.getByText('01')).toBeInTheDocument();
      expect(screen.getByText('02')).toBeInTheDocument();
      expect(screen.getByText('03')).toBeInTheDocument();

      samplePart.choices.forEach((choice) => {
        expect(screen.getByText(choice.text)).toBeInTheDocument();
      });
    });

    it('invokes onSelectChoice with the chosen payload', () => {
      const onSelect = vi.fn();
      render(
        <ChoicePrompt
          choices={samplePart.choices}
          onSelectChoice={onSelect}
          isTyping={false}
          theme="green"
        />
      );

      fireEvent.click(screen.getByText(samplePart.choices[1].text));
      expect(onSelect).toHaveBeenCalledWith(samplePart.choices[1]);
    });
  });

  describe('<GameOverView />', () => {
    it('renders fatal consequence, failure stage, and handles restart', () => {
      const onRestart = vi.fn();
      const failedChoice = samplePart.choices[0]; // fatal choice

      render(
        <GameOverView
          failedPart={samplePart}
          selectedChoice={failedChoice}
          attempts={2}
          highestPartReached={1}
          onRestart={onRestart}
          theme="green"
        />
      );

      expect(screen.getByText(/TERMINAL ERROR: GAME OVER/i)).toBeInTheDocument();
      expect(screen.getByText(failedChoice.consequence!)).toBeInTheDocument();
      expect(screen.getByText(/Stage 01/i)).toBeInTheDocument();

      const restartBtn = screen.getByRole('button', { name: /restart from first page/i });
      fireEvent.click(restartBtn);
      expect(onRestart).toHaveBeenCalledTimes(1);
    });
  });

  describe('<VictoryView />', () => {
    it('shows FLAWLESS RUN classification on 1st attempt', () => {
      render(<VictoryView attempts={1} onPlayAgain={vi.fn()} theme="green" />);
      expect(screen.getByText(/MISSION ACCOMPLISHED \/\/ VICTORY/i)).toBeInTheDocument();
      expect(screen.getByText(/PERFECT RUN \(FLAWLESS\)/i)).toBeInTheDocument();
    });

    it('shows SURVIVOR classification when multiple attempts were needed', () => {
      render(<VictoryView attempts={3} onPlayAgain={vi.fn()} theme="green" />);
      expect(screen.getByText(/SURVIVOR/i)).toBeInTheDocument();
      expect(screen.getByText(/3 Attempt\(s\)/i)).toBeInTheDocument();
    });
  });

  describe('<TerminalHeader /> and <TerminalProgress />', () => {
    it('toggles theme when clicking theme buttons', () => {
      const setTheme = vi.fn();
      render(
        <TerminalHeader
          theme="green"
          setTheme={setTheme}
          scanlines={true}
          setScanlines={vi.fn()}
          status="PLAYING"
          attempts={1}
          highestPartReached={1}
          onRestart={vi.fn()}
        />
      );

      fireEvent.click(screen.getByText('amber'));
      expect(setTheme).toHaveBeenCalledWith('amber');

      fireEvent.click(screen.getByText('slate'));
      expect(setTheme).toHaveBeenCalledWith('slate');
    });

    it('renders progress percentage accurately', () => {
      render(
        <TerminalProgress
          theme="green"
          currentIndex={2} // stage 3 of 5 -> (3/5) = 60%
          totalParts={5}
          location="Sector 09 // Quantum Core Archive"
        />
      );

      expect(screen.getByText('60%')).toBeInTheDocument();
      expect(screen.getByText(/Quantum Core Archive/i)).toBeInTheDocument();
    });
  });
});
