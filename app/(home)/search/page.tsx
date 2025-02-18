export default function SearchResults({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Search Results</h1>
      <p>You searched for: {searchParams.q}</p>
      {/* Here you would typically fetch and display actual search results */}
    </div>
  )
}

