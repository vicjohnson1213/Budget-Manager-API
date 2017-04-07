var consts = require('../consts'),
    db = require('../data/db')

function buildFinances() {
    var incomePromise = db.incomeSources.getAll();
    var deductionsPromise = db.taxDeductions.getAll();
    var exemptionsPromise = db.taxExemptions.getAll();
    var creditsPromise = db.taxCredits.getAll();

    return new Promise((resolve, reject) => {
        Promise.all([incomePromise, deductionsPromise, exemptionsPromise, creditsPromise])
            .then((results) => {
                var income = results[0];
                var deductions = results[1];
                var exemptions = results[2];
                var credits = results[3];


                var totalIncome = income.reduce((acc, i) => { return acc + i.annualAmount; }, 0);
                var totalDeductions = deductions.reduce((acc, i) => { return acc + i.amount; }, 0);
                var totalExemptions = exemptions.reduce((acc, i) => { return acc + i.amount; }, 0);
                var totalCredits = credits.reduce((acc, i) => { return acc + i.amount; }, 0);

                var taxableIncome = totalIncome - totalDeductions - totalExemptions;
                var amountRemoved = (taxableIncome - consts.taxRates.federal.over) * consts.taxRates.federal.rate;
                var federalTaxes = (consts.taxRates.federal.base + amountRemoved) - totalCredits;

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
    });
}

module.exports = {
    buildFinances: buildFinances
};