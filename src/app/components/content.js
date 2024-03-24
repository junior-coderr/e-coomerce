'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react';
import { usePathname,useRouter } from 'next/navigation'




export default function Content() {
  const [current_element, set_current_element] = useState(null);
  const pathname = usePathname()
  let baseName = pathname.split('/').pop();
  const prevState = useRef(null);
  const router = useRouter();

  function useLocalStorage(value) {
    if (typeof window === 'undefined') return null;
    window.localStorage.setItem('myState', value);
  }

if(baseName==='dashboard'){
  baseName='home';
  useLocalStorage(baseName);
}else{
  useLocalStorage(baseName);
}

    useEffect(() => {
      console.log(baseName);
   if(prevState.current==null){
    set_current_element(localStorage.getItem('myState'));
   }
        if (prevState.current) {
          console.log(prevState.current);
            document.getElementById(prevState.current).style.opacity = '50%';
            document.getElementById(prevState.current).style.fontWeight = '500';
            document.getElementById(prevState.current).style.borderRight = 'none';
        }
       
      prevState.current = current_element;
      if (prevState.current) {
        console.log(prevState.current);
        document.getElementById(current_element).style.opacity = '100%';
        document.getElementById(current_element).style.fontWeight = '600';
        document.getElementById(current_element).style.fontSize = '18px';
        document.getElementById(current_element).style.borderRight = '4px solid #0186D0';
      }
    }, [current_element]);



return(
    <div className="flex h-[100%]">
         {/* //?for desktop */}
         <div className='gap-10 flex flex-col justify-center items-end max-w-fit select-none'>
          <Link href='/dashboard' className='cursor-pointer opacity-50 hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-[#0186D0] w-[85px] font-medium p-2'  onClick={()=>{set_current_element('home')}} id='home'> Home</Link>
                <span className='cursor-pointer opacity-50 hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-[#0186D0] w-[85px] font-medium p-2' onClick={()=>{set_current_element('about')}} id='about'>About</span>
               <Link href='/dashboard/order' className='cursor-pointer opacity-50 hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-[#0186D0] w-[85px] font-medium p-2' onClick={()=>{set_current_element('order')}} id='order'>Orders</Link>
                <Link href='/contact' className='cursor-pointer opacity-50 hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-[#0186D0] w-[85px] font-medium p-2' onClick={()=>{set_current_element('contact')}} id='contact'>Contact</Link>
            </div>

          {/* //?Content */}
            <div className=" w-[100%] overflow-y-auto h-[100%]">    
                <h1 className='text-4xl font-bold text-center'>Content</h1>
            </div>
    </div>
)

}