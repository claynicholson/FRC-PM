import React from 'react'
import SpecialFeed from "@components/SpecialFeed";
import SideNav from "@components/SideNav";

const Mechanical = () => {
  return (
    <div className="flex w-full h-full">
        <SideNav className=""/>
        <SpecialFeed 
            word="Mechanical"
            title = "Mechanical"
            className="flex"/>

    </div >
  )
};

export default Mechanical