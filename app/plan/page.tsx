export const metadata = { title: 'Plan your visit — West Yorkshire Historic Sites' }

export default function PlanPage() {
  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">Plan your visit</h1>
      <div className="prose max-w-none">
        <p>West Yorkshire is well connected by rail and bus. For live travel info see National Rail and local operators. Park &amp; ride is available around Leeds and York (nearby).</p>
        <ul>
          <li>Accessibility: many sites offer step-free routes and accessible toilets.</li>
          <li>Weather: layers and waterproofs recommended; winters can be chilly on exposed sites.</li>
          <li>Tickets: some venues are free; others have seasonal pricing—check their official websites.</li>
        </ul>
      </div>
    </div>
  )
}
