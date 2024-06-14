import { Icons } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'Simple Blog built with Remix.' },
  ]
}

export default function Index() {
  return (
    <div>
      <header></header>
      <main className="max-w-[512px]">
        <div className="flex items-center px-4 py-3">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              {/* eslint-disable-next-line react/jsx-pascal-case */}
              <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
