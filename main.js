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
  <div class="row">
  <div class="col-12 col-lg-6 col-md-6">
  <div class="card border-danger bg-danger bg-opacity-10">
  <div class="card-body">
    <h5 class="card-title my-3">${detail.description}</h5>
    <div class="d-flex  p-2 justify-content-around align-items-center gap-2 my-4">
    <div class=" text-center bg-light rounded p-2" id="cost">
    <p class="text-success fw-semibold">${detail.pricing[0].price==='0' || detail.pricing[0].price==='No cost' ? 'Free of cost':detail.pricing[0].price }<br>${detail.pricing[0].plan}
    </p>
    </div>
    <div class="text-center text-center bg-light rounded p-2"  id="cost">
    <p class="text-warning fw-semibold">${detail.pricing[1].price==='No cost' ? 'Free of cost' :detail.pricing[1].price}<br>${detail.pricing[1].plan}
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
        <ul id="features" class="d-none">
        </ul>
    </div>
    <div>
    <h5 class="card-title">Integration</h5>
        <ul class='d-none' id="integrations">
        </ul>
    </div>
    </div>
    
    
  </div>
</div>
</div>
<div class="col-12 col-lg-6 col-md-6">
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
 
      // accuracy 
  if(detail.accuracy.score === null){
    const accuracy=document.getElementById('accuracy');
    accuracy.classList.add('d-none')
  }else{
    const accuracy=document.getElementById('accuracy');
    accuracy.classList.remove('d-none');
  }


  // integrations 
  if(detail.integrations === null){
    const intList=document.getElementById('integrations');
    intList.classList.add('d-none')
    const p=document.createElement('p');
      p.innerHTML=`
      <li>No more data</li>
      `;
      intList.appendChild(p)
  }else{
    detail.integrations.forEach(i=>{
      // console.log(i);
      const intList=document.getElementById('integrations');
      const li=document.createElement('li');
      li.innerHTML=`
      <li>${i}</li>
      `
      intList.appendChild(li)
      intList.classList.remove('d-none');
      
    })
  }

  // features 
  if(detail.features === null){
    const features=document.getElementById('features');
    features.classList.add('d-none')
    const p=document.createElement('p');
      p.innerHTML=`
      <li>No more data</li>
      `;
      features.appendChild(p)
  }else{
    // detail.features.forEach((k)=>{

    //   console.log(k);
    //   const features=document.getElementById('features');
    //   const li=document.createElement('li');
    //   li.innerHTML=`
    //   <li>${k['feature_name']}</li>
    //   `
    //   features.appendChild(li)
    //   features.classList.remove('d-none');
      
    // })

    
    // const features=document.getElementById('features');
    // const li=document.createElement('li');
    // li.innerHTML=`
    // <li>${t}</li>
    // `
    // features.appendChild(li)
    // features.classList.remove('d-none');

    for(const i in detail.features){
      // console.log(i);
      for(const j in detail.features[i]){
        // console.log(j);
        for(const k in detail.features[i][j]){
          // console.log(k);
        }
      }
      
    }
      

  }
  

}

console.log(loadData());