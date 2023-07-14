var envelopes = [
    {
        id: 0,
        title: 'Groceries',
        description: 'This envelope will be used to budget for Grocery items like spinach, tomatoes e.t.c',
        budget: 100,
        balance: 100
    },
    {
        id: 1,
        title: 'Gas',
        description: 'This envelope will be used to budget for gas for the car',
        budget: 100,
        balance: 100
    },
    {
        id: 2,
        title: 'Clothing',
        description: 'This envelope will be used to budget for clothes and shoes',
        budget: 100,
        balance: 100
    },
    {
        id: 3,
        title: 'Dining Out',
        description: 'This envelope will be used to budget for outings and street foods',
        budget: 100,
        balance: 100
    },
]
let totalBudget = 400
module.exports = {
    envelopes,
    totalBudget
};