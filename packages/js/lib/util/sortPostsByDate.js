/**
 * @function Sort two [Posts]{@link Post} by date, descending.
 * @param a {Post}
 * @param b {Post}
 * @returns {number}
 */
export default (a, b) => {
    if (a.date.valueOf() > b.date.valueOf()) {
        return -1;
    } else if (a.date.valueOf() < b.date.valueOf()) {
        return 1;
    } else {
        return 0;
    }
};
