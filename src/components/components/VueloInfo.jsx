  // src/components/VueloInfo.jsx
  import { useEffect, useState } from 'react';

  export default function VueloInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/data/vuelo.json');
          const json = await res.json();
          localStorage.setItem('vueloData', JSON.stringify(json));
          setData(json);
        } catch (error) {
          const cached = localStorage.getItem('vueloData');
          if (cached) setData(JSON.parse(cached));
        }
      };

      fetchData();
    }, []);

    if (!data) return <p>Cargando información del vuelo...</p>;

    const fechaFormateada = new Date(data.fecha).toLocaleString('es-AR', {
      dateStyle: 'full',
      timeStyle: 'short'
    });

    return (
      <div className="vuelo-info">
        <h2>Vuelo: {data.vuelo}</h2>
        <p><strong>Destino:</strong> {data.destino}</p>
        <p><strong>Fecha:</strong> {fechaFormateada}</p>

        <h3>Tripulación</h3>
        <ul>
          {data.tripulacion.map((t, idx) => (
            <li key={idx}>{t.nombre} - {t.rol}</li>
          ))}
        </ul>

        <h3>Pasajeros</h3>
        <ul>
          {data.pasajeros.map((p, idx) => (
            <li key={idx}>
              {p.nombre} - {p.documento}
              {p.pasaporte && ` - Pasaporte: ${p.pasaporte}`}
              {p.visado && ` - Visado: ${p.visado}`}
            </li>
          ))}
        </ul>

        <h3>Trámites</h3>
        <ul>
          {data.tramites.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>

        {data.observaciones && (
          <>
            <h3>Observaciones</h3>
            <p>{data.observaciones}</p>
          </>
        )}
      </div>
    );
  }
