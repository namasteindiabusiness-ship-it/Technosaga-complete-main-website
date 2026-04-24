import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";

// ── Layouts (not lazy — needed immediately) ──
import Layout from "./pages/layout/Layout";
import AdminLayoutNew from "./pages/layout/AdminLayoutNew";
import Loading from "./components/Loading";

// ── Website pages (lazy) ──
const Home = lazy(() => import("./pages/website/Home"));
const ContactPage = lazy(() => import("./pages/website/ContactNew"));
const Career = lazy(() => import("./pages/website/CareerNew"));
const GalleryPage = lazy(() => import("./pages/website/Gallery"));
const ThankYouPage = lazy(() => import("./pages/website/ThankYouAndPopup").then(m => ({ default: m.ThankYouPage })));
// Legacy pages kept for reference
// const ContactPageOld = lazy(() => import("./pages/website/Contact"));
// const CareerOld = lazy(() => import("./pages/website/Career"));
const Blog = lazy(() => import("./pages/website/Blog"));
const Team = lazy(() => import("./pages/website/Teams"));
const BlogDetails = lazy(() => import("./pages/website/BlogDetails"));
const AboutUs = lazy(() => import("./pages/website/AboutUs"));
const WebDesignDevelopment = lazy(
  () => import("./pages/website/WebDesignDevelopment"),
);
const DigitalMarketing = lazy(() => import("./pages/website/DigitalMarketing"));
const BPOService = lazy(() => import("./pages/website/BPOService"));
const AppDevelopment = lazy(() => import("./pages/website/AppDevelopment"));
const GraphicDesign = lazy(() => import("./pages/website/GraphicDesign"));
const NotFound = lazy(() => import("./pages/website/NotFound"));
const JobConsultancy = lazy(() => import("./pages/website/JobConsultancy"));
const EventManagement = lazy(() => import("./pages/website/EventManagement"));
const LiveStreaming = lazy(() => import("./pages/website/LiveStreaming"));
const PoliticalRallies = lazy(() => import("./pages/website/PoliticalRallies"));
const OurWorks = lazy(() => import("./pages/website/Works"));
const PhotoVideoService = lazy(
  () => import("./pages/website/PhotoVideoService"),
);
const Login = lazy(() => import("./pages/auth/Login"));

// ── Admin pages (lazy) ──
const Dashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const BannerList = lazy(() => import("./pages/admin/BannerList"));
const BannerAdd = lazy(() => import("./pages/admin/BannerAdd"));
const MemberList = lazy(() => import("./pages/admin/MemberList"));
const MemberAdd = lazy(() => import("./pages/admin/MemberAdd"));
const PopupList = lazy(() => import("./pages/admin/PopupList"));
const PopupAdd = lazy(() => import("./pages/admin/PopupAdd"));
const GalleryList = lazy(() => import("./pages/admin/GalleryList"));
const GalleryAdd = lazy(() => import("./pages/admin/GalleryAdd"));
const VacancyList = lazy(() => import("./pages/admin/VacancyList"));
const VacancyAdd = lazy(() => import("./pages/admin/VacancyAdd"));
const BlogList = lazy(() => import("./pages/admin/BlogList"));
const BlogCreate = lazy(() => import("./pages/admin/BlogCreate"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const UpdateBlog = lazy(() => import("./components/UpdateBlog"));

export default function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/webs/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* ── Public pages ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/works" element={<OurWorks />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/career" element={<Career />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route
              path="/services/web-design-development"
              element={<WebDesignDevelopment />}
            />
            <Route
              path="/services/digital-marketing"
              element={<DigitalMarketing />}
            />
            <Route path="/services/bpo-services" element={<BPOService />} />
            <Route
              path="/services/graphic-design"
              element={<GraphicDesign />}
            />
            <Route
              path="/services/photo-video-production"
              element={<PhotoVideoService />}
            />
            <Route
              path="/services/app-development"
              element={<AppDevelopment />}
            />
            <Route
              path="/services/job-consultancy"
              element={<JobConsultancy />}
            />
            <Route
              path="/services/event-management"
              element={<EventManagement />}
            />
            <Route
              path="/services/live-streaming"
              element={<LiveStreaming />}
            />
            <Route
              path="/services/political-rallies-events"
              element={<PoliticalRallies />}
            />
          </Route>

          {/* ── Admin pages ── */}
          <Route element={<AdminLayoutNew />}>
            <Route path="/dashboard/home" element={<Dashboard />} />
            <Route path="/dashboard/leads" element={<AdminLeads />} />
            <Route path="/dashboard/services" element={<AdminServices />} />
            <Route path="/dashboard/settings" element={<AdminSettings />} />
            <Route path="/dashboard/banner-list" element={<BannerList />} />
            <Route path="/dashboard/banner-create" element={<BannerAdd />} />
            <Route path="/dashboard/member-list" element={<MemberList />} />
            <Route path="/dashboard/member-create" element={<MemberAdd />} />
            <Route path="/dashboard/popup-list" element={<PopupList />} />
            <Route path="/dashboard/popup-create" element={<PopupAdd />} />
            <Route path="/dashboard/gallery-list" element={<GalleryList />} />
            <Route path="/dashboard/gallery-create" element={<GalleryAdd />} />
            <Route path="/dashboard/vacancy-list" element={<VacancyList />} />
            <Route path="/dashboard/vacancy-create" element={<VacancyAdd />} />
            <Route path="/dashboard/blog-list" element={<BlogList />} />
            <Route path="/dashboard/blog-create" element={<BlogCreate />} />
            <Route
              path="/dashboard/update-blog/:blogId"
              element={<UpdateBlog />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
