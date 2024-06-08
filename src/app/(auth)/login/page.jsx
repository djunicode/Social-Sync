import Link from 'next/link'
import Form from './(components)/Form'

export default function Page() {
  return (
    <main className=' min-h-screen flex flex-col bg-dark justify-center items-center p-6'>
      <div className=' w-fit flex flex-col gap-6 justify-center items-center'>
        <Link href={'/'} className='flex flex-row w-full gap-2 justify-center items-center'>
          <div className=' w-16 h-16 bg-primary rounded-full'></div>
          <h1 className=' md:text-6xl text-4xl font-semibold text-slate-50'>SocialSync</h1>
        </Link>
        <section className=' flex w-[80vw] lg:max-w-[35vw] md:max-w-[60vw] flex-col justify-start items-center md:p-12 p-6 bg-[#1d1d2f] rounded-3xl border-2 border-slate-50'>
          <h2 className=' md:text-4xl text-2xl font-semibold'>Login to your account</h2>
          <Form/>
        </section>
        <section className=' flex flex-row text-lg gap-1'>
          <h3>Don&apos;t have an account yet?</h3>
          <Link href={'/signup'} className=' text-primary underline decoration-primary'>Sign up</Link>
          <h3>here</h3>
        </section>
      </div>
    </main>
  )
}
