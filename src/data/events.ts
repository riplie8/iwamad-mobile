export type CampusEvent = { 
    id: number; 
    title: string; 
    date: string; 
    place: string; 
    seats: number 
}

export const events: CampusEvent[] = [
    { id: 1, title: 'React Native Workshop', date: '2026-11-10', place: 'Room 402', seats: 25 },
    { id: 2, title: 'TypeScript Deep Dive', date: '2026-11-12', place: 'Auditorium A', seats: 40 },
    { id: 3, title: 'UI/UX Design Basics', date: '2026-11-15', place: 'Lab 3', seats: 15 },
    { id: 4, title: 'Mobile App Hackathon', date: '2026-11-20', place: 'Main Hall', seats: 100 },
  ];