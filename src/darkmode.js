'use strict';

export default class  Darkmode {
  constructor(){
    this.darkmodeCheckbox = document.querySelector('.darkmode__checkbox');
    this.darkmode = false

    this.darkmodeCheckbox.addEventListener('change', ()=>{

      this.makeDarkMode();
      const darkmode = this.getItem('darkmode')
      localStorage.setItem('darkmode', !darkmode);
      })

    }

    getItem = (item) =>{
      const darkmode =  localStorage.getItem(item)
      return JSON.parse(darkmode)
    }

    makeDarkMode = () =>{

      document.querySelector('.background').classList.toggle('darkmode');
  
      document.querySelector('.date').classList.toggle('darkmode__fontcolor')
      document.querySelector('.clock').classList.toggle('darkmode__fontcolor')
    
      document.querySelector('.weather').classList.toggle('darkmode__fontcolor')
      document.querySelector('.location').classList.toggle('darkmode__fontcolor')
    
      document.querySelector('.quotes__content').classList.toggle('darkmode__fontcolor')
      document.querySelector('.quotes__author').classList.toggle('darkmode__fontcolor')
    
      document.querySelector('.search__icon').classList.toggle('darkmode__fontcolor')
      document.querySelector('.search__input').classList.toggle('darkmode__fontcolor')

      console.log("todo_item: ", document.querySelectorAll('.todo__content'))

      document.querySelectorAll('.todo__check').forEach(check=>
        check.classList.toggle('darkmode__fontcolor'))

      document.querySelectorAll('.todo__content').forEach(content=>
        content.classList.toggle('darkmode__fontcolor'))

      document.querySelectorAll('.todo__delete').forEach(content=>
        content.classList.toggle('darkmode__fontcolor'))

      document.querySelectorAll('.todo__item').forEach(item=>
        item.classList.toggle('darkmode'))

      document.querySelectorAll('.todo__input').forEach(input=>
        input.classList.toggle('darkmode'))
      
      document.querySelectorAll('.list__title').forEach(title => 
        title.classList.toggle('darkmode__fontcolor'))

    }


    darkmodeCheck = () => {
      const darkmode = this.getItem('darkmode');

      if (darkmode === null ){
        localStorage.setItem('darkmode', this.darkmode);
      }
      else if(darkmode === true){

        this.makeDarkMode();
        this.darkmodeCheckbox.checked = true;
      }

    }

  }
