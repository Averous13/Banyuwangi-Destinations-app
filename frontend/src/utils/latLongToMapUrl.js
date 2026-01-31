export const latLongToMapUrl = (lat, long) => {
    if (!lat || !long) return "";
    return `https://www.google.com/maps?q=${lat},${long}`;
};
