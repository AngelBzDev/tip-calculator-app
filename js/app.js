//Validate input empty

const form = document.querySelector('form');

const inputBill = document.querySelector('#bill')
const inputNumPeople = document.querySelector('#numberPeople')

let values = {}

const tipAmout = document.querySelector('#tipAmout')
const total = document.querySelector('#total')


window.onload = () => {
   initApp()
}

const initApp = () => {
   form.addEventListener('submit', (event) => {
      event.preventDefault()
   })
   generateButtons()
   activeButton()
   resetInputs()
   inputBill.addEventListener('input', validateInput)   
   inputNumPeople.addEventListener('input', validateInput)
}

const validateInput = (e) => {
   const valueInput = parseInt(e.target.value)
   const subTitle = e.target.parentElement.previousSibling.previousSibling
   
   if(valueInput === 0){
      if(!subTitle.querySelector('.message-error')){
         const p = document.createElement('p')
         p.textContent = `Can't be zero`
         p.classList.add('message-error')
         subTitle.appendChild(p)
      }
      e.target.parentElement.classList.add('input-err')
      e.target.parentElement.classList.remove('input')
      return
   }
   if(valueInput < 0){
      if(!subTitle.querySelector('.message-error')){
         const p = document.createElement('p')
         p.textContent = `Can't be minus of zero`
         p.classList.add('message-error')
         subTitle.appendChild(p)
      }
      e.target.parentElement.classList.add('input-err')
      e.target.parentElement.classList.remove('input')
      return
   }
   const msj = e.target.parentElement.previousSibling.previousSibling.lastChild
   msj.tagName === 'P' && msj.classList.contains('message-error') && msj.remove()

   e.target.parentElement.classList.add('input')
   e.target.parentElement.classList.remove('input-err')

   values[e.target.id] = e.target.value

   calculateTip()
   
}

const generateButtons = () => {
   const percentages = [5, 10, 15, 25, 50]
   const percentageContainer = document.querySelector('.percentage-container')
   percentages.forEach(i => {
      const butt = document.createElement('button')
      butt.textContent = `${i}%`
      butt.classList.add('btn', 'btn-percentage')
      percentageContainer.appendChild(butt)
   })
   const customInp = document.createElement('input')
   customInp.id = 'custom'
   customInp.type = 'number'
   customInp.classList.add('btn', 'btn-custom')
   customInp.placeholder = 'Custom'
   percentageContainer.appendChild(customInp)

   customInp.addEventListener('input', (e) => {
      if(e.target.value !== '' ){
         document.querySelector('.btn-active') && document.querySelector('.btn-active').classList.remove('btn-active')
         values[e.target.id] = e.target.value
         calculateTip()
      }
   })
}

const activeButton = () => {
   const buttonsPorcentages = document.querySelectorAll('.btn-percentage')
   buttonsPorcentages.forEach(button => {
      button.addEventListener('click', () => {
         btnActive = document.querySelectorAll('.btn-active')
         if(btnActive.length < 1){
            button.classList.add('btn-active')
            document.querySelector('#custom').value = ''
         }
         else{
            btnActive[0].classList.remove('btn-active')
            button.classList.add('btn-active')
            document.querySelector('#custom').value = ''
         }
         const tip = parseInt(button.textContent.replace('%', ''))
         values.tip = tip
         calculateTip()
         
      })
   })
}

const resetInputs = () => {
   document.querySelector('input[type=reset]').addEventListener('click', () => {
      const btnActive = document.querySelector('.btn-active')
      btnActive && btnActive.classList.remove('btn-active')
      values = {}
      tipAmout.textContent = '$0.00'
      total.textContent = '$0.00'
   })
}

const calculateTip = () => {
   const { bill, numberPeople, custom, tip } = values

   if(document.querySelector('.btn-active') && parseFloat(bill) > 0 && parseInt(numberPeople) > 0 ){
      const btnAct = parseInt(document.querySelector('.btn-active').textContent.replace('%', ''))
      
      const [amout, totalTip] = doOperation(bill, btnAct, numberPeople)
      
      tipAmout.textContent = `$${amout}`
      total.textContent = `$${totalTip}`

   }

   if(!document.querySelector('.btn-active') && parseFloat(bill) > 0 && parseInt(numberPeople) > 0 ){

      const [amout, totalTip] = doOperation(bill, custom, numberPeople)
      
      tipAmout.textContent = `$${amout}`
      total.textContent = `$${totalTip}`

      return
   }
}

const doOperation = (bill, tip, numberPeople) => {
   let amout = (bill * tip / 100).toFixed(2)
   let totalTip = (amout / numberPeople).toFixed(2)
   
   return [
      amout, totalTip
   ]
}
