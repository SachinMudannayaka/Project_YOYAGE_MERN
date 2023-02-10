import React, {useState } from 'react';
import Perks from '../Perks';
import { Link,useParams} from 'react-router-dom';
import axios from 'axios';



export default function PlacesPage() {
   
        
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[photoLink,setPhotoLink]=useState('');
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState([]);
    const[extraInfo,setExtraInfo]=useState([]);
    const[checkIn,setcheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    const[maxGuest,setMaxGuest]=useState(1);
    const{action}=useParams();
    
     
    function inputHeader(text){
        return(
            <h2 className='text-2xl mt-4'>{text}</h2>  
        )
    }

    function inputDescription(text){
    return(
    <p className='text-gray-500 text-sm'>{text}</p>
       )
    }  

    function preInput(header,description){
        return(
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
                
            </div>
        );

        }

      async function addPhotoByLink(ev){
        ev.preventDefault();
      await axios .post('/upload-by-link',{link:photoLink})
        }

  return (
    <div>
{action !=='new' &&(
    <div className='text-center'>
    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    Add new place</Link>
     </div>
)}

{action ==='new' && (
   
   <div>    
   <form >
       {preInput('Title','Title for your place should be short and catchy as in advertisement.')}
       <input type='text' value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='Title,for example: My lovely apartment'/>

       {preInput('Address','Address to this place.')}
       <input type='text' value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='Address'/>

       {preInput('Photos','Add photos to derive more attraction.')}
        <div className='flex gap-2'>    
       <input type='text' value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder={'Add using a Link ....jpg'}/>
       <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
    </div>

    <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
    <button className='flex justify-center gap-3 border bg-transparent rounded-2xl p-8 text-3xl text-gray-600'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
    Upload
    </button>
    </div>

       {preInput('Descreption','Description of the place.')}
       <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
       {preInput('Perks','Select all the perks of your place')}


       <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
        <Perks selected={perks} onChange={setPerks}/>
       </div>


       {preInput('Extra Information','Rules & conditions')}
       <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>


       {preInput('Check In & Out times','Add check in and out times, remember to have some time window for cleaning the room between guest')}
         <div className='grid gap-2 sm:grid-cols-3'>
           <div><h3 className='mt-2 -mb-1'>Check in Time 
               </h3><input type="text" placeholder='15:00'
                value={checkIn} onChange={ev=>setcheckIn(ev.target.value)}/>
                </div>
           <div><h3 className='mt-2 -mb-1'>Check Out Time 
           </h3><input type=" text" placeholder='07:00' 
           value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
           </div>
           <div><h3 className='mt-2 -mb-1'>Max number of guests 
           </h3><input type="number"  
           value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
           </div>
           </div>
       </form>
       </div>
     

)}
    </div>

  )
}