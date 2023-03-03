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
          <i class="fa-solid fa-arrow-right text-danger" id="modalArrow" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchAllhub('${datas.id}')"></i>
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
        <i class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchAllhub('${datas.id}')" id="modalArrow"></i>
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
  console.log(detail);

  document.getElementById('modalBody').innerHTML=`
  <div className="row row-cols-1 row-cols-md-3">
  <div className="col-6">
  <div class="card border-danger bg-danger bg-opacity-10">
  <div class="card-body">
    <h5 class="card-title my-3">${detail.description}</h5>
    <div class="d-flex  p-2 justify-content-around align-items-center gap-2 my-4">
    <div class=" text-center bg-light rounded p-2" id="cost">

    <p id="costpara" class="text-success fw-semibold">${detail.pricing[0].price ? detail.pricing[0].price:'free of cost' }<br>${detail.pricing[0].plan}
    </p>
    </div>
    <div class="text-center text-center bg-light rounded p-2"  id="cost">
    <p class="text-warning fw-semibold">${detail.pricing[1].price}<br>${detail.pricing[1].plan}
    </p>
    </div>
    <div class=" text-center bg-light rounded p-2" id="cost">
    <p class="text-danger fw-semibold">${detail.pricing[2].price}<br>${detail.pricing[2].plan}
    </p>
    </div>
    </div>
    <div class="d-flex justify-content-between align-items-center gap-2 my-4">
    <div>
    <h5 class="card-title">Features</h5>
        <ul>
        <li>${detail.features[1]['feature_name']}</li>
        <li>${detail.features[2]['feature_name']}</li>
        <li>${detail.features[3]['feature_name']}</li>
        </ul>
    </div>
    <div>
    <h5 class="card-title">Integration</h5>
        <ul>
        <li>${detail.integrations[0]}</li>
        <li>${detail.integrations[1]}</li>
        <li>${detail.integrations[2]}</li>
        </ul>
    </div>
    </div>
    
    
  </div>
</div>
</div>
<div className="col-6">
<div class="card" id="cardId">
  <img src="${detail.image_link[0]}" class="img-fluid" id="modalImg" alt="...">
  <h4  class="badge text-bg-danger d-none w-50" id="accuracy">
  ${detail.accuracy.score*100}% accuracy
</h4>
  <div class="card-body">
  
    <div class="text-center d-flex flex-column justify-content-between align-items-center">
    
    <h5 class="card-text">${detail.input_output_examples[0].input}</h5>
    <p class="card-text">${detail.input_output_examples[0].output}</p>
    <div>
    </div>
    </div>
    
  </div>
</div>
</div>
  </div>
      
      `;
      
  if(detail.accuracy.score === null){
    const accuracy=document.getElementById('accuracy');
    accuracy.classList.add('d-none')
  }else{
    const accuracy=document.getElementById('accuracy');
    accuracy.classList.remove('d-none');
  }

}

console.log(loadData());