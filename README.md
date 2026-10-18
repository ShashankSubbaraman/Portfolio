# Shashank Subba — Engineering Portfolio

Buildless HTML, CSS, JavaScript and locally bundled Three.js. Deployable files are in `dist/`.

## Publish to the existing Netlify website

Upload the complete `portfolio/` folder from the supplied ZIP to the existing Netlify project's manual deployment area. Keep the assets and vendor folders next to index.html. Do not upload index.html alone.

## Edit the website

- Main content and project order: `dist/index.html`.
- Case-study descriptions and metrics: the `projects` object in `dist/script.js`.
- Colors, typography, responsive layout: `dist/styles.css`.
- Full-page atom, orbit motion, lighting, and scroll route: `dist/scene.js`.
- Photo-aware screen placement: `dist/atom-layout.js`.
- Resume download: replace `dist/resume.pdf`.
- Photographs and CAD screenshots: `dist/assets/`. Use a new filename when changing images because these assets have immutable caching.

The current resume is the provided Resume_GeneralAtomics.pdf. The research hand remains clearly identified as early CAD development. Public spacecraft renderings and the MicroMouse assembly are captioned to distinguish visual context from the user's specific contribution. The planetary gearset is shown as a CAD study without fabricated performance results.

## Interaction and motion

The About section opens the site with the portrait next to its copy at every screen width. Section backgrounds are transparent over a single dark atmosphere. A decorative 3D atom travels from side to side across the full document as the user scrolls, with orbiting electrons and a small illuminated nucleus. Photos sit in alternating outer lanes, leaving open space for the atom. Its placement checks the visible bounds of the portrait, project images, and thumbnails, then shifts and scales the atom to stay clear of those photo panels. An orthographic camera keeps its screen-space bounds aligned with that placement. Photographs keep their own image backgrounds. Project photos stay beside their descriptions at narrow widths as well, with a separate project-details button directly below each image. Experience includes IEEE MicroMouse and ASME/HERC student teams. Motion is capped at 30 frames per second and pauses when the page is hidden. An inline SVG supplies a scroll-responsive fallback if WebGL is unavailable. The atom is an illustrative graphic, not a physical simulation.

Large project chapters use sticky presentation and image motion on roomy desktops. Phones and short screens use regular flowing layouts. Project filters show aerospace, robotics, or all work. All nine project buttons below the images open a native dialog with keyboard focus containment, Escape/Close dismissal, and focus restoration. Coursework uses native disclosure.

Reduced-motion preferences remove scroll rotation and idle animation; placement still adjusts to keep the graphic clear of photographs. Content and resume access remain available if JavaScript fails.

## Verification

JavaScript and module syntax, local asset references, anchor targets, case-study mapping, PDF replacement, CSS parsing, dependency completeness, and photo-avoidance geometry at desktop, tablet, and phone sizes were checked. The review edits were checked for all nine image/button groupings, both club entries, heading whitespace, and valid anchors. Browser rendering, WebGL rendering, and device interaction could not be audited in this environment. Check desktop and mobile appearance before replacing the public Netlify deployment.
