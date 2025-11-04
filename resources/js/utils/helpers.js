export const titleCase = (str) => {
    const words = str.split(" ");
    const titleCasedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return titleCasedWords.join(" ");
}

export const getFirstLettersFromName = (name) => {
    const names = name.split(" ");
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
        initials += names[1].charAt(0).toUpperCase();
    }
    return initials;
}