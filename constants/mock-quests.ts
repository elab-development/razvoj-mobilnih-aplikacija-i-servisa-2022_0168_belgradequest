export type Quest = {
  id: string;
  title: string;
  reward: string;
  expires: string;
  description: string;
  location: { latitude: number; longitude: number; address: string };
};

export const QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Read with Nikola Tesla',
    reward: '100 XP',
    expires: '06/04/27',
    description:
      'Go to the Nikola Tesla monument in front of the School of Electrical Engineering and bring your favorite book with you.\n\nSubmit a picture of you reading next to the monument to complete the quest.',
    location: { latitude: 44.8048, longitude: 20.4637, address: 'School of Electrical Engineering, Belgrade' },
  },
  {
    id: '2',
    title: 'Below Vukov Spomenik',
    reward: '100 XP',
    expires: '06/10/27',
    description: 'Find the Vuk Karadžić monument near Vukov Spomenik and take a photo that shows you understand why he matters to the Serbian language.',
    location: { latitude: 44.8123, longitude: 20.4719, address: 'Vukov Spomenik, Belgrade' },
  },
  {
    id: '3',
    title: 'A smoke with Aca Lukas',
    reward: '100 XP',
    expires: '06/12/27',
    description: 'Visit a kafana known for turbo-folk nights in Skadarlija and soak in the atmosphere that made Aca Lukas famous.',
    location: { latitude: 44.8176, longitude: 20.4569, address: 'Skadarlija, Belgrade' },
  },
  {
    id: '4',
    title: 'Study in the national library',
    reward: '50 XP',
    expires: '06/15/27',
    description: 'Spend at least 30 minutes studying inside the National Library of Serbia.',
    location: { latitude: 44.8025, longitude: 20.4494, address: 'National Library of Serbia' },
  },
  {
    id: '5',
    title: 'Buy a burek for a stranger',
    reward: '50 XP',
    expires: '06/18/27',
    description: 'Surprise a stranger with a warm burek from a local pekara.',
    location: { latitude: 44.8167, longitude: 20.4577, address: 'Pekara near Skadarlija, Belgrade' },
  },
  {
    id: '6',
    title: 'Eat some ćevapi',
    reward: '25 XP',
    expires: '06/20/27',
    description: 'Order a portion of ćevapi at a traditional Belgrade grill and enjoy!',
    location: { latitude: 44.8065, longitude: 20.4574, address: 'Kalenić Market area, Belgrade' },
  },
  {
    id: '7',
    title: 'Pet a stray cat',
    reward: '25 XP',
    expires: '06/22/27',
    description: 'Find a friendly stray cat in Kalemegdan Park and give it some love (gently and safely!).',
    location: { latitude: 44.8144, longitude: 20.462, address: 'Kalemegdan Park, Belgrade' },
  },
];

export function getQuestById(id?: string) {
  return QUESTS.find((q) => q.id === id);
}