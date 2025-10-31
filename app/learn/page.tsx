"use client";
 
import React from 'react'
import { BDPCard } from "@bitcoin-dev-project/bdp-ui"
import Filters from '@/components/brand/Filters';

const LearnPage = () => {
  return (
    <div className='h-screen bg-brand-orange-100 w-full flex gap-[90px] py-5'>
      <div className='w-[300px]'>
       <Filters />
       <div className=''>

       </div>
      </div>

      <div className='flex flex-col gap-8'>
        <div>
            <h2 className='text-[3.5rem] font-extrabold'>LEARN</h2>
            <p className='text-xl'>A curated library of guides, tools, and workshops for every skill level</p>
        </div>
        <BDPCard byBDP difficulty="easy" onClick={()=>{}} bannerColor='#000000' title='test' description='test' logo='/images/hero.jpg'  link='https://claude.ai/recents' tagList={["guide"]}/>
      </div>
    </div>
  )
}

export default LearnPage