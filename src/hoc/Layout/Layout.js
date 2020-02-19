import React, { Component } from 'react';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {

  state = {
    menu: false
  }

  onToggleHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  onCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer 
          isOpen={this.state.menu}
          onClose={this.onCloseHandler}
          isAuth={this.props.isAuth}
        />

        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.onToggleHandler}
        />


        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);