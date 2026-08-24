// src/components/SizeChartModal.jsx
function SizeChartModal({ onClose }) {
  const sizeData = [
    { size: 'S', chest: '36-38', waist: '30-32', length: '27' },
    { size: 'M', chest: '39-41', waist: '33-35', length: '28' },
    { size: 'L', chest: '42-44', waist: '36-38', length: '29' },
    { size: 'XL', chest: '45-47', waist: '39-41', length: '30' },
    { size: 'XXL', chest: '48-50', waist: '42-44', length: '31' },
  ]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#F3F1EA',
          padding: '32px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Rye, serif', color: '#161412', fontSize: '20px' }}>Size Chart</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#161412' }}
          >
            ✕
          </button>
        </div>

        <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '16px' }}>
          All measurements in inches. For the best fit, measure a similar item you already own.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#161412' }}>
              <th style={{ padding: '10px', color: '#F3F1EA', textAlign: 'left', fontSize: '13px' }}>Size</th>
              <th style={{ padding: '10px', color: '#F3F1EA', textAlign: 'left', fontSize: '13px' }}>Chest</th>
              <th style={{ padding: '10px', color: '#F3F1EA', textAlign: 'left', fontSize: '13px' }}>Waist</th>
              <th style={{ padding: '10px', color: '#F3F1EA', textAlign: 'left', fontSize: '13px' }}>Length</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row, i) => (
              <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#EAE6DC' }}>
                <td style={{ padding: '10px', fontWeight: '600', fontSize: '13px' }}>{row.size}</td>
                <td style={{ padding: '10px', fontSize: '13px' }}>{row.chest}</td>
                <td style={{ padding: '10px', fontSize: '13px' }}>{row.waist}</td>
                <td style={{ padding: '10px', fontSize: '13px' }}>{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SizeChartModal