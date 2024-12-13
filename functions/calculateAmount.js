function calculateAmount(points) {
    // Conversion rate: 500 points = $0.05
    const conversionRate = 500; // points for $0.05
    const dollarValuePerRate = 0.05; // $ for 500 points

    // Calculate the dollar amount
    const amount = (points / conversionRate) * dollarValuePerRate;

    return amount.toFixed(2); // Round to 2 decimal places
}

export default calculateAmount;