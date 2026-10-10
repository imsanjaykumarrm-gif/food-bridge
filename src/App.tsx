
import { useState } from "react";
import "./App.css";

type Role = "donor" | "recipient";

type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

type Donation = {
  id: number;
  foodName: string;
  quantity: string;
  location: string;
  bestBefore: string;
  donorEmail: string;
};

const initialDonations: Donation[] = [];

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<Role>("donor");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [donations, setDonations] =
    useState<Donation[]>(initialDonations);

  const [donationOpen, setDonationOpen] = useState(false);
  const [donationMessage, setDonationMessage] = useState("");

  const [donationForm, setDonationForm] = useState({
    foodName: "",
    quantity: "",
    location: "",
    bestBefore: "",
  });

  function openAuth(mode: "login" | "register", role: Role = "donor") {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthOpen(true);
    setAuthError("");
    setAuthSuccess("");
    setAuthForm({ name: "", email: "", password: "" });
    setDonationOpen(false);
  }

  function handleAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password;

    if (!email || !password) {
      setAuthError("Please enter your email and password.");
      return;
    }

    if (authMode === "register") {
      if (!authForm.name.trim()) {
        setAuthError("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setAuthError("Your password must be at least 6 characters.");
        return;
      }

      if (users.some((user) => user.email === email)) {
        setAuthError(
          "An account with this email already exists. Please log in."
        );
        return;
      }

      const newUser: User = {
        name: authForm.name.trim(),
        email,
        password,
        role: authRole,
      };

      setUsers((previousUsers) => [...previousUsers, newUser]);
      setCurrentUser(newUser);
      setAuthOpen(false);
      setAuthError("");
      setAuthSuccess("");
      setAuthForm({ name: "", email: "", password: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const matchingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === authRole
    );

    if (!matchingUser) {
      setAuthError(
        "We couldn't find a matching account. Check your details or register first."
      );
      return;
    }

    setCurrentUser(matchingUser);
    setAuthOpen(false);
    setAuthForm({ name: "", email: "", password: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    setCurrentUser(null);
    setAuthOpen(false);
    setDonationOpen(false);
    setDonationMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDonationForm() {
    if (!currentUser) {
      openAuth("login", "donor");
      setAuthError("Please log in as a donor to share food.");
      return;
    }

    if (currentUser.role !== "donor") {
      setDonationMessage(
        "This feature is for donor accounts. Log in with a donor account to share food."
      );
      return;
    }

    setDonationMessage("");
    setDonationOpen(true);
    setDonationForm({
      foodName: "",
      quantity: "",
      location: "",
      bestBefore: "",
    });
  }

  function handleDonationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser || currentUser.role !== "donor") {
      setDonationMessage("Please log in with a donor account first.");
      return;
    }

    const newDonation: Donation = {
      id: Date.now(),
      foodName: donationForm.foodName.trim(),
      quantity: donationForm.quantity.trim(),
      location: donationForm.location.trim(),
      bestBefore: donationForm.bestBefore,
      donorEmail: currentUser.email,
    };

    setDonations((previousDonations) => [
      newDonation,
      ...previousDonations,
    ]);

    setDonationOpen(false);
    setDonationMessage("Your food donation has been added successfully!");
    setDonationForm({
      foodName: "",
      quantity: "",
      location: "",
      bestBefore: "",
    });
  }

  function handleAuthFieldChange(
    field: "name" | "email" | "password",
    value: string
  ) {
    setAuthForm((previous) => ({ ...previous, [field]: value }));
    setAuthError("");
  }

  function handleDonationFieldChange(
    field: "foodName" | "quantity" | "location" | "bestBefore",
    value: string
  ) {
    setDonationForm((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="FoodBridge home">
          <span className="brand-icon">🥗</span>
          <span>
            Food<span className="brand-highlight">Bridge</span>
          </span>
        </a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#donations">Available Food</a>
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <>
              <span className="header-user">
                Hi, {currentUser.name.split(" ")[0]}
              </span>
              <button className="button button-outline button-small" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="button button-plain"
                onClick={() => openAuth("login")}
              >
                Log in
              </button>
              <button
                className="button button-primary button-small"
                onClick={() => openAuth("register")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">GOOD FOOD. LESS WASTE. MORE HOPE.</span>
            <h1>
              Share food.
              <br />
              <span>Spread kindness.</span>
            </h1>
            <p className="hero-description">
              FoodBridge connects people with surplus food to communities
              that need it. Together, we can reduce food waste and make
              every meal count.
            </p>

            {currentUser ? (
              <div className="welcome-panel">
                <span className="welcome-icon">👋</span>
                <div>
                  <strong>Welcome, {currentUser.name}!</strong>
                  <p>
                    You are signed in as a{" "}
                    {currentUser.role === "donor" ? "Donor" : "Recipient"}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hero-actions">
                <button
                  className="button button-primary button-large"
                  onClick={() => openAuth("register", "donor")}
                >
                  I have surplus food <span aria-hidden="true">→</span>
                </button>
                <button
                  className="button button-outline button-large"
                  onClick={() => openAuth("register", "recipient")}
                >
                  I need food
                </button>
              </div>
            )}

            <div className="hero-note">
              <span className="note-check">✓</span>
              Small acts of sharing make a big difference.
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of fresh food">
            <div className="art-circle art-circle-back" />
            <div className="art-card">
              <div className="art-food">🥑</div>
              <div className="art-food art-food-small">🥕</div>
              <div className="art-food art-food-bottom">🍎</div>
              <div className="art-plate">
                <span>🥬</span>
                <span>🥦</span>
                <span>🥒</span>
                <span>🍅</span>
                <span>🌽</span>
              </div>
            </div>
            <div className="floating-label floating-top">♻️ Less waste</div>
            <div className="floating-label floating-bottom">💚 More care</div>
          </div>
        </section>

        <section className="impact-strip">
          <div className="impact-item">
            <span className="impact-icon">🌎</span>
            <div>
              <strong>Reduce food waste</strong>
              <p>Give good food a second chance.</p>
            </div>
          </div>
          <div className="impact-item">
            <span className="impact-icon">🤝</span>
            <div>
              <strong>Support communities</strong>
              <p>Connect people through sharing.</p>
            </div>
          </div>
          <div className="impact-item">
            <span className="impact-icon">💚</span>
            <div>
              <strong>Make an impact</strong>
              <p>Every contribution matters.</p>
            </div>
          </div>
        </section>

        {currentUser && (
          <section className="dashboard-section" id="dashboard">
            <div className="section-heading">
              <span className="eyebrow">YOUR FOodBRIDGE SPACE</span>
              <h2>Your dashboard</h2>
              <p>Welcome back, {currentUser.name}. Here is how you can help.</p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-avatar">
                {currentUser.role === "donor" ? "🍲" : "🧺"}
              </div>
              <div className="dashboard-copy">
                <span className="role-chip">
                  {currentUser.role === "donor" ? "Donor account" : "Recipient account"}
                </span>
                <h3>
                  {currentUser.role === "donor"
                    ? "Share your surplus food"
                    : "Find food shared by your community"}
                </h3>
                <p>
                  {currentUser.role === "donor"
                    ? "List safe, usable food so someone nearby can benefit from it."
                    : "Browse the food currently listed by donors and check pickup details."}
                </p>
              </div>
              {currentUser.role === "donor" ? (
                <button
                  className="button button-primary"
                  onClick={openDonationForm}
                >
                  Add a donation
                </button>
              ) : (
                <a className="button button-primary" href="#donations">
                  Browse food
                </a>
              )}
            </div>
          </section>
        )}

        {donationMessage && (
          <div className="site-message" role="status">
            <span>{donationMessage}</span>
            <button
              className="message-close"
              aria-label="Dismiss message"
              onClick={() => setDonationMessage("")}
            >
              ×
            </button>
          </div>
        )}

        {donationOpen && currentUser?.role === "donor" && (
          <section className="form-section" id="donation-form">
            <div className="form-card">
              <div className="form-heading">
                <span className="eyebrow">SHARE SOMETHING GOOD</span>
                <h2>Add a food donation</h2>
                <p>Tell your community what food you have available.</p>
              </div>
              <form onSubmit={handleDonationSubmit} className="stacked-form">
                <label>
                  Food name
                  <input
                    value={donationForm.foodName}
                    onChange={(event) =>
                      handleDonationFieldChange("foodName", event.target.value)
                    }
                    placeholder="e.g. Fresh vegetables"
                    required
                  />
                </label>
                <label>
                  Quantity
                  <input
                    value={donationForm.quantity}
                    onChange={(event) =>
                      handleDonationFieldChange("quantity", event.target.value)
                    }
                    placeholder="e.g. 5 meal boxes"
                    required
                  />
                </label>
                <label>
                  Pickup location
                  <input
                    value={donationForm.location}
                    onChange={(event) =>
                      handleDonationFieldChange("location", event.target.value)
                    }
                    placeholder="Enter the pickup area"
                    required
                  />
                </label>
                <label>
                  Best-before date or pickup deadline
                  <input
                    type="date"
                    value={donationForm.bestBefore}
                    onChange={(event) =>
                      handleDonationFieldChange("bestBefore", event.target.value)
                    }
                    required
                  />
                </label>
                <div className="form-buttons">
                  <button className="button button-primary" type="submit">
                    Publish donation
                  </button>
                  <button
                    className="button button-outline"
                    type="button"
                    onClick={() => setDonationOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">SIMPLE STEPS, REAL IMPACT</span>
            <h2>How FoodBridge works</h2>
            <p>It only takes a few steps to turn extra food into a good deed.</p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <div className="step-number">01</div>
              <div className="step-emoji">📝</div>
              <h3>Create an account</h3>
              <p>Register as a donor or recipient to get started.</p>
            </article>
            <article className="step-card">
              <div className="step-number">02</div>
              <div className="step-emoji">🥕</div>
              <h3>Share or discover</h3>
              <p>Donors list extra food and recipients browse what's available.</p>
            </article>
            <article className="step-card">
              <div className="step-number">03</div>
              <div className="step-emoji">💚</div>
              <h3>Make a difference</h3>
              <p>Help food reach people instead of going to waste.</p>
            </article>
          </div>
        </section>

        <section className="donations-section" id="donations">
          <div className="donations-heading">
            <div className="section-heading section-heading-left">
              <span className="eyebrow">COMMUNITY FOOD BOARD</span>
              <h2>Available donations</h2>
              <p>Food listings added during this session appear here.</p>
            </div>
            {currentUser?.role === "donor" && (
              <button
                className="button button-primary"
                onClick={openDonationForm}
              >
                + Add food
              </button>
            )}
          </div>

          {donations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🧺</div>
              <h3>Be the first to share</h3>
              <p>
                There are no food listings yet. A donor can add the first
                donation and help start the chain of kindness.
              </p>
              <button
                className="button button-primary"
                onClick={() =>
                  currentUser?.role === "donor"
                    ? openDonationForm()
                    : openAuth("register", "donor")
                }
              >
                Share food
              </button>
            </div>
          ) : (
            <div className="donations-grid">
              {donations.map((donation) => (
                <article className="donation-card" key={donation.id}>
                  <div className="donation-card-icon">🥗</div>
                  <span className="available-chip">Available</span>
                  <h3>{donation.foodName}</h3>
                  <p className="donation-quantity">{donation.quantity}</p>
                  <div className="donation-detail">
                    <span>📍</span> {donation.location}
                  </div>
                  <div className="donation-detail">
                    <span>📅</span> Deadline: {donation.bestBefore}
                  </div>
                  <p className="donation-owner">
                    Listed by a FoodBridge donor
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="cta-section">
          <div>
            <span className="eyebrow">BE PART OF THE CHANGE</span>
            <h2>Good things happen when we share.</h2>
            <p>Join FoodBridge and help build a community with less waste.</p>
          </div>
          {!currentUser && (
            <button
              className="button button-light button-large"
              onClick={() => openAuth("register")}
            >
              Join FoodBridge <span aria-hidden="true">→</span>
            </button>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">🥗</span>
          <span>
            Food<span className="brand-highlight">Bridge</span>
          </span>
        </a>
        <p>Bringing people together, one meal at a time.</p>
        <span className="footer-copy">© {new Date().getFullYear()} FoodBridge</span>
      </footer>

      {authOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setAuthOpen(false);
            }
          }}
        >
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <button
              className="modal-close"
              onClick={() => setAuthOpen(false)}
              aria-label="Close form"
            >
              ×
            </button>

            <div className="auth-brand-icon">🥗</div>
            <span className="eyebrow">WELCOME TO FOODBRIDGE</span>
            <h2 id="auth-title">
              {authMode === "register" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="auth-subtitle">
              {authMode === "register"
                ? "Join the community and help food reach those who need it."
                : "Log in to continue making a difference."}
            </p>

            <div className="auth-tabs">
              <button
                className={authMode === "register" ? "auth-tab active" : "auth-tab"}
                onClick={() => {
                  setAuthMode("register");
                  setAuthError("");
                  setAuthSuccess("");
                }}
              >
                Register
              </button>
              <button
                className={authMode === "login" ? "auth-tab active" : "auth-tab"}
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                  setAuthSuccess("");
                }}
              >
                Log in
              </button>
            </div>

            <form className="stacked-form auth-form" onSubmit={handleAuthSubmit}>
              {authMode === "register" && (
                <label>
                  Full name
                  <input
                    autoComplete="name"
                    value={authForm.name}
                    onChange={(event) =>
                      handleAuthFieldChange("name", event.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  value={authForm.email}
                  onChange={(event) =>
                    handleAuthFieldChange("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  autoComplete={
                    authMode === "register" ? "new-password" : "current-password"
                  }
                  value={authForm.password}
                  onChange={(event) =>
                    handleAuthFieldChange("password", event.target.value)
                  }
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </label>

              <div className="role-picker">
                <span className="role-picker-label">I want to join as a</span>
                <div className="role-options">
                  <button
                    type="button"
                    className={authRole === "donor" ? "role-option selected" : "role-option"}
                    onClick={() => setAuthRole("donor")}
                  >
                    <span>🍲</span>
                    <strong>Donor</strong>
                    <small>Share extra food</small>
                  </button>
                  <button
                    type="button"
                    className={authRole === "recipient" ? "role-option selected" : "role-option"}
                    onClick={() => setAuthRole("recipient")}
                  >
                    <span>🧺</span>
                    <strong>Recipient</strong>
                    <small>Find available food</small>
                  </button>
                </div>
              </div>

              {authError && (
                <div className="form-alert form-alert-error" role="alert">
                  {authError}
                </div>
              )}

              {authSuccess && (
                <div className="form-alert form-alert-success" role="status">
                  {authSuccess}
                </div>
              )}

              <button className="button button-primary auth-submit" type="submit">
                {authMode === "register" ? "Create account" : "Log in"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">
              {authMode === "register"
                ? "Already have an account?"
                : "New to FoodBridge?"}{" "}
              <button
                onClick={() => {
                  setAuthMode(authMode === "register" ? "login" : "register");
                  setAuthError("");
                  setAuthSuccess("");
                }}
              >
                {authMode === "register" ? "Log in" : "Create an account"}
              </button>
            </p>

            <p className="demo-note">
              Demo version: accounts are temporary and are cleared when the
              page is refreshed.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
