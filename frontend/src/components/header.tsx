import { TrendingDownIcon } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <header className='border-b'>
      <div className='flex h-16 items-center gap-6 px-6 bg-black'>
        <img src='/favicon.png' alt='Groil Analyzer' width={48} />
        <Separator orientation='vertical' className='h-6' />
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl">Groil Analyzer </h1>
          <TrendingDownIcon />
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
