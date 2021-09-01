//Validate input empty

const form = document.querySelector('form');

const inputBill = document.querySelector('#bill')
const inputNumPeople = document.querySelector('#number-people')


window.onload = () => {
   initApp()
}

const initApp = () => {
   form.addEventListener('submit', (event) => {
      event.preventDefault()
   })
   inputBill.addEventListener('input', validateInput)   
   inputNumPeople.addEventListener('input', validateInput)  
   generateButtons()
   activeButton()
   resetInputs()
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
   }
   else if(valueInput < 0){
      if(!subTitle.querySelector('.message-error')){
         const p = document.createElement('p')
         p.textContent = `Can't be minus of zero`
         p.classList.add('message-error')
         subTitle.appendChild(p)
      }
      e.target.parentElement.classList.add('input-err')
      e.target.parentElement.classList.remove('input')
   }
   else{
      const msj = e.target.parentElement.previousSibling.previousSibling.lastChild
      msj.tagName === 'P' && msj.classList.contains('message-error') && msj.remove()

      e.target.parentElement.classList.add('input')
      e.target.parentElement.classList.remove('input-err')
   }
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
      })
   })
}

const resetInputs = () => {
   document.querySelector('input[type=reset]').addEventListener('click', () => {
      const btnActive = document.querySelector('.btn-active')
      btnActive && btnActive.classList.remove('btn-active')
   })
}