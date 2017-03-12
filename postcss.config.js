module.exports = {
    plugins: [
        require('postcss-cssnext')({
            browsers: 'last 2 versions',
            warnForDuplicates: false
        }),
        require('lost')
    ]
}