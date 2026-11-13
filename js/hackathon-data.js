// ============================================================================
//  Hackathon 2026: everything that changes lives in this file.
//  Edit it, save, deploy. The page (hackathon.html) renders from it.
//  Anything set to 'TBA' shows as "TBA" on the site.
// ============================================================================

export const HACKATHON = {
    // Countdown target (Eastern time; Nov 2026 is EST, -05:00).
    kickoff: '2026-11-16T19:30:00-05:00',
    // When the event is over (the countdown switches to "ended" after this).
    end: '2026-11-20T21:30:00-05:00',

    prizePool: '$4,000',

    tracks: [
        {
            id: 'ai-club',
            name: 'AI Club track',
            host: 'KSU AI Club',
            blurb: 'The core challenge: build something with AI that helps students on campus.',
            prize: '$1,500',
        },
        {
            id: 'ieee-game-sprint',
            name: 'AI Game Sprint',
            host: 'IEEE Computer Society at KSU',
            blurb: 'Build a game with AI. The AI can be part of the game, or you can use AI to build it. Use any tools, platform, or hardware you have. Earn bonus points by using the ELEGOO Mega 2560 kit however you want (a controller, the display, LEDs, anything in the kit). Kits are available from day one and can go home with a signed borrowing form. First place wins $500, second place wins $300, and third place wins $200.',
            prize: '$1,000',
        },
        {
            id: 'nudox-games',
            name: 'Game track',
            host: 'Nudox',
            blurb: 'Build a game during the hackathon, run with Nudox.',
            prize: '$700',
        },
        {
            id: 'itcan-do',
            name: 'itcan.do track',
            host: 'itcan.do',
            blurb: 'Build something you and your AI agent use together. With itcan.do, your agent builds the page your idea needs and puts it on any screen, and every tap on it goes back to the agent. Bring a laptop with Claude Code set up. We recommend it, though other AI agents such as Codex work too.',
            prize: '$500',
        },
    ],

    // One entry per day. Add items as times and rooms are confirmed:
    //   { time: '6:30 pm', title: 'Opening ceremony', room: 'Q202' }
    schedule: [
        { date: '2026-11-16', label: 'Opening day', items: [{ time: '7:30–9:30 pm', title: 'Kickoff + free food', room: 'ETC Q 104' }] },
        { date: '2026-11-17', label: 'Build day', items: [{ time: '7:30–9:30 pm', title: 'Hacking', room: 'ETC Q 104' }] },
        { date: '2026-11-18', label: 'Judge help day', items: [{ time: '7:30–9:30 pm', title: 'Hacking + judges on hand to help you', room: 'ETC Q 104' }] },
        { date: '2026-11-19', label: 'Build day', items: [{ time: '7:30–9:30 pm', title: 'Hacking', room: 'ETC Q 104' }] },
        { date: '2026-11-20', label: 'Demo day', items: [{ time: '7:30–9:30 pm', title: 'Demos, judging, awards + free food', room: 'ETC Q 104' }] },
    ],

    // Organizations running the event with us.
    partners: [
        { name: 'KSU AI Club', role: 'Host' },
        { name: 'CCSE', role: 'College partner' },
        {
            name: 'IEEE Computer Society at KSU',
            role: 'AI Game Sprint',
            url: 'https://www.linkedin.com/company/ieee-kennesaw-state-university/',
        },
        { name: 'IEEE ComSoc', role: 'Track partner' },
        { name: 'SWE at KSU', role: 'Track partner' },
        { name: 'Nudox', role: 'Game track' },
        {
            name: 'itcan.do',
            role: 'itcan.do track',
            url: 'https://itcan.do',
            logo: 'assets/it-assets/itcando-wordmark-on-dark.svg',
        },
    ],

    // Companies whose people are coming to the event.
    guests: [
        { name: 'Google' },
        { name: 'Amazon' },
        { name: 'Microsoft' },
        { name: 'Uber' },
    ],

    // Add sponsors as they sign on: { name: 'Company', url: 'https://...' }
    sponsors: [],
};
