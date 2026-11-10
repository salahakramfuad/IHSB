import React, { ViewTransition } from 'react'

/** Transition types added by links between list and detail pages. */
export const NAV_FORWARD = ['nav-forward']
export const NAV_BACK = ['nav-back']

/**
 * Shared element: give the same `name` to an image on a list card and on its
 * detail page and the browser morphs one into the other.
 */
export function SharedElement({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={name} share='vt-morph' default='none'>
      {children}
    </ViewTransition>
  )
}

/**
 * Page-level directional slide for list <-> detail navigation. Wrap the page
 * content (not a layout). Only links that pass NAV_FORWARD / NAV_BACK animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'vt-forward', 'nav-back': 'vt-back', default: 'none' }}
      exit={{ 'nav-forward': 'vt-forward', 'nav-back': 'vt-back', default: 'none' }}
      default='none'
    >
      {children}
    </ViewTransition>
  )
}

/** Stable, CSS-safe view-transition name for a content item. */
export const transitionName = (kind: string, id: string | undefined) =>
  `${kind}-${String(id ?? 'item').replace(/[^a-zA-Z0-9_-]/g, '-')}`
