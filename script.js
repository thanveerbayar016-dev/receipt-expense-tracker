const form=document.getElementById('expenseForm');
const list=document.getElementById('expenseList');
const total=document.getElementById('total');
const count=document.getElementById('count');
const empty=document.getElementById('empty');
const date=document.getElementById('date');
const clearBtn=document.getElementById('clearBtn');

date.value=new Date().toISOString().split('T')[0];
let expenses=JSON.parse(localStorage.getItem('expenses')||'[]');

function save(){localStorage.setItem('expenses',JSON.stringify(expenses));render();}
function render(){
  list.innerHTML='';
  let sum=expenses.reduce((a,e)=>a+Number(e.amount),0);
  total.textContent=`₹${sum.toFixed(2)}`;
  count.textContent=expenses.length;
  empty.style.display=expenses.length?'none':'block';
  expenses.slice().reverse().forEach(e=>{
    const row=document.createElement('div');
    row.className='expense';
    row.innerHTML=`<div class="expense-info"><strong>${escapeHtml(e.description)}</strong><small>${escapeHtml(e.category)} • ${escapeHtml(e.date)}</small></div><div class="expense-right"><b>₹${Number(e.amount).toFixed(2)}</b><button class="delete" onclick="removeExpense('${e.id}')">Delete</button></div>`;
    list.appendChild(row);
  });
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
form.addEventListener('submit',e=>{
  e.preventDefault();
  expenses.push({id:Date.now().toString(),description:description.value.trim(),amount:amount.value,category:category.value,date:date.value});
  form.reset(); date.value=new Date().toISOString().split('T')[0]; save();
});
function removeExpense(id){expenses=expenses.filter(e=>e.id!==id);save();}
clearBtn.addEventListener('click',()=>{if(expenses.length && confirm('Delete all expenses?')){expenses=[];save();}});
render();
