# Resume preview

The current site entry is `index.html`. The new theme builds the separate
`v2.html` preview.

The original checkout contains generated HTML rather than the original JSON
Resume source. The checked-in `resume.json` was reconstructed from the
published resume. Replace it with the original source if it becomes available.

Edit `resume.json` to update the preview, then run:

```sh
node build-v2.cjs
```

Commit both the data and the regenerated `v2.html`. The build needs Node.js
and has no package dependencies. The local theme package exports
`render(resume)` using the JSON Resume theme contract.

In Chrome, open the preview and choose **Print / Save PDF**. Set the
destination to **Save as PDF**, use **Letter** paper, keep the scale at
**100%**, and turn off **Headers and footers** for a clean copy.
