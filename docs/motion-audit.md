# Motion and GSAP suitability review

Reviewed: 23 October 2026
Baseline commit: 94676f8, including the pending interaction fixes from the prior audit.

## Scope and decision

Reviewed GSAP Core, Timeline, Utils, ScrollTrigger, Plugins, Performance and framework integration guidance. This is a static HTML/CSS/vanilla JavaScript website; React and Vue/Svelte lifecycle APIs do not apply.

Keep CSS transitions and native anchor scrolling. Current interactions do not require timelines, pinning, scrub, ScrollSmoother, SplitText, Flip or Draggable. No GSAP runtime or plugin has been added. Preserve the approved decision to show content immediately without scroll reveals.

## Applied corrections

- Replace the menu's general resize listener with a breakpoint media-query listener. Mobile browser chrome can resize the viewport without crossing a breakpoint; it should not dismiss navigation.
- Use transforms for the hamburger's second line in both states, keeping its layout offset constant. Reduced-motion users get immediate, distinct open/closed shapes.
- Open a deep-linked details topic before same-page anchor navigation, and on direct/hash navigation.
- Clear transient plan and form timers on pagehide and restore the correct navigation state on pageshow. This also handles back/forward cache restoration.
- Preserve a visible keyboard focus underline without leaving every reduced-motion navigation link underlined.

## Existing safeguards retained

- Button press: 160ms. Hover feedback: 200ms. Mobile menu: 250ms, without link stagger.
- Hover movement limited to fine pointers with hover support.
- Reduced-motion settings remove movement while retaining color/opacity feedback and readable state indicators.
- No continuous scroll handler, requestAnimationFrame animation loop, blanket will-change or forced GPU promotion.
- Small color/border transitions are deliberate feedback and still require paint; they are not claimed to be compositor-only.

## Validation

Headless Edge checks at mobile/desktop breakpoints confirmed: height-only resize preserves the open menu; crossing the breakpoint closes it and makes desktop navigation interactive; a direct #workflow link opens its topic; pagehide removes transient highlight state; reduced motion uses native immediate scrolling and distinct hamburger shapes. Homepage, blog index and privacy page had no horizontal overflow at 375px. No page JavaScript errors were observed in those checks.

No physical-device frame-rate or low-end hardware benchmark was performed. No 60fps guarantee is implied.
