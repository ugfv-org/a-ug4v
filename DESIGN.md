---
name: Neon-Ether Dark
colors:
  surface: '#100c1a'
  surface-dim: '#100c1a'
  surface-bright: '#2f2940'
  surface-container-lowest: '#000000'
  surface-container-low: '#151121'
  surface-container: '#1c1729'
  surface-container-high: '#221d30'
  surface-container-highest: '#282238'
  on-surface: '#ede4fa'
  on-surface-variant: '#afa8bc'
  inverse-surface: '#fdf7ff'
  inverse-on-surface: '#585264'
  outline: '#797285'
  outline-variant: '#4a4556'
  surface-tint: '#c39bff'
  primary: '#c39bff'
  on-primary: '#410083'
  primary-container: '#b889ff'
  on-primary-container: '#320067'
  inverse-primary: '#7543bc'
  secondary: '#ff6c95'
  on-secondary: '#48001c'
  secondary-container: '#bb0054'
  on-secondary-container: '#fff5f6'
  tertiary: '#81ecff'
  on-tertiary: '#005762'
  tertiary-container: '#00e3fd'
  on-tertiary-container: '#004d57'
  error: '#ff6e84'
  on-error: '#490013'
  error-container: '#a70138'
  on-error-container: '#ffb2b9'
  primary-fixed: '#b889ff'
  primary-fixed-dim: '#ac7af5'
  on-primary-fixed: '#000000'
  on-primary-fixed-variant: '#3e007e'
  secondary-fixed: '#ffc2cd'
  secondary-fixed-dim: '#ffadbe'
  on-secondary-fixed: '#6d002e'
  on-secondary-fixed-variant: '#a20048'
  tertiary-fixed: '#00e3fd'
  tertiary-fixed-dim: '#00d4ec'
  on-tertiary-fixed: '#003840'
  on-tertiary-fixed-variant: '#005762'
  primary-dim: '#b685ff'
  secondary-dim: '#ff6c95'
  tertiary-dim: '#00d4ec'
  error-dim: '#d73357'
  background: '#100c1a'
  on-background: '#ede4fa'
  surface-variant: '#282238'
typography:
  display-lg:
    fontFamily: Spline Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Spline Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 64px
---

# Design System Specification: Neon-Ether High-End Digital Experience

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Muse"**

This design system is a sophisticated translation of 'gamer-chic' aesthetics into a premium, editorial digital framework. It moves away from the cluttered, high-contrast tropes of typical gaming interfaces toward a "Digital Muse" concept: a space that feels energetic and youthful, yet anchored by intentional whitespace and architectural depth.

The system rejects the "template" look by utilizing heavy, high-contrast typography scales paired with ultra-fluid, rounded geometries and translucent layering. It embraces intentional asymmetry to mimic the dynamic, multi-layered personality of a digital-native creator.

## 2. Colors & Surface Philosophy

The palette is rooted in a deep midnight base to allow lavender, pink, and cyan accents to vibrate with neon energy.

### The "No-Line" Rule
Traditional 1px borders are avoided for sectioning. Boundaries are defined through tonal shifts and organic depth.

### Surface Hierarchy & Nesting
- Base Level: `surface`
- Primary Containers: `surface-container` or `surface-container-high`
- Floating Elements: `surface-container-highest`

### The "Glass & Gradient" Rule
Use glassmorphism for navigation and floating panels. Apply translucent `surface-variant` with `backdrop-blur`. Primary CTAs blend `primary` into `secondary` at 135 degrees.

## 3. Typography: Editorial Sans

- Display & Headline: `Spline Sans`
- Body & Title: `Plus Jakarta Sans`

Large headlines convey gamer-chic energy, while body text stays clean and legible.

## 4. Elevation & Depth

Depth comes from tonal layering and ambient glows. Floating elements use diffused lavender, pink, or cyan shadows rather than heavy dark drop shadows.

## 5. Components

- Primary buttons use gradient fills, full rounded corners, and no border.
- Secondary buttons use glass-style translucent fills.
- Cards and lists avoid dividers, relying on spacing and alternating surfaces.
- Live or active indicators use cyan pulse glows.

## 6. Do's and Don'ts

Do use editorial display type, asymmetry, and full roundedness for interactive elements. Do not use pure white body text, high-contrast opaque borders, or crowded layouts.
