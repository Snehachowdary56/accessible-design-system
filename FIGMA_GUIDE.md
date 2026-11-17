# Build the Harbour Design System in Figma (about 1–2 hours)

Figma is free for students (figma.com → sign up → Education plan). Work through these steps in order.
At the end you will have a Figma file with variables, components with variants, and the 3-step claim flow.

## 1. Set up the file (5 min)
1. Create a new **Design file** named `Harbour Design System`.
2. Add four pages (left panel → Pages → +): `Tokens`, `Components`, `Claim flow`, `Wireframes`.

## 2. Colour variables (15 min)
1. Open the **Local variables** panel (right panel, with nothing selected → Local variables → Open variables).
2. Create a collection named `color` and add one variable per token from `tokens/tokens.json`, using the same names:
   `brand #1F4E8C`, `brand-strong #173B6A`, `on-brand #FFFFFF`, `brand-subtle #EEF4FC`, `text #1A1F2B`,
   `text-muted #4A5468`, `surface #FFFFFF`, `surface-alt #F4F6FA`, `border #7C8597`, `focus #2E6BD1`,
   `danger #B42318`, `danger-subtle #FEF3F2`, `success #067647`, `success-subtle #ECFDF3`,
   `warning #7A4B00`, `warning-subtle #FFFAEB`, `disabled-text #5B6474`, `disabled-bg #E4E7EC`.
3. Create a `space` collection with number variables `1=4, 2=8, 3=12, 4=16, 5=24, 6=32, 7=48` and a `radius` collection `sm=4, md=8, lg=12`.
4. On the `Tokens` page draw a square for each colour, fill it with the variable, and label it.

## 3. Text styles (5 min)
Create text styles (Text → Style → +): `Heading/XL 28 Semibold`, `Heading/L 20 Semibold`, `Body/M 16 Regular`, `Body/S 14 Regular`, `Label/M 16 Semibold`.

## 4. Button component with variants (20 min)
1. Press **T**, type `Submit claim`, apply `Label/M`. Select it and press **Shift+A** (auto layout).
2. Padding: 24 left/right, height fixed 44. Corner radius: `radius/md`. Fill: `color/brand`. Text fill: `color/on-brand`. Stroke 2px `color/brand`.
3. Press **Ctrl+Alt+K** to make it a component. Name it `Button`.
4. With it selected, click **Add variant** (right panel) three times. Add two properties:
   - `Type`: `Primary`, `Secondary`, `Tertiary`, `Danger`
   - `State`: `Default`, `Hover`, `Disabled`, `Loading`
5. Style each variant with variables only (Secondary: fill `surface`, text `brand`; Disabled: fill `disabled-bg`, text `disabled-text`; Hover: fill `brand-strong`).
6. Add a **text property** called `Label` so designers can change the text without detaching.

## 5. Other components (30 min)
Repeat the same idea for:
- `Text field`: label, hint, input box (44px high, 1px `border`), error text. Variants `State = Default / Focus / Error`. Focus = 3px `focus` outline. Error = 2px `danger` border and text "Error: …".
- `Radio` and `Checkbox`: variants `Checked = true/false`, 44px row height.
- `Switch`: variants `On / Off`.
- `Alert`: variants `Info / Success / Warning / Error`, each with a written title.
- `Tabs`: a tab with variants `Selected = true/false`.
- `Stepper`: step pill with variants `Current / Done / Upcoming`.

Name everything `Component / Variant / State`, matching the code's naming table.

## 6. Claim flow screens (20 min)
On the `Claim flow` page create four frames (**F** → Desktop 1440 or Phone 390):
`1 About the claim`, `1b Errors`, `2 Receipt`, `3 Check your answers`, `4 Submitted`. Build them only from your components (copy `prototype.html`).

## 7. Prototype the flow (10 min)
Switch to the **Prototype** tab. Drag from each **Continue** button to the next frame (On click → Navigate to).
Press **Play** to test it.

## 8. Accessibility notes in the file (5 min)
On each frame add a sticky note with: heading order (H1, H2), focus order (numbered 1, 2, 3…), and the
accessible name of each button. Check contrast with a free plugin like **Stark** or **Contrast** (Plugins → Browse).

## 9. Share it (2 min)
**Share → Anyone with the link → can view → Copy link.** Put the link in the README and on your portfolio.
