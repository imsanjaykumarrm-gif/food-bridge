import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">F</span>
          <span>FoodBridge</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#how">How it works</a>
          <a href="#impact">Our impact</a>
          <a href="#mission">Our mission</a>
          <a className="nav-button" href="#get-started">Get started ↗️</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot" />
              LESS WASTE. MORE MEALS.
            </div>

            <h1>
              Good food.
              <br />
              <span>Better journeys.</span>
              <br />
              Brighter futures.
            </h1>

            <p className="hero-description">
              Every meal deserves a destination. FoodBridge connects surplus
              food with communities that need it, by making every pickup count.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#get-started">
                Bridge the gap <span>↗️</span>
              </a>
              <a className="secondary-button" href="#how">
                Discover how it works <span>↓</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon">✳️</span>
              Small donations. Smarter trips. Greater impact.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="food-card food-card-top">
              <span className="food-emoji">🥖</span>
              <div>
                <strong>Freshly baked</strong>
                <small>Bakery · 8 meals</small>
              </div>
              <span className="status-dot" />
            </div>

            <div className="bridge-illustration">
              <div className="bridge-sun">✳️</div>
              <div className="bridge-path path-back" />
              <div className="bridge-path path-front" />
              <div className="bridge-pin pin-left">♧</div>
              <div className="bridge-pin pin-right">♥️</div>
              <div className="bridge-center">↗️</div>
            </div>

            <div className="food-card food-card-bottom">
              <span className="food-emoji">🍱</span>
              <div>
                <strong>Meals on the way</strong>
                <small>Community kitchen · 24 meals</small>
              </div>
              <span className="status-label">Matched</span>
            </div>

            <div className="visual-caption">
              <span>01</span> DONATION <span className="caption-line" /> PICKUP
              <span className="caption-line" /> DELIVERY <span>03</span>
            </div>
          </div>
        </section>

        <section className="impact-strip" id="impact">
          <div className="impact-intro">
            <span className="section-kicker">WHY FOODBRIDGE?</span>
            <p>Making every meal matter.</p>
          </div>
          <div className="impact-stat">
            <strong>15</strong>
            <span>Potential local donors</span>
          </div>
          <div className="impact-stat">
            <strong>1.5<span> km</span></strong>
            <span>Local pickup radius</span>
          </div>
          <div className="impact-stat">
            <strong>80</strong>
            <span>People to support daily</span>
          </div>
        </section>

        <section className="how-section" id="how">
          <div className="section-heading">
            <span className="section-kicker">A SMARTER WAY TO SHARE</span>
            <h2>It’s not just about the food.<br />It’s about the journey.</h2>
            <p>We bring small donations together to make one worthwhile trip.</p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01 / COLLECT</span>
              <div className="step-icon">♧</div>
              <h3>Gather the good</h3>
              <p>Nearby bakeries, restaurants and hostels list their surplus meals.</p>
            </article>

            <article className="step-card featured-step">
              <span className="step-number">02 / OPTIMIZE</span>
              <div className="step-icon">⌁</div>
              <h3>Make the trip count</h3>
              <p>FoodBridge groups nearby donations into practical pickup routes.</p>
            </article>

            <article className="step-card">
              <span className="step-number">03 / DELIVER</span>
              <div className="step-icon">♡</div>
              <h3>Reach those in need</h3>
              <p>Coordinated pickups help food reach community partners in time.</p>
            </article>
          </div>
        </section>

        <section className="mission-section" id="mission">
          <div>
            <span className="section-kicker">OUR BELIEF</span>
            <h2>A small donation<br />can make a big difference.</h2>
          </div>
          <p>
            Food should feed people, not go to waste. By focusing on smarter
            journeys instead of isolated pickups, we help turn surplus into
            shared opportunity.
          </p>
        </section>

        <section className="get-started" id="get-started">
          <span className="section-kicker">BE PART OF THE BRIDGE</span>
          <h2>There’s room for everyone<br />at this table.</h2>
          <p>Whether you have food to share or people to support, start here.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => alert('Donor registration will be added in the next phase.')}>
              I have surplus food ↗️
            </button>
            <button className="light-button" onClick={() => alert('NGO and volunteer registration will be added in the next phase.')}>
              I want to help ↗️
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">F</span>
          <span>FoodBridge</span>
        </a>
        <p>Good food deserves a good journey.</p>
        <span>Built for a future with less food waste.</span>
      </footer>
    </div>
  )
}

export default App