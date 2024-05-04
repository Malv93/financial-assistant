type Params = any

const mockData = {
  username: 'Sconosciuto',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate hic obcaecati asperiores ex possimus iste ipsam, commodi consequuntur velit modi nostrum quasi voluptatem voluptatum earum dignissimos fugiat, atque ut labore!'
}

async function getData() {
  const res = await fetch(`${process.env.BE_URL}/data`, { cache: 'no-store' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateMetadata({ params }: Params) {
  return { title: 'Finance page', description: 'Financial Assistant landing page' };
}

export default async function Page({ params }: Params) {
  const data = process.env.MOCK_DATA ? mockData : await getData()

  return (
    <div>
      <main>
        <h1>Ciao {data.username}</h1>
        <h2>Descrizione del portafoglio</h2>
        <p>{data.description}</p>
      </main>

      <footer>
        <p>MM Financial Tools</p>
      </footer>
    </div>
  );
}
