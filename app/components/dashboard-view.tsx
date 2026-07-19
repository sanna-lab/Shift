'use client';

import { motion } from 'framer-motion';
import { Bell, ChevronRight, Dumbbell, Home, MoonStar, Settings, Sparkles, Trophy, UserRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Profile } from './onboarding-flow';

interface DashboardViewProps {
  profile: Profile;
}

const weeklyChallenge = {
  title: 'Weekly Challenge',
  description: 'Complete 5 sessions this week',
  completed: 3,
  total: 5,
  reward: '+100 XP',
};

const goals = [
  { title: 'Improve posture', progress: 72, note: 'Small lifts count', accent: 'from-[#CDDCDF] to-[#F8EDEB]' },
  { title: 'Become stronger', progress: 34, note: 'You are building momentum', accent: 'from-[#F4ACB7] to-[#FFDAB9]' },
  { title: 'Reduce stress', progress: 58, note: 'Keep your breath steady', accent: 'from-[#DCD6F7] to-[#FFCAD4]' },
];

const badges = [
  { name: 'Sunny', accent: 'from-[#F4ACB7] to-[#FBC4AB]', mood: 'happy', unlocked: true },
  { name: 'Nova', accent: 'from-[#DCD6F7] to-[#CDDCDF]', mood: 'surprised', unlocked: true },
  { name: 'Momo', accent: 'from-[#FFDAB9] to-[#FFCAD4]', mood: 'confused', unlocked: true },
  { name: 'Coach', accent: 'from-[#CDDCDF] to-[#DCD6F7]', mood: 'cool', unlocked: false },
  { name: 'Pebble', accent: 'from-[#FBC4AB] to-[#F8EDEB]', mood: 'grumpy', unlocked: false },
];

function BadgeFace({ mood }: { mood: string }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-inner">
      <div className="absolute h-10 w-10 rounded-full border border-slate-300/70" />
      <div className="absolute left-[22px] top-[24px] h-2 w-2 rounded-full bg-slate-700" />
      <div className="absolute right-[22px] top-[24px] h-2 w-2 rounded-full bg-slate-700" />
      {mood === 'happy' ? <div className="absolute bottom-[24px] h-2.5 w-4 rounded-b-full border-b-2 border-slate-700" /> : null}
      {mood === 'surprised' ? <div className="absolute bottom-[24px] h-3 w-4 rounded-full border-2 border-slate-700" /> : null}
      {mood === 'confused' ? <div className="absolute bottom-[24px] h-2 w-4 rounded-full border-b-2 border-slate-700" /> : null}
      {mood === 'cool' ? <div className="absolute bottom-[24px] h-3 w-6 rounded-full border-2 border-slate-700" /> : null}
      {mood === 'grumpy' ? <div className="absolute bottom-[24px] h-2 w-4 rounded-full border-b-2 border-slate-700" /> : null}
    </div>
  );
}

export function DashboardView({ profile }: DashboardViewProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const now = new Date();
  const hour = now.getHours();
  const timeWindow = useMemo(() => {
    if (hour >= 6 && hour < 12) return { label: 'Morning', accent: 'from-[#CDDCDF] to-[#F8EDEB]', title: 'Postural', text: 'Perfect moment to improve your posture before your day starts.', badge: '🪑' };
    if (hour >= 12 && hour < 17) return { label: 'Midday', accent: 'from-[#F4ACB7] to-[#FFDAB9]', title: 'Fitness', text: 'Recharge your body with a quick 5-minute workout.', badge: '💪' };
    if (hour >= 17 && hour < 21) return { label: 'Afternoon', accent: 'from-[#DCD6F7] to-[#F8EDEB]', title: 'Mindfulness', text: 'Take a moment to relax and reset.', badge: '🧘' };
    return { label: 'Night', accent: 'from-[#FFDAB9] to-[#FBC4AB]', title: 'Stretching', text: 'Release today’s tension before resting.', badge: '🤸' };
  }, [hour]);

  const greeting = useMemo(() => {
    const currentHour = now.getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  }, [now]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,172,183,0.23),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(205,220,223,0.3),_transparent_40%)] px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 pb-24">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="soft-card flex items-center justify-between px-4 py-4 sm:px-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F4ACB7] to-[#DCD6F7] text-lg font-semibold text-slate-800">S</div>
            <div>
              <p className="text-lg font-semibold text-slate-800">Shift</p>
              <p className="text-sm text-slate-500">Gentle wellness</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-600 transition hover:scale-105" aria-label="Toggle theme">
              <MoonStar size={18} onClick={() => setDarkMode((value) => !value)} />
            </button>
            <button className="rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-600 transition hover:scale-105" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-600 transition hover:scale-105" aria-label="Settings">
              <Settings size={18} />
            </button>
          </div>
        </motion.header>

        <section className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F4ACB7]">Today</p>
          <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">{greeting}, {profile.name}</h1>
          <p className="max-w-2xl text-lg text-slate-600">A calm, supportive rhythm is waiting for you.</p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="soft-card overflow-hidden"
        >
          <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Weekly Challenge</p>
              <h2 className="text-2xl font-semibold text-slate-800">Complete {weeklyChallenge.description}</h2>
            </div>
            <div className="rounded-full bg-[#F8EDEB] px-4 py-2 text-sm font-semibold text-slate-700">{weeklyChallenge.reward}</div>
          </div>

          <div className="flex flex-col gap-6 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>{weeklyChallenge.completed} / {weeklyChallenge.total} completed</span>
                <span>3 days left</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full rounded-full bg-gradient-to-r from-[#F4ACB7] via-[#FFDAB9] to-[#DCD6F7]" style={{ width: `${(weeklyChallenge.completed / weeklyChallenge.total) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[24px] bg-[#F8EDEB] px-4 py-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FBC4AB] to-[#F4ACB7] text-2xl">☁️</div>
              <div>
                <p className="font-semibold text-slate-800">Badge preview</p>
                <p className="text-sm text-slate-600">A little glow for your streak</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className={`rounded-[32px] bg-gradient-to-br ${timeWindow.accent} p-6 shadow-soft`}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Today’s suggestion</p>
                <h3 className="text-2xl font-semibold text-slate-800">{timeWindow.label} reset</h3>
              </div>
              <div className="rounded-full border border-white/60 bg-white/70 px-3 py-2 text-xl">{timeWindow.badge}</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-start">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-56 w-56 items-center justify-center rounded-full border border-white/70 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white/80 text-center shadow-inner">
                  <p className="text-lg font-semibold text-slate-700">{timeWindow.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{timeWindow.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-800">{hour}:{String(now.getMinutes()).padStart(2, '0')}</p>
                </div>
              </motion.div>

              <div className="max-w-sm">
                <p className="text-2xl font-semibold text-slate-800">{timeWindow.title}</p>
                <p className="mt-3 text-lg leading-7 text-slate-700">{timeWindow.text}</p>
              </div>
            </div>
          </div>

          <div className="soft-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-800">Your Goals</h3>
              <button className="rounded-full bg-[#F8EDEB] px-3 py-2 text-sm font-semibold text-slate-700">View all</button>
            </div>
            <div className="flex flex-col gap-3">
              {goals.map((goal) => (
                <motion.div key={goal.title} whileHover={{ scale: 1.01 }} className="rounded-[24px] border border-slate-200/70 bg-white/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${goal.accent}`}>✓</div>
                      <div>
                        <p className="font-semibold text-slate-800">{goal.title}</p>
                        <p className="text-sm text-slate-500">{goal.note}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{goal.progress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80">
                    <div className={`h-full rounded-full bg-gradient-to-r ${goal.accent}`} style={{ width: `${goal.progress}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="soft-card p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Badge collection</p>
              <h3 className="text-2xl font-semibold text-slate-800">Collect your little wins</h3>
            </div>
            <button className="rounded-full bg-[#F8EDEB] px-3 py-2 text-sm font-semibold text-slate-700">See all</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {badges.map((badge) => (
              <motion.div key={badge.name} whileHover={{ y: -3, scale: 1.02 }} className={`min-w-[140px] rounded-[24px] border border-slate-200/70 bg-gradient-to-br ${badge.accent} p-4 text-center ${badge.unlocked ? '' : 'blur-[2px]'}`}>
                <div className="flex justify-center">
                  <BadgeFace mood={badge.mood} />
                </div>
                <p className="mt-3 text-base font-semibold text-slate-800">{badge.name}</p>
                <p className="text-sm text-slate-600">{badge.unlocked ? 'Unlocked' : 'Locked'}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-[24px] bg-gradient-to-r from-[#F4ACB7] via-[#FFDAB9] to-[#DCD6F7] px-5 py-4 text-left shadow-soft"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">Quick start</p>
              <h3 className="text-2xl font-semibold text-slate-800">Start today’s session</h3>
            </div>
            <div className="rounded-full bg-white/70 p-3 text-slate-700">
              <ChevronRight size={20} />
            </div>
          </div>
        </motion.button>
      </main>

      <nav className="fixed inset-x-0 bottom-4 mx-auto flex max-w-md items-center justify-between rounded-full border border-white/60 bg-white/80 px-3 py-3 shadow-soft backdrop-blur-2xl sm:bottom-6">
        <button className="flex flex-col items-center rounded-full bg-[#F8EDEB] px-3 py-2 text-slate-700">
          <Home size={18} />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center rounded-full px-3 py-2 text-slate-600">
          <Dumbbell size={18} />
          <span className="text-xs">Exercises</span>
        </button>
        <button className="flex flex-col items-center rounded-full px-3 py-2 text-slate-600">
          <Trophy size={18} />
          <span className="text-xs">Challenges</span>
        </button>
        <button className="flex flex-col items-center rounded-full px-3 py-2 text-slate-600">
          <Sparkles size={18} />
          <span className="text-xs">Badges</span>
        </button>
        <button className="flex flex-col items-center rounded-full px-3 py-2 text-slate-600">
          <UserRound size={18} />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
