//อ้างอิง element ใน index.html
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dataTranscation = [
//     {id:1,text:"ค่าห้อง",amount:-3000},
//     {id:2,text:"เงินเดือน",amount:+18000},
//     {id:3,text:"ค่างวดรถ",amount:-1500}
// ]

let transaction = []//dataTranscation

function init(){
    list.innerHTML = '';
    transaction.forEach(addDataToList)
    calMoney()
    // addTransaction()
}
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

function autoID(){
    return Math.floor(Math.random()*1000000)
}

function addDataToList(transaction){
    const symbol = transaction.amount < 0 ? '-':'+';
    const status = transaction.amount < 0 ? 'minus':'plus'
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transaction.amount));
    item.classList.add(status)
    item.innerHTML =`${transaction.text}<span>${symbol}${result}</span><button class="delete-btn" onclick = "removeData(${transaction.id})"> x </button>`;
    list.appendChild(item)
}
function calMoney(){
    const amounts = transaction.map(transaction=>transaction.amount);
    //คำนวณยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    //คำนวณรายรับ
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
    //คำนวณรายจ่าย
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);
   //แสดงผลทางจอภาพ
   balance.innerText=`฿`+formatNumber(total)
   money_plus.innerText= formatNumber(income)
   money_minus.innerText= formatNumber(expense)
}
function removeData(id){
    transaction = transaction.filter(transaction=>transaction.id !== id)
    init();
}
function addTransaction(e){
    e.preventDefault()
    if(text.value.trim() ==='' || amount.value.trim() === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ")
    }else{
        const data={
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        transaction.push(data);
        addDataToList(data);
        calMoney();
        text.value = '';
        amount.value = '';
    }
}
form.addEventListener('submit',addTransaction);


init();

