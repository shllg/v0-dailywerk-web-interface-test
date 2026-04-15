# DailyWerk Design System

## Overview

DailyWerk is a personal AI assistant system designed to feel **magical, warm, and alive** — not like enterprise software. The interface should evoke the feeling of conversing with a wise, helpful companion rather than using a tool.

**Design Philosophy**: "AI companion, not software"

---

## Visual Identity

### Color Palette

**Base Colors (Dark Theme)**
- `--background`: Deep violet-black (`oklch(0.10 0.02 285)`) — warm undertone, not cold gray
- `--foreground`: Soft white with violet cast (`oklch(0.95 0.01 285)`)
- `--card`: Slightly elevated surface (`oklch(0.14 0.02 285)`)

**Accent Colors**
- `--primary`: Vibrant violet (`oklch(0.65 0.28 285)`) — the signature "magic" color
- `--primary-glow`: Soft purple glow for ambient effects (`rgba(168, 85, 247, 0.15)`)
- `--accent-warm`: Warm amber for reasoning/thinking states (`oklch(0.75 0.15 85)`)
- `--accent-success`: Soft emerald for completed states (`oklch(0.70 0.18 155)`)

**Surface Hierarchy**
- Level 0: Pure background
- Level 1: Cards, panels (`--card`)
- Level 2: Interactive elements, inputs (`oklch(0.18 0.02 285)`)
- Level 3: Hover states, elevated modals

**Semantic Colors**
- Thinking/Processing: Warm amber `#F59E0B` with soft glow
- Success/Complete: Soft green `#10B981`
- Active/Live: Primary violet with pulse animation
- Muted/Secondary: `oklch(0.55 0.02 285)`

---

## Typography

**Font Stack**
- Primary: Inter (clean, friendly, highly legible)
- Mono: JetBrains Mono or system mono (for code, IDs)

**Scale**
- xs: 12px — timestamps, metadata
- sm: 14px — secondary text, labels
- base: 16px — body text, messages
- lg: 18px — section headers
- xl: 20px — page titles
- 2xl: 24px — hero elements

**Weights**
- Regular (400): Body text
- Medium (500): Labels, buttons
- Semibold (600): Headings, emphasis

**Line Height**
- Tight (1.25): Headings
- Normal (1.5): Body text
- Relaxed (1.75): Long-form reading (vault content)

---

## Spacing & Layout

**Spacing Scale** (8px base)
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px
- 16: 64px

**Container Widths**
- Chat messages: max-width 720px, centered
- Vault content: max-width 800px
- Full-width panels: 100% with padding

**Border Radius**
- Small (buttons, chips): 8px (`rounded-lg`)
- Medium (cards, inputs): 12px (`rounded-xl`)
- Large (modals, sheets): 16px (`rounded-2xl`)
- Full (avatars, pills): 9999px (`rounded-full`)

---

## Glass-Morphism Effects

Used for elevated, floating UI elements to create depth and magical feel.

**Standard Glass**
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Elevated Glass** (for modals, command palette)
```css
background: rgba(20, 15, 30, 0.85);
backdrop-filter: blur(40px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
```

**Input Glass**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

---

## Ambient Glow Effects

Key to the "magical" feel — subtle colored glows that make elements feel alive.

**Agent Message Glow**
```css
box-shadow: 
  0 0 0 1px rgba(168, 85, 247, 0.1),
  0 4px 20px rgba(168, 85, 247, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

**Active/Focused Glow**
```css
box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
```

**Thinking State Glow** (amber)
```css
box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
```

---

## Animations

**Timing Functions**
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)` — default for most
- Bouncy: `cubic-bezier(0.34, 1.56, 0.64, 1)` — for playful interactions
- Spring: `cubic-bezier(0.22, 1, 0.36, 1)` — for modals, sheets

**Durations**
- Instant: 100ms — hover states
- Fast: 200ms — buttons, toggles
- Normal: 300ms — panels, cards
- Slow: 500ms — modals, page transitions

**Signature Animations**

1. **Breathing Pulse** (for active/live states)
```css
@keyframes breathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
animation: breathe 3s ease-in-out infinite;
```

2. **Soft Bounce** (for dots, loading)
```css
@keyframes softBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

3. **Glow Pulse** (for send button, active elements)
```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
}
```

4. **Float In** (for messages appearing)
```css
@keyframes floatIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Component Patterns

### Chat Messages

**User Messages**
- Align: Right
- Background: Solid primary (`bg-primary`)
- Text: White
- Border-radius: 20px with flat bottom-right corner
- Max-width: 80% of container
- No border, no shadow

**Agent Messages**
- Align: Left
- Background: Transparent or very subtle (`bg-card/50`)
- Border: None (borderless, floating feel)
- Ambient glow effect (see above)
- Max-width: 85% of container
- Avatar: Small circular, left of first message in group

**Tool Call Chips** (inline in messages)
- Background: Glass with category tint
- Border-radius: Full pill
- Icon + label + status indicator
- States: running (spinner), completed (checkmark), failed (x)

**Reasoning Blocks**
- Collapsible accordion
- Header: Warm amber tint with brain/sparkle icon
- Background: Subtle amber glass
- Content: Monospace or slightly condensed text
- Default: Collapsed with "Show thinking" toggle

### Input Bar

**Structure**
- Full-width glass container
- Two-row layout on desktop: toggles row + input row
- Single row on mobile with icon buttons

**Elements**
- Textarea: Auto-expanding, max 6 rows
- Voice button: Microphone icon, pulses red when recording
- Reasoning toggle: Brain icon, glows when active
- Attachments button: Paperclip icon
- Send button: Arrow icon with glow effect when enabled

**States**
- Empty: Send button muted
- Has content: Send button glows with primary
- Recording: Voice button pulses, red ring
- Thinking enabled: Brain icon filled, subtle glow

### Navigation

**Floating Dock** (Desktop)
- Position: Fixed bottom center
- Background: Elevated glass
- Icons: 4-5 main destinations only
- Active state: Filled icon + primary color + subtle glow
- Hover: Scale up slightly, tooltip

**Mobile Tab Bar**
- Position: Fixed bottom, full width
- Background: Solid dark with subtle top border
- Safe area padding for notched devices
- 4-5 items max
- Active: Primary color, filled icon

**Command Palette** (Cmd+K)
- Centered modal with glass background
- Large search input at top
- Grouped results with section headers
- Keyboard navigation indicators
- Recent actions section

### Cards & Panels

**Standard Card**
- Background: `bg-card`
- Border: 1px subtle (`border-border`)
- Border-radius: 12px
- Padding: 16-24px
- Hover: Slight lift, glow on interactive cards

**Glass Panel**
- Background: Glass effect
- Border: White 8% opacity
- Used for: Floating menus, inspectors, overlays

### Empty States

- Centered layout
- Large, soft icon (40-60px)
- Friendly heading
- Supportive description
- Optional CTA button
- Subtle animated element (floating dots, gentle pulse)

---

## Iconography

**Style**: Lucide icons (consistent with shadcn/ui)

**Sizes**
- Small (inline): 16px
- Default: 20px
- Large (empty states): 40-60px

**Treatment**
- Default: `text-muted-foreground`
- Active: `text-primary`
- Interactive hover: `text-foreground`

**Key Icons**
- Chat: `MessageSquare`
- Vault: `Folder` or `BookOpen`
- Memory: `Brain`
- Settings: `Settings`
- Agents: `Bot` or `Sparkles`
- Voice: `Mic`
- Send: `ArrowUp` or `Send`
- Reasoning: `Sparkles` or `Lightbulb`

---

## Responsive Behavior

**Breakpoints**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Adaptations**
- Bottom tab bar instead of floating dock
- Full-screen chat (no visible chrome)
- Sheets slide up from bottom
- Simplified input bar (icon row)
- Touch-friendly tap targets (44px minimum)

**Tablet Adaptations**
- Optional sidebar that can be toggled
- Two-column layouts where appropriate
- Floating dock at bottom

**Desktop Adaptations**
- Floating dock centered at bottom
- Side panels for inspectors
- Keyboard shortcuts visible
- Hover states

---

## Accessibility

- All interactive elements have visible focus states
- Color contrast ratios meet WCAG AA
- Animations respect `prefers-reduced-motion`
- Screen reader text for icon-only buttons
- Keyboard navigation throughout
- Focus trap in modals

---

## Voice & Tone

The UI copy should feel:
- **Warm**: "How can I help?" not "Enter query"
- **Conversational**: "I'm thinking..." not "Processing request"
- **Supportive**: "Let's figure this out together" not "Error: Invalid input"
- **Personal**: Use "you" and "your", avoid corporate language

---

## Implementation Notes

**CSS Variables** are defined in `globals.css` and use OKLCH color space for better color manipulation.

**Tailwind Classes** leverage the design tokens:
- `bg-background`, `bg-card`, `bg-primary`
- `text-foreground`, `text-muted-foreground`, `text-primary`
- `border-border`, `ring-ring`

**Custom Utilities** in globals.css:
- `.glass` — standard glass-morphism
- `.glass-elevated` — stronger glass for modals
- `.glow-primary` — ambient purple glow
- `.glow-warm` — amber glow for thinking
- `.animate-breathe` — breathing pulse
- `.animate-float-in` — message appearance

**shadcn/ui Components** are customized via CSS variables to match the design system automatically.

---

## File Reference

- `/app/globals.css` — All theme variables, animations, utilities
- `/components/chat/` — Chat UI components
- `/components/layout/` — Navigation, dock, command palette
- `/components/vault/` — Vault sidebar, content viewer
- `/components/memory/` — DAG visualization, inspector
- `/lib/types.ts` — TypeScript interfaces
- `/lib/mock-data.ts` — Sample data for development
