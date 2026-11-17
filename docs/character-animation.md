# Character animation assets

The sprite sheet was generated with the built-in image generation tool, using the existing pixel portrait as the identity reference. The original portrait is preserved.

Asset: `public/images/animation/ahmed-gestures-v1.png`
Canvas: 1024 x 1536, real RGBA transparency, four columns by six rows, 256 x 256 cells.

Rows: idle and blink; walk; wave; point; thumbs-up; jump. Each row contains four poses. Frame selection and timing live in `src/lib/character.ts`, with reusable rendering in `CharacterSprite.tsx`.

The loader waits for essential fonts and images, enforces a short presentation time, and caps asset waiting at 6.5 seconds. Reduced motion keeps the character still and skips the jump/dissolve. Enter starts only when ready; Escape and Skip always dismiss. The intro appears once per browser session and can be replayed from the footer. The session key is `am-loader-seen-v1`.

The loader uses the sprite sequences described above. The homepage uses the separate smooth jointed rig described below. Click to wave; another click queues a thumbs-up.

## Final generation prompt

```text
Use case: identity-preserve.
Asset type: production pixel-art animation sprite sheet for a website loading screen.
Input image 1 is the identity and pixel-art style reference. Derive the SAME character, preserving his black curly hair, thick eyebrows, moustache and small goatee, warm tan skin, black zip hoodie over a black shirt with a muted teal angular emblem, charcoal cargo trousers, and cream-and-black sneakers. Do not introduce other characters or props.
Produce ONE genuinely transparent PNG sprite atlas, portrait canvas exactly 1024 by 1536 pixels, arranged as exactly FOUR columns by SIX rows: 24 full-body frames in a strict uniform grid of 256 by 256 pixel cells. No grid lines, no labels, no text, no backdrop, no shadows on a floor.
Every cell contains one complete character with the same proportions, scale, pixel resolution, lighting, and camera angle. Each standing character is approximately 190 pixels tall, centered horizontally at cell x=128, feet baseline at cell y=232. Keep ALL hair, hands, fingers, and shoes within the cell with transparent padding, including the largest gestures. Full body must always be visible. All sprites share the same body registration so animation does not jitter.
STYLE: clean crisp pixel art, readable at 96–144 pixels tall, hard pixel edges, consistent dark outlines. Match the supplied character closely. Only change pose, arms, legs, eyes, and facial expression as needed for each gesture. Hands must come out of pockets to animate.
Row 1 (top, four frames): IDLE. Neutral relaxed stance, eyes open; slight breathing; eyes blink closed; return to neutral open eyes. Friendly subtle expression.
Row 2 (four frames): WALK cycle toward the viewer's RIGHT. Left leg forward/right arm forward; legs passing; right leg forward/left arm forward; opposite passing. Real changing leg and arm positions, consistent face.
Row 3 (four frames): WAVE. Raise the hand on the viewer's right beside the head, wave out, wave in, wave out. Open palm visibly changes angle.
Row 4 (four frames): POINT DOWN-LEFT. Extend the hand on the viewer's left toward a button below-left; clear pointing index finger, subtle friendly face; extend further; retract slightly; return to extended pointing pose.
Row 5 (four frames): THUMBS UP. Raise the hand on viewer's right with clearly readable thumbs up; hold; slight smile/blink; hold again.
Row 6 (bottom, four frames): JUMP. Knees bend and body crouches; takeoff with arms up; airborne pose with both knees bent and arms up; landing crouch. Keep transparent margins. Horizontal registration remains fixed; jumping elevation may vary within the cell.
Critical: actual alpha transparency, not a baked checkerboard. Exact uniform 4-column/6-row grid. No captions or cell borders. No additional decorative objects. This is an animation atlas consumed directly by CSS, so spacing and character consistency matter more than illustration detail.
```

## Smooth homepage rig

The homepage now uses `public/images/animation/ahmed-hero-rig-v1.png`, generated with the built-in image tool. The original portrait and the loader's sprite sheet remain preserved. This is a 1536 x 1024 transparent atlas with six 512px cells: body without foreground arm; upper arm; relaxed forearm; waving forearm; thumbs-up forearm; unused assembly reference.

`HeroCharacter.tsx` assembles the first five cells in one shared coordinate space. Two shoulder/elbow transforms interpolate continuously using the browser Web Animations API. Each 2.8-second gesture includes raising and lowering the arm. Hand variants crossfade, while the face, torso, and feet remain fixed. Repeated clicks queue one follow-up gesture instead of restarting a moving arm. Completion comes from the animation timeline, not a separate reset timer. Animation pauses in hidden tabs; motion-off displays a static greeting. The previous whole-portrait floating animation is disabled for this rig.

A static SVG alpha-transfer filter removes low-alpha generation haze at rendering time; the PNG is preserved as generated. This change adds no animation dependency and no React updates per animation frame. Browser animation smoothness has not been measured; browser testing was skipped at the user's request.

### Final generation prompt (built-in mode)

```text
Use case: identity-preserve.
Asset type: a production transparent layered cutout atlas for a jointed website character, NOT an animation sprite sheet.
Image 1 is the user's original character and the primary identity/style reference. Preserve the SAME young man: curly black hair, thick eyebrows, moustache and little goatee, tan skin, black zip hoodie over black shirt with muted teal angular emblem, charcoal cargo trousers, black and cream sneakers. Crisp detailed pixel art, neutral friendly face, same slight three-quarter view.
Create ONE PNG exactly 1536 x 1024 pixels, transparent alpha, strict 3 columns x 2 rows of 512 x 512 cells. No labels, borders, checkerboard, floor, shadow, or background. All six cells share EXACT SAME character coordinate space and scale. Do not center isolated limbs within cells: keep every part in its assembled position. Full character from hair y=30 to shoes baseline y=485. Body centered around x=265. Viewer-left shoulder joint at x=196 y=190, elbow at x=180 y=268, wrist at x=177 y=325. This is the foreground arm to animate. It hangs downward at rest. Shoulder and elbow joints must have overlapping rounded sleeve caps to avoid gaps when rotated. Keep opposite arm normally attached.
Top left cell: complete head, neck, torso, opposite viewer-right arm, both legs and shoes. REMOVE the whole viewer-left arm and its hand cleanly, with completed black hoodie torso underneath, so independent foreground arm layers can cover it. No ghost arm, no missing torso.
Top middle cell: ONLY viewer-left UPPER ARM black hoodie sleeve, from rounded shoulder cap centered (196,190) down to rounded elbow cap centered (180,268). About 40px wide. No forearm, no hand, no body. Transparent everywhere else.
Top right cell: ONLY viewer-left FOREARM from elbow joint (180,268) to wrist (177,325), black sleeve, and relaxed tan hand extending down to y=350. No upper arm, no body.
Bottom left cell: SAME forearm in SAME position with open palm and spread fingers pointing DOWN toward y=355, wrist at (177,325). The program will rotate this forearm upward for waving. Back of hand faces camera. No upper arm or body.
Bottom middle cell: SAME forearm position with tan hand making a thumbs-up shape. Closed fingers point down and thumb extends toward viewer-left, so when forearm rotates to point viewer-left, thumb points up. Same wrist and sleeve. No upper arm or body.
Bottom right cell: assembled full character reference, using exactly these body and resting-arm layers aligned. This is just an assembly reference. Same identity and scale.
Critical: these are isolated movable cutout parts, NOT six complete characters, NOT separate poses. Only cells 1 and 6 contain body. The isolated parts keep exact joint registration in otherwise empty transparent 512px canvases. No baked backdrop or lighting halo. Preserve clean pixel edges, clean transparency, anatomical hands, constant outfit and face.
```

### Corrective edit prompt (built-in mode)

```text
Edit this production cutout atlas. Keep exact 1536x1024 canvas, exact 3 by 2 layout and all existing part placements, identity, pixel style and clothing. Crucial correction ONLY TOP LEFT cell: REMOVE THE ENTIRE VIEWER-LEFT ARM from shoulder to hand (the arm currently bent with hand in pocket). This body layer must have NO left upper sleeve, NO left elbow, NO left forearm and NO left hand. Complete the underlying narrow side of black hoodie torso and hip cleanly, so a separate hanging arm can be overlaid. Leave head, torso, both legs, shoes, and viewer-right arm intact. The top-left character needs its shoulder at (196,190), clean torso contour around x=220 from y=205 to y=300, with absolutely no extra arm to its left. Upper sleeve in TOP MIDDLE cell will later be assembled at the missing shoulder. Every other cell stays exactly as is. REMOVE ALL shadows, halos and semitransparent grey haze from ALL cells, pure alpha zero outside crisp outlined parts. No floor, backdrop, labels, text. This is a mechanical layer rig; armless body is essential.
```
