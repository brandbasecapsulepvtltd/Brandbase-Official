"use client";

import React from 'react'
import { PortfolioHero } from './PortfolioHero/demo'

import { ServicesShowcase } from './PortfolioCategory/team-showcase'
import DemoOne from './PortfolioCta/demo'

const PortfolioContent = () => {
  return (
    <>
    <PortfolioHero/>
    <ServicesShowcase/>
    <DemoOne/>
    </>
  )
}

export default PortfolioContent
