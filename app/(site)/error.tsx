'use client'

import { useEffect } from 'react'
import Button, { ButtonLink } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <PageHeader
        title='This page could not be loaded'
        subtitle='Something went wrong on our side. Try again, or go back to the home page. If it keeps happening, tell the school office.'
        actions={
          <>
            <Button variant='secondary' onClick={reset}>
              Try again
            </Button>
            <ButtonLink href='/' variant='inverse'>
              Go to the home page
            </ButtonLink>
            <ButtonLink href='/contact' variant='inverse'>
              Contact the office
            </ButtonLink>
          </>
        }
      />
      {error.digest && (
        <p className='container py-10 text-sm text-ink-subtle'>
          Reference for the office: <code translate='no'>{error.digest}</code>
        </p>
      )}
    </>
  )
}
