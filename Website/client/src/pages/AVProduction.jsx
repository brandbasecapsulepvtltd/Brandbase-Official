
import Breadcrumbs from '@/components/General/Breadcrumbs';
import ConScroll from '@/components/ServiceCategory/AVproduction/ContainerScroll/ConScroll';
import Demotwo from '@/components/ServiceCategory/AVproduction/Hero/demo';
import DemoOne from '@/components/ServiceCategory/AVproduction/Hover-preview/demo';
import { Demothree } from '@/components/ServiceCategory/AVproduction/infinity-drag/demo';

const AVProduction = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Audio & Video Production', href: '/services/av-production' },
          ]}
        />
      </div>
      <Demotwo />
      <DemoOne />
      <ConScroll />
      <Demothree />
    </>
  );
};

export default AVProduction;
