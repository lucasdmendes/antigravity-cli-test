# Interactive Story Terminal: Protocol Omega Deep

A high-immersion, terminal-style interactive fiction reader built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

The story is segmented into calibrated ~500-character narrative stages. At each decision point, players are presented with **3 fixed protocol options**:
- **1 Correct Choice**: Advances the story to the next stage (or achieves planetary escape victory at the final stage).
- **2 Fatal Choices**: Triggers a fatal system outcome and requires the player to **restart from the first page** while tracking cycle attempts.

---

## 🏗️ Architecture Block Schematics

### 1. System Block Diagram

```mermaid
flowchart TD
    subgraph DataLayer["1. Data and Types Layer"]
        ST["storyData.ts (5 calibrated ~500-char stages, choices, consequences)"]
        TY["types/story.ts (StoryPart, StoryChoice, GameStatus, TerminalTheme)"]
        TH["utils/theme.ts (Phosphor Green, Amber, Slate palettes)"]
    end

    subgraph HookLayer["2. Logic and State Engine Layer"]
        SE["useStoryEngine.ts (State machine, navigation, restart from page 1)"]
        TW["useTypewriter.ts (Cadence streaming, skipTyping instant reveal)"]
    end

    subgraph AppShell["3. Application Orchestrator"]
        APP["App.tsx (Global keyboard event bus, theme and CRT scanline state)"]
    end

    subgraph ViewLayer["4. Component Presentation Layer"]
        direction TB
        HDR["TerminalHeader.tsx (Status, cycle counter, theme and CRT toggles)"]
        PRG["TerminalProgress.tsx (Segmented memory block meter)"]
        
        subgraph ActiveScreens["Dynamic Viewport Routing"]
            STG["StoryPassage.tsx and ChoicePrompt.tsx (Playing mode)"]
            GO["GameOverView.tsx (Game Over alert and restart button)"]
            VIC["VictoryView.tsx (Extraction accomplished summary)"]
        end
        
        FTR["Footer (Keyboard shortcuts and specifications telemetry)"]
    end

    DataLayer --> HookLayer
    HookLayer --> AppShell
    AppShell --> ViewLayer
```

---

### 2. State Transition & Decision Engine

```mermaid
stateDiagram-v2
    [*] --> Stage1: Initialize Cycle 1
    
    state "Stage 1: Drowned Airlock (~504 chars)" as Stage1
    state "Stage 2: Flooded Atrium (~512 chars)" as Stage2
    state "Stage 3: Mainframe Vault (~509 chars)" as Stage3
    state "Stage 4: Abyss Causeway (~510 chars)" as Stage4
    state "Stage 5: Extraction Silo (~506 chars)" as Stage5

    Stage1 --> Stage2: Choice 2 (Correct)
    Stage1 --> GameOver: Choice 1 or 3 (Fatal)

    Stage2 --> Stage3: Choice 1 (Correct)
    Stage2 --> GameOver: Choice 2 or 3 (Fatal)

    Stage3 --> Stage4: Choice 3 (Correct)
    Stage3 --> GameOver: Choice 1 or 2 (Fatal)

    Stage4 --> Stage5: Choice 2 (Correct)
    Stage4 --> GameOver: Choice 1 or 3 (Fatal)

    Stage5 --> Victory: Choice 2 (Correct)
    Stage5 --> GameOver: Choice 1 or 3 (Fatal)

    state GameOver {
        [*] --> DisplayFatalConsequence
        DisplayFatalConsequence --> RestartRequested: Press R or Click Restart
    }

    state Victory {
        [*] --> DisplayMissionReport
        DisplayMissionReport --> ResetAll: Press Enter or Play Again
    }

    RestartRequested --> Stage1: Reset to Index 0 and Increment Cycle
    ResetAll --> Stage1: Full Reset to Cycle 1
```

---

### 3. Component Interaction Flowchart

```mermaid
sequenceDiagram
    autonumber
    actor Player
    participant App as App.tsx
    participant Engine as useStoryEngine
    participant Typewriter as useTypewriter
    participant UI as "StoryPassage / ChoicePrompt"
    participant GameOver as GameOverView

    Player->>App: Mounts Application
    App->>Engine: Initialize (partIndex: 0, status: PLAYING)
    App->>Typewriter: Load text (~500 chars)
    Typewriter-->>UI: Stream characters with blinking cursor
    
    alt Player skips animation
        Player->>UI: Press SPACE or Click Text
        UI->>Typewriter: skipTyping()
        Typewriter-->>UI: Instantly render full passage
    end

    alt Player selects correct choice
        Player->>UI: Press 1, 2, or 3 or Click Choice
        UI->>Engine: selectChoice(choice)
        Engine->>Engine: isCorrect is true
        Engine-->>App: Advance partIndex + 1
        App->>Typewriter: Load new passage text
    else Player selects wrong choice
        Player->>UI: Press 1, 2, or 3 or Click Choice
        UI->>Engine: selectChoice(choice)
        Engine->>Engine: isCorrect is false
        Engine-->>App: status: GAME_OVER
        App-->>GameOver: Render Fatal Consequence Modal
        Player->>GameOver: Press R or Click Restart
        GameOver->>Engine: restartGame()
        Engine-->>App: Reset partIndex: 0, increment attempts
        App->>Typewriter: Load Stage 1 text
    end
```

---

## 📂 File Map & Module Roles

```
src/
├── types/
│   └── story.ts              # Data contracts (StoryPart, StoryChoice, GameStatus, TerminalTheme)
├── data/
│   └── storyData.ts          # 5-stage story dataset, each text tuned to ~500 characters
├── hooks/
│   ├── useTypewriter.ts      # Typing animation hook with instant-skip functionality
│   └── useStoryEngine.ts     # Core state machine: choices, game over, restart from page 1
├── components/
│   ├── TerminalHeader.tsx    # Telemetry bar, theme selector (Green/Amber/Slate), CRT toggle
│   ├── TerminalProgress.tsx  # Sector progress bar with active glowing memory blocks
│   ├── StoryPassage.tsx      # Passage reader with character counter & typewriter cursor
│   ├── ChoicePrompt.tsx      # 3 fixed protocol choices with [01], [02], [03] keyboard badges
│   ├── GameOverView.tsx      # System Alert failure screen showing fatal consequence
│   └── VictoryView.tsx       # Mission Accomplished screen with extraction statistics
├── utils/
│   └── theme.ts              # Terminal themes: Phosphor Green, Amber CRT, Cyber Slate
├── test/
│   └── setup.ts              # Vitest + Jest-DOM setup
├── __tests__/
│   ├── storyData.test.ts     # Data integrity tests (~500 chars, 3 choices, 1 valid / 2 fatal)
│   ├── useStoryEngine.test.ts# Logic test suite (navigation, failures, first-page reboot)
│   ├── useTypewriter.test.ts # Fake timer hook tests (streaming, cadence, instant skip)
│   ├── StoryComponents.test.tsx # Component unit tests (Passage, Choice, GameOver, Victory, Header, Progress)
│   └── App.test.tsx          # Full integration suite (E2E story loop, keyboard hotkeys, themes)
├── App.tsx                   # Master keyboard listener and screen router
├── index.css                 # Base styles and CRT scanline overlay rules
└── main.tsx                  # React DOM entry point
```

---

## ⚡ Keyboard Controls

| Key | Context | Action |
| :--- | :--- | :--- |
| `1`, `2`, `3` | Playing | Select protocol choice 1, 2, or 3 |
| `Space` | Playing | Fast-forward / skip typewriter text animation |
| `R` or `Enter` | Game Over | Restart from the first page (Cycle + 1) |
| `R` or `Enter` | Victory | Embark on a new mission (Reset cycles) |

---

## 🧪 Test Suite (30 Passing Tests)

The project includes an automated test suite powered by **Vitest**, **React Testing Library**, and **jest-dom**:

| Test File | Scope | Key Assertions |
| :--- | :--- | :--- |
| [`storyData.test.ts`](src/__tests__/storyData.test.ts) | Data Integrity | Enforces ~500 chars per stage (480–520), exactly 3 choices, 1 valid / 2 fatal, non-empty consequences |
| [`useStoryEngine.test.ts`](src/__tests__/useStoryEngine.test.ts) | State Machine | Progression, game-over trigger, attempts counter, first-page reset, victory condition |
| [`useTypewriter.test.ts`](src/__tests__/useTypewriter.test.ts) | Hook & Timers | Character-by-character cadence via `vi.useFakeTimers()`, instant skip, reset on passage change |
| [`StoryComponents.test.tsx`](src/__tests__/StoryComponents.test.tsx) | Component Units | Telemetry badges, cursor presence, choice payloads, fatal alerts, flawless/survivor badges, theme toggles |
| [`App.test.tsx`](src/__tests__/App.test.tsx) | Full Integration | End-to-end stage navigation, failure reboot cycle, keyboard listeners (`1, 2, 3, Space, R`), CRT scanlines |

Run the test suite:
```bash
npm test
```

---

## 🚀 Development & Testing Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run full Vitest test suite (30 test cases)
npm test

# Build for production
npm run build
```
