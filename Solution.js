
/**
 * @param {number[]} input
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (input, target) {
    this.VALUES_RANGE = [0, 100];
    this.MODULO = Math.pow(10, 9) + 7;
    this.frequency = new Array(VALUES_RANGE[1] + 1).fill(0);
    this.uniqueValues = [];

    let numberOfUniqueValues = 0;
    for (let n of input) {
        if (++this.frequency[n] === 1) {
            numberOfUniqueValues++;
        }
    }

    let index = 0;
    uniqueValues = new Array(numberOfUniqueValues);
    for (let i = 0; i < this.frequency.length; i++) {
        if (this.frequency[i] !== 0) {
            uniqueValues[index++] = i;
        }
    }
    return calculateThreeSumMulti(target);
};

/**
 * @param {number} target
 * @return {number}
 */
function calculateThreeSumMulti(target) {
    let totalThreeSum = 0;
    for (let i = 0; i < this.uniqueValues.length; i++) {

        let firstValue = this.uniqueValues[i];
        let left = i;
        let right = this.uniqueValues.length - 1;

        while (left <= right) {
            let secondValue = this.uniqueValues[left];
            let thirdValue = this.uniqueValues[right];
            if (firstValue + secondValue + thirdValue < target) {
                left++;
                continue;
            }
            if (firstValue + secondValue + thirdValue > target) {
                right--;
                continue;
            }
            totalThreeSum = (totalThreeSum + calculateCurrentSum(firstValue, secondValue, thirdValue)) % this.MODULO;
            left++;
            right--;
        }
    }
    return totalThreeSum;
}

/**
 * @param {number} firstValue
 * @param {number} secondValue
 * @param {number} thirdValue
 * @return {number}
 */
function calculateCurrentSum(firstValue, secondValue, thirdValue) {

    if (firstValue < secondValue && secondValue < thirdValue) {
        return (this.frequency[firstValue] * this.frequency[secondValue] * this.frequency[thirdValue]);
    } else if (firstValue === secondValue && secondValue !== thirdValue) {
        return binomialCoefficient(this.frequency[firstValue], 2) * this.frequency[thirdValue];
    } else if (firstValue !== secondValue && secondValue === thirdValue) {
        return this.frequency[firstValue] * binomialCoefficient(this.frequency[thirdValue], 2);
    }
    return binomialCoefficient(frequency[firstValue], 3);
}

/**
 * @param {number} totalSize
 * @param {number} groupSize
 * @return {number}
 */
function binomialCoefficient(totalSize, groupSize) {
    let dividend = 1;
    let divisor = 1;
    for (let i = 0; i < groupSize; i++) {
        dividend *= totalSize - i;
        divisor *= groupSize - i;
    }
    return dividend / divisor;
}
