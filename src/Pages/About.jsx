import React from 'react';

function About() {
  return (
    <div style={{ backgroundColor: '#F3F1EA' }}>

      {/* Hero Section — gradient background */}
      <div style={{
        padding: '80px 40px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #f9d43fe0 0%, #f3efea 100%)',
        borderBottom: '1px solid #e0ddd6'
      }}>
        <img
          src="/updatedlogo.png"
          alt="Hott Stuffz"
          style={{ width: '180px', marginBottom: '32px' }}
        />
        <h1 style={{
          fontFamily: 'Rye, serif',
          fontSize: '36px',
          color: '#A31621',
          marginBottom: '20px',
          letterSpacing: '2px'
        }}>
          Our Story
        </h1>
        <p style={{
          color: '#4A4540',
          fontSize: '16px',
          lineHeight: '1.9',
          maxWidth: '650px',
          margin: '0 auto'
        }}>
          We're two engineering students from Karnataka who got tired of seeing guys struggle to find outfits that actually look good without breaking the bank. So we built Hott Stuffz — a men's fashion brand that brings celebrity-level style to everyday guys. No rentals, no waiting. Just fresh fits, ready to wear, right now.
        </p>
      </div>

      {/* Meet the Team */}
      <div style={{
        padding: '80px 40px',
        background: 'linear-gradient(180deg, #F3F1EA 0%, #EDE8DF 100%)'
      }}>
        <h2 style={{
          fontFamily: 'Rye, serif',
          fontSize: '28px',
          color: '#161412',
          textAlign: 'center',
          marginBottom: '60px',
          letterSpacing: '2px'
        }}>
          Meet the Team
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          maxWidth: '860px',
          margin: '0 auto'
        }}>

          {/* Akash */}
          <div style={{
            background: 'linear-gradient(160deg, #FFF5F5 0%, #FFE8E8 100%)',
            padding: '48px 32px',
            textAlign: 'center',
            borderTop: '4px solid #A31621',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              backgroundColor: '#F3F1EA',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid #A31621',
              fontSize: '52px',
              overflow: 'hidden'
            }}>
              👤
            </div>
            <h3 style={{
              fontFamily: 'Rye, serif',
              fontSize: '22px',
              color: '#161412',
              marginBottom: '8px'
            }}>
              Akash Gadigi
            </h3>
            <p style={{
              color: '#A31621',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontWeight: '600'
            }}>
              Founder
            </p>
            <p style={{
              color: '#4A4540',
              fontSize: '13px',
              marginBottom: '28px'
            }}>
              CS Engineering Student
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {/* LinkedIn Logo Button */}
              <a
                href="https://www.linkedin.com/in/g-akash-6b4aa7311/"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#0077B5',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '20px'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram Logo Button */}
              <a
                href="https://www.instagram.com/aaakash._.27?igsh=MWo1NTBlYm5wenZpMQ=="
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sanjay */}
          <div style={{
            background: 'linear-gradient(160deg, #F0F5FF 0%, #E8EFFF 100%)',
            padding: '48px 32px',
            textAlign: 'center',
            borderTop: '4px solid #A31621',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              backgroundColor: '#F3F1EA',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid #A31621',
              fontSize: '52px',
              overflow: 'hidden'
            }}>
              👤
            </div>
            <h3 style={{
              fontFamily: 'Rye, serif',
              fontSize: '22px',
              color: '#161412',
              marginBottom: '8px'
            }}>
              Sanjay Yogi
            </h3>
            <p style={{
              color: '#A31621',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontWeight: '600'
            }}>
              Partner
            </p>
            <p style={{
              color: '#4A4540',
              fontSize: '13px',
              marginBottom: '28px'
            }}>
              Engineering Student
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {/* LinkedIn Logo Button */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#0077B5',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Instagram Logo Button */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: '#ffffff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div style={{
        padding: '60px 40px',
        background: 'linear-gradient(180deg, #161412 0%, #1C1917 100%)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'Rye, serif',
          fontSize: '28px',
          color: '#F3F1EA',
          marginBottom: '16px'
        }}>
          Get In Touch
        </h2>
        <p style={{
          color: '#A8A29E',
          fontSize: '15px',
          marginBottom: '32px'
        }}>
          Questions, feedback, or just want to say hi?
        </p>
        <a
          href="mailto:hottstuffz.hs@gmail.com"
          style={{
            color: '#A31621',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '24px'
          }}
        >
          hottstuffz.hs@gmail.com
        </a>
        <a
          href="https://www.instagram.com/hott_stuffz_?igsh=MTd5dnlrcm1hMHEyNg=="
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            color: '#ffffff',
            padding: '12px 32px',
            fontSize: '14px',
            fontFamily: 'Work Sans, sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Follow on Instagram
        </a>
      </div>

      {/* Collaboration Section */}
      <div style={{
        padding: '80px 40px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #EDE8DF 0%, #F3F1EA 100%)'
      }}>
        <h2 style={{
          fontFamily: 'Rye, serif',
          fontSize: '28px',
          color: '#161412',
          marginBottom: '16px'
        }}>
          Open for Collaborations 🔥
        </h2>
        <p style={{
          color: '#4A4540',
          fontSize: '15px',
          lineHeight: '1.8',
          maxWidth: '500px',
          margin: '0 auto 32px'
        }}>
          Are you a brand, photographer, content creator or stylist? We'd love to collaborate. Let's create something great together.
        </p>
        <a
          href="mailto:hottstuffz.hs@gmail.com"
          style={{
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            padding: '14px 40px',
            fontSize: '14px',
            fontFamily: 'Work Sans, sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Let's Collaborate
        </a>
      </div>

    </div>
  );
}

export default About;