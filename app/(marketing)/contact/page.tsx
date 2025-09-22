export default function ContactPage() {
  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-gray-700">This demo includes a stub contact form route. Add your own service or email integration.</p>
      <form action="/api/contact" method="post" className="mt-6 space-y-3 max-w-lg">
        <input required name="name" placeholder="Your name" className="w-full border rounded px-3 py-2" />
        <input required name="email" placeholder="Email" type="email" className="w-full border rounded px-3 py-2" />
        <textarea required name="message" placeholder="Message" className="w-full border rounded px-3 py-2 h-32"></textarea>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  )
}
