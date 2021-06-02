

document.addEventListener('DOMContentLoaded', ()=>{
  var map = L.map('map').setView([45.07496016001199, 13.644950866437286], 12);
  
  
  
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
          <h6><b>Name:</b> ${court.name}</h6>
          <h6><b> Address:</b> ${court.address}</h6>
          <h6><b>What3Words:</b> ${court.w3w}</h6>
          <a id="btn1" data-id="${court._id}" class="waves-effect waves-light btn modal-trigger" href="#bookCourt">Book</a>
          `)
  
          updateTime();
        marker.on('click', clickedMap)
      })  
    
    })
  });
  /* on click glavna funkc - klikom na modal buton pokrece se funkc kojom dohvacamo
  courtId iz data-id atributa naseg buttona tako znamo da pri dohvatu rezervacija
  dobijemo samo one koje su kreirane ya taj teren*/
    var cId;
    let arr = ['8:00-9:00', '9:00-10:00', '10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00']
    $(document).on("click", ".modal-trigger", function () {
      var courtId = $(this).data('id');
      console.log(courtId);
      cId = courtId;
      var select = document.getElementById('select');

      while (select.options.length > 0) {
        select.remove(0);
      }
      /* poyivanje get rute koja vraca podatke ya rez filtr po id terena  */
      fetch(`/getReservation?court=${cId}&interval=1`)
      .then(res => res.json())
      .then((data) =>{
        let date = Date.now();
        /* moment ya vriijeme */
        let currentHour = moment(date).format("HH");
        console.log(data)
        var option = document.createElement("OPTION")
        txt = document.createTextNode("-");
        option.appendChild(txt);
        select.insertBefore(option, select.lastChild);
        /* property od rez u integer */
        let intervals = data.map(e => {
          return parseInt(e.interval);
          /* mjenja string u integer*/
        })
        var ttList = document.getElementById('tt-list');
        var datafeed = arr.map((item, index) =>{
          return `<div class="grid-item" id="date-${index}">${item}</div>`
        }).join('');
        ttList.innerHTML = datafeed;
  
  
        for(var i=0; i<arr.length; i++) {
  
          var hour = document.getElementById('num');
          var ttItem = document.getElementById(`date-${i}`);
          let startHour = arr[i].split(":");
  
          if(!intervals.includes(i)){
            //console.log(arr[i]);
            var option = document.createElement("OPTION")
            txt = document.createTextNode(arr[i]);
            option.appendChild(txt);
            option.setAttribute("value",i);
            select.insertBefore(option, select.lastChild);
          }
          
          if(parseInt(currentHour) >= parseInt(startHour[0])){
            option.setAttribute("disabled", "");
            ttItem.className += " colorChange";
          }
        }
        for(var i=0; i<data.length; i++) {
          var ttItem = document.getElementById(`date-${data[i].interval}`);
          ttItem.className += " reserved";
        }
      })
  
  });
  
    var btn = document.getElementById('buton')
    btn.addEventListener('click', updateTime, false)
    function updateTime(){
      var select = document.getElementById('select')
      var option = select.options[select.selectedIndex].value;
      var name = document.getElementById('name').value;
      
      if(option >= 0){
        var date = moment(Date.now()).format("YYYY-MM-DD");
        var hour = arr[option].split("-");
        var dateHour = date +"T" + hour[1];
        console.log(dateHour);
        console.log('valid option')
        var postURL = `/addReservation?court=${cId}&interval=${option}&name=${name}&reservedAt=${dateHour}`;
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
        console.log('Map Clicked')
      }
  
      var date = document.getElementById('datetime')
      var test = document.getElementById('test')
      var dt = new Date();
     
    });
  
  
  