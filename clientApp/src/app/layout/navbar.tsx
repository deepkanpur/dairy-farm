import { Menu, Container, Button, Image, Dropdown, DropdownItem, DropdownMenu, Icon } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../../features/users/LoginForm";

export default observer(function Navbar() {
  const {userStore: {user, logout, isLoggedIn}, modalStore} = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' header >
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
          Dairy
        </Menu.Item>
        <Menu.Item as={NavLink} to="/dairies" name="Dairies" />
        {isLoggedIn && 
        <>
          {(user?.isDataEntryUser || user?.isAdmin || user?.isSalesUser) && 
            <Menu.Item as={NavLink} to="/addDairy"><Icon name='plus'/></Menu.Item> 
          }          
          {import.meta.env.DEV && 
            <Menu.Item as={NavLink} to="/errors" name="Errors" />
          }
          <Menu.Item position='right'>
            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
            <Dropdown pointing='top left' text={user?.displayName}>
            <DropdownMenu>
              <DropdownItem as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user' />
              <DropdownItem onClick={logout} text='logout' icon='power' />
            </DropdownMenu>
            </Dropdown>
          </Menu.Item>
        </>
        }
        { !isLoggedIn &&
          <Menu.Item position='right'>
            <Button onClick={() => modalStore.openModal(<LoginForm />)} positive size='huge' >
                Login!
              </Button>
          </Menu.Item>
        }
      </Container>
    </Menu>
  );
})