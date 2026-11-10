'use client'

import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { cn } from '../../lib/utils'

/**
 * Accessible tabs (arrow keys, Home/End, roving focus).
 *   <Tabs>
 *     <Tabs.List label='Programmes'>
 *       <Tabs.Tab>Primary</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panels>
 *       <Tabs.Panel>…</Tabs.Panel>
 *     </Tabs.Panels>
 *   </Tabs>
 */
function TabsRoot({
  children,
  className,
  defaultIndex,
  onChange
}: {
  children: React.ReactNode
  className?: string
  defaultIndex?: number
  onChange?: (index: number) => void
}) {
  return (
    <TabGroup defaultIndex={defaultIndex} onChange={onChange} className={className}>
      {children}
    </TabGroup>
  )
}

function TabsList({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <TabList
      aria-label={label}
      className={cn('scrollbar-none -mx-1 flex gap-1 overflow-x-auto border-b border-line px-1', className)}
    >
      {children}
    </TabList>
  )
}

function TabsTab({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Tab
      className={cn(
        'relative -mb-px shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-[0.9375rem] font-semibold text-ink-subtle transition-colors duration-fast hover:text-ink data-[selected]:border-gold-500 data-[selected]:text-ink',
        className
      )}
    >
      {children}
    </Tab>
  )
}

function TabsPanels({ children, className }: { children: React.ReactNode; className?: string }) {
  return <TabPanels className={cn('pt-8', className)}>{children}</TabPanels>
}

function TabsPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <TabPanel className={cn('rounded-md', className)}>{children}</TabPanel>
}

const Tabs = Object.assign(TabsRoot, { List: TabsList, Tab: TabsTab, Panels: TabsPanels, Panel: TabsPanel })
export default Tabs
