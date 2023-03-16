export const translate = (path: string): string => {
    const obj = {
        home: 'Hlavní stránka',
        settings: 'Nastavení'
    }
    return obj[path as keyof typeof obj] || path
}
