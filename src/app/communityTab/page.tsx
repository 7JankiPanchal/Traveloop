import React from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Edit,
  Compass,
  Users,
  PlusCircle,
  User,
} from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Elena Rossi",
    time: "2 hours ago",
    location: "Rome, Italy",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrXizXuJ2JIq9iyZs5BBrPJN9XoO72V8nHGctIeevSGGRKWcReoEBclXRHhsW9jezSQKQPfb8_vmkGnzr-0vQmCKnSGG8dvz4Lj2oTGRCXeM2kGtHKGqNtgMtcCge_RhwwccsZPbeCg_L0ugQCO_R2P4egNuPuDg9VaMf4MFeEjp5qGO2lWei3dfaCypFRlEbG4lC7jfOunIDMMXTkPFBBcKsndwrEZnDGf2oLa3QGjkUXqNGgIQCrun2AbacEvxhYoxMXoM2itQ2s",
    content:
      "Hidden gems in Rome you can't miss! Everyone goes to the Trevi Fountain, but have you tried the orange garden on Aventine Hill at sunset? The view is absolutely breathtaking and far less crowded. 🇮🇹✨",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_1ZARqAJxziSrK7uN8ilwyZhGfNWjtp5H4DlJptz8fdcL__VuQIx8a8rwiDfDeum74X5oWefIDG7ej-XUZyrQmyvYo2Y6x6ia98OIYQ9e_399HkmxQuwshcNTL1vbAwSHbcCjQVazQH9-l2nljLOmkteDLPbDWaa2UrY8YBfPR7QPsRUjtqCIGXJrxeTnf0fwHsS6tEJHTxGeDs-1Ef8UZTXxlZcHGuV_mGnHQd7l6w-Jh6xaRi34shR_1AqKnekLKSrZHeITWSap",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    name: "Marcus Chen",
    time: "5 hours ago",
    location: "Kyoto, Japan",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn9nZ5lmsrAOTUUJliLzDVYJZqP5WF0IVNiR9119gsSyCl1ILDuHLpUnPdDiRe-uoGOWpVpOHddWukY4KoenpB4-MDZHXrIsH__2guXeU5qaxzyCWFCTj5xKNyQyQFOudGDKtCdOTMHParC1A4jxnfDPIdF0K7uINDF-OGL8NK1G6xj2ZkgXZUTfZfuV_AKz4WTNA7j-QM-uMVQItp20qGbSTRJjXrSqyo8lN3XOiT3X9D8IRX2S2LuQYzOGzTZiwW3uhj4ZNlLJQK",
    content:
      "Our trip to Kyoto was magical... walking through the Fushimi Inari gates at 6 AM before the crowds arrived was a spiritual experience I'll never forget. ⛩️🍃",
    likes: 342,
    comments: 45,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    time: "1 day ago",
    location: "Santorini, Greece",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaN4The6GRRbGkA6XfO320ji_jRsC1mIN3-k9DlU5LcRE9eYbxxicB2l0kWvTWdXQR1nJifL1p_7iQUnUVy5EbeFGHMbBHnp5nsShHkPK29SXvsiNuIaoTXBtgpmLRRloOUyC1sgdTusgHZB2g3bG1cq2DmWRcbIGIkWLldjXIFkJX5_5G-J2edsQSzT12wJf0b4A48tc4LLKFW-4twWW7TtD1n5Rr-xg_ftv_bWRZ1Adb9c9ULagmlT3tHacw8lToZBWNGLegBUTM",
    content:
      "Just arrived in Santorini! The contrast of the white buildings against the deep blue sea is even more stunning in person than in the photos. 🌊🐟",
    likes: 89,
    comments: 31,
  },
];

const TraveloopCommunity: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9fe] text-[#1a1b1f]">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-4">
            <Menu className="text-blue-600 cursor-pointer" />
            <h1 className="text-2xl font-bold text-blue-600">Traveloop</h1>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-blue-600 cursor-pointer" />

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlYla7qoWltnpOp1rl-s7mkcz_90ocd6tAFW70TJG3jdSfnhOn7TelR6u5RRJIhuC4AZUBOdGDdX3FPZ1H4r_jST360nNil6TsUBypvhRG6kW67qSf5xXXPKhCTUbrJdhWXPjww2oE4aOkxkaDS82lDDtmPD--dqN6we_1THSYvp7_lIR6QWWpZTeXQrSJMB76PeCtFFsb79C8a8En-hkS52sjKsdR66bYSBpuzpvtLLMBBrZh7xRAnAbZOVNt4HfLCNsPB6glHxNP"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-28 max-w-2xl mx-auto px-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search bar ......"
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 rounded-full text-blue-600 font-semibold">
            Group by <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 rounded-full text-blue-600 font-semibold">
            Filter <SlidersHorizontal size={18} />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 rounded-full text-blue-600 font-semibold">
            Sort by <ArrowUpDown size={18} />
          </button>
        </div>

        {/* Title */}
        <div className="mt-8 mb-6">
          <h2 className="text-3xl font-bold">Community Tab</h2>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="flex gap-4">
              {/* Avatar */}
              <div>
                <img
                  src={post.avatar}
                  alt={post.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
              </div>

              {/* Card */}
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
                {/* Top */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{post.name}</h3>

                    <p className="text-sm text-gray-500">
                      {post.time} • {post.location}
                    </p>
                  </div>

                  <MoreHorizontal className="text-gray-500 cursor-pointer" />
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Image */}
                {post.image && (
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                    <Heart size={20} />
                    {post.likes}
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <MessageCircle size={20} />
                    {post.comments}
                  </button>

                  <button className="ml-auto text-gray-600 hover:text-blue-600">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Floating Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-orange-400 flex items-center justify-center shadow-lg hover:scale-105 transition">
        <Edit className="text-white" size={28} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl py-2 flex justify-around items-center">
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <Compass size={22} />
          <span className="text-xs">Explore</span>
        </button>

        <button className="flex flex-col items-center text-blue-600 font-semibold">
          <Users size={22} />
          <span className="text-xs">Social</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <PlusCircle size={22} />
          <span className="text-xs">Post</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <Bell size={22} />
          <span className="text-xs">Inbox</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <User size={22} />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default TraveloopCommunity;