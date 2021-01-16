"use strict";

document.addEventListener("DOMContentLoaded", () => {
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
        finish = -(distance * (sliders.length - 1));


    function move(offset) {
        arrowRight.style.opacity = "1";
        arrowLeft.style.opacity = "1";
        if (offset >= 0) {
            offset = 0;
            arrowLeft.style.opacity = "0.5";
        } else if (offset <= finish) {
            offset = finish;
            arrowRight.style.opacity = "0.5";
        }
        if (distance == 750) {
            inner.style.transform = `translateX(${offset + "px"})`;
        } else {
            inner.style.transform = `translateX(${offset + "vw"})`;
        }
    }
    move(offset);

    inner.style.width = 100 * sliders.length + "%";

    carouselSection.addEventListener("click", (event) => {
        const target = event.target;
        if (target) {
            if (target.classList.contains("carousel__arrow-left")) {
                offset += distance;
                move(offset);

            } else if (target.classList.contains("carousel__arrow-right")) {
                offset -= distance;
                move(offset);
            }
        }
    });

    wrapper.innerHTML += `<div class='carousel-indicators'></div>`;
    const indicators = carouselSection.querySelector(".carousel-indicators");
    wrapper = carouselSection.querySelector(".carousel__slider-wrapper");
    inner = carouselSection.querySelector(".carousel__slider-inner");

    for (let i = 0; i < sliders.length; i++) {
        indicators.innerHTML += `<div data-dot=${i+1} class="carousel-indicators-dot"></div>`;
    }

    const dots = document.querySelectorAll("[data-dot]");
    dots[0].classList.add("active");
    dots.forEach((item) => {
        item.addEventListener("click", (e) => {
            dots.forEach(item => item.classList.remove("active"));
            e.target.classList.add("active");
            num = item.getAttribute('data-dot');
            offset = (-distance) * (num - 1);
            move(offset);
        });
    });

    const media850px = window.matchMedia("(max-width:850px)");
    if (media850px.matches) {
        distance = 80;
        changeSliderSize(distance);
    }

    function changeSliderSize(distance) {
        wrapper.style.width = `${distance}vw`;
        inner.style.width = distance * sliders.length + "vw";
    }

    //catalog
    const catalogFlipBtns = document.querySelectorAll(".catalog-card__link"),
        cardFront = document.querySelectorAll(".catalog-card__front"),
        cardBack = document.querySelectorAll(".catalog-card__back"),
        catalogTabs = document.querySelectorAll(".catalog__tab"),
        catalogContent = document.querySelectorAll(".catalog__content");
    let j = 0;
    catalogFlipBtns.forEach((catalogFlipBtn, i) => {
        catalogFlipBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (i % 2 == 1) {
                j = i - 1;
            } else {
                j = i;
            }
            j = j / 2;
            cardFront[j].classList.toggle("catalog-card__front_active");
            cardBack[j].classList.toggle("catalog-card__back_active");

        });
    });

    catalogTabs.forEach((catalogTab, i) => {
        catalogTab.addEventListener("click", () => {
            catalogTabs.forEach(item => item.classList.remove("catalog__tab_active"));
            catalogTab.classList.add("catalog__tab_active");
            catalogContent.forEach(item => item.classList.remove("catalog__content_active"));
            catalogContent[i].classList.add("catalog__content_active");
        });
    });

    // //phone mask my option not complit
    // const phoneInForm = document.querySelector("[name=phone]");
    
    // phoneInForm.addEventListener("input", (e) => {
    //     e.preventDefault();
    //     const value = e.target.value;
    //     let x = (value.replace(/\D/g, "")).match(/\d/g),
    //         y = ["+7"];
        
    //     for (let i = 1 ; i<x.length && i<=10 ; i++){
    //         if(i==1){y.push("(");}
    //         if(i==4){y.push(")");}
    //         if(i==7 || i==9){y.push("-");}

    //         y.push(x[i]);
    //     }
    //     phoneInForm.value = y.join("");
    // });


    //phone mask by https://imask.js.org/
    const phoneMask1 = IMask(
        document.querySelector(".consultation form [name=phone]"), {
            mask: '+{7}(000)000-00-00'
        }
    );
    const phoneMask2 = IMask(
        document.querySelector("#order_consultation form [name=phone]"), {
            mask: '+{7}(000)000-00-00'
        }
    );
    const phoneMask3 = IMask(
        document.querySelector("#buy_product form [name=phone]"), {
            mask: '+{7}(000)000-00-00'
        }
    );

    //modal
    const overlay = document.querySelector(".overlay"),
          modalOrderConsultation = document.querySelector("#order_consultation"),
          modalBuyProduct = document.querySelector("#buy_product"),
          modalThanksMassage = document.querySelector("#thanks_massage"),
          modalErrorMassage = document.querySelector("#error_massage"),
          btnConsultation = document.querySelectorAll("[data-btn=consultation]"),
          btnBuying = document.querySelectorAll(".btn_min"),
          closeModal =document.querySelectorAll(".modal__close");

    function displayModal(whichBtn,whichModal,modifySubTitle){
        whichBtn.forEach((item,i)=>{
            item.addEventListener("click",()=>{
                overlay.style.display = "block";
                whichModal.style.display = "block";
                if(modifySubTitle){
                    const newSubTitle = cardFront[i].querySelector(".catalog-card__title");
                    const whichModalSubTitle= whichModal.querySelector(".modal__sub-title");
                    whichModalSubTitle.innerText= newSubTitle.innerText;                
                }
            });
        });
    }
    displayModal(btnConsultation,modalOrderConsultation,false);
    displayModal(btnBuying,modalBuyProduct,true);

    closeModal.forEach((item)=>{
        item.addEventListener("click",()=>{
            overlay.style.display = "none";
            modalOrderConsultation.style.display = "none";
            modalBuyProduct.style.display = "none";
            modalThanksMassage.style.display = "none";
            modalErrorMassage.style.display = "none";
        });
    });

    //validation
    const forms = document.querySelectorAll(".form"),
          divName = document.createElement("div"),
          divTel = document.createElement("div"),
          divEmail = document.createElement("div");
    
    function massageErrorStyle(input,divMassage, firstForm){
        divMassage.style.cssText = `
            display: block;
            color: #000;
            margin-bottom: 10px;
            
        `;
        if(firstForm){
            divMassage.style.cssText = `
            display: block;
            color: #fff;
            margin-bottom: 10px;
            `;
        }
        input.style.cssText =`
            border-width: 2px;
            border-color: red;
        `;
        input.after(divMassage);
    }
    function massageCorrectStyle(input,divMassage){
        divMassage.style.cssText = `
            display: none;
        `;
        input.style.cssText =`
            border-color: #fff;
        `;
    }

    forms.forEach((form,i)=>{
        const nameInput = form.querySelector("[name=name]"),
              telInput = form.querySelector("[name=phone]"),
              emailInput = form.querySelector("[name=email]");

        let sendForm1 = false,
            sendForm2 = false,
            sendForm3 = false;
        
        let firstForm = false;
        if(i==0){
            firstForm = true;
        }
        
        telInput.append(divTel);
        emailInput.append(divEmail);
        closeModal.forEach((item)=>{
            item.addEventListener("click",()=>{
                massageCorrectStyle(nameInput,divName);
                massageCorrectStyle(telInput,divTel);
                massageCorrectStyle(emailInput,divEmail);
                form.reset();
            });
        });
        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const request = new XMLHttpRequest(),
                  formData = new FormData(form);
            const imgForm = document.createElement("img");
            imgForm.src = "img/form/spinner.svg";
            imgForm.style.cssText= `display:block;`;
            request.open(`POST`,`mailer/smart.php`);
            const target = e.target;
            if(nameInput.value){
                if((nameInput.value.length >= 5) && (nameInput.value.includes(" ")) && ((nameInput.value)[nameInput.value.length-1]!==(" "))){
                    sendForm1 = true;
                    massageCorrectStyle(nameInput,divName);
                }
                else if(nameInput.value){
                        divName.textContent = "You didnt write your full first and last name";
                        massageErrorStyle(nameInput,divName,firstForm);
                        sendForm1 = false;
                }
            } else{
                divName.textContent = "Pls, fill your full name";
                massageErrorStyle(nameInput,divName,firstForm);
                sendForm1 = false;
            }
            if(telInput.value){
                if(telInput.value.length == 16){
                    sendForm2 = true;
                    massageCorrectStyle(telInput,divTel);
                }
                else{
                    divTel.textContent = "Pls,fill your full phone number";
                    massageErrorStyle(telInput,divTel,firstForm);
                    sendForm2 = false;
                }
            } else{
                divTel.textContent = "Pls,fill your phone number";
                massageErrorStyle(telInput,divTel,firstForm);
                sendForm2 = false;
            }
            if(emailInput.value){
                if(emailInput.value.includes("@") && (emailInput.value.includes(".com")||emailInput.value.includes(".ru")||emailInput.value.includes(".co.il")||emailInput.value.includes(".uk")||emailInput.value.includes(".gov")||emailInput.value.includes(".net"))){
                    sendForm3 = true;
                    massageCorrectStyle(emailInput,divEmail);
                }
                else{
                    divEmail.textContent = "Pls,fill your correct Email";
                    massageErrorStyle(emailInput,divEmail,firstForm);
                    sendForm3 = false;
                }
            } else{
                divEmail.textContent = "Pls,fill your Email";
                massageErrorStyle(emailInput,divEmail,firstForm);
                sendForm3 = false;
            }
            if (sendForm1 && sendForm2 && sendForm3){
                form.append(imgForm);
                form.insertAdjacentElement('afterend',imgForm);
                request.send(formData);
                request.addEventListener("readystatechange",(e)=>{
                    
                    if(request.statusText == "OK"){
                        imgForm.remove();
                        overlay.style.display = "block";
                        modalOrderConsultation.style.display = "none";
                        modalBuyProduct.style.display = "none";
                        modalThanksMassage.style.display = "block";
                        modalErrorMassage.style.display = "none";
                        setTimeout(()=>{
                            overlay.style.display = "none";
                            modalThanksMassage.style.display = "none";
                        },1000);
                    } else {
                        imgForm.remove();
                        overlay.style.display = "block";
                        modalOrderConsultation.style.display = "none";
                        modalBuyProduct.style.display = "none";
                        modalThanksMassage.style.display = "none";
                        modalErrorMassage.style.display = "block";
                        setTimeout(()=>{
                            overlay.style.display = "none";
                            modalErrorMassage.style.display = "none";
                        },1000);
                    }
                });
                target.reset();
            }
        });
    });
    
    //arrow-up
    const arrowUp = document.querySelector(".arrow-up");

    window.addEventListener("scroll",()=>{
        if(window.pageYOffset >= 1600){
            arrowUp.style.display = "block";
        } else {
            arrowUp.style.display = "none";
        }
    });
    
    function myAnimation(){
        window.scrollBy(0,-30);
        if(window.pageYOffset > 0){
            requestAnimationFrame(myAnimation);
        }
    }
    arrowUp.addEventListener("click",(e)=>{
        e.preventDefault();
        requestAnimationFrame(myAnimation);
    });

    //wow animation
    new WOW().init();
});