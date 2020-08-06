// // Listen to submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide Results
    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='block';
    setTimeout(calcuclateResults,2000);
    // show Loader
    e.preventDefault();
});

function calcuclateResults() {
    const amount = document.getElementById('loan-amount');
    const annualinterest = document.getElementById('annual-interest')
    const yearstorepay = document.getElementById('years-repay')

    const monthlypayment = document.getElementById('monthly-payment')
    const totalpayment = document.getElementById('total-payment')
    const totalinterest = document.getElementById('total-interest')


    const principal = parseFloat(amount.value);
    const calculateinterest = parseFloat(annualinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearstorepay.value) * 12;

    // compute the monthly payements
    const x = Math.pow(1 + calculateinterest, calculatedPayments);
    const monthly = (principal * x * calculateinterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlypayment.value = monthly.toFixed(2);
        totalpayment.value = (monthly * calculatedPayments).toFixed(2);
        totalinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';
    }
    else {
        document.getElementById('loading').style.display='none';
        showError('Please check your memebers');
    }

}

function showError(error) {

    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='none';

    try {
        // create div element
        const errorDiv = document.createElement('div');

        // Get elements - insetrt into DOM
        const card = document.querySelector('.parentdiv');
        const heading = document.querySelector('.heading');

        // add class
        errorDiv.className = 'alert alert-danger'
        // create text node to append to div
        errorDiv.appendChild(document.createTextNode(error));

        // insert error before heading
        card.insertBefore(errorDiv, heading);
        // clear error
        setTimeout(clearError, 3000);
    }
    catch (err) {
        console.log(err);
    }
}
// clear the aler
function clearError() {
    document.querySelector('.alert').remove();
}