import lcov from "lcov-parse";

// Parse lcov string into lcov data
export const parse = data =>
    new Promise((resolve, reject) => {
        lcov(data, (err, res) => {
            if (err) {
                reject(err);

                return;
            }
            resolve(res);
        });
    });

// Get the total coverage percentage from the lcov data.
export const percentage = lcovData => {
    let hit = 0;
    let found = 0;
    for (const entry of lcovData) {
        hit += entry.lines.hit;
        found += entry.lines.found;
    }

    return (hit / found) * 100;
};

export const lineCov = lcovData => {
    let hit = 0;
    let found = 0;
    const arr = Array.isArray(lcovData[0]) ? lcovData : [lcovData];

    for (const item of arr) {
        for (const entry of item) {
            hit += entry.lines.hit;
            found += entry.lines.found;
        }
    }

    return {
        hit,
        found,
        percentage: (hit / found) * 100,
    };
};
