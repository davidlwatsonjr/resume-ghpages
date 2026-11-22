# David Watson's resume

GitHub Pages serves the generated `index.html` at
[resume.davidlwatsonjr.com](https://resume.davidlwatsonjr.com/).
The older theme URLs redirect to the homepage.

Edit `resume.json`, then regenerate the page with Node.js:

```sh
node build.cjs
```

Commit the source changes and the updated `index.html`. The build has no
package dependencies. The theme in `theme/` exports `render(resume)`
using the JSON Resume theme contract. The checked-in JSON was reconstructed
from the prior public resume.

To export a PDF in Chrome, use **Print / Save PDF**, select **Save as PDF**
and **US Letter**, and turn off **Headers and footers**. Start with a scale
of **100%**.
