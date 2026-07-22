import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export type Quest = {
  id: string;
  title: string;
  description: string;
  reward_xp: number;
  expires_at: string | null;
  latitude: number;
  longitude: number;
  address: string;
};

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    supabase
      .from('quests')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) setError(error.message);
        else setQuests(data ?? []);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { quests, loading, error };
}

export function useQuest(id?: string) {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setLoading(true);
    supabase
      .from('quests')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) setError(error.message);
        else setQuest(data);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { quest, loading, error };
}

// '2027-04-06' -> '06/04/27'
export function formatExpiry(dateStr: string | null) {
  if (!dateStr) return '-';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year.slice(2)}`;
}