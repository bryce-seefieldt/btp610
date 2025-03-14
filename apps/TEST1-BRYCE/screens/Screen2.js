import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import { getTransactions, deleteTransaction, getTotalBalance } from '../transactions';

export default function Screen2({ route }) {
    const { transactions, deleteTransaction, getTotalBalance } = route.params;
    const [totalBalance, setTotalBalance] = useState(0);

    const updateTransactions = () => {
        const currentTransactions = getTransactions();
        setTransactions(currentTransactions);
        setTotalBalance(getTotalBalance());
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen is focused
        });
        return unsubscribe;
    }, [navigation]);

    const handleDelete = (id) => {
        deleteTransaction(id);
        updateTransactions();
    };

    return(
        <View style={styles.container}>            
            <Text style={styles.header}>Transaction History</Text>
            <Text style={[styles.balance, totalBalance >= 0 ? styles.positive : styles.negative]}>
                Balance: ${totalBalance.toFixed(2)}
            </Text>
            
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.row}>
                        <View style={styles.transactionInfo}>
                            <Text style={[
                                styles.text,
                                item.type === 'deposit' ? styles.positive : styles.negative
                            ]}>
                                ${Math.abs(item.amount).toFixed(2)}
                            </Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.type}>{item.type}</Text>
                        </View>
                        <Pressable 
                            style={styles.deleteBtn}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteBtnText}>Delete</Text>
                        </Pressable>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.line} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 80,
        marginBottom: 20,
        padding: 20,
    },
    rowItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    text: {
        fontSize: 16,
        marginVertical: 4
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    }
});
