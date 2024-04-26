export function isValidDate(birthdayStr: string) {

    // Extract year, month, and day from the string
    const day = parseInt(birthdayStr.substring(0, 2));
    const month = parseInt(birthdayStr.substring(2, 4)) - 1; // Months are zero-indexed in JavaScript
    const year = parseInt(birthdayStr.substring(4));

    // Create a Date object
    const birthdayDate = new Date(year, month, day);

    // Check if the Date object represents a valid date and it's not in the future
    if (
        isNaN(birthdayDate.getTime()) || // Invalid date
        birthdayDate.getFullYear() !== year ||
        birthdayDate.getMonth() !== month ||
        birthdayDate.getDate() !== day ||
        birthdayDate > new Date()
    ) {
        return false;
    }

    return true;
}

