let fetch = require('node-fetch')
const http = require('http')
const date = new Date().toISOString().split('T')[0]
const key = 'XqrwXIYADrLiVi46kciF8jSmfghnjR1Ylms1xjUa'

const server = http.createServer(async (req, res) => {

  try {

    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${key}`
    )

    if (!response.ok) throw new Error(`NASA API error: ${response.status}`)

    const data = await response.json()
    const asteroids_today = data.near_earth_objects[date] || []

    const info = processAsteroids(asteroids_today)

    if (req.url.includes('/api')) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(info, null, 2))
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(toHTML(info))
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end(`Error: ${error.message}`)
  }
})

function processAsteroids(asteroids_today) {

  const diameters = asteroids_today.map(a =>
    (a.estimated_diameter.kilometers.estimated_diameter_min +
     a.estimated_diameter.kilometers.estimated_diameter_max) / 2
  )

  const num_asteroids = asteroids_today.length

  const average_diameter_km =
    diameters.reduce((sum, d) => sum + d, 0) / num_asteroids

  const biggest_diameter_km = Math.max(...diameters)
  const smallest_diameter_km = Math.min(...diameters)

  return {
    date,
    num_asteroids,
    average_diameter_km: parseFloat(average_diameter_km.toFixed(3)),
    biggest_diameter_km: parseFloat(biggest_diameter_km.toFixed(3)),
    smallest_diameter_km: parseFloat(smallest_diameter_km.toFixed(3))
  }
}

function toHTML(info) {
  return `
    <html>
      <head>
        <title>Near Earth Objects - ${info.date}</title>
      </head>
      <body>
        <h1>Near Earth Objects - ${info.date}</h1>
        <p>Total asteroids: ${info.num_asteroids}</p>
        <p>Average diameter: ${info.average_diameter_km} km</p>
        <p>Biggest asteroid: ${info.biggest_diameter_km} km</p>
        <p>Smallest asteroid: ${info.smallest_diameter_km} km</p>
      </body>
    </html>
  `
}

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})