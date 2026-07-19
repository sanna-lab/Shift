'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Brain, Dumbbell, HeartPulse, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface Profile {
  name: string;
  interests: string[];
  goals: string[];
}

interface OnboardingFlowProps {
  onComplete: (profile: Profile) => void;
}

const interestOptions = [
  { id: 'postural', label: 'Postural', icon: HeartPulse, accent: 'from-[#CDDCDF] to-[#F8EDEB]' },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell, accent: 'from-[#F4ACB7] to-[#FFDAB9]' },
  { id: 'mindfulness', label: 'Mindfulness', icon: Brain, accent: 'from-[#DCD6F7] to-[#F8EDEB]' },
  { id: 'stretching', label: 'Stretching', icon: Sparkles, accent: 'from-[#FFDAB9] to-[#FFCAD4]' },
];

const goalOptions = [
  'Improve my posture',
  'Become stronger',
  'Increase flexibility',
  'Reduce stress',
  'Move more consistently',
  'Improve mobility',
  'Sleep better',
  'Feel more energetic',
  'Create a healthy habit',
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const progressLabel = useMemo(() => `${step + 1}/3`, [step]);

  const toggleInterest = (item: string) => {
    setInterests((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));
  };

  const toggleGoal = (item: string) => {
    setGoals((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));
  };

  const handleContinue = () => {
    if (step === 2) {
      onComplete({ name: name.trim() || 'Friend', interests, goals });
      return;
    }
    setStep((current) => current + 1);
  };

  const canContinue = step === 0 ? name.trim().length > 0 : step === 1 ? interests.length > 0 : goals.length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,172,183,0.2),_transparent_40%),linear-gradient(135deg,_#fffdfa,_#f8ede8)] px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-4xl rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-2xl sm:p-8 lg:p-10"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F4ACB7]">Shift</p>
            <p className="text-sm text-slate-500">Step {progressLabel}</p>
          </div>
          <div className="rounded-full bg-[#F8EDEB] px-4 py-2 text-sm font-semibold text-slate-700">Gentle start</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="welcome" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">Welcome to Shift</h1>
                <p className="mt-3 text-lg text-slate-600">Let’s build your wellness journey together, one calm step at a time.</p>
              </div>

              <label className="mb-3 block text-sm font-semibold text-slate-700" htmlFor="name">
                What should we call you?
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-[24px] border border-[#F4ACB7]/40 bg-[#fffdfb] px-5 py-4 text-lg shadow-sm outline-none ring-0 transition focus:border-[#F4ACB7]"
              />
            </motion.div>
          ) : null}

          {step === 1 ? (
            <motion.div key="interests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 max-w-2xl">
                <h2 className="text-3xl font-semibold text-slate-800 sm:text-4xl">What interests you the most?</h2>
                <p className="mt-2 text-lg text-slate-600">Choose a few gentle themes to personalize your plan.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {interestOptions.map(({ id, label, icon: Icon, accent }) => {
                  const active = interests.includes(id);
                  return (
                    <motion.button
                      key={id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInterest(id)}
                      className={`rounded-[24px] border p-5 text-left transition ${active ? 'border-transparent bg-gradient-to-br ' + accent : 'border-slate-200 bg-white/80'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`rounded-full bg-white/70 p-3 ${active ? 'text-slate-700' : 'text-slate-600'}`}>
                          <Icon size={22} />
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? 'bg-white/70 text-slate-700' : 'bg-slate-100 text-slate-500'}`}>
                          {active ? 'Selected' : 'Tap to choose'}
                        </span>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-slate-800">{label}</h3>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div key="goals" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 max-w-2xl">
                <h2 className="text-3xl font-semibold text-slate-800 sm:text-4xl">What is your goal?</h2>
                <p className="mt-2 text-lg text-slate-600">Pick what feels most supportive for you right now.</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {goalOptions.map((item) => {
                  const active = goals.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleGoal(item)}
                      className={`rounded-[24px] border px-4 py-4 text-left text-lg font-medium transition ${active ? 'border-transparent bg-[#F8EDEB] text-slate-800' : 'border-slate-200 bg-white/80 text-slate-600'}`}
                    >
                      {active ? '✓ ' : ''}
                      {item}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-500">{step === 2 ? 'You can choose multiple goals.' : 'Choose what resonates.'}</div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4ACB7] via-[#FBC4AB] to-[#DCD6F7] px-5 py-3 text-base font-semibold text-slate-800 shadow-lg shadow-[#F4ACB7]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {step === 2 ? 'Start my journey' : 'Continue'}
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
