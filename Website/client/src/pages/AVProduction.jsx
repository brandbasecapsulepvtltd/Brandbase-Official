
import AVtypes from "@/components/ServiceCategory/AVproduction/AVtypes"
import ConScroll from "@/components/ServiceCategory/AVproduction/ContainerScroll/ConScroll"
import Demotwo from "@/components/ServiceCategory/AVproduction/Hero/demo"
import DemoOne from "@/components/ServiceCategory/AVproduction/Hover-preview/demo"
import { Demothree } from "@/components/ServiceCategory/AVproduction/infinity-drag/demo"
import VideoProductionHero from "@/components/ServiceCategory/AVproduction/VideoProductionHero"
import DefaultDemo from "@/components/ServiceCategory/AVproduction/ZoomPara/demo"


const AVProduction = () => {
  return (
    <>
    <Demotwo/>
    <DemoOne/>
    <DefaultDemo/>
    {/*<CircularGalleryDemo/>     <AVtypes/> <VideoProductionHero/>*/}
    <ConScroll/>
    <Demothree/>
    </>
  )
}

export default AVProduction
