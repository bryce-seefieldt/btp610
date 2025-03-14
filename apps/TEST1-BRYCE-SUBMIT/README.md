Allows users to track and manage money and financial transations

- 2 screens and a list of transactions
- Both screens need to read and write list of transactions

## Navigation
- Connect screens using tab navigation

## What is a transaction?

TRansaction is an object literal that represents an expense or deposit.

Transaction object contains:
- id (string):
    - id format; `D-XXX` fro deposits, `E-XXX` for  expenses
        - WHERE: `XXX` is a randomly generated number
- name (string)
- amount (number)
- transactionType (boolean)
    - Is the transaction expense or deposit

## Screen 1
- Displays a form for user input details of a transaction instrance and add it to the transaction list.
- Form Must Include:
    - Textboxs and labels (2) for entering "name" and "amount"
    - Switch to set  "transactionType" (on is a deposit, off is an expense)
    - Submit button which must be styled.

### Submit Button on click behaviour
1. Create a transaction object
2. Add data to a list of transactions
3. Show a success message

Do not need to include form validation yet


## Screen 2
### 2. On load:
- Retrieve  transactions list 
- calculate and display the sum of all transactions ( sum = deposits -expneses)

### 2. Each row of the list shoud display:
- A delete button that removes the list item from the transactions list and recalculates the sum
- TRansaction id, name , amount
- Transaction type using diffrent colours to indicate exp vs dep.

