import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const {userStore, modalStore} = useStore();

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom:12}} />
          Dairy
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to your Dairy' />
            <Button as={Link} to='/dairies' size='huge' inverted >
              Go to Dairies
            </Button>
          </>
          ):(
            <>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted >
                Login!
              </Button>
              {import.meta.env.DEV &&
                <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted >
                  Register!
                </Button>
              }
              <Button as={Link} to='/dairies' size='huge' inverted >
                Go to Dairies
              </Button>
            </>
          )
          }
        
      </Container>
    </Segment>
  );
})