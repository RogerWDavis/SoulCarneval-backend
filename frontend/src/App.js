import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext"; 
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import BackgroundCarousel from "./components/BackgroundCarousel.js";
import Review from "./pages/Reviews/Review";
import ReviewCreateForm from "./pages/Reviews/ReviewCreateForm";
import ReviewEditForm from "./pages/Reviews/ReviewEditForm";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import ReviewPage from "./pages/Reviews/ReviewPage";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

function App() {
  const currentUser = useCurrentUser(); // Use the useCurrentUser hook to access current user data
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (<PostsPage message="No results found. Adjust the search keyword." />)} />
          <Route exact path="/feed" render={() => (<PostsPage message="No results found. Adjust the search keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />)} />
          <Route exact path="/liked" render={() => (<PostsPage message="No results found. Adjust the search keyword or like a post." filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />)} />
          <Route exact path="/signin" render={() => (<SignInForm />)} />
          <Route exact path="/signup" render={() => (<SignUpForm />)} />
          <Route exact path="/posts/create" render={() => (<PostCreateForm />)} />
          <Route exact path="/posts/:id" render={() => (<PostPage />)} />
          <Route exact path="/posts/:id/edit" render={() => (<PostEditForm />)} />
          <Route exact path="/profiles/:id" render={() => (<ProfilePage />)} />
          <Route exact path="/profiles/:id/edit/username" render={() => (<UsernameForm />)} />
          <Route exact path="/profiles/:id/edit/password" render={() => (<UserPasswordForm />)} />
          <Route exact path="/profiles/:id/edit" render={() => (<ProfileEditForm />)} />
          <Route exact path="/reviews/new" render={() => <ReviewCreateForm />} />
          <Route exact path="/reviews/create" render={() => (<ReviewCreateForm />)} />
          <Route exact path="/reviews/:id" render={() => (<ReviewPage />)} />
          <Route exact path="/reviews/:id/edit" render={() => (<ReviewEditForm />)} />
          <Route exact path="/reviews" render={() => (<ReviewsPage />)} />
          <Route exact path="/profiles/:id/reviews" render={() => (<ReviewsPage />)} />
          <Route render={() => (<p>Page not found!</p>)} />
        </Switch>
      </Container>
    </div>
  );
}

const AppWithContextProviders = () => {
  return (
    <CurrentUserProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  );
};

export default AppWithContextProviders;
