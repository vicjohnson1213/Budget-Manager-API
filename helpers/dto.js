var consts = require('../consts'),
    db = require('../data/db')

function buildFinances(userId) {
    var incomePromise = db.incomeSources.getAll(userId);
    var deductionsPromise = db.taxDeductions.getAll(userId);
    var exemptionsPromise = db.taxExemptions.getAll(userId);
    var creditsPromise = db.taxCredits.getAll(userId);

    return new Promise((resolve, reject) => {
            Promise.all([incomePromise, deductionsPromise, exemptionsPromise, creditsPromise])
                .then((results) => {
                    var income = results[0]
                    var deductions = results[1];
                    var exemptions = results[2];
                    var credits = results[3];


                    var totalIncome = income.reduce((acc, i) => {return acc + i.annualAmount; }, 0);
                    var totalDeductions = deductions.reduce((acc, i) => { return acc + i.amount; }, 0);
                    var totalExemptions = exemptions.reduce((acc, i) => { return acc + i.amount; }, 0);
                    var totalCredits = credits.reduce((acc, i) => { return acc + i.amount; }, 0);

                    var taxableIncome = totalIncome - totalDeductions - totalExemptions;

                    var federalTaxBracketPromise = db.federalTaxBracket.get(taxableIncome);

                    federalTaxBracketPromise.then((bracketResults) => {
                        var rate = bracketResults[0].rate;
                        var base = bracketResults[0].base;
                        var over = bracketResults[0].min;

                        var amountRemoved = (taxableIncome - over) * (rate/100);
                        var federalTaxes = (base + amountRemoved) - totalCredits;

                        var ficaTax = consts.taxRates.fica.rate * totalIncome;

                        var estimatedTaxes = federalTaxes + ficaTax;
                        var estimatedNetIncome = totalIncome - estimatedTaxes;

                        var finances = {
                            incomeSources: income,
                            taxDeductions: deductions,
                            taxExemptions: exemptions,
                            taxCredits: credits,
                            grossIncome: totalIncome,
                            estimatedNetIncome: estimatedNetIncome,
                            estimatedTaxes: estimatedTaxes
                        };
                        resolve(finances);
                    });

                }).catch((err) => {
                    reject(err);
                });

    });
}


function buildBudget(userId) {
    var categoriesPromise = db.budgetCategories.getAll(userId);
    var itemsPromise = db.budgetItems.getAll(userId);

    return new Promise((resolve, reject) => {
        Promise.all([categoriesPromise, itemsPromise])
            .then((results) => {
                var categories = results[0];
                var items = results[1];

                var budget = {
                    categories: []
                };

                categories.forEach((category) => {
                    var theseItems = items.filter(item => item.budgetCategoryId === category.id);

                    budget.categories.push({
                        id: category.id,
                        name: category.name,
                        total: theseItems.reduce((a, i) => { return a + i.amount; }, 0),
                        items: theseItems
                    });
                });

                budget.total = items.reduce((a, i) => { return a + i.amount; }, 0);

                resolve(budget);
            }).catch((err) => {
                reject(err);
            });
    });
}

function buildTransactionSummary(userId, year, month) {
    var transactionPromise = db.transactions.getMonthSummary(userId, year, month);

    return new Promise((resolve, reject) => {
        Promise.all([transactionPromise])
            .then((results) => {
                var transactions = results[0];

                var summary = {
                    total: transactions.reduce((a, t) => { return a + t.amount }, 0),
                    transactions: transactions
                };

                resolve(summary);
            }).catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    buildBudget: buildBudget,
    buildFinances: buildFinances,
    buildTransactionSummary: buildTransactionSummary
};