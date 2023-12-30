const oldDateFormatter = (dateString) => {
    const date = new Date(`${dateString.slice(0, -1)}+00:00`);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `  ${hour}:${minute}  ${day}-${month}-${year}`;
}

export default oldDateFormatter