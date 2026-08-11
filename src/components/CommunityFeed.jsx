import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, UserPlus, UserCheck, ShieldCheck, Sparkles, Send, Flame, Trophy, Dumbbell, Image, Plus, Clock, MessageCircle, X } from 'lucide-react';

export default function CommunityFeed({ currentUser, members = [], posts = [], setPosts, friends = [], setFriends }) {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'my-friends' | 'find-buddies'
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Physique Progress');
  const [newPostImage, setNewPostImage] = useState('');
  const [commentInput, setCommentInput] = useState({});

  // Friend Request States: { [memberId]: 'none' | 'pending' | 'connected' }
  const [requestStates, setRequestStates] = useState(() => {
    const initial = {};
    friends.forEach(id => { initial[id] = 'connected'; });
    return initial;
  });

  // Slide-over Chat Drawer State
  const [activeChatMember, setActiveChatMember] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState({
    'EF-1002': [
      { id: 1, sender: 'them', text: 'Hey brother! Are you coming for the 6 PM CrossFit session today?', time: '05:15 PM' },
      { id: 2, sender: 'me', text: 'Yes! Doing heavy deadlifts and battle ropes today.', time: '05:18 PM' }
    ],
    'EF-1003': [
      { id: 1, sender: 'them', text: 'Hi! Loved your bench press PR update on the community feed.', time: 'Yesterday' }
    ]
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: `POST-${Date.now()}`,
      authorId: currentUser?.id || 'EF-1001',
      authorName: currentUser?.name || 'Active Member',
      authorRole: currentUser?.subRole || 'Standard Member',
      authorAvatar: currentUser?.name ? currentUser.name.charAt(0) : 'M',
      category: newPostCategory,
      content: newPostText,
      image: newPostImage.trim() || null,
      createdAt: 'Just now',
      likes: [],
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostImage('');
  };

  const handleLikePost = (postId) => {
    const userId = currentUser?.id || 'EF-1001';
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: isLiked ? post.likes.filter(id => id !== userId) : [...post.likes, userId]
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `CMT-${Date.now()}`,
      authorName: currentUser?.name || 'Active Member',
      text: text.trim(),
      createdAt: 'Just now'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));

    setCommentInput({ ...commentInput, [postId]: '' });
  };

  // Three-state friend request logic: none -> pending -> connected
  const handleFriendRequestClick = (memberId) => {
    const currentState = requestStates[memberId] || (friends.includes(memberId) ? 'connected' : 'none');

    if (currentState === 'none') {
      // Transition to Pending
      setRequestStates(prev => ({ ...prev, [memberId]: 'pending' }));
      
      // Auto-approve after 1.5s to demonstrate 'Connected' state
      setTimeout(() => {
        setRequestStates(prev => ({ ...prev, [memberId]: 'connected' }));
        if (!friends.includes(memberId)) setFriends(prev => [...prev, memberId]);
      }, 1500);
    } else if (currentState === 'pending') {
      // Force immediate approval
      setRequestStates(prev => ({ ...prev, [memberId]: 'connected' }));
      if (!friends.includes(memberId)) setFriends(prev => [...prev, memberId]);
    } else if (currentState === 'connected') {
      // Toggle off / Disconnect
      setRequestStates(prev => ({ ...prev, [memberId]: 'none' }));
      setFriends(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatMember) return;

    const memberId = activeChatMember.id;
    const msg = {
      id: Date.now(),
      sender: 'me',
      text: chatInput.trim(),
      time: 'Just now'
    };

    setChatLogs(prev => ({
      ...prev,
      [memberId]: [...(prev[memberId] || []), msg]
    }));

    setChatInput('');
  };

  const filteredPosts = activeTab === 'my-friends'
    ? posts.filter(p => friends.includes(p.authorId) || p.authorId === currentUser?.id)
    : posts;

  return (
    <div className="space-y-8 text-white relative">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-neutral-900 to-yellow-950/40 p-6 md:p-8 rounded-3xl border border-red-600/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1 rounded-full text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4" /> Member-Only Social Fitness Network
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase font-['Outfit'] tracking-tight">
            BULANDSHAHR GYM COMMUNITY
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm max-w-xl">
            Connect with local gym members, share your body transformation progress, challenge workout partners, and exchange diet & workout tips.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-neutral-800 text-xs font-black uppercase">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === 'feed' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            All Feed
          </button>
          <button
            onClick={() => setActiveTab('my-friends')}
            className={`px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === 'my-friends' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('find-buddies')}
            className={`px-4 py-2.5 rounded-xl transition cursor-pointer ${activeTab === 'find-buddies' ? 'bg-yellow-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Find Buddies
          </button>
        </div>
      </div>

      {activeTab !== 'find-buddies' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post Card */}
            <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center text-sm font-['Outfit']">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'M'}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{currentUser?.name || 'Active Member'}</h4>
                  <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
                    {currentUser?.subRole || 'Verified Member'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <textarea
                  rows="3"
                  placeholder="Share today's workout PR, progress update, or fitness challenge..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-xs text-white placeholder-neutral-500 outline-none focus:border-yellow-400 transition resize-none"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-bold rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="Physique Progress">🔥 Physique Progress</option>
                      <option value="Workout Challenge">🏆 Workout Challenge</option>
                      <option value="Diet & Nutrition">🥗 Diet & Nutrition</option>
                      <option value="Motivation">⚡ Motivation</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      value={newPostImage}
                      onChange={(e) => setNewPostImage(e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 rounded-xl px-3 py-2 outline-none w-44"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-yellow-400/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Share Post
                  </button>
                </div>
              </form>
            </div>

            {/* Posts Feed */}
            {filteredPosts.length === 0 ? (
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-10 text-center space-y-3">
                <Dumbbell className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-sm font-extrabold text-neutral-400">No posts in this feed yet.</p>
                <p className="text-xs text-neutral-500">Be the first active member to post a fitness update!</p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isLiked = post.likes.includes(currentUser?.id || 'EF-1001');
                return (
                  <div key={post.id} className="bg-[#121212] border border-neutral-800 hover:border-neutral-700 rounded-3xl p-6 shadow-xl space-y-4 transition">
                    
                    {/* Post Author Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600/30 border border-red-500/50 text-white font-black flex items-center justify-center text-sm font-['Outfit']">
                          {post.authorAvatar || 'M'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-white">{post.authorName}</h4>
                            {post.authorRole === 'Staff / Trainer' && (
                              <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                STAFF / COACH
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400">{post.createdAt}</span>
                        </div>
                      </div>

                      <span className="bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs md:text-sm text-neutral-200 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden max-h-80 border border-neutral-800 bg-black">
                        <img 
                          src={post.image} 
                          alt="Progress Post" 
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80';
                            e.currentTarget.onerror = null;
                          }}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                          isLiked ? 'bg-red-600/20 text-red-500 border border-red-500/40' : 'text-neutral-400 hover:text-white bg-neutral-900'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                        <span>{post.likes.length} Likes</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-neutral-400 font-extrabold">
                        <MessageSquare className="w-4 h-4 text-yellow-400" />
                        <span>{post.comments ? post.comments.length : 0} Comments</span>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-3 pt-2">
                      {post.comments && post.comments.map(cmt => (
                        <div key={cmt.id} className="bg-neutral-900/70 p-3 rounded-2xl text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-yellow-400">{cmt.authorName}</span>
                            <span className="text-[10px] text-neutral-500">{cmt.createdAt}</span>
                          </div>
                          <p className="text-neutral-300">{cmt.text}</p>
                        </div>
                      ))}

                      {/* Add Comment Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Write a encouragement or tip..."
                          value={commentInput[post.id] || ''}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                          className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-yellow-400 outline-none"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          Comment
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}

          </div>

          {/* Right Sidebar: Active Members & Buddies */}
          <div className="space-y-6">
            
            <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-sm font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-yellow-400" /> Connect Gym Buddies
                </h3>
                <span className="text-[10px] font-bold text-neutral-400">{members.length} Members</span>
              </div>

              <div className="space-y-3">
                {members.slice(0, 5).map((m) => {
                  if (m.id === currentUser?.id) return null;
                  const reqState = requestStates[m.id] || (friends.includes(m.id) ? 'connected' : 'none');

                  return (
                    <div key={m.id} className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-2xl border border-neutral-800/60 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center font-['Outfit']">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-xs leading-none">{m.name}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{m.goal || 'Fitness Member'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleFriendRequestClick(m.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition flex items-center gap-1 cursor-pointer ${
                            reqState === 'connected'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                              : reqState === 'pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-yellow-400 hover:bg-yellow-300 text-black'
                          }`}
                        >
                          {reqState === 'connected' && <><UserCheck className="w-3.5 h-3.5" /> Connected</>}
                          {reqState === 'pending' && <><Clock className="w-3.5 h-3.5 animate-spin" /> Pending...</>}
                          {reqState === 'none' && <><UserPlus className="w-3.5 h-3.5" /> Send Request</>}
                        </button>

                        {reqState === 'connected' && (
                          <button
                            onClick={() => setActiveChatMember(m)}
                            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-neutral-700 transition cursor-pointer"
                            title="Direct Message Member"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Fitness Challenge Widget */}
            <div className="bg-gradient-to-br from-red-950/40 to-neutral-900 border border-red-600/30 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-yellow-400 text-xs font-black uppercase">
                <Flame className="w-4 h-4 text-red-500" /> Today's Community Challenge
              </div>
              <h4 className="text-lg font-black text-white font-['Outfit'] uppercase">
                100 REPS BATTLE ROPE & 50 KETTLEBELL SWINGS
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Complete this challenge in the CrossFit Arena today, tag Coach Ravi, and post your timing on the social feed for a free merchandise shaker!
              </p>
            </div>

          </div>

        </div>
      ) : (
        /* Find Buddies Tab (Full Member Directory) */
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 shadow-xl space-y-6">
          <h3 className="text-xl font-black text-white font-['Outfit'] uppercase">
            Active Bulandshahr Gym Members Directory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => {
              const reqState = requestStates[m.id] || (friends.includes(m.id) ? 'connected' : 'none');
              return (
                <div key={m.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center font-['Outfit']">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{m.name}</h4>
                        <p className="text-xs text-yellow-400 font-bold">{m.plan}</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">Streak: {m.streak} Days 🔥</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleFriendRequestClick(m.id)}
                      className={`w-full py-2 rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        reqState === 'connected'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          : reqState === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-yellow-400 hover:bg-yellow-300 text-black'
                      }`}
                    >
                      {reqState === 'connected' && <><UserCheck className="w-4 h-4" /> Connected Buddy</>}
                      {reqState === 'pending' && <><Clock className="w-4 h-4 animate-spin" /> Pending Approval</>}
                      {reqState === 'none' && <><UserPlus className="w-4 h-4" /> Send Request</>}
                    </button>

                    {reqState === 'connected' && (
                      <button
                        onClick={() => setActiveChatMember(m)}
                        className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-neutral-700 transition cursor-pointer"
                        title="Chat Direct"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slide-over Direct Messaging / Member Chat Drawer */}
      {activeChatMember && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#121212] border-l-2 border-yellow-400/60 shadow-2xl flex flex-col animate-slide-in">
          
          {/* Chat Drawer Header */}
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center text-sm font-['Outfit']">
                {activeChatMember.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">{activeChatMember.name}</h4>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active on Gym Floor
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveChatMember(null)}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black/40 text-xs">
            {(chatLogs[activeChatMember.id] || [
              { id: 100, sender: 'them', text: `Hi! Let's connect and schedule a workout session together at Energie Fitness!`, time: 'Just now' }
            ]).map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-yellow-400 text-black font-medium rounded-br-none'
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-neutral-500 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChatMessage} className="p-4 bg-neutral-900 border-t border-neutral-800 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-yellow-400 outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
