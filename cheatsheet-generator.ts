import * as fs from 'fs';
import * as marked from 'marked';
import cheatsheetFilename from './cheatsheet.md';

const outputFilePath = 'cheatsheet.html';
const data = fs.readFileSync(cheatsheetFilename, 'utf8');

console.log('length of data:', data.length, new Date().toISOString());

const markdownSections = data.split(/\n---\n/);
const htmlCards = markdownSections.map(section => {
    const isWide = section.includes('<!-- wide -->');
    const cleanSection = section.replace('<!-- wide -->', '');
    const cardClass = isWide ? 'card card-wide' : 'card';
    return `<div class="${cardClass}">${marked.parse(cleanSection)}</div>`;
}).join('');

const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheatsheet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0;
        }
        .card {
            border: 1px solid #ccc;
            padding: 1px;
            border-radius: 5px;
            max-height: 200px;
            overflow: auto;
        }
        .card-wide {
            grid-column: span 2;
        }
        /* Basic Markdown styling */
        h1, h2, h3, h4, h5, h6 {
            margin-top: 0.1em;
            margin-bottom: 0.1em;
        }
        p {
            margin-bottom: 1em;
        }
        ul, ol {
            margin-top: 0.1em;
            margin-bottom: 0.1em;
            padding-left: 20px;
        }
        code {
            font-family: 'Courier New', Courier, monospace;
            background-color: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
        }
        pre {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
    <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
                tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
            });
        </script>
        <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
</head>
<body>
    ${htmlCards}
</body>
</html>
`;

fs.writeFileSync(outputFilePath, fullHtml, 'utf8');
console.log(`Cheatsheet generated successfully at ${outputFilePath}`);
