const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const formBtn = document.querySelector('.ekle-btn');
const liste=document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const statusCheck= document.querySelector('#status-input');
const selectFilter=document.querySelector('#filter-select');
const nameInput = document.querySelector('#name-input');

// tarayıcadan ismi alma
const username = localStorage.getItem('name') || '';

nameInput.value = username;

// kullnıcın girdiği ismi tarayıca depolamasında saklama
nameInput.addEventListener('change', (e) => {
  localStorage.setItem('name', e.target.value);
});


// const yanına istediğin ismi ver ve
//  sonrasında '' içine htmlde ki isimlerini yaz .
// class ve id olmasına göre # veya . koy.

// console.log(harcamaInput,fiyatInput,formBtn); 
// doğru çektiğini kontrol etmek için.


// izleme işlemleri.
formBtn.addEventListener ('click', addExpense);
liste.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter);

// toplam state (durum)
// let çünkü bu toplam değişecektir bu yüzden değişken let
let toplam= 0;

// değerini artıracak
// += her toplamı al fiyata ekle
function updateToplam(fiyat) {

    toplam += Number(fiyat);
    toplamBilgi.innerText= toplam;
  }
  


// harcama oluşturma
// formun özelliği olarak tıklandığında saydfa yenilenir.
// sayfa yenileme özelliğini kaldır

function addExpense(e) {
    e.preventDefault();  // yenilenmeyi kaldırır.
    // console.log(harcamaInput.value ,fiyatInput.value); 
   
//boşken çalışmasınlar diye
// === "" boş stringe eşit mi değilmi ! ile aynı anlam.
if (!fiyatInput.value || harcamaInput.value === '') {
    alert('Formları Doldurun');
    // fonkisyonu durduruyoruz
    return;
  }

    // div oluşturma. tıklayınca veri oluşturma. createelement html elemanları oluşturma
    const harcamaDiv = document.createElement("div") 
   
// class ekleme
    harcamaDiv.classList.add('harcama') ;
    if (statusCheck.checked) {
      harcamaDiv.classList.add('payed');
    }
  
// içeriğini ayartlama. bektik kullanman gerekir. çünkü diğerlerinde 7 
// satır kullanabilirsin ve js kodları yazamıyoruz. 
    harcamaDiv.innerHTML= `
    <h2>${harcamaInput.value}</h2>
    <h2 id= "value">${fiyatInput.value}</h2>
    <div>
      <img  id="payment" src="images/icons8pay.png" alt="">
      <img id="remove" src="images/icons8delete.png" alt="">
    </div>
    `;
//  oluşan harcamaya html göndermek için;
liste.appendChild(harcamaDiv);

// toplamı güncelle
updateToplam(fiyatInput.value);


    //  formu temizleme

    harcamaInput.value= '';
    fiyatInput.value= '';

    }

// listeye tıklanma olayı

function handleClick(e) {
    // tıklanılan elemanı alma
    const element = e.target;
  
    if (element.id === 'remove') {
      // tıklanılan sil butonunun kapsayıcsını alma
      const wrapperElement = element.parentElement.parentElement;
  
  
        // silinen elemanın fiyaıtını alma
        const deletedPrice= wrapperElement.querySelector('#value').innerText;
        Number(deletedPrice);
        // console.log(Number(deletedPriceElement.innerText)) aynı şey olur

        //  silinen fiyatın toplamdan çıkrm
        updateToplam(- Number(deletedPrice));

        // kapsayıcıyı htmlden kaldırma
         wrapperElement.remove();
    
  
    }
  }


  // event e seçilen değerdir.
 // filtrleme işlemi
 function handleFilter(e) {
  const item= Array.from(liste.children);
// console.log(item);
// öğeyi döndürür.
  item.forEach((item) => {
    console.log(item);

    switch (e.target.value) {
      case 'all':
       item.style.display= 'flex';
        break;
// eğer ödenirse kutucukları kaldırma işlemleri
      case 'payed':
        if (!item.classList.contains('payed')) {
         item.style.display = "none";
        } else {
          item.style.display ="flex";
        }

        break;

      case 'not-payed':
        if (item.classList.contains('not-payed')) {
          console.log(contains);
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
        break;
        const items = Array.from(liste.children);
    }
  });
}


// Local  Storage / veriler biz silene kadar durur
// Session   Storage > > veriler sekme kapatınca silinir

// setItem(anahtar,değer) >  veriyi depolama alanına koyar
localStorage.setItem('isim', 'denemelik veri');

// getItem(anahtar) > veriyi alıp getirir
const localVeri = localStorage.getItem('deneme');

// .removeItem() > veriyi siler
localStorage.removeItem('deneme');