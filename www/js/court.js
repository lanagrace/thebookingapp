
document.addEventListener('DOMContentLoaded', ()=>{
var map = L.map('map').setView([50.37566179067675, -4.139420986175538], 13);



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2twMmU2c2cxMDA3cjMyczUxNTNneDIyNCJ9.aFd1ile8ZgvfhbBi-gjvcw'
  }).addTo(map);

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
    data.forEach(court => {
      var marker = L.marker([court.lat, court.lng]).addTo(map);
        marker.bindPopup(`
        <h6>${court.name}</h6>
        <a id="btn1" data-id="${court._id}" class="waves-effect waves-light btn modal-trigger" href="#bookCourt">Book</a>
        `)

        updateTime();
   /*  document.getElementById(`map-${court.name}`).style="height:100%" */
      marker.on('click', clickedMap)
    })  
  
  })/* .addTo(map); */ });

  var cId;
  $(document).on("click", ".modal-trigger", function () {
    var courtId = $(this).data('id');
    console.log(courtId);
    cId = courtId;
    // As pointed out in comments, 
    // it is unnecessary to have to manually call the modal.
    // $('#addBookDialog').modal('show');
    var select = document.getElementById('select');
    while (select.options.length > 0) {
      select.remove(0);
    }
    arr = ['8:00-9:00', '9:00-10:00']
    fetch(`/getReservation?court=${cId}&interval=1`)
    .then(res => res.json())
    .then((data) =>{
      console.log("reservations", data);
      for(var i=0; i<arr.length; i++) {
        if(!data.includes(i)){
          var option = document.createElement("OPTION")
          txt = document.createTextNode(arr[i]);
          option.appendChild(txt);
          option.setAttribute("value",i);
          select.insertBefore(option, select.lastChild);
        }
      }
    })

});

  var btn = document.getElementById('buton')
  btn.addEventListener('click', updateTime, false)
  function updateTime(){
    var select = document.getElementById('select')
    var option = select.options[select.selectedIndex].value;
    console.log(option)
    if(option >= 0){
      console.log('valid option')
      var postURL = `/addReservation?court=${cId}&interval=${option}`;
      fetch(postURL, {
        method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
      })
      .then(res => res.json())
      .then((data) =>{
          console.log(data)
      })
    }
  }
   

 

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var bookCourt = document.querySelector('#bookCourt');
    var instance = M.Modal.getInstance(bookCourt);

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });
    
    var btn1 = document.querySelector('#btn1')

    

    function clickedMap(event){
      
     /*  btn1.style.visibility = "visible" */
      console.log('Map Clicked')
    }

    var date = document.getElementById('datetime')
    var test = document.getElementById('test')
    var dt = new Date();
/*     document.getElementById("datetime").innerHTML = ((("0"+dt.getHours()+1).slice(-2)) +":"+ (("0"+dt.getMinutes()+1).slice(-2)));;
 *//* 
    if (datetime > test){
      test.style = "background-color: blue";
    }

    var d = new Date();
    document.getElementById("test").innerHTML = d.getHours(); */
          /*  return `

                <!-- <div class="card horizontal">
                    <div class="card-image">
                        <div id="map-${court.name}"></div> 
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <h5>${court.name}</h5>
                            <p>${court.address}</p>
                        </div>
                        <div class="card-action">
                                <!-- Modal Trigger -->
                                <a class="waves-effect deep-purple lighten-2 btn modal-trigger" href="#modal1">Availability </a>
                        </div> 
                    </div>
                </div>  -->`  */

  /* }) .join('');
  available.innerHTML = datafeed; */ 
  
   
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems);

  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
  });


  

  
/*   if (document.clicked )
  document.getElementById('color').onclick = changeColor;   



    function changeColor() {

      console.log(document.getElementById('color').style)
      document.getElementById('color').style = "background-color: red;";
        return false;
    }   */ 




/* document.addEventListener('DOMContentLoaded', ()=>{
  var map = L.map('map').setView([50.37566179067675, -4.139420986175538], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2tvanVhOWU3MGFiazJ3cWt2YjV5am53OSJ9.99cYacURj_XngBppBaIhmw'
      }).addTo(map); });

      var marker = L.marker([court.lat, court.lng]).addTo(map);
        marker.bindPopup(`
        <h3>${court.name}</h3>
        <p>What 3 words Ref: ${court.w3w}</p>
        `)

 */

/* document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }); */

  /* document.addEventListener('DOMContentLoaded', ()=> {

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
  }); */

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