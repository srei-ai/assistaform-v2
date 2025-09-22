import { getSites } from '@/lib/content'
import SearchBar from '@/components/SearchBar'
import Map from '@/components/Map'

export const metadata = { title: 'Sites — West Yorkshire Historic Sites' }

export default function SitesPage() {
  const sites = getSites()
  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">All Sites</h1>
      <p className="text-gray-700 mt-2">Filter and search historic places across West Yorkshire.</p>
      <div className="mt-6">
        <SearchBar sites={sites} />
      </div>
      <div className="mt-10">
        <Map sites={sites} height="520px" />
      </div>
    </div>
  )
}
