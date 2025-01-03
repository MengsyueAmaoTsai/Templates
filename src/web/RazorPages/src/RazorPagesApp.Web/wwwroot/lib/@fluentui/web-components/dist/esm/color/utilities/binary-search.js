/**
 * @internal
 */
export function binarySearch(valuesToSearch, searchCondition, startIndex = 0, endIndex = valuesToSearch.length - 1) {
    if (endIndex === startIndex) {
        return valuesToSearch[startIndex];
    }
    const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    // Check to see if this passes on the item in the center of the array
    // if it does check the previous values
    return searchCondition(valuesToSearch[middleIndex])
        ? binarySearch(valuesToSearch, searchCondition, startIndex, middleIndex)
        : binarySearch(valuesToSearch, searchCondition, middleIndex + 1, // exclude this index because it failed the search condition
        endIndex);
}
