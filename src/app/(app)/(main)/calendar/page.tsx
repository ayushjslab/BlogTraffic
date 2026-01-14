"use client"
import CalendarPage from '@/components/app-components/blog-flow/calendar'

const page = () => {
    // Generates a few dates for the current month so the calendar looks full
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    const fakeBlogs = [
        { date: `${currentYear}-${currentMonth}-01`, title: 'The Future of AI Design Systems' },
        { date: `${currentYear}-${currentMonth}-05`, title: 'Why Framer Motion is taking over the web' },
        { date: `${currentYear}-${currentMonth}-08`, title: 'Typography: The silent killer of conversion' },
        { date: `${currentYear}-${currentMonth}-12`, title: 'Mastering Neo-minimalism in 2024' },
        { date: `${currentYear}-${currentMonth}-15`, title: 'Dark Mode vs Light Mode: The Psychology' },
        { date: `${currentYear}-${currentMonth}-21`, title: 'Building a $10k/month SaaS UI' },
        { date: `${currentYear}-${currentMonth}-25`, title: 'Generative UI: The next frontier' },
        { date: `${currentYear}-${currentMonth}-28`, title: 'SEO Strategies for Modern Devs' },
    ];

    return (
        <CalendarPage
        />
    )
}

export default page