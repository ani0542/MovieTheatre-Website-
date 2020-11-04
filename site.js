const container = document.querySelector('.container')

const seats = document.querySelectorAll('.row .seat:not(.occupied)')

// console.log(seats)

const total = document.getElementById('total')

const count = document.getElementById('count')

const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value    //  this can also be written as    const ticketPrice = parseInt(movieSelect.value)

// console.log((ticketPrice))


populateUI()



//update total and count

function updateTotal()
{
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    


    // console.log(selectedSeats)




    const seatsIndex = [...selectedSeats].map((value)=>{
        return [...seats].indexOf(value)
    })


    // console.log(seatsIndex)

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))

    const selectedSeatsLength = selectedSeats.length;

    // console.log(selectedSeatsLength)


   

   


    count.innerHTML=selectedSeatsLength;

    total.innerHTML = selectedSeatsLength * ticketPrice
}



//movie select event

movieSelect.addEventListener('change',sum)

function sum(e)
{
    //  console.log(e.target.value)

    // console.log(e.target.selectedIndex,e.target.value)

    setMovieData(e.target.selectedIndex,e.target.value)

    ticketPrice=+ e.target.value
    updateTotal()
}



function setMovieData(movieIndex,moviePrice)
{
     localStorage.setItem('selectedMovieIndex',movieIndex)
     localStorage.setItem('selectedMoviePrice',moviePrice)
} 






//populate UI from localstorage

function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    // console.log(selectedSeats)

    if(selectedSeats.length>0 && selectedSeats!==null)
    {
         seats.forEach((value,index)=>{
             if(selectedSeats.indexOf(index)>-1)
             {
                 value.classList.add('selected')
             }
         })
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex
    }
}







container.addEventListener('click',num)
function num(e)
{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        // console.log(e.target)


        e.target.classList.toggle('selected')

        updateTotal()
    }
}


updateTotal()


















