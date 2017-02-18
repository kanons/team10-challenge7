module.exports = {
    entry: {
        vote: './vote.js',
        result: './result.js',
        index: './index.js'
    },
    output: {
        path: '.',
        filename: '[name].bundle.js'
    }
};
