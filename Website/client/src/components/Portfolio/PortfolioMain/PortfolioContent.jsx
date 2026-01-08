"use client";

import React from 'react'
import { PortfolioHero } from './PortfolioHero/demo'

import PortfolioList from '../PortfolioList'

import PortfolioResults from './PortfolioCta/testimonial-1'

const PortfolioContent = () => {
  return (
    <>
      <PortfolioHero />
      <PortfolioList />
      <PortfolioResults />
    </>
  )
}

export default PortfolioContent
