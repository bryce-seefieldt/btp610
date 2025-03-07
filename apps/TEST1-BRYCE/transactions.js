// Simple data store as shown in course examples
var transactions = [];

// Get all transactions
const getTransactions = () => {
    return transactions;
};

// Add new transaction
const addTransaction = (transaction) => {
    transactions = [...transactions, transaction];
    return transactions;
};

// Delete transaction by ID
const deleteTransaction = (id) => {
    transactions = transactions.filter(function(item) {
        return item.id !== id;
    });
    return transactions;
};

// Calculate total balance
const getTotalBalance = () => {
    var total = 0;
    for (var i = 0; i < transactions.length; i++) {
        total += transactions[i].amount;
    }
    return total;
};

// Export functions as shown in course
export { 
    getTransactions, 
    addTransaction, 
    deleteTransaction, 
    getTotalBalance 
};