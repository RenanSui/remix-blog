import { Icons } from '@/components/icon'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
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
    <main>
      <PageHeader as="header" className="px-4 py-[15px]">
        <PageHeaderHeading className="text-xl md:text-xl">
          Home
        </PageHeaderHeading>
      </PageHeader>
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
  )
}
