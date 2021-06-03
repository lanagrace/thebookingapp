/* leaflet map */
document.addEventListener('DOMContentLoaded', ()=>{
  /* view is set to Rovinj - my hometown */
  var map = L.map('map').setView([45.07496016001199, 13.644950866437286], 12);
  /* access token for the map */
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
  
  /* gets all courts with the same sport id */
  var getURL = `/getCourt/${id}`;
  var available = document.querySelector('#courts');
  fetch(getURL)
  .then(res => res.json())
  .then((data) =>{
    var datafeed = data.map((court) =>{
      data.forEach(court => {
         /* creates a pin for each court based on data */
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
 
    /* following code creates the timetable with all of its reservations and available slots */
    var cId;
    let arr = ['8:00-9:00', '9:00-10:00', '10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00']
    /* the function listens for a click on the button that opens a modal */
    $(document).on("click", ".modal-trigger", function () {
      var courtId = $(this).data('id');
      console.log(courtId);
      cId = courtId;
      var select = document.getElementById('select');

      while (select.options.length > 0) {
        select.remove(0);
      }
     
      /* gets all reservations that have been made on that court*/
      fetch(`/getReservation?court=${cId}&interval=1`)
      .then(res => res.json())
      .then((data) =>{
        let date = Date.now();
        /* moment is one of the npm that I downloaded to track time */
        let currentHour = moment(date).format("HH");
        console.log(data)
        var option = document.createElement("OPTION")
        /* creates a new option with only "-" and that is the first option in the dropdown menu*/
        txt = document.createTextNode("-");
        option.appendChild(txt);
        select.insertBefore(option, select.lastChild);
        let intervals = data.map(e => {
          return parseInt(e.interval);
        })
        /* creates a list of slots */
        var ttList = document.getElementById('tt-list');
        var datafeed = arr.map((item, index) =>{
          return `<div class="grid-item" id="date-${index}">${item}</div>`
        }).join('');
        ttList.innerHTML = datafeed;
  
        /* for loop goes through the reservations */
        for(var i=0; i<arr.length; i++) {

          var hour = document.getElementById('num');
          var ttItem = document.getElementById(`date-${i}`);
          let startHour = arr[i].split(":"); /* splits the array where the colon is */
          
          if(!intervals.includes(i)){
            //console.log(arr[i]);
            var option = document.createElement("OPTION")
            txt = document.createTextNode(arr[i]);
            option.appendChild(txt);
            option.setAttribute("value",i);
            select.insertBefore(option, select.lastChild);
          }
          
          /* if the current time is the same or higher than the start hour the slot div will change colour to gray */
          if(parseInt(currentHour) >= parseInt(startHour[0])){
            /* disables it from the dropdown */
            option.setAttribute("disabled", "");
            /* this class will be added to the div */
            ttItem.className += " colorChange";
          }
        }
        /* all slots that have been taken will get a class "reserved" */
        for(var i=0; i<data.length; i++) {
          var ttItem = document.getElementById(`date-${data[i].interval}`);
          ttItem.className += "reserved";
        }
      })
  
  });
  
  /* 'buton' is the button that the user has to click to close the modal */
  /* creates a new reservation */
    var btn = document.getElementById('buton')
    btn.addEventListener('click', updateTime, false)
    function updateTime(){
      /* select is HTML element */
      var select = document.getElementById('select')
      /* option represents the slot that the user chose */
      var option = select.options[select.selectedIndex].value;
      var name = document.getElementById('name').value;
      
      if(option >= 0){
        var date = moment(Date.now()).format("YYYY-MM-DD");
        /* splits the string where the "-" is and creates a new array with 2 strings */
        /* ex. ["8:00-9:00"] was selected - new array: [8:00, 9:00] */
        var hour = arr[option].split("-");
        var dateHour = date +"T" + hour[1];
        console.log(dateHour);
        console.log('valid option')
        /* if the option is valid it will make a post request */
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
     
  
   
  /* initialization for Materialize elements */
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
  
  
  