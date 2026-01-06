'use client';

import * as React from 'react';
import { HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../../lib/utils';

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('', className)}
    {...props}
  />
));
CustomAccordionItem.displayName = 'CustomAccordionItem';

const CustomAccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between gap-4 rounded-2xl p-4 text-left',
        'bg-[#ffff] dark:bg-zinc-800 dark:text-white transition-all hover:bg-gray-50/70 hover:shadow-md',
        'dark:hover:bg-zinc-700/60 focus-visible:outline-none focus-visible:ring-2',
        'dark:data-[state=open]:bg-zinc-700 data-[state=open]:shadow-md',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <HelpCircle className="h-5 w-5 text-gray-600 dark:text-white" />
        <span className="text-lg font-medium dark:text-zinc-50 text-zinc-700 tracking-wide">
          {children}
        </span>
      </div>
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600/70 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 text-gray-800 dark:text-white" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = 'CustomAccordionTrigger';

const CustomAccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden dark:text-white',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-2',
      className
    )}
    {...props}
  >
    <div className="mt-4 ml-14">
      <div className="flex items-start gap-4 rounded-2xl bg-[#ffff] dark:bg-zinc-700 p-4 shadow-md transition-all">
        <span className="flex-1 text-md leading-relaxed">{children}</span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300/70 dark:bg-zinc-600 transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-gray-700 dark:text-white" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = 'CustomAccordionContent';

export {
  CustomAccordion,
  CustomAccordionItem,
  CustomAccordionTrigger,
  CustomAccordionContent,
};

export function AccordionComponent({ faqsData }) {
  const { sectionTitle, faqs } = faqsData;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="mb-8 text-center text-2xl font-bold dark:text-white md:text-3xl">
          {sectionTitle}
        </h2>
        <CustomAccordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <CustomAccordionItem
              key={index}
              value={`item-${index}`}
            >
              <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
              <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
            </CustomAccordionItem>
          ))}
        </CustomAccordion>
      </div>
    </main>
  );
}
