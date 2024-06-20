import { ReactQueryProvider } from './react-query-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  )
}
