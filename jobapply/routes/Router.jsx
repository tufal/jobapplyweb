import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from"../layouts/layout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobsDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Applications from "../pages/Applications";
import SavedJobs from "../pages/SavedJobs";
import ProtectProfile from "../pages/protectprofile";
import CompleteProfile from "../pages/CompleteProfile";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
       
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         <Route element={<ProtectProfile />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Route>
        <Route path="/applications" element={<Applications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
         </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;