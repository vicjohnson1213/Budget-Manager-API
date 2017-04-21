var consts = require('../consts'),
    db = require('../data/db')

function buildFinances(userId) {
    var incomePromise = db.incomeSources.getAll(userId);
    var deductionsPromise = db.taxDeductions.getAll(userId);
    var exemptionsPromise = db.taxExemptions.getAll(userId);
    var creditsPromise = db.taxCredits.getAll(userId);

    return new Promise((resolve, reject) => {
        incomePromise.then((incomeResults) => {
            var income = incomeResults;
            var totalIncome = income.reduce((acc, i) => {return acc + i.annualAmount; }, 0);

            var federalTaxBracketPromise = db.federalTaxBracket.get(totalIncome);

        
            Promise.all([deductionsPromise, exemptionsPromise, creditsPromise, federalTaxBracketPromise])
                .then((results) => {

                    console.log("promises resolved");

                    var deductions = results[0];
                    var exemptions = results[1];
                    var credits = results[2];
                    var bracket = results[3][0];
                    var rate = bracket.rate;
                    var base = bracket.base;

                    console.log(bracket, rate, base);
                    var totalDeductions = deductions.reduce((acc, i) => { return acc + i.amount; }, 0);
                    var totalExemptions = exemptions.reduce((acc, i) => { return acc + i.amount; }, 0);
                    var totalCredits = credits.reduce((acc, i) => { return acc + i.amount; }, 0);

                    var taxableIncome = totalIncome - totalDeductions - totalExemptions;
                    var amountRemoved = (taxableIncome - consts.taxRates.federal.over) * (rate/100);
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
                }).catch((err) => {
                    reject(err);
                });

        }).catch((err) => {
            reject(err);
        });
        console.log("income promises resolved");
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