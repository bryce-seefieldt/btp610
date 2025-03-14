import { StyleSheet, Text, View, Button, TextInput, Switch } from 'react-native';
import { useState } from "react";
import { addTransaction } from '../transactions';

export default function Screen1({ navigation }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState(false);

    const handleSubmit = () => {
        var transaction = {
            amount: transactionType ? Number(amount) : -Number(amount),
            description: description,
            type: transactionType ? 'deposit' : 'expense',
            id: Date.now()
        };
        
        addTransaction(transaction);
        alert('Transaction saved!');

        // Reset form
        setAmount('');
        setDescription('');

        navigation.navigate('All Transactions');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Add New Transaction</Text>
 
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Text style={styles.text}>
                Transaction Type: {transactionType ? "Deposit" : "Expense"}
            </Text>
            <Switch 
                value={transactionType} 
                onValueChange={setTransactionType}
            />

            <Button 
                title="Save Transaction"
                onPress={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        marginVertical: 8,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 8,
        fontSize: 16,
    }
});
