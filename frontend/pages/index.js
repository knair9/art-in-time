// import { useState, useEffect } from 'react';

// export default function Home() {
//   const minYear = 0;
//   const maxYear = 2024;
//   const interval = 10;

//   const [range, setRange] = useState([2010, 2020]); // default 10-year window
//   const [artifacts, setArtifacts] = useState([]);


//   useEffect(() => {
//     const [start, end] = range;

//     const delayDebounce = setTimeout(() => {
//       fetch(`https://2cee4517-367f-42a2-a853-ea6b5692fafd-00-24mm7jzsa4gt5.kirk.replit.dev/api/artifacts?start=${start}&end=${end}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setArtifacts(data);
//       })
//       .catch((err) => console.error('Error fetching:', err));
//     }, 500); // waits 500ms after slider stops

//     return () => clearTimeout(delayDebounce); // cancel if slider moves again quickly
//   }, [range]);
  

//   const handleChange = (e) => {
//     const newStart = parseInt(e.target.value);
//     const newEnd = newStart + interval;

//     if (newEnd <= maxYear) {
//       setRange([newStart, newEnd]);
//     }
//   };

//   return (
//     <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
//       <h1>🖼️ Art Out of Time</h1>
//       <div style={{ marginTop: '2rem' }}>
//         <label>
//           <strong>Years:</strong> {range[0]} – {range[1]}
//         </label>
//         <input
//           type="range"
//           min={minYear}
//           max={maxYear - interval}
//           step={1}
//           value={range[0]}
//           onChange={handleChange}
//           style={{ width: '100%' }}
//         />
//       </div>

//       <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
//         {artifacts.map((artifact, index) => (
//           <img
//           key={artifact.objectID}
//           src={artifact.image}
//           alt={artifact.objectID}
//           onError={(e) => {
//             console.log(`Failed to load image for artifact ${artifact.objectID}`);
//             console.log("Full artifact JSON:", JSON.stringify(artifact, null, 2));
//             // console.log(`Failed to load image: ${artifact.objectID}`);
//             e.target.src = 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg';
//           }}
//           style={{
//             width: 'auto',         // fills the grid cell width
//             height: 'auto',        // keeps aspect ratio
//             maxHeight: '200px',    // cap height to prevent huge images
//             objectFit: 'cover',    // crops excess to fit nicely
//             borderRadius: '8px',   // optional: rounded corners
//           }}
//         />
//           // <img key={artifact.objectID} src={artifact.image} alt={`Artifact ${artifact.objectID}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

export default function Home() {
  const minYear = 0;
  const maxYear = 2024;
  const interval = 10;

  const [range, setRange] = useState([2010, 2020]);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const [start, end] = range;

    const delayDebounce = setTimeout(() => {
      fetch(`https://2cee4517-367f-42a2-a853-ea6b5692fafd-00-24mm7jzsa4gt5.kirk.replit.dev/api/artifacts?start=${start}&end=${end}`)
        .then((res) => res.json())
        .then((data) => {
          setArtifacts(data);
        })
        .catch((err) => console.error('Error fetching:', err));
    }, 300); // Slightly shorter debounce

    return () => clearTimeout(delayDebounce);
  }, [range]);

  const handleChange = (e) => {
    const newStart = parseInt(e.target.value);
    const newEnd = newStart + interval;

    if (newEnd <= maxYear) {
      setRange([newStart, newEnd]);
    }
  };

  return (
    <div style={{ backgroundColor: '#f7efe7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Thicker Green Header */}
      <header style={{
        backgroundColor: '#45633d',
        color: 'white',
        padding: '1.5rem 2rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'left'
      }}>
        Art Out of Time
      </header>

      {/* Main Section Centered Around Timeline */}
      <main style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        {/* Top Images */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {artifacts.slice(0, Math.ceil(artifacts.length / 2)).map((artifact) => (
            <img
              key={artifact.objectID}
              src={artifact.image}
              alt={artifact.objectID}
              onError={(e) => {
                console.log(`Failed to load image for artifact ${artifact.objectID}`);
                e.target.src = 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg';
              }}
              style={{
                height: `${80 + Math.random() * 160}px`,
                maxWidth: '160px',
                objectFit: 'cover',
                transform: `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 6 - 3}deg)`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
          ))}
        </div>

        {/* Center Timeline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <span style={{ fontSize: '0.9rem' }}>{range[0] === 0 ? '8,000 BCE' : range[0]}</span>
          <input
            type="range"
            min={minYear}
            max={maxYear - interval}
            step={1}
            value={range[0]}
            onChange={handleChange}
            style={{
              flexGrow: 1,
              height: '12px',
              borderRadius: '6px',
              background: '#b7492f',
              accentColor: '#b7492f',
              appearance: 'none'
            }}
          />
          <span style={{ fontSize: '0.9rem' }}>{range[1]}</span>
        </div>

        {/* Bottom Images */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          {artifacts.slice(Math.ceil(artifacts.length / 2)).map((artifact) => (
            <img
              key={artifact.objectID}
              src={artifact.image}
              alt={artifact.objectID}
              onError={(e) => {
                console.log(`Failed to load image for artifact ${artifact.objectID}`);
                e.target.src = 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg';
              }}
              style={{
                height: `${80 + Math.random() * 160}px`,
                maxWidth: '160px',
                objectFit: 'cover',
                transform: `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 6 - 3}deg)`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}