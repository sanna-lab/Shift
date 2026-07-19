'use client';

import { useEffect, useState } from 'react';
import { DashboardView } from './components/dashboard-view';
import { OnboardingFlow, type Profile } from './components/onboarding-flow';

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('shift-profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Profile;
        setProfile(parsed);
      } catch {
        setProfile(null);
      }
    }

    setReady(true);
  }, []);

  const handleComplete = (nextProfile: Profile) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('shift-profile', JSON.stringify(nextProfile));
    }
    setProfile(nextProfile);
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,172,183,0.24),_transparent_40%),linear-gradient(135deg,_#fffdfa,_#f8ede8)] text-lg text-slate-700">
        Preparing Shift…
      </div>
    );
  }

  if (!profile) {
    return <OnboardingFlow onComplete={handleComplete} />;
  }

  return <DashboardView profile={profile} />;
}
