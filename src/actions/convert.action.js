// react requirement
import html2pdf from 'html2pdf.js';

export const convert2pdf = (html, filename) => {
    const node = document.createElement("div");
    node.innerHTML = `<br />${html}<br />`;
    const options = {
        margin: 5,
        image: { type: 'jpeg', quality: 1 },
        filename,
    };
    html2pdf().from(node).set(options).save();
};
