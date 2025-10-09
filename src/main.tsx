import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

import AuthPage from '@/pages/Auth';
import AccountPage from '@/pages/Account';

// inside <Routes>
<Route path="/auth" element={<AuthPage />} />
<Route path="/account" element={<AccountPage />} />
