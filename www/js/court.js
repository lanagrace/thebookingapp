

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id)

var getURL = `/getCourt/${id}`;
var available = document.querySelector('#courts');
fetch(getURL)
.then(res => res.json())
.then((data) =>{
  var datafeed = data.map((court) =>{
    
    return `
            <div class="col m6">
                <div class="card horizontal">
                    <div class="card-image">
                        <div id="map-${court.name}"></div> 
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <p>${court.name}</p>
                        </div>
                        <div class="card-action">
                                <!-- Modal Trigger -->
                                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Availability </a>
                        </div> 
                    </div>
                </div>
            </div> ` 

  }) .join('');
  available.innerHTML = datafeed;
  data.forEach(court => {
    document.getElementById(`map-${court.name}`).style="height:100%"
    var map = L.map(`map-${court.name}`).setView([court.lat, court.lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2tvenRpNm54MTMzdzJvcWdvcTc5eTFzdyJ9.OKKQqqEJ1Uotnlsir01WQQ'
    }).addTo(map); 

   
        var marker = L.marker([court.lat, court.lng]).addTo(map);
        marker.bindPopup(`
        <h3>${court.name}</h3>
        <p>What 3 words Ref: ${court.w3w}</p>
        `)
  });
});



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  document.addEventListener('DOMContentLoaded', ()=> {

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var dateAddModal = document.querySelector('#dateAddModal');
    var dateSelect = M.Modal.getInstance(dateAddModal);

    var calendarEl = document.querySelector('#calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: function(info) {
        var dateField = document.querySelector('#date');
        dateField.value = info.dateStr;
        dateSelect.open();
      }
    });
    calendar.render();
  });

 /*  document.addEventListener('DOMContentLoaded', ()=>{
    var map = L.map('map').setView([50.37566179067675, -4.139420986175538], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2tvd3I4ODhwMDh0dDJvbXBmczAxa2llbiJ9.0zANEIsOOToA_A7N_m5jXw'
        }).addTo(map); }); */