// fetch api 
const loadData=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayData(data.data))
}

// display data 
const displayData=(data)=>{
    // console.log(data);
    const cardContainer=document.getElementById('card-section');
    data.tools.slice(0,6).forEach((datas)=>{
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
          <p class="card-text">${datas.name}</p>
          <p class="card-text">${datas.published_in}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
        `;
        cardContainer.appendChild(card)
    })

}


console.log(loadData());