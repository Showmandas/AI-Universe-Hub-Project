// fetch api 
const loadData=()=>{
  // start loading when page load 
  const loading=document.getElementById('loading');
    loading.classList.remove('d-none');
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayData(data.data))
}

// display data 
const displayData=(data)=>{
    // console.log(data);
    const cardContainer=document.getElementById('card-section');
    // document.getElementById('card-section').innerHTML='';
    data.tools.slice(0,6).forEach((datas)=>{

        // console.log(datas);
        const card=document.createElement('div')
        card.classList.add('col');
        card.innerHTML=`
        <div class="card">
        <img src="${datas.image}" class="img-fluid" id="cardImg" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
          <li>${datas.features[0]}</li>
          <li>${datas.features[1]}</li>
          <li>${datas.features[2]}</li>
          </ol>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
          <div>
          <p class="card-text">${datas.name}</p>
          <p class="card-text"><i class="fa-regular fa-calendar-days"></i> &nbsp; <span> ${datas.published_in}</span></p>
          </div>
          <i class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchAllhub('${datas.id}')"></i>
          </div>
          
        </div>
      </div>
        `;
        cardContainer.appendChild(card)

        // stop loading 
        loading.classList.add('d-none');

    })

}


// show all card 
const showAll=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayAllData(data.data))
}

const displayAllData=(data)=>{
  const cardContainer=document.getElementById('card-section');
  const seemore=document.getElementById('seeMore');
  cardContainer.innerHTML=''
  data.tools.forEach((datas)=>{

      console.log(datas);
      const card=document.createElement('div')
      card.classList.add('col');
      card.innerHTML=`
      <div class="card">
      <img src="${datas.image}" class="img-fluid" id="cardImg" alt="...">
      <div class="card-body">
        <h5 class="card-title">Features</h5>
        <ol>
        <li>${datas.features[0]}</li>
        <li>${datas.features[1]}</li>
        <li>${datas.features[2]}</li>
        </ol>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
        <div>
        <p class="card-text">${datas.name}</p>
        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> &nbsp; <span> ${datas.published_in}</span></p>
        </div>
        <i class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>
        
      </div>
    </div>
      `;
      cardContainer.appendChild(card)
      seemore.classList.add('d-none');
  })

}

// show details on modal 
const fetchAllhub=(id)=>{
  const url= `https://openapi.programming-hero.com/api/ai/tool/${id}`
  // console.log(url);
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayDetails(data.data))
}

const displayDetails=(detail)=>{
  // console.log(detail);

}

console.log(loadData());