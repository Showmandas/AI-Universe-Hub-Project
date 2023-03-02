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
    data.tools.forEach(datas=>{
        console.log(datas);
        const card=document.createElement('div')
        card.classList.add('col');
        card.innerHTML=`
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
        `;
        cardContainer.appendChild(card)
    })

}


console.log(loadData());