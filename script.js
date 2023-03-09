const fromLang = document.getElementById('from-lang');
const toLang = document.getElementById('to-lang');

const btnTranslate = document.querySelector('.btnTranslate');
const fromtext = document.querySelector('#from-text');
const totext = document.querySelector('#to-text');

const icons = document.querySelectorAll('.icons');

document.querySelector(".exchange").addEventListener('click', ()=>{
    let text = fromtext.value;
    fromtext.value = totext.value;
    totext.value = text;
    
    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});

for(let icon of icons){
    icon.addEventListener('click', (element)=>{//buraya element diyerek hangi icona tıkladığımı alırız target özelliği sayesinde
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id == "from"){
                navigator.clipboard.writeText(fromtext.value); // bu  şekilde hafızaya direkt kopyalayabilriz
            }else{
                navigator.clipboard.writeText(totext.value);   
            }
        }else {
            let uttarance;//(ifade)
            
            if(element.target.id == "from"){
                uttarance = new SpeechSynthesisUtterance(fromtext.value); //nereden okiyacağını belirledik
                uttarance.lang = fromLang.value; // hangi dilden okiyacağını belirledik
            }else{
                uttarance = new SpeechSynthesisUtterance(totext.value);
                uttarance.lang = toLang.value;
            }

            speechSynthesis.speak(uttarance);
        }

        
    })
}


for(let lang in languages){

    let option = `<option value = "${lang}">${languages[lang]}</option> `;

    fromLang.insertAdjacentHTML('beforeend', option);
    toLang.insertAdjacentHTML('beforeend', option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

btnTranslate.addEventListener('click', () =>{
    let text = fromtext.value;
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            totext.value = data.responseData.translatedText;
        })
});



