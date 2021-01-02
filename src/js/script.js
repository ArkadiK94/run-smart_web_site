"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    //slider
    const carouselSection = document.querySelector(".carousel");
    let distance = 750,
        offset = 0,
        num,
        wrapper = carouselSection.querySelector(".carousel__slider-wrapper"),
        inner = carouselSection.querySelector(".carousel__slider-inner");
    const sliders = inner.querySelectorAll("img"),
          arrowLeft = carouselSection.querySelector(".carousel__arrow-left"),
          arrowRight = carouselSection.querySelector(".carousel__arrow-right"),
          wrapperWidth = window.getComputedStyle(wrapper).width,
          finish = -(distance*(sliders.length-1));
    

    function move(offset){
        arrowRight.style.opacity = "1";
        arrowLeft.style.opacity = "1";
        if(offset >= 0){
            offset = 0;
            arrowLeft.style.opacity = "0.5";
        } else if(offset <= finish){
            offset = finish;
            arrowRight.style.opacity = "0.5";
        }
        if (distance == 750){
            inner.style.transform = `translateX(${offset + "px"})`;
        } else {
            inner.style.transform = `translateX(${offset + "vw"})`;
        }
    }
    move(offset);

    inner.style.width = 100 * sliders.length + "%";
    
    carouselSection.addEventListener("click", (event)=>{
        const target = event.target;
        if(target){
            if(target.classList.contains("carousel__arrow-left")){
                offset += distance;
                move(offset);
                 
            } else if (target.classList.contains("carousel__arrow-right")){
                offset -= distance;
                move(offset);
            } 
        }
    });

    wrapper.innerHTML+= `<div class='carousel-indicators'></div>`;
    const indicators = carouselSection.querySelector(".carousel-indicators");
    wrapper = carouselSection.querySelector(".carousel__slider-wrapper");
    inner = carouselSection.querySelector(".carousel__slider-inner");

    for(let i=0; i<sliders.length; i++){
        indicators.innerHTML+= `<div data-dot=${i+1} class="carousel-indicators-dot"></div>`;
    }

    const dots = document.querySelectorAll("[data-dot]");
    dots[0].classList.add("active");
    dots.forEach((item)=>{
        item.addEventListener("click",(e)=>{
            dots.forEach(item=> item.classList.remove("active"));
            e.target.classList.add("active");
            num = item.getAttribute('data-dot');
            offset = (-distance) * (num-1);
            move(offset);
        });
    });

    const media850px = window.matchMedia("(max-width:850px)");
    if(media850px.matches){
        distance = 80;
        changeSliderSize(distance);
    }
    function changeSliderSize(distance){
        wrapper.style.width = `${distance}vw`;
        inner.style.width = distance * sliders.length +"vw";
    }
    
    //catalog
    const catalogFlipBtns = document.querySelectorAll(".catalog-card__link"),
          cardFront = document.querySelectorAll(".catalog-card__front"),
          cardBack = document.querySelectorAll(".catalog-card__back"),
          catalogTabs = document.querySelectorAll(".catalog__tab"),
          catalogContent = document.querySelectorAll(".catalog__content");
    let j = 0;
    catalogFlipBtns.forEach((catalogFlipBtn,i)=>{
        catalogFlipBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            if(i%2==1){
                j = i-1;
            } else {
                j = i;
            }
            j = j/2;
            cardFront[j].classList.toggle("catalog-card__front_active");
            cardBack[j].classList.toggle("catalog-card__back_active");
            
        });
    });

    catalogTabs.forEach((catalogTab,i)=>{
        catalogTab.addEventListener("click",()=>{
            catalogTabs.forEach(item=>item.classList.remove("catalog__tab_active"));
            catalogTab.classList.add("catalog__tab_active");
            catalogContent.forEach(item=>item.classList.remove("catalog__content_active"));
            catalogContent[i].classList.add("catalog__content_active");
        });
    });

    //phone mask
    const phoneInForm = document.querySelector("[name=phone]");
          
    let phoneArr = ["+","7","(","_","_","_",")","_","_","_","-","_",   "_","-","_","_"],
        phoneMask = phoneArr.join("");

    function addPhoneMask(){
        phoneInForm.value = phoneMask; 
        phoneInForm.removeEventListener("click", addPhoneMask);
    }

    phoneInForm.addEventListener("click", addPhoneMask);

    phoneInForm.addEventListener("input", (e)=>{
        e.preventDefault();
        let previusValue = e.target.value;
        let newArrValue= "+7(___)___-__-__",
            newValue = "";
        if (previusValue.length >= newArrValue.length){
            for(let i=0; i<previusValue.length; i++){
                if(!phoneMask.includes(previusValue[i])){
                    newValue = previusValue[i];
                    newArrValue = newArrValue.replace("_",newValue);
                    phoneInForm.value = newArrValue;
                } else if (previusValue[i] == "7"){
                    if(i != 1){
                        newValue = previusValue[i];
                        newArrValue = newArrValue.replace("_",newValue);
                        phoneInForm.value = newArrValue;
                    }
                }
            }
        } else {
            previusValue = previusValue.replace("", "_");
            phoneInForm.value = previusValue;
        }
        
    });
    
});