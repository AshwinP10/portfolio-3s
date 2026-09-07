# Ashwin Prakash — Portfolio

A Next.js portfolio for machine learning, computer vision, and robotics work. The homepage is a readable, server-rendered portfolio; the interactive Three.js plaza lives at `/world`.

## Experiences

- `/`: project catalog with field filters, technology search, accessible project dialogs, experience timeline, skills, contact links, and an on-demand résumé preview.
- `/cv`: the same complete portfolio, preserving the existing résumé route.
- `/world`: the original robot and plaza with a guided tour, direct story navigation, touch controls, pause/resume, and saved graphics settings.
- `/world?project=davatar`: an example direct link to a project in the plaza.

Portfolio facts, project details, and world destinations are shared through `components/world/world-data.ts`. `lib/projects.ts` adds display summaries and categories without duplicating the underlying experience or research details.

## Development

Use Node.js 24 and pnpm. The existing dependency versions and lockfile are preserved.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm run typecheck
pnpm build
```

Tests use Node’s built-in TypeScript support and test runner. They cover catalog completeness, search and filter behavior, world deep links, graphics preferences, and guided-tour integrity. The GitHub verification workflow runs tests, TypeScript checking, and the production build for pull requests and changes to `main`.

## Performance choices

- The homepage does not import the WebGL runtime. Links to `/world` disable Next.js prefetch so Three.js loads when a visitor chooses the world.
- Static portfolio sections render on the server. Client code is limited to interactions and the world.
- The existing portrait uses Next Image with responsive sizes, priority loading, and AVIF/WebP optimization. Geist is served from the installed font package instead of fetching Google Fonts at build time.
- The PDF iframe mounts only after “Preview résumé” is selected.
- Automatic graphics cap pixel ratio at 1.25 and use 1024px shadow maps. High uses a 1.5 cap and 1536px shadows. Battery saver uses pixel ratio 1 and disables shadows and optional point lights. Automatic mode selects the lower budget on coarse-pointer, reduced-motion, or low-core devices and lowers it when frame performance declines.
- The render loop pauses while the tab is hidden, help is open, or the visitor pauses. Reduced-motion visitors start paused and can resume explicitly.
- Generated textures are disposed when the world unmounts. Camera time steps are clamped to prevent large jumps after a pause.

These changes reduce startup work and rendering budgets. Real-world latency and Core Web Vitals still need measurement against a deployed preview; no benchmark scores are claimed.

## Accessibility and fallbacks

Navigation and filters work with keyboard and touch. Project and help dialogs use Radix focus management, Escape dismissal, and focus restoration. Movement keys yield to buttons, links, selects, and editable fields. Theme choice persists locally; clipboard failures retain a usable email link. Reduced motion is respected by page transitions. WebGL2 failure or context loss exposes the complete text portfolio and PDF instead of trapping visitors on a loading screen.
