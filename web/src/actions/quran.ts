"use server";

interface Surah {
    id: number;
    name_simple: string;
    name_arabic: string;
    verses_count: number;
    revelation_place: string;
}

interface Verse {
    id: number;
    verse_key: string;
    text_uthmani: string;
}

const API_BASE = "https://api.quran.com/api/v4";

export async function getSurahs() {
    try {
        const res = await fetch(`${API_BASE}/chapters?language=id`, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });
        const data = await res.json();
        return { success: true, data: data.chapters as Surah[] };
    } catch (error) {
        console.error("Error fetching surahs:", error);
        return { success: false, error: "Failed to fetch surahs" };
    }
}

export async function getVerses(chapterId: number) {
    try {
        // Fetch verses for a specific chapter
        // Using uthmani script for display
        const res = await fetch(
            `${API_BASE}/quran/verses/uthmani?chapter_number=${chapterId}`,
            {
                next: { revalidate: 86400 },
            }
        );
        const data = await res.json();
        return { success: true, data: data.verses as Verse[] };
    } catch (error) {
        console.error("Error fetching verses:", error);
        return { success: false, error: "Failed to fetch verses" };
    }
}

export async function getJuzs() {
    // Hardcoded Juz data or fetch if available. 
    // For simplicity, we can return 1-30.
    const juzs = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Juz ${i + 1}`,
    }));
    return { success: true, data: juzs };
}
