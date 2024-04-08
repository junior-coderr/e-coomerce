import Link from 'next/link'
export default function Cart() {
return(
    <>
    <div><Link href='/dashboard' className='hover:bg-[#00000024] flex w-fit px-2 rounded-md justify-center items-center'><i className="bi bi-arrow-left text-2xl"></i></Link></div>

    <h1>Hello This Is The Cart Page</h1>
    </>
)
}