module.exports = function (string) {
    if (!mongoose.isValidObjectId(string)) {
        return true
    }
}