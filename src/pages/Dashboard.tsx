import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { User, LogOut, Home, BarChart2, Settings, Briefcase, Award, Calendar, BookOpen, TrendingUp, Linkedin, MapPin, GraduationCap, Moon, Bell } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
  { label: "Stats", icon: BarChart2, to: "/dashboard/stats" },
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

export function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Welcome Card */}
      <div className="col-span-1 bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl shadow-lg p-8 flex flex-col items-center text-white">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-3 border-4 border-white/30">
          {user?.firstName[0]}{user?.lastName[0]}
        </div>
        <div className="text-xl font-semibold mb-1">Welcome, {user?.firstName}!</div>
        <div className="text-sm opacity-90 mb-2">Your premium dashboard</div>
        <div className="flex gap-2 mt-2">
          <Award className="w-5 h-5" /> <span>Top Student</span>
        </div>
      </div>
      {/* Upcoming Interview Card */}
      <div className="col-span-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
        <Briefcase className="w-10 h-10 text-blue-500 mb-2" />
        <div className="text-lg font-semibold text-gray-900 mb-1">Upcoming Interview</div>
        <div className="text-gray-600 mb-2">TCS - 12th July, 10:00 AM</div>
        <Button variant="outline" className="mt-2">View Details</Button>
      </div>
      {/* Placement Stats Card */}
      <div className="col-span-1 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
        <TrendingUp className="w-10 h-10 text-green-600 mb-2" />
        <div className="text-3xl font-bold text-green-700 mb-1">92%</div>
        <div className="text-lg font-medium text-gray-700">Placement Rate</div>
      </div>
      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500" /> Recent Activity</h3>
        <ul className="divide-y divide-gray-100">
          <li className="py-2 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="font-medium">Mock Interview Completed</span>
            <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
          </li>
          <li className="py-2 flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Solved 5 Aptitude Questions</span>
            <span className="ml-auto text-xs text-gray-400">Today</span>
          </li>
          <li className="py-2 flex items-center gap-3">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Badge Earned: Consistency</span>
            <span className="ml-auto text-xs text-gray-400">Yesterday</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
export function DashboardProfile() {
  const { user } = useAuth();
  // Dummy data
  const branch = "Computer Science";
  const year = "3rd Year";
  const location = "Delhi, India";
  const linkedin = "https://linkedin.com/in/yourprofile";
  const bio = "Passionate about coding, problem-solving, and building impactful products. Always eager to learn new technologies and crack the next big challenge!";
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
          {user?.firstName[0]}{user?.lastName[0]}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{user?.firstName} {user?.lastName}</div>
          <div className="text-gray-500 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> {branch} ({year})</div>
          <div className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> {location}</div>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3"><span className="font-medium w-32">Email:</span> <span>{user?.email}</span></div>
        {user?.college && <div className="flex items-center gap-3"><span className="font-medium w-32">College:</span> <span>{user.college}</span></div>}
        {user?.phone && <div className="flex items-center gap-3"><span className="font-medium w-32">Phone:</span> <span>{user.phone}</span></div>}
        <div className="flex items-center gap-3"><span className="font-medium w-32">Role:</span> <span>Student</span></div>
        <div className="flex items-center gap-3"><span className="font-medium w-32">LinkedIn:</span> <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center gap-1"><Linkedin className="w-4 h-4" /> Profile</a></div>
      </div>
      <div className="bg-blue-50 rounded-xl p-4 text-gray-700 text-sm mb-4">
        <span className="font-semibold">Bio:</span> {bio}
      </div>
    </div>
  );
}
export function DashboardStats() {
  // Dummy data
  const stats = {
    questionsSolved: 42,
    mockInterviews: 3,
    badges: ["Consistency", "Fast Learner", "Problem Solver"],
    offers: 2,
    companies: ["TCS", "Infosys"],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <BarChart2 className="w-10 h-10 text-blue-500 mb-2" />
        <div className="text-3xl font-bold text-blue-600 mb-1">{stats.questionsSolved}</div>
        <div className="text-lg font-medium text-gray-700">Questions Solved</div>
        <div className="mt-4 text-sm text-gray-500">Mock Interviews: <span className="font-semibold text-gray-700">{stats.mockInterviews}</span></div>
      </div>
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <TrendingUp className="w-10 h-10 text-green-600 mb-2" />
        <div className="text-3xl font-bold text-green-700 mb-1">88%</div>
        <div className="text-lg font-medium text-gray-700">Success Rate</div>
        <div className="mt-4 text-sm text-gray-500">Placement Offers: <span className="font-semibold text-gray-700">{stats.offers}</span></div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center col-span-1 md:col-span-2">
        <Award className="w-8 h-8 text-yellow-500 mb-2" />
        <div className="text-lg font-semibold text-gray-900 mb-1">Badges</div>
        <div className="flex gap-4 mt-2">
          {stats.badges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"><Award className="w-4 h-4" /> {badge}</span>
          ))}
        </div>
        <div className="mt-6 w-full">
          <h4 className="font-semibold mb-2 text-gray-800">Recent Achievements</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Placed at <span className="font-semibold">TCS</span> (2025)</li>
            <li>Placed at <span className="font-semibold">Infosys</span> (2025)</li>
            <li>Completed 3 Mock Interviews</li>
          </ul>
        </div>
      </div>
      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center col-span-1 md:col-span-2 mt-8">
        <div className="w-full h-40 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center text-gray-400 text-lg font-semibold">
          [Chart Coming Soon]
        </div>
      </div>
    </div>
  );
}
export function DashboardSettings() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Settings className="w-6 h-6 text-blue-500" /> Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700"><Bell className="w-5 h-5" /> Email Notifications</span>
          <input type="checkbox" checked readOnly className="accent-blue-500 w-5 h-5" />
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700"><Moon className="w-5 h-5" /> Dark Mode</span>
          <input type="checkbox" className="accent-blue-500 w-5 h-5" />
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <Button variant="outline">Change Password</Button>
        <Button variant="default">Update Profile</Button>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-xl flex flex-col py-8 px-6 border-r border-gray-200 min-h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{user.firstName} {user.lastName}</div>
            <div className="text-xs text-gray-500">Premium User</div>
          </div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition font-medium ${isActive ? "bg-blue-50 text-blue-700" : ""}`
                  }
                >
                  <item.icon className="w-5 h-5 text-blue-500" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button onClick={handleSignOut} variant="outline" className="mt-10 flex items-center gap-2 w-full justify-center">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white/80 shadow flex items-center justify-between px-10 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <span className="inline-block bg-gradient-to-r from-blue-500 to-green-400 text-white px-5 py-1.5 rounded-full font-semibold shadow text-base tracking-wide">Premium Access</span>
        </header>

        {/* Section Content */}
        <section className="flex-1 p-10 bg-gradient-to-br from-white/80 to-blue-50">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
