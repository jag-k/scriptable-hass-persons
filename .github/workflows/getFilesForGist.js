const {readdirSync, readFileSync} = require('fs');
const {version} = require('../../package.json');
const DIST_DIR = "./dist";

/**
 * @type {{
 *   [filename: string]: {
 *     content: string
 *   }
 * }}
 */
const files = readdirSync(DIST_DIR).reduce(
    (res, value) => (
        {
            ...res,
            [value]: {
                content: readFileSync(`${DIST_DIR}/${value}`).toString()
            }
        }
    ),
    {}
);

files['version'] = {content: version}

console.log(JSON.stringify({files}));
