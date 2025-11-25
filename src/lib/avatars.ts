export const AVATARS = [
    {
        slug: "algo-bot",
        name: "The Algo-Bot",
        description: "Friendly, helpful AI. Perfect for beginners.",
        image: "/avatars/algo-bot.png",
    },
    {
        slug: "cyber-ninja",
        name: "The Cyber Ninja",
        description: "Mysterious and skilled. For hackers and puzzle solvers.",
        image: "/avatars/cyber-ninja.png",
    },
    {
        slug: "code-wizard",
        name: "The Code Wizard",
        description: "Wise and powerful. For architects and senior devs.",
        image: "/avatars/code-wizard.png",
    },
    {
        slug: "debugging-cat",
        name: "The Debugging Cat",
        description: "Fun and observant. For those who love rubber duck debugging.",
        image: "/avatars/debugging-cat.png",
    },
    {
        slug: "space-explorer",
        name: "The Space Explorer",
        description: "Visionary and ambitious. For fullstack explorers.",
        image: "/avatars/space-explorer.png",
    },
];

export function getAvatarImage(slug: string | null | undefined) {
    if (!slug) return null;
    const avatar = AVATARS.find((a) => a.slug === slug);
    return avatar ? avatar.image : null;
}
