import React, { Component } from 'react';
import Backdrop from '../../UI/BackDrop/BackDrop';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.css';

class Drawer extends Component {

  handleClick = () => {
    this.props.onClose()
  };

  renderList = (links) => {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [
      classes.Drawer
    ]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [{ to: "/", label: "Quiz List", exact: true }];
    
    if (this.props.isAuth) {
      links.push({ to: "/quizcreator", label: "Create Quiz", exact: false })
      links.push({ to: "/logout", label: 'Log out', exact: false})
    } else {
      links.push({ to: "/auth", label: "Authorization", exact: false },)
    }
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderList(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
      </>
    )
  }
}

export default Drawer;