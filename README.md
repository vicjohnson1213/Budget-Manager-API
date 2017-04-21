# Budget Manager

## `/api`

### `/v1`

#### `/finances`

- `GET /`

- `GET /incomeSources`
- `GET /incomeSources/:incomeSourceId`
- `POST /incomeSources`
- `PUT /incomeSources/:`
- `DELETE /incomeSoruces/:incomeSourceId`

- `GET /taxExemptions`
- `GET /taxExemptions/:taxExemptionId`
- `POST /taxExemptions`
- `PUT /taxExemptions/:taxExemptionId`
- `DELETE /taxExemptions/:taxExemptionId`

- `GET /taxDeductions`
- `GET /taxDeductions/:taxDeductionId`
- `POST /taxDeductions`
- `PUT /taxDeductions/:taxDeductionsId`
- `DELETE /taxDeductions/:taxDeductionId`

- `GET /taxCredits`
- `GET /taxCredits/:taxCreditId`
- `POST /taxCredits`
- `PUT /taxCredits/:taxCreditId`
- `DELETE /taxCredits/:taxCreditId`

#### `/budget`

- `GET /`

- `GET /categories`
- `GET /categories/:expenseCategoryId`
- `POST /categories`
- `PUT /categories/:expenseCategoryId`
- `DELETE /categories/:expenseCategoryId`

- `GET /items`
- `GET /items/:budgetId`
- `POST /items`
- `PUT /items/:budgetId`
- `DELETE /items/:budgetId`

#### `/transactions`

- `GET /`

- `GET /:transactionId`
- `POST /`
- `PUT /:transactionId`
- `DELETE /:transactionId`

#### `/users`

- `POST /`