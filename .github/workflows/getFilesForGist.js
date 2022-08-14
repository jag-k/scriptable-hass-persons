const {readdirSync, readFileSync} = require('fs');
const DIST_DIR = "./dist";
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
console.log(JSON.stringify({files}));
