
public class Solution {

    private static final int[] VALUES_RANGE = new int[]{0, 100};
    private static final int MODULO = (int) Math.pow(10, 9) + 7;
    private long[] frequency;//'long' to prevent overflow during calculations.
    private int[] uniqueValues;

    public int threeSumMulti(int[] input, int target) {

        int numberOfUniqueValues = 0;
        frequency = new long[VALUES_RANGE[1] + 1];
        for (int n : input) {
            if (++frequency[n] == 1) {
                numberOfUniqueValues++;
            }
        }

        int index = 0;
        uniqueValues = new int[numberOfUniqueValues];
        for (int i = 0; i < frequency.length; i++) {
            if (frequency[i] != 0) {
                uniqueValues[index++] = i;
            }
        }

        return calculateThreeSumMulti(target);
    }

    private int calculateThreeSumMulti(int target) {
        long totalThreeSum = 0;
        for (int i = 0; i < uniqueValues.length; i++) {

            int firstValue = uniqueValues[i];
            int left = i;
            int right = uniqueValues.length - 1;

            while (left <= right) {
                int secondValue = uniqueValues[left];
                int thirdValue = uniqueValues[right];
                if (firstValue + secondValue + thirdValue < target) {
                    left++;
                    continue;
                }
                if (firstValue + secondValue + thirdValue > target) {
                    right--;
                    continue;
                }
                totalThreeSum = (totalThreeSum + calculateCurrentSum(firstValue, secondValue, thirdValue)) % MODULO;
                left++;
                right--;
            }
        }
        return (int) totalThreeSum;
    }

    private long calculateCurrentSum(int firstValue, int secondValue, int thirdValue) {

        if (firstValue < secondValue && secondValue < thirdValue) {
            return (frequency[firstValue] * frequency[secondValue] * frequency[thirdValue]);
        } else if (firstValue == secondValue && secondValue != thirdValue) {
            return binomialCoefficient(frequency[firstValue], 2) * frequency[thirdValue];
        } else if (firstValue != secondValue && secondValue == thirdValue) {
            return frequency[firstValue] * binomialCoefficient(frequency[thirdValue], 2);
        }
        return binomialCoefficient(frequency[firstValue], 3);
    }

    private long binomialCoefficient(long totalSize, long groupSize) {
        long dividend = 1;
        long divisor = 1;
        for (long i = 0; i < groupSize; i++) {
            dividend *= totalSize - i;
            divisor *= groupSize - i;
        }
        return dividend / divisor;
    }
}
