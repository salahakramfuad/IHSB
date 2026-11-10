'use client'

import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Stack of expandable questions or sections.
 *   <Accordion>
 *     <Accordion.Item title='When does the year start?'>…</Accordion.Item>
 *   </Accordion>
 */
function AccordionRoot({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-line border-y border-line', className)}>{children}</div>
}

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  /** Heading level of the title, for the page outline */
  as?: 'h2' | 'h3' | 'h4'
}

function AccordionItem({ title, children, defaultOpen = false, as: Heading = 'h3' }: AccordionItemProps) {
  return (
    <Disclosure as='div' defaultOpen={defaultOpen}>
      <Heading>
        <DisclosureButton className='group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-title text-ink'>
          {title}
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-muted transition-[transform,background-color,color] duration-base ease-out group-hover:bg-sunken group-data-[open]:rotate-45 group-data-[open]:border-gold-500 group-data-[open]:text-gold'>
            <Plus className='h-4 w-4' aria-hidden />
          </span>
        </DisclosureButton>
      </Heading>
      <DisclosurePanel className='max-w-prose pb-6 text-ink-muted'>{children}</DisclosurePanel>
    </Disclosure>
  )
}

const Accordion = Object.assign(AccordionRoot, { Item: AccordionItem })
export default Accordion
