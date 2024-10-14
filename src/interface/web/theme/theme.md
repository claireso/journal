
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }



sizes:
1 => 4px
2 => 8px
3 => 12px
3.5 => 14px
4 => 16px
4.5 => 18px
5 => 20px

=> de 4px en 4px, possibilité de .5 en faisant +2px

typo
font-family: sans, serif, monoe
font-style
italic	font-style: italic;
not-italic	font-style: normal;

font-size
text-xs	font-size: 0.75rem; /* 12px */
line-height: 1rem; /* 16px */
text-sm	font-size: 0.875rem; /* 14px */
line-height: 1.25rem; /* 20px */
text-base	font-size: 1rem; /* 16px */
line-height: 1.5rem; /* 24px */
text-lg	font-size: 1.125rem; /* 18px */
line-height: 1.75rem; /* 28px */
text-xl	font-size: 1.25rem; /* 20px */
line-height: 1.75rem; /* 28px */
text-2xl	font-size: 1.5rem; /* 24px */
line-height: 2rem; /* 32px */
text-3xl	font-size: 1.875rem; /* 30px */
line-height: 2.25rem; /* 36px */
text-4xl	font-size: 2.25rem; /* 36px */
line-height: 2.5rem; /* 40px */
text-5xl	font-size: 3rem; /* 48px */
line-height: 1;
text-6xl	font-size: 3.75rem; /* 60px */
line-height: 1;
text-7xl	font-size: 4.5rem; /* 72px */
line-height: 1;
text-8xl	font-size: 6rem; /* 96px */
line-height: 1;
text-9xl	font-size: 8rem; /* 128px */
line-height: 1;

colors: slate-50 slate-100 slate-200 (possiblité de custom à x50)

aspect-auto	aspect-ratio: auto;
aspect-square	aspect-ratio: 1 / 1;
aspect-video	aspect-ratio: 16 / 9;



container	 (en lien avec breakpoint)
None	width: 100%;
sm (640px)	max-width: 640px;
md (768px)	max-width: 768px;
lg (1024px)	max-width: 1024px;
xl (1280px)	max-width: 1280px;
2xl (1536px)	max-width: 1536px;


Table des display
block	display: block;
inline-block	display: inline-block;
inline	display: inline;
flex	display: flex;
inline-flex	display: inline-flex;
table	display: table;
inline-table	display: inline-table;
table-caption	display: table-caption;
table-cell	display: table-cell;
table-column	display: table-column;
table-column-group	display: table-column-group;
table-footer-group	display: table-footer-group;
table-header-group	display: table-header-group;
table-row-group	display: table-row-group;
table-row	display: table-row;
flow-root	display: flow-root;
grid	display: grid;
inline-grid	display: inline-grid;
contents	display: contents;
list-item	display: list-item;
hidden	display: none;


Object fit
object-contain	object-fit: contain;
object-cover	object-fit: cover;
object-fill	object-fit: fill;
object-none	object-fit: none;
object-scale-down	object-fit: scale-down;

overflow

overflow-auto	overflow: auto;
overflow-hidden	overflow: hidden;
overflow-clip	overflow: clip;
overflow-visible	overflow: visible;
overflow-scroll	overflow: scroll;
overflow-x-auto	overflow-x: auto;
overflow-y-auto	overflow-y: auto;
overflow-x-hidden	overflow-x: hidden;
overflow-y-hidden	overflow-y: hidden;
overflow-x-clip	overflow-x: clip;
overflow-y-clip	overflow-y: clip;
overflow-x-visible	overflow-x: visible;
overflow-y-visible	overflow-y: visible;
overflow-x-scroll	overflow-x: scroll;
overflow-y-scroll	overflow-y: scroll;


position
static	position: static;
fixed	position: fixed;
absolute	position: absolute;
relative	position: relative;
sticky	position: sticky;
​
visibility
visible	visibility: visible;
invisible	visibility: hidden;
collapse	visibility: collapse;

z-index
z-0	z-index: 0;
z-10	z-index: 10;
z-20	z-index: 20;
z-30	z-index: 30;
z-40	z-index: 40;
z-50	z-index: 50;
z-auto	z-index: auto;

flex + grid + gap

padding
margin
Space Between
