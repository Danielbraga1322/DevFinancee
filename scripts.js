const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}


const Transaction = {
    all:[
        {
                description: 'Luz',
                amount: -50000,
                date: '23/01/2021',
        },
        {
                description: 'Website',
                amount: 500000,
                date: '23/01/2021',
        },
        {
                description: 'Internet',
                amount: -20000,
                date: '23/01/2021',
        },
        {
                description: 'app',
                amount: 80000,
                date: '23/01/2021',
        }
        ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index,1)

        App.reload()
    },

    incomes () {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount>0) {
                income = income + transaction.amount;
            }
        })
      
        return income
    },
    expenses () {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount<0) {
                expense = expense + transaction.amount;
            }
        })
        return expense
    },
    total () {
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction (transaction) {
        const CSSclass = transaction.amount > 0 ? "income": "expense"

        const amount = Utils.formatCurrancy(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover transação"/>
            </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrancy(Transaction.incomes())
        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrancy(Transaction.expenses())
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrancy(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100

        return value
    },

    formatDate(date){
        const splitted = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}}`
    },

    formatCurrancy(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-Br", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const {description, amount, date } = Form.getValues()
        
        if( 
            description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "" 
        ) { throw new Error("Por favor, preencha todos os campos")

        }
    },

    formatValues(){
        let {description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
    },

    saveTransaction (transaction){
        Transaction.add(tranaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try{
            Form.validateFields()
        //validar se todas as informações foram preenchidas  
            const Transaction = Form.formatValues()      
        //formatar os dados para salvar 
            Form.saveTransaction(trasantion)
        //salvar
            Form.clearFields()
        //apagar os dados do formulário
            Modal.close()
        //modal feche
        } catch (error) {
            alert(error.message)
        }
        
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()