import { getSites } from '@/lib/content'
import Itinerary from '@/components/Itinerary'

export const metadata = { title: 'Itinerary — West Yorkshire Historic Sites' }

export default function ItineraryPage() {
  const sites = getSites()
  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">Build your day</h1>
      <p className="text-gray-700 mt-2">Add places, then view them on the map. Your selections are saved on this device.</p>
      <div className="mt-6">
        <Itinerary sites={sites} />
      </div>
    </div>
  )
}
