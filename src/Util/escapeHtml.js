/**
 * escape - returns plain text if there is any html tags
 * @param {string} args.htmlStr
 * 
 */

export default function escape(htmlStr) {
    return htmlStr.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // .replace(/"/g, "&quot;")
        // .replace(/'/g, "&#39;");
}