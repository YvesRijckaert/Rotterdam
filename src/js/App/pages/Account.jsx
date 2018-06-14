import React, { Component } from "react";
import { app, base } from "../config/fire.js";
import { StatusContext } from "../context/statusContext.js";
import Nav from "../components/Nav.jsx";
import Caption from "../components/Caption.jsx";
import { Link } from "react-router-dom";
import "../css/Account.css";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captions: []
    };
  }

  componentDidMount = () => {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        const userid = app.auth().currentUser.uid;
        base.syncState(`captions/${userid}`, {
          context: this,
          state: "captions",
          asArray: true
        });
      }
    });
  };

  render() {
    return (
      <StatusContext.Consumer>
        {({ authenticated }) =>
          authenticated ? (
            <main className="two-sec-page-account">
              <h1 className="page-title page-title-account">Mijn Account</h1>
              <Nav classname="account-nav" />
              <section className="section-left section-left-account">
                <h2 className="page-subtitle section-left-subtitle">
                  Mijn awards
                </h2>
                <form>
                  <label className="section-left-label">Offline code</label>
                  <input
                    name="offlinecode"
                    type="text"
                    ref={input => {
                      this.offlinecodeInput = input;
                    }}
                    className="section-left-input"
                  />
                </form>
                <ul className="section-left-awards">
                  <li className="section-left-award">1/10</li>
                  <li className="section-left-award">0/25</li>
                  <li className="section-left-award">0/30</li>
                  <li className="section-left-award">0/100</li>
                  <li className="section-left-award">9/100</li>
                  <li className="section-left-award">1/150</li>
                  <li className="section-left-award">1/150</li>
                  <li className="section-left-award">12/150</li>
                  <li className="section-left-award">11/150</li>
                </ul>
              </section>
              <section className="section-right section-right-account">
                <h2 className="page-subtitle section-right-subtitle">
                  Mijn captions
                </h2>
                <p className="section-right-account-numberupvotes">
                  58 upvotes
                </p>
                <p className="section-right-account-numbercaptions">
                  {this.state.captions.length} captions
                </p>
                <div className="section-right-account-captions">
                  {this.state.captions.map(caption => (
                    <Caption
                      caption={caption}
                      userName={caption.userName}
                      deleteOption="true"
                    />
                  ))}
                </div>
              </section>
            </main>
          ) : (
            <main className="two-sec-page-account">
              <h1 className="page-title page-title-account">Mijn Account</h1>
              <Nav classname="account-nav" />
              <section className="section-left section-left-account section-left-account-not-signed-in">
                <Link
                  className="page-subtitle section-left-subtitle"
                  to="/login"
                >
                  Login
                </Link>
              </section>
              <section className="section-right section-right-account section-right-account-not-signed-in">
                <Link
                  className="page-subtitle section-left-subtitle"
                  to="/register"
                >
                  Registreer
                </Link>
              </section>
            </main>
          )
        }
      </StatusContext.Consumer>
    );
  }
}

export default Account;
