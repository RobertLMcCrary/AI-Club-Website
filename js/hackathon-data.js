// ============================================================================
//  Hackathon 2026: everything that changes lives in this file.
//  Edit it, save, deploy. The page (hackathon.html) renders from it.
//  Anything set to 'TBA' shows as "TBA" on the site.
// ============================================================================

export const HACKATHON = {
    // Countdown target (Eastern time; Nov 2026 is EST, -05:00).
    // Set this to the real kickoff time once it's decided.
    kickoff: '2026-11-16T00:00:00-05:00',
    // When the event is over (the countdown switches to "ended" after this).
    end: '2026-11-21T00:00:00-05:00',

    prizePool: 'TBA', // e.g. '$3,000'

    tracks: [
        {
            id: 'ai-club',
            name: 'Main track',
            host: 'KSU AI Club',
            blurb: 'The core challenge: build something with AI that helps students on campus.',
            prize: 'TBA',
        },
        {
            id: 'ieee-cyber',
            name: 'Cybersecurity track',
            host: 'IEEE',
            blurb: 'Security-focused projects, run with IEEE.',
            prize: 'TBA',
        },
        {
            id: 'nudox-games',
            name: 'Game track',
            host: 'Nudox',
            blurb: 'Build a game during the hackathon, run with Nudox.',
            prize: 'TBA',
        },
    ],

    // One entry per day. Add items as times and rooms are confirmed:
    //   { time: '6:30 pm', title: 'Opening ceremony', room: 'Q202' }
    schedule: [
        { date: '2026-11-16', label: 'Opening day', items: [{ time: 'TBA', title: 'Kickoff', room: 'TBA' }] },
        { date: '2026-11-17', label: 'Build day', items: [{ time: 'TBA', title: 'Hacking + free food', room: 'TBA' }] },
        { date: '2026-11-18', label: 'Build day', items: [{ time: 'TBA', title: 'Hacking + free food', room: 'TBA' }] },
        { date: '2026-11-19', label: 'Build day', items: [{ time: 'TBA', title: 'Hacking + free food', room: 'TBA' }] },
        { date: '2026-11-20', label: 'Judging day', items: [{ time: 'TBA', title: 'Demos, judging & awards', room: 'TBA' }] },
    ],

    // Organizations running the event with us.
    partners: [
        { name: 'KSU AI Club', role: 'Host' },
        { name: 'IEEE', role: 'Cybersecurity track' },
        { name: 'Nudox', role: 'Game track' },
    ],

    // Add sponsors as they sign on: { name: 'Company', url: 'https://...' }
    sponsors: [],
};
