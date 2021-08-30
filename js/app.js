//Validate input empty

const inputBill = document.querySelector('#bill')
const inputNumPeople = document.querySelector('#number-people')

window.onload = () => {
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
   }
   else{
      const msj = e.target.parentElement.previousSibling.previousSibling.lastChild
      msj.tagName === 'P' && msj.classList.contains('message-error') && msj.remove()

      e.target.parentElement.classList.add('input')
      e.target.parentElement.classList.remove('input-err')
   }
}