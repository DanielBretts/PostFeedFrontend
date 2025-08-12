import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { PostsPage } from "./pages/PostsPage";
import { PostsProvider } from "./PostsProvider";
import { SinglePostPage } from "./pages/SinglePostPage";

function App() {
  return (
    <Router>
      <PostsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<SinglePostPage />} />
        </Routes>
      </PostsProvider>
    </Router>
  );
}

export default App;
